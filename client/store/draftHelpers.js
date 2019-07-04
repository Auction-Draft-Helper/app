import solver from "javascript-lp-solver";

export const findPlayerById = (state, playerId) => {
  for (let key in state.model.variables) {
    if (state.model.variables[key].id === Number(playerId)) {
      return state.model.variables[key];
    }
  }
};

export const getBestTeam = model => solver.Solve(model);

export const getMaxBid = (state, player) => {
  if (state.targets.length === 1) {
    player.maxBid = state.model.constraints["avg. value"].max;
    return player;
  }
  const avgVal = "avg. value";
  const originalVal = player[avgVal];
  const budget = state.model.constraints[avgVal].max;
  let maxBid = 0;

  if (getBestTeam(state.model)[player.name] === 1) {
    for (let i = player[avgVal]; i <= budget; i++) {
      state.model.variables[player.name][avgVal] = i;
      if (getBestTeam(state.model)[player.name] === 1) {
        maxBid = i;
      } else {
        state.model.variables[player.name][avgVal] = originalVal;
        player["maxBid"] = maxBid;
        break;
      }
    }
  } else {
    for (let i = player[avgVal]; i >= 1; i--) {
      state.model.variables[player.name][avgVal] = i;
      if (getBestTeam(state.model)[player.name] !== 1) {
        maxBid = i;
      } else {
        state.model.variables[player.name][avgVal] = originalVal;
        player["maxBid"] = maxBid;
        break;
      }
    }
  }
  if (!player.maxBid) player.maxBid = "N/A";
  return player;
};

export const addPlayerToRemoved = state => {
  let newArr = state.removedPlayers.slice();
  let player = findPlayerById(state, state.nominatedPlayer.id);
  player.draftPosition = newArr.length + 1;
  newArr.unshift(player);
  return newArr;
};

export const removePlayerFromModel = state => {
  let player = findPlayerById(state, state.nominatedPlayer.id);
  let newModel = Object.assign({}, state.model);
  delete newModel.constraints[player.name];
  delete newModel.variables[player.name];
  return newModel;
};

export const removePlayerFromPlayersList = state => {
  return state.playersArr.filter(playerInFilter => {
    return playerInFilter.name !== findPlayerById(state, state.nominatedPlayer.id).name
  });
};

export const addPlayerToDrafted = state => {
  let newArr = state.draftedPlayers.slice();
  let player = findPlayerById(state, state.nominatedPlayer.id);
  player.draftAmount = state.draftAmount;
  newArr.push(player);
  return newArr;
};

export const adjustModelForDrafted = state => {
  let newModel = Object.assign({}, state.model);
  const avgVal = "avg. value";
  const player = findPlayerById(state, state.nominatedPlayer.id);
  const budget = newModel.constraints[avgVal].max;
  const position = player.position;
  if (
    player.position === "RB" ||
    player.position === "WR" ||
    player.position === "TE"
  ) {
    newModel.constraints[position].min--;
    newModel.constraints.FLEX.max--;
  }
  newModel.constraints[avgVal].max = budget - state.draftAmount;
  newModel.constraints[position].max--;
  delete newModel.constraints[player.name];
  delete newModel.variables[player.name];
  return newModel;
};

export const returnBestTeam = model => {
  const obj = getBestTeam(model);
  const finalArr = [];
  const extras = ["result", "bounded", "feasible"];
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && !extras.includes(key) && obj[key] > 0.5) {
      finalArr.push(model.variables[key]);
    }
  }
  return finalArr;
};

export const addToMyPoints = state => {
  const player = findPlayerById(state, state.nominatedPlayer.id);
  return state.myTeamsPoints + player.fpts;
};

export const addToOpponentsPoints = state => {
  const player = findPlayerById(state, state.nominatedPlayer.id);
  return state.opponentsTeamsPoints + player.fpts;
};

export const sortByAvgValue = playersArr => {
  return playersArr.sort((playerA, playerB) => {
    return playerB["avg. value"] - playerA["avg. value"];
  });
};
