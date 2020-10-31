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
        team1Id: 4,
        team2Id: 5,
        gameDay: "20/21 1",
        team1Goals: 8,
        team2Goals: 0
      },
      {
        id: 2,
        team1Id: 6,
        team2Id: 7,
        gameDay: "20/21 1",
        team1Goals: 2,
        team2Goals: 3
      },
      {
        id: 3,
        team1Id: 8,
        team2Id: 9,
        gameDay: "20/21 1",
        team1Goals: 1,
        team2Goals: 1
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
        reject(new Error("Nicht gefunden"));
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
      let aTeam = this.teams.find(item => item.id === team.id);

      if (aTeam) {
        Object.assign(aTeam, team);
        resolve(team);
      } else {
        reject(new Error("Nicht gefunden"));
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
        reject(new Error("Nicht gefunden"));
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

  createMatch(match) {
    return new Promise(resolve => {
      let maxId = -1;

      this.matches.forEach(match => {
        maxId = match.id > maxId ? match.id : max.id;
      });

      match.id = ++maxId;
      delete match.team1;
      delete match.team2;
      this.matches.push(Object.assign({}, match));
      resolve(match);
    });
  }

  readMatch(id) {
    return new Promise((resolve, reject) => {
      let result = Object.assign({}, this.matches
        .find(match => match.id == id));

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
        reject(new Error("Nicht gefunden"));
      }
    });
  }

  readMatches() {
    return new Promise((resolve, reject) => {
      let resultArray = this.matches
        .map(match => {
          let result = Object.assign({}, match);

          result.team1 = Object.assign(
            {},
            this.teams.find(team => team.id === result.team1Id)
          );
          result.team2 = Object.assign(
            {},
            this.teams.find(team => team.id === result.team2Id)
          );

          return result;
        })
        .sort((a, b) => {
          if (a.gameDay > b.gameDay) {
            return 1;
          }
          if (a.gameDay < b.gameDay) {
            return -1;
          }
          if (a.team1.name > b.team1.name) {
            return 1;
          }
          if (a.team1.name < b.team1.name) {
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
        delete aMatch.team1;
        delete aMatch.team2;

        resolve(match);
      } else {
        reject(new Error("Nicht gefunden"));
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
        reject(new Error("Nicht gefunden"));
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
