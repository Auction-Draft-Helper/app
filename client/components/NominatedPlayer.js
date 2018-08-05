import React, { Component } from "react";
import { connect } from "react-redux";
import {
  removePlayer,
  changeDraftAmount,
  changeDraftAmountError,
  draftPlayer,
  deselectPlayer
} from "../store/draft";

class NominatedPlayer extends Component {
  render() {
    const {
      nominatedPlayer,
      removePlayer,
      changeDraftAmount,
      changeDraftAmountError,
      draftAmount,
      draftAmountError,
      draftPlayer,
      deselectPlayer
    } = this.props;
    const { maxBid } = nominatedPlayer;

    const draftAmountCheck = () => {
      if (!draftAmount || String(draftAmount).length > 2) {
        changeDraftAmountError();
      } else {
        draftPlayer();
      }
    };

    return (
      <div className="bottom-border">
        <h4 className="top-margin">Nominated Player</h4>
        {nominatedPlayer.id ? (
          <div>
            <div className="ui list">
              <div className="item player-list-item">
                <div className="ui grid">
                  <div className="two column row">
                    <div className="left floated column">
                      <h2>
                        {nominatedPlayer.name}, {nominatedPlayer.position}
                      </h2>
                      <p>
                        Projected Fantasy Points:
                        {" " + Math.round(nominatedPlayer.fpts)}
                      </p>
                    </div>
                    <div className="right floated column align-right">
                      <h2>
                        Maximum Bid:
                        {maxBid.length > 2 ? " " + maxBid : " $" + maxBid}
                      </h2>
                      <p>
                        Avg. Auction Price:{" "}
                        {" $" + nominatedPlayer["avg. value"]}
                      </p>
                    </div>
                  </div>

                  <div className="right aligned sixteen wide column">
                    <div className="ui icon input right-margin">
                      <input
                        type="text"
                        name="bid-amount"
                        placeholder="Drafted for..."
                        onChange={event =>
                          changeDraftAmount(event.target.value)
                        }
                      />
                      <i className="dollar sign icon" />
                    </div>
                    <button
                      type="submit"
                      value={draftAmount}
                      className="ui animated green button"
                      onClick={event => draftAmountCheck(event.target.value)}
                    >
                      <div className="visible content">Draft</div>
                      <div className="hidden content">
                        <i className="gavel icon" />
                      </div>
                    </button>
                    <button
                      type="submit"
                      className="ui animated red button"
                      onClick={() => removePlayer()}
                    >
                      <div className="visible content white custom-underline">
                        Remove
                      </div>
                      <div className="hidden content">
                        <i className="times circle icon white" />
                      </div>
                    </button>
                    <button
                      className="ui button"
                      type="submit"
                      onClick={() => deselectPlayer()}
                    >
                      Deselect
                    </button>
                  </div>

                  {draftAmountError ? (
                    <div className="one column row">
                      <div className="right floated column align-right">
                        <p className="red">Please enter a valid bid amount.</p>
                      </div>
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="ui list no-top-margin">
            <div className="item player-list-item">
              <p>No player nominated.</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapState = state => ({
  nominatedPlayer: state.draft.nominatedPlayer,
  draftAmount: state.draft.draftAmount,
  draftAmountError: state.draft.draftAmountError
});

const mapDispatch = dispatch => ({
  removePlayer: () => dispatch(removePlayer()),
  changeDraftAmount: amount => dispatch(changeDraftAmount(amount)),
  changeDraftAmountError: () => dispatch(changeDraftAmountError()),
  draftPlayer: () => dispatch(draftPlayer()),
  deselectPlayer: () => dispatch(deselectPlayer())
});

export default connect(
  mapState,
  mapDispatch
)(NominatedPlayer);
