import FieldError from "./FieldError";
import NotFoundError from "./NotFoundError";
import MultipleError from "./MultipleError";

class Service {
  constructor() {
    this.data = {
      teams: [
        {
          id: 1,
          name: "Mönchen Gladbach"
        },
        {
          id: 2,
          name: "1. FC Köln"
        },
        {
          id: 3,
          name: "Bayer Leverkusen"
        },
        {
          id: 4,
          name: "FC Bayern"
        },
        {
          id: 5,
          name: "Schalke"
        },
        {
          id: 6,
          name: "Vfb"
        },
        {
          id: 7,
          name: "Freiburg"
        },
        {
          id: 8,
          name: "SGE"
        },
        {
          id: 9,
          name: "Arminia"
        }
      ],
      matches: [
        {
          id: 1,
          host: {
            id: 4,
            goals: 8,
            name: "FC Bayern"
          },
          guest: {
            id: 5,
            goals: 0,
            name: "Schalke"
          },
          gameDay: "2020-01-01"
        },
        {
          id: 2,
          host: {
            id: 6,
            goals: 2,
            name: "Vfb"
          },
          guest: {
            id: 7,
            goals: 3,
            name: "Freiburg"
          },
          gameDay: "2020-02-01"
        },
        {
          id: 3,
          host: {
            id: 8,
            goals: 1,
            name: "SGE"
          },
          guest: {
            id: 9,
            goals: 1,
            name: "Arminia"
          },
          gameDay: "2020-03-01"
        }
      ]
    };

    this.metadata = {
      paths: [
        {
          name: "/team/:id",
          type: "team",
          collection: "teams"
        },
        {
          name: "/teams",
          type: "team",
          sort: this.sortTeams,
          collection: "teams"
        },
        {
          name: "/match/:id",
          type: "match",
          validate: this.validateMatch,
          collection: "matches"
        },
        {
          name: "/matches",
          type: "match",
          sort: this.sortMatch,
          collection: "matches"
        }
      ],
      types: [
        {
          name: "match",
          properties: [
            {
              name: "id",
              type: "number",
              isKey: true,
              autoIncrement: true
            },
            {
              name: "gameDay",
              type: "date",
              required: true
            },
            {
              name: "host",
              type: "participant",
              required: true
            },
            {
              name: "guest",
              type: "participant",
              required: true
            }
          ]
        },
        {
          name: "team",
          properties: [
            {
              name: "id",
              type: "number",
              isKey: true,
              autoIncrement: true
            },
            { name: "name", type: "string", required: true }
          ]
        },
        {
          name: "participant",
          properties: [
            {
              name: "id",
              type: "number",
              required: true
            },
            {
              name: "name",
              type: "string",
              required: true
            },
            {
              name: "goals",
              type: "number",
              min: 0,
              required: true
            }
          ]
        }
      ]
    };
  }

