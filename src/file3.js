class Service {
  constructor() {
    this.teams = [{
        id: 1,
        name: "Mönchen Gladbach"
      }, {
        id: 2,
        name: "1. FC Köln"
      }, {
        id: 3,
        name: "Bayer Leverkusen"
      }
    ];
  }

  readTeams() {
    return Promise((resolve, reject) => {
      resolve(this.teams.sort((a, b) => {
        if(a > b) return 1;
        if(a < b) return -1;

        return 0;
      }))
    });
  }

  createTeam(team) {
    return new Promise(resolve => {
      let maxId = -1;

      this.teams.forEach(team => {
        maxId = team.id > maxId ? team.id : max.id;
      })

      team.id = ++maxId;
      this.teams.push(team);
      resolve(team);
    });
  }

  readTeam(id) {
    return new Promise((reject, resolve) => {
      let result = this.teams.find(team => team.id === id);

      if(result) resolve(result);
      else reject(new Error("Verein mit der ID " + id + " nicht gefunden"));
    });
  }

  updateTeam(team) {
    return new Promise((resolve, reject) => {
      let aTeam = this.teams.find(item => item.id === team.id);

      if(aTeam) {
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

      if(team) {
        let index = this.teams.indexOf(team);
        
        this.teams.splice(index);
        resolve();

      } else {
        reject(new Error("Nicht gefunden"));

      }
    });
  }
}

export default service = new Service();