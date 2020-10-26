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
      }
    ];
    
    this.matches = [
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
      }
    ];
  }

  createTeam(team) {
    return new Promise(resolve => {
      let maxId = -1;

      this.teams.forEach(team => {
        maxId = team.id > maxId ? team.id : max.id;
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
          if (a > b) {
            return 1;
          }
          if (a < b) {
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
      this.matches.push(Object.assign({}, match));
      resolve(match);
    });
  }

  readMatch(id) {
    return new Promise((resolve, reject) => {
      let result = this.matches.find(match => match.id == id);

      if (result) {
        resolve(Object.assign({}, result));
      } else {
        reject(new Error("Nicht gefunden"));
      }
    });
  }

  readMatches() {
    return new Promise((resolve, reject) => {
      resolve(
        this.matches.sort((a, b) => {
          if (a > b) {
            return 1;
          }
          if (a < b) {
            return -1;
          }

          return 0;
        })
      );
    });
  }

  updateMatch(match) {
    return new Promise((resolve, reject) => {
      let aMatch = this.matches.find(item => item.id === match.id);

      if (aMatch) {
        Object.assign(aMatch, match);
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
}

const service = new Service();

export default service;
