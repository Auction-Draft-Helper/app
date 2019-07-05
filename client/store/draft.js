import data from "../../data/players.json";
import { ModelInstance, createPlayersObj } from "../../model";
import {
  findPlayerById,
  getMaxBid,
  addPlayerToRemoved,
  removePlayerFromModel,
  removePlayerFromPlayersList,
  addPlayerToDrafted,
  adjustModelForDrafted,
  returnBestTeam,
  addToMyPoints,
  addToOpponentsPoints,
  sortByAvgValue,
  checkDraftedForUndo,
  playersArrForUndo,
  removedPlayersForUndo
} from "./draftHelpers";

const modelRedux = new ModelInstance(
  createPlayersObj(data),
  data
).createPlayerConstraints();

const initialState = {
  model: modelRedux.model,
  playersArr: sortByAvgValue(modelRedux.origArr),
  searchTerm: "",
  nominatedPlayer: {},
  removedPlayers: [],
  draftedPlayers: [],
  draftAmount: 0,
  draftAmountError: false,
  targets: returnBestTeam(modelRedux.model),
  myTeamsPoints: 0,
  opponentsTeamsPoints: 0
};

//Actions

const SEARCH_TERM_CHANGE = "SEARCH_TERM_CHANGE",
      NOMINATE_PLAYER = "NOMINATE_PLAYER",
      REMOVE_PLAYER = "REMOVE_PLAYER",
      CHANGE_DRAFT_AMOUNT = "CHANGE_DRAFT_AMOUNT",
      CHANGE_DRAFT_AMOUNT_ERROR = "CHANGE_DRAFT_AMOUNT_ERROR",
      DRAFT_PLAYER = "DRAFT_PLAYER",
      DESELECT_PLAYER = "DESELECT_PLAYER",
      UNDO_PREVIOUS_SELECTION = "UNDO_PREVIOUS_SELECTION";

export const searchTermChange = searchTerm => ({
  type: SEARCH_TERM_CHANGE,
  searchTerm
});

export const nominatePlayer = playerId => ({
  type: NOMINATE_PLAYER,
  playerId
});

export const removePlayer = () => ({
  type: REMOVE_PLAYER
});

export const changeDraftAmount = amount => ({
  type: CHANGE_DRAFT_AMOUNT,
  amount
});

export const draftPlayer = () => ({
  type: DRAFT_PLAYER
});

export const changeDraftAmountError = () => ({
  type: CHANGE_DRAFT_AMOUNT_ERROR
});

export const deselectPlayer = () => ({
  type: DESELECT_PLAYER
});

export const undoPreviousSelection = () => ({ type: UNDO_PREVIOUS_SELECTION });

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
        opponentsTeamsPoints: addToOpponentsPoints(state),
        playersArr: removePlayerFromPlayersList(state),
        removedPlayers: addPlayerToRemoved(state),
        nominatedPlayer: {},
        model: removePlayerFromModel(state),
        targets: returnBestTeam(state.model)
      });
    case CHANGE_DRAFT_AMOUNT:
      return Object.assign({}, state, { draftAmount: Number(action.amount) });
    case CHANGE_DRAFT_AMOUNT_ERROR:
      return Object.assign({}, state, { draftAmountError: true });
    case DRAFT_PLAYER:
      return Object.assign({}, state, {
        draftAmountError: false,
        myTeamsPoints: addToMyPoints(state),
        draftedPlayers: addPlayerToDrafted(state),
        playersArr: removePlayerFromPlayersList(state),
        removedPlayers: addPlayerToRemoved(state),
        model: adjustModelForDrafted(state),
        targets: returnBestTeam(state.model),
        nominatedPlayer: {},
        draftAmount: 0
      });
    case DESELECT_PLAYER:
      return Object.assign({}, state, { nominatedPlayer: {}, draftAmount: 0 });
    case UNDO_PREVIOUS_SELECTION:
      return Object.assign({}, state, {
        draftedPlayers: checkDraftedForUndo(state),
        playersArr: playersArrForUndo(state),
        removedPlayers: removedPlayersForUndo
      });
    default:
      return state;
  }
}
