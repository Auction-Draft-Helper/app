import solver from "javascript-lp-solver";

export const getBestTeam = model => solver.Solve(model);

export const getMaxBid = (model, targets, player) => {
  const budget = model.constraints.avgPrice.max,
        assignMaxBid = (bid) => player.maxBid = bid;

  if (targets.length === 1) {
    assignMaxBid(budget);
  } else {
    const originalAvgPrice = player.avgPrice,
          assignBackToOriginalPrice = () => {
            model.variables[player.name].avgPrice = originalAvgPrice;
          },
          playerModelFit = () => getBestTeam(model)[player.name] === 1,
          iterationFlag = playerModelFit() ? true : false,
          loopLimit = iterationFlag ? budget : 0,
          loopCheck = iterationFlag ? (i) => i <= loopLimit : (i) => i > loopLimit,
          loopIterator = iterationFlag ? (i) => i + 1 : (i) => i - 1,
          playerCheck = iterationFlag ? () => playerModelFit() : () => !playerModelFit();

    for (let i = player.avgPrice; loopCheck(i); i = loopIterator(i)) {
      model.variables[player.name].avgPrice = i;
      if (!playerCheck()) {
        assignMaxBid(i);
        break;
      }
    }

    assignBackToOriginalPrice();
    if (!player.maxBid) player.maxBid = "N/A";
  }
  return player;
};

export const removePlayerFromModel = (model, player, ownPlayer) => {
  if (ownPlayer) return model;
  const newModel = Object.assign({}, model);
  newModel.constraints[player.name].max = 0;
  return newModel;
};

export const adjustModelForDrafted = (model, player, draftAmount) => {
  const newModel = Object.assign({}, model),
        position = player.position,
        constraints = newModel.constraints;
  if (["RB", "WR", "TE"].includes(position)) {
    constraints.FLEX.max--;
    constraints.FLEX.min--;
  }
  player.draftAmount = draftAmount;
  constraints.avgPrice.max = constraints.avgPrice.max - draftAmount;
  constraints[position].min--;
  constraints[position].max--;
  constraints[player.name].max =  0;
  return newModel;
};

export const returnBestTeam = model => {
  const obj = getBestTeam(model),
        finalArr = [],
        extras = ["result", "bounded", "feasible"];
  console.log(obj)
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && !extras.includes(key) && obj[key] > 0.5) {
      finalArr.push(model.variables[key]);
    }
  }
  return finalArr;
};

export const addToPoints = (totalPoints, playerPoints, ownPlayer) => {
  if (ownPlayer) return totalPoints;
  return totalPoints + playerPoints;
}
