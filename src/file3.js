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

  readTeam(id) {
    return new Promise((reject, resolve) => {
      let result = this.teams.find(team => team.id === id);

      if(result) resolve(result);
      else reject(new Error("Verein mit der ID " + id + " nicht gefunden"));
    });
  }
}

export default service = new Service();