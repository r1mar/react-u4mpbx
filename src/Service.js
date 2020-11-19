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
      entities: [
        {
          name: "team",
          collection: "teams",
          paths: ["/team/:id", "/teams"],
          properties: [
            {
              name: "id",
              type: "number",
              isKey: true,
              autoIncrement: true
            },
            { name: "name", type: "string", required: true }
          ]
        }
      ]
    };

    this.teams = [
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
    ];

    this.matches = [
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
    ];
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

  readEntitity(path) {
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
        let metadata = this.getMetadata(path),
          entitySet = this.data[metadata.collection];

        if (!path) {
          throw new Error("Pfad nicht angegeben");
        }

        let result = entitySet.filter(entity =>
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

  entityEquals(path, metadata, entity) {
    let pathRegex,
      properties = [],
      matches;

    metadata.paths.find(metadataPath => {
      //nach dem Pfad aus den Metadaten suchen, der zum Abfrage-Path passt
      let paramNames = metadataPath.match(/:\w+/g);

      properties = [];
      matches = [];
      pathRegex = "/" + metadataPath.replace("/", "/") + "/";

      if (!paramNames) {
        return metadataPath === path;
      } else {
        paramNames.forEach(paramName => {
          let property = metadata.properties.find(
              property => ":" + property.name === paramName
            ),
            propertyRegex;

          if (property) {
            properties.push(property);

            if (property.type === "number") {
              propertyRegex = "([0-9]+)";
            } else {
              propertyRegex = "(.[^/]+)";
            }

            pathRegex = pathRegex.replace(paramName, propertyRegex);
          }
        });

        matches = path.match(pathRegex);

        return matches && matches.length && path === matches[0];
      }
    });

    //alert(matches.length); 0

    if (matches.length === 1) {
      //lesen aller Entitäten
      return true;
    }

    // fehlgeschlagene Vergleiche sammeln
    let results = properties.filter(
      (property, index) => entity[property.name] != matches[index + 1]
    );

    return !results || !results.length;
  }

  getMetadata(path) {
    let metadata = this.metadata.entities.filter(entity =>
      entity.paths.filter(entityPath => {
        let entityStrings = entityPath.match(/\w+/);

        return (
          entityStrings && entityStrings.length && entityStrings[0] === path
        );
      })
    );

    if (!metadata || !metadata.length) {
      throw new NotFoundError(
        `Zum Pfad "${path}" konnte keine Entität ermittelt`
      );
    }

    if (metadata.length > 1) {
      throw new Error(
        `Pfad ${path} konnte nicht eindeutig einer Entität zugeordnet werden`
      );
    }

    return metadata[0];
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

  readTeams() {
    return new Promise((resolve, reject) => {
      resolve(
        this.teams.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }

          return 0;
        })
      );
    });
  }

  updateTeam(team) {
    return new Promise((resolve, reject) => {
      let aTeam = this.teams.find(item => item.id == team.id);

      if (aTeam) {
        Object.assign(aTeam, team);
        resolve(team);
      } else {
        reject(new NotFoundError());
      }
    });
  }

  deleteTeam(id) {
    return new Promise((resolve, reject) => {
      let team = this.teams.find(team => team.id === id);

      if (team) {
        let index = this.teams.indexOf(team);

        this.teams.splice(index, 1);
        resolve();
      } else {
        reject(new NotFoundError());
      }
    });
  }

  deleteTeams(ids) {
    let result = [];

    ids.forEach(id => {
      result.push(this.deleteTeam(id));
    });

    return Promise.all(result);
  }

  validateMatch(match) {
    if (!match.host.id) {
      throw new FieldError("host.id", "Das ist ein Pflichtfeld");
    }

    if (!match.guest.id) {
      throw new FieldError("guest.id", "Das ist ein Pflichtfeld");
    }

    if (match.host.id === match.guest.id) {
      throw new FieldError(
        "guest.id",
        "Wählen Sie zwei unterschiedliche Teams aus"
      );
    }
  }

  createMatch(match) {
    return new Promise((resolve, reject) => {
      try {
        let maxId = -1;

        this.validateMatch(match, "creating");

        this.matches.forEach(match => {
          maxId = match.id > maxId ? match.id : max.id;
        });

        match.id = ++maxId;

        this.matches.push(Object.assign({}, match));
        resolve(match);
      } catch (error) {
        reject(error);
      }
    });
  }

  readMatch(id) {
    return new Promise((resolve, reject) => {
      let result = Object.assign(
        {},
        this.matches.find(match => match.id == id)
      );

      if (result) {
        result.team1 = Object.assign(
          {},
          this.teams.find(team => team.id === result.team1Id)
        );
        result.team2 = Object.assign(
          {},
          this.teams.find(team => team.id === result.team2Id)
        );
        resolve(result);
      } else {
        reject(new NotFoundError());
      }
    });
  }

  readMatches() {
    return new Promise((resolve, reject) => {
      let resultArray = this.matches
        .map(match => {
          let result = Object.assign({}, match);

          return result;
        })
        .sort((a, b) => {
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
        });
      resolve(resultArray);
    });
  }

  updateMatch(match) {
    return new Promise((resolve, reject) => {
      let aMatch = this.matches.find(item => item.id === match.id);

      if (aMatch) {
        Object.assign(aMatch, match);

        this.validateMatch(match, "updating");

        resolve(match);
      } else {
        reject(new NotFoundError());
      }
    });
  }

  deleteMatch(id) {
    return new Promise((resolve, reject) => {
      let match = this.matches.find(match => match.id === id);

      if (match) {
        let index = this.matches.indexOf(match);

        this.matches.splice(index, 1);
        resolve();
      } else {
        reject(new NotFoundError());
      }
    });
  }

  deleteMatches(ids) {
    let result = [];

    ids.forEach(id => {
      result.push(this.deleteMatch(id));
    });

    return Promise.all(result);
  }

  readAll() {
    return new Promise((resolve, reject) => {
      resolve({
        teams: this.teams.map(team => Object.assign({}, team)),
        matches: this.matches.map(match => Object.assign({}, match))
      });
    });
  }
}

const service = new Service();

export default service;
