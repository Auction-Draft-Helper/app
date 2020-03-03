const createPlayersObj = playerArr => {
  let playerObj = {};

  playerArr.forEach(element => {
    let name = element.name;
    playerObj[name] = element;
    playerObj[name][name] = 1;
  });

  return playerObj;
};

class ModelInstance {
  constructor(obj, arr) {
    this.model = {
      optimize: "PAR",
      opType: "max",
      constraints: {
        QB:   { min: 2, max: 2 },
        RB:   { min: 5, max: 6 },
        WR:   { min: 4, max: 5 },
        TE:   { min: 1, max: 1 },
        K:    { min: 1, max: 1 },
        DST:  { min:1, max: 1 },
        FLEX: { min: 11, max: 11 },
        avgPrice: { max: 200 }
      },
      variables: obj
    };
    this.origArr = arr;
  }

  createPlayerConstraints() {
    this.origArr.forEach(element => {
      this.model.constraints[element.name] = { max: 1 };
    });
    return this;
  }
}

module.exports = { ModelInstance, createPlayersObj };
