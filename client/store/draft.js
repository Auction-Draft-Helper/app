import data from "../../data/players.json";
import { ModelInstance, createPlayersObj } from "../../model";
import solver from "javascript-lp-solver";

const modelRedux = new ModelInstance(
  createPlayersObj(data),
  data
).createPlayerConstraints();

const initialState = {
  model: modelRedux.model,
  playersArr: modelRedux.origArr.sort(
    (playerA, playerB) => playerB["avg. value"] - playerA["avg. value"]
  ),
  searchTerm: "",
  nominatedPlayer: {},
  removedPlayers: [],
  draftedPlayers: [],
  draftAmount: 0,
  draftAmountError: false
};

const SEARCH_TERM_CHANGE = "SEARCH_TERM_CHANGE";
const NOMINATE_PLAYER = "NOMINATE_PLAYER";
const REMOVE_PLAYER = "REMOVE_PLAYER";
const CHANGE_DRAFT_AMOUNT = "CHANGE_DRAFT_AMOUNT";
const CHANGE_DRAFT_AMOUNT_ERROR = "CHANGE_DRAFT_AMOUNT_ERROR";
const DRAFT_PLAYER = "DRAFT_PLAYER";
const DESELECT_PLAYER = "DESELECT_PLAYER";

export const searchTermChange = searchTerm => ({
  type: SEARCH_TERM_CHANGE,
  searchTerm
});

export const nominatePlayer = playerId => ({
  type: NOMINATE_PLAYER,
  playerId
});

export const removePlayer = playerId => ({
  type: REMOVE_PLAYER,
  playerId
});

export const changeDraftAmount = amount => ({
  type: CHANGE_DRAFT_AMOUNT,
  amount
});

export const draftPlayer = playerId => ({
  type: DRAFT_PLAYER,
  playerId
});

export const changeDraftAmountError = () => ({
  type: CHANGE_DRAFT_AMOUNT_ERROR
});

export const deselectPlayer = () => ({
  type: DESELECT_PLAYER
});

const findPlayerById = (state, playerId) => {
  for (let key in state.model.variables) {
    if (state.model.variables[key].id === Number(playerId)) {
      return state.model.variables[key];
    }
  }
};

const getBestTeam = model => solver.Solve(model);

const getMaxBid = (state, player) => {
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

const addPlayerToRemoved = (state, playerId) => {
  let newArr = state.removedPlayers.slice();
  let player = findPlayerById(state, playerId);
  player.draftPosition = newArr.length + 1;
  newArr.unshift(player);
  return newArr;
};

const removePlayerFromModel = (state, playerId) => {
  let player = findPlayerById(state, playerId);
  let newModel = Object.assign({}, state.model);
  delete newModel.constraints[player.name];
  delete newModel.variables[player.name];
  return newModel;
};

const removePlayerFromPlayersList = (state, playerId) => {
  let player = findPlayerById(state, playerId);
  return state.playersArr.filter(playerInFilter => {
    if (playerInFilter.name !== player.name) {
      return true;
    } else {
      return false;
    }
  });
};

const addPlayerToDrafted = (state, playerId) => {
  let newArr = state.draftedPlayers.slice();
  let player = findPlayerById(state, playerId);
  player.draftAmount = state.draftAmount;
  newArr.push(player);
  return newArr;
};

const adjustModelForDrafted = (state, playerId) => {
  let newModel = Object.assign({}, state.model);
  const avgVal = "avg. value";
  const player = findPlayerById(state, playerId);
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

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_TERM_CHANGE:
      return Object.assign({}, state, { searchTerm: action.searchTerm });
    case NOMINATE_PLAYER:
      return Object.assign({}, state, {
        nominatedPlayer: getMaxBid(
          state,
          findPlayerById(state, action.playerId)
        ),
        searchTerm: ""
      });
    case REMOVE_PLAYER:
      return Object.assign({}, state, {
        draftAmountError: false,
        draftAmount: 0,
        playersArr: removePlayerFromPlayersList(state, action.playerId),
        removedPlayers: addPlayerToRemoved(state, action.playerId),
        nominatedPlayer: {},
        model: removePlayerFromModel(state, action.playerId)
      });
    case CHANGE_DRAFT_AMOUNT:
      return Object.assign({}, state, { draftAmount: Number(action.amount) });
    case CHANGE_DRAFT_AMOUNT_ERROR:
      return Object.assign({}, state, { draftAmountError: true });
    case DRAFT_PLAYER:
      return Object.assign({}, state, {
        draftAmountError: false,
        draftedPlayers: addPlayerToDrafted(state, action.playerId),
        nominatedPlayer: {},
        playersArr: removePlayerFromPlayersList(state, action.playerId),
        removedPlayers: addPlayerToRemoved(state, action.playerId),
        model: adjustModelForDrafted(state, action.playerId),
        draftAmount: 0
      });
    case DESELECT_PLAYER:
      return Object.assign({}, state, { nominatedPlayer: {}, draftAmount: 0 });
    default:
      return state;
  }
}