  createEntity(path, data) {
    return new Promise((resolve, reject) => {
      try {
        let metadata = this.getMetadata(path),
          entitySet = this.data[metadata.collection];

        if (!path) {
          throw new Error("Pfad nicht angegeben");
        }

        this.determineEntity(metadata, entitySet, "create", data);
        this.validateEntity(metadata, entitySet, "create", data);

        entitySet.push(Object.assign({}, data));
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  }

  readEntity(path) {
    return new Promise((resolve, reject) => {
      try {
        let metadata = this.getMetadata(path),
          entitySet = this.data[metadata.collection];

        if (!path) {
          throw new Error("Pfad nicht angegeben");
        }

        let result = entitySet.find(entity =>
          this.entityEquals(path, metadata, entity)
        );

        if (result) {
          resolve(Object.assign({}, result));
        } else {
          throw new NotFoundError(`Entität nicht gefunden`);
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  readEntities(path) {
    return new Promise((resolve, reject) => {
      try {
        let metadataPath = this.getMetaPath(path),
          collection = this.getCollection(path, metadataPath);

        if (!path) {
          throw new Error("Pfad nicht angegeben");
        }

        let result = collection.filter(entity =>
          this.entityEquals(path, metadataPath, entity)
        );

        if (result && !result.length) {
          resolve(result);
        }

        if (metadataPath.sort) {
          result = result.sort(metadataPath.sort);
        }

        resolve(result.map(entity => Object.assign({}, entity)));
      } catch (e) {
        reject(e);
      }
    });
  }

  updateEntity(path, data) {
    return new Promise((resolve, reject) => {
      try {
        let metadata = this.getMetadata(path),
          entitySet = this.data[metadata.collection];

        if (!path) {
          throw new Error("Pfad nicht angegeben");
        }

        let result = entitySet.find(entity =>
          this.entityEquals(path, metadata, entity)
        );

        if (result) {
          Object.assign(result, data);

          this.determineEntity(metadata, entitySet, "update", result);
          this.validateEntity(metadata, entitySet, "update", result);

          resolve(Object.assign({}, result));
        } else {
          throw new NotFoundError();
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  deleteEntity(path) {
    return new Promise((resolve, reject) => {
      try {
        let metadata = this.getMetadata(path),
          entitySet = this.data[metadata.collection];

        if (!path) {
          throw new Error("Pfad nicht angegeben");
        }

        let result = entitySet.find(entity =>
          this.entityEquals(path, metadata, entity)
        );

        if (result) {
          let index = entitySet.indexOf(result);

          entitySet.splice(index, 1);
          resolve();
        } else {
          throw new NotFoundError();
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  getMetaPath(path) {
    return this.metadata.paths.find(metaPath => {
      // /team/:id
      let metaRegex = metaPath.name.replace(/:\w+/g, "([^/]+)"),
        matches = path.match(metaRegex);
      // /team/([^/]+)
      // [ "/team/:id", ":id" ]

      //Filter auf untypisierten Regex
      if (!matches || !matches.length) {
        return false;
      }

      // typisierten Regex erstellen
      metaRegex = metaPath.name;
      matches.forEach((match, index) => {
        if (!index) {
          return 1;
        }

        let type = this.metadata.types.find(
          type => type.name === metaPath.type
        );

        let property = type.properties.find(
            property => property.name === match.subString(1)
          ),
          paramRegex;
        switch (property.type) {
          case "number":
            paramRegex = "([0-9]+)";
            break;

          case "string":
            paramRegex = "([^/]+)";
        }
        metaRegex = metaRegex.replace(":" + property.name, paramRegex);
      });

      // gegen typisiertes Regex testen
      matches = path.match(metaRegex);

      //Filter auf typisierten Regex
      if (!matches || !matches.length) {
        return false;
      }

      alert((matches[0] === path) + "-" + metaPath.name);
      return matches[0] === path;
    });
  }

  getCollection(path, metadataPath) {
    if (!metadataPath) {
      throw new NotFoundError(`Ressource "${path}" nicht gefunden`);
    }

    return this.data[metadataPath.collection];
  }

  entityEquals(path, metadataPath, entity) {
    //Pfad aus der Entität erstellen udn mit dem übergebenen Pfad abgleichen
    let type = this.metadata.types.find(
        type => type.name === metadataPath.type
      ),
      entityPath = metadataPath.name;

    // Wenn keine Parameter definiert ist, dann ist alles ein Treffer
    if (metadataPath.name.search(":") === -1) {
      return true;
    }

    type.properties.forEach(property =>
      entityPath.replace(":" + property.name, entity[property.name])
    );

    return path === entityPath;
  }

  determineEntity(metadata, entitySet, operation, data) {
    if (operation === "create") {
      metadata.properties.forEach(property => {
        if (property.autoIncrement) {
          let maxValue = -1;

          entitySet.forEach(entity => {
            maxValue =
              entity[property.name] > maxValue
                ? entity[property.name]
                : maxValue;
          });

          data[property.name] = ++maxValue;
        }
      });
    }

    if (metadata.determine) {
      metadata.determine(metadata, entitySet, operation, data);
    }
  }

  validateEntity(metadata, entitySet, operation, data) {
    let error = new MultipleError();

    metadata.properties.forEach(property => {
      if (property.required && !data[property.name]) {
        error.errors.push(new FieldError(property.name));
      }
    });

    switch (error.errors.length) {
      case 0:
        break;
      case 1:
        throw error.errors[0];
      default:
        throw error;
    }

    if (metadata.validate) {
      metadata.validate(metadata, entitySet, operation, data);
    }
  }

  sortTeams(team1, team2) {
    if (team1.name > team2.name) {
      return 1;
    }
    if (team1.name < team2.name) {
      return -1;
    }

    return 0;
  }

  validateMatch(metadata, entitySet, operation, data) {
    if (data.host.id === data.guest.id) {
      throw new FieldError(
        "guest.id",
        "Wählen Sie zwei unterschiedliche Teams aus"
      );
    }
  }

  sortMatch(a, b) {
    if (a.gameDay > b.gameDay) {
      return 1;
    }
    if (a.gameDay < b.gameDay) {
      return -1;
    }
    if (a.host.name > b.host.name) {
      return 1;
    }
    if (a.guest.name < b.guest.name) {
      return -1;
    }

    return 0;
  }

  readAll() {
    return new Promise((resolve, reject) => {
      resolve(this.data);
    });
  }
}

const service = new Service();

export default service;
