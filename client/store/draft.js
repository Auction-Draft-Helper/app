import data from "../../data/players.json";
import { ModelInstance, createPlayersObj } from "../../model";
import {
  getMaxBid,
  removePlayerFromModel,
  returnBestTeam,
  addToPoints,
  adjustModelForDrafted
} from "./draftHelpers";

const modelRedux = new ModelInstance(
  createPlayersObj(data),
  data
).createPlayerConstraints();

const initialState = {
  model: modelRedux.model,
  playersArr: data.sort((playerA, playerB) => {
    return playerB.avgPrice - playerA.avgPrice;
  }),
  searchTerm: "",
  nominatedPlayer: {},
  removedPlayers: [],
  draftedPlayers: [],
  targets: returnBestTeam(modelRedux.model),
  myTeamsPoints: 0,
  opponentTeamsPoints: 0,
  playerMap: data.reduce((obj, player) => {
    obj[player.id] = player;
    return obj;
  }, {})
};

const SEARCH_TERM_CHANGE = "SEARCH_TERM_CHANGE",
      NOMINATE_PLAYER = "NOMINATE_PLAYER",
      REMOVE_PLAYER = "REMOVE_PLAYER",
      DRAFT_PLAYER = "DRAFT_PLAYER",
      DESELECT_PLAYER = "DESELECT_PLAYER";

export const searchTermChange = searchTerm => ({
  type: SEARCH_TERM_CHANGE,
  searchTerm
});

export const nominatePlayer = playerId => ({
  type: NOMINATE_PLAYER,
  playerId
});

export const removePlayer = ownPlayer => ({
  type: REMOVE_PLAYER,
  ownPlayer
});

export const draftPlayer = draftAmount => ({
  type: DRAFT_PLAYER,
  draftAmount
});

export const deselectPlayer = () => ({
  type: DESELECT_PLAYER
});

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_TERM_CHANGE:
      return Object.assign({}, state, { searchTerm: action.searchTerm });
    case NOMINATE_PLAYER:
      return Object.assign({}, state, {
          nominatedPlayer: getMaxBid(
            state.model,
            state.targets,
            state.playerMap[action.playerId]
          ),
          searchTerm: ""
        });
    case REMOVE_PLAYER:
      return Object.assign({}, state, {
        opponentTeamsPoints: addToPoints(
          state.opponentTeamsPoints,
          state.nominatedPlayer.fantasyPoints,
          action.ownPlayer),
        playersArr: state.playersArr.filter((player) => {
          return player.id !== state.nominatedPlayer.id
        }),
        removedPlayers: [state.nominatedPlayer, ...state.removedPlayers],
        model: removePlayerFromModel(state.model, state.nominatedPlayer, action.ownPlayer),
        targets: returnBestTeam(state.model),
        nominatedPlayer: {}
      });
    case DRAFT_PLAYER:
      return Object.assign({}, state, {
        myTeamsPoints: addToPoints(
          state.myTeamsPoints,
          state.nominatedPlayer.fantasyPoints),
        draftedPlayers: [...state.draftedPlayers, state.nominatedPlayer],
        model: adjustModelForDrafted(
          state.model,
          state.nominatedPlayer,
          action.draftAmount)
      });
    case DESELECT_PLAYER:
      return Object.assign({}, state, { nominatedPlayer: {} });
    default:
      return state;
  }
}
