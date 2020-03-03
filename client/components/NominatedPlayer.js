import React, { Component } from "react";
import { connect } from "react-redux";
import {
  removePlayer,
  draftPlayer,
  deselectPlayer
} from "../store/draft";
import NominatedPlayerButton from './NominatedPlayerButton';

class NominatedPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      draftAmountError: false,
      draftAmount: 0
    };
    this.changeDraftAmount = this.changeDraftAmount.bind(this);
    this.checkDraftAmountError = this.checkDraftAmountError.bind(this)
  }

  changeDraftAmount(amount) {
    this.setState({
      draftAmount: amount
    })
  }

  checkDraftAmountError() {
    const setDraftAmountError = bool => {
      this.setState({
        draftAmountError: bool
      });
    }
    
    const { draftPlayer, removePlayer } = this.props;
    let {draftAmount} = this.state;
    draftAmount = Number(draftAmount)
    if(typeof(draftAmount) === 'number' && draftAmount > 0 && String(draftAmount).length <= 2) {
      setDraftAmountError(false);
      draftPlayer(draftAmount);
      removePlayer(true);
    } else {
      setDraftAmountError(true);
    }
  }

  render() {
    const {
      changeDraftAmount,
      checkDraftAmountError,
      state,
      props
    } = this;
    
    const {
      nominatedPlayer,
      removePlayer,
      deselectPlayer
    } = props;

    const {
      draftAmountError,
      draftAmount
    } = state

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
                        {" " + Math.round(nominatedPlayer.fantasyPoints)}
                      </p>
                    </div>
                    <div className="right floated column align-right">
                      <h2>
                        Maximum Bid: ${nominatedPlayer.maxBid}
                      </h2>
                      <p>
                        Avg. Auction Price: ${nominatedPlayer.avgPrice}
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
                          onChange={event => changeDraftAmount(event.target.value)}
                        />
                        <i className="dollar sign icon" />
                      </div>
                      <NominatedPlayerButton
                        value={draftAmount}
                        buttonColor={"green"}
                        clickFunction={checkDraftAmountError}
                        text={"Draft"}
                        iconName={"gavel"}
                      />
                      <NominatedPlayerButton
                        value={null}
                        buttonColor={"red"}
                        clickFunction={removePlayer}
                        iconName={"times circle"}
                        text={"Remove"}
                      />
                      <NominatedPlayerButton
                        value={null}
                        buttonColor={"yellow"}
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
  nominatedPlayer: state.draft.nominatedPlayer
});

const mapDispatch = dispatch => ({
  removePlayer: ownPlayer => dispatch(removePlayer(ownPlayer)),
  draftPlayer: draftAmount => dispatch(draftPlayer(draftAmount)),
  deselectPlayer: () => dispatch(deselectPlayer())
});

export default connect(
  mapState,
  mapDispatch
)(NominatedPlayer);
