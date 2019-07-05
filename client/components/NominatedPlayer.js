import React, { Component } from "react";
import { connect } from "react-redux";
import {
  removePlayer,
  changeDraftAmount,
  changeDraftAmountError,
  draftPlayer,
  deselectPlayer
} from "../store/draft";
import NominatedPlayerButton from './NominatedPlayerButton';

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
                        Maximum Bid: ${nominatedPlayer.maxBid}
                      </h2>
                      <p>
                        Avg. Auction Price: ${nominatedPlayer["avg. value"]}
                      </p>
                    </div>
                  </div>

                  <div className="right aligned sixteen wide column">
                    <div className="button-container">
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
                      <NominatedPlayerButton
                        value={draftAmount}
                        buttonClasses={"animated green"}
                        clickFunction={draftAmountCheck}
                        text={"Draft"}
                        iconName={"gavel"}
                      />
                      <NominatedPlayerButton
                        value={null}
                        buttonClasses={"animated red"}
                        clickFunction={removePlayer}
                        iconName={"times circle"}
                        text={"Remove"}
                      />
                      <NominatedPlayerButton
                        value={null}
                        buttonClasses={"animated yellow"}
                        clickFunction={deselectPlayer}
                        iconName={"arrow alternate circle down"}
                        text={"Deselect"}
                      />
                    </div>
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
