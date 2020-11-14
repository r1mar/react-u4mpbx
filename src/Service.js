import FieldError from "./FieldError";
import NotFoundError from "./NotFoundError";

class Service {
  constructor() {
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
        gameDay: "20/21 1"
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
        gameDay: "20/21 1"
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
        gameDay: "20/21 1"
      }
    ];
  }

  createTeam(team) {
    return new Promise(resolve => {
      let maxId = -1;

      this.teams.forEach(team => {
        maxId = team.id > maxId ? team.id : maxId;
      });

      team.id = ++maxId;
      this.teams.push(Object.assign({}, team));
      resolve(team);
    });
  }

  readTeam(id) {
    return new Promise((resolve, reject) => {
      let result = this.teams.find(team => team.id == id);

      if (result) {
        resolve(Object.assign({}, result));
      } else {
        reject(new NotFoundError());
      }
    });
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

  validateMatch() {
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

      validateMatch("creating");

      this.matches.forEach(match => {
        maxId = match.id > maxId ? match.id : max.id;
      });

      match.id = ++maxId;

      this.matches.push(Object.assign({}, match));
      resolve(match);
      } catch(error) {
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

        validateMatch("updating");

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
