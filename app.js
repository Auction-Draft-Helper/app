const solver = require("javascript-lp-solver");
const model = require("./model");

class Draft {
  constructor(modelInstance) {
    this.model = modelInstance;
    this.draftedPlayers = [];
    this.myTeam = [];
  }

  getBestTeamObj() {
    return solver.Solve(model);
  }

  getBestTeam() {
    let bestTeam = [];
    let teamObj = this.getBestTeamObj();

    for (let key in teamObj) {
      if (this.model.variables[key] && teamObj[key] >= 0.5) {
        bestTeam.push(key + " - $" + this.model.variables[key]["avg. value"]);
      }
    }

    return bestTeam;
  }

  getMaxBid(player) {
    let origVal = this.model.variables[player]["avg. value"],
      budget = this.model.constraints["avg. value"].max,
      maxBid = 0;

    for (let i = 1; i <= budget; i++) {
      this.model.variables[player]["avg. value"] = i;
      if (this.getBestTeamObj()[player] === 1) {
        maxBid = i;
      } else {
        this.model.variables[player]["avg. value"] = origVal;
        return maxBid;
      }
    }
  }

  removePlayer(player) {
    let playerObj = this.model.variables[player];
    this.draftedPlayers.push(playerObj);
    delete this.model.constraints[player];
    delete this.model.variables[player];
  }

  draftPlayer(player, cost) {
    console.log(this.model.variables[player]);

    let budget = this.model.constraints["avg. value"].max, //current budget
      playerPosition = this.model.variables[player].position, //the player's position
      playerObj = this.model.variables[player], //the player object
      maxAtPosition = this.model.constraints[playerPosition].max; //the constraint for position;

    if (
      playerPosition === "RB" ||
      playerPosition === "WR" ||
      playerPosition === "TE"
    ) {
      let minAtPosition = this.model.constraints[playerPosition].min;
      this.model.constraints[playerPosition].min = minAtPosition - 1;
      let flex = this.model.constraints.FLEX.max;
      this.model.constraints.FLEX.max = flex - 1;
    }

    this.model.constraints["avg. value"].max = budget - cost;
    this.model.constraints[playerPosition].max = maxAtPosition - 1;
    this.myTeam.push(playerObj);
    delete this.model.constraints[player];
    delete this.model.variables[player];
  }
}

// module.exports = new Draft(model);
let draft = new Draft(model);
console.log(draft.getBestTeam());
console.log("max bid OBJ", draft.getMaxBid("Odell Beckham Jr."));
draft.draftPlayer("Le'Veon Bell", 64);
console.log(draft.getBestTeam());
console.log("original best team", draft.getBestTeam());
// // draft.removePlayer('LeVeon Bell');

// // // draft.draftPlayer('Odell Beckham Jr.', 34);
// // draft.removePlayer('Greg Olsen');
// // console.log('new best team', draft.getBestTeam());
// // console.log('max bid AR', draft.getMaxBid('Aaron Rodgers'));
