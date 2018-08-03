import React, { Component } from "react";
import { connect } from "react-redux";
import { nominatePlayer } from "../store/draft";

class PlayerRow extends Component {
  render() {
    const { player, nominatePlayer } = this.props;
    return (
      <div className="item player-list-item">
        <div className="two column row">
          <div className="left floated column">
            <h2>
              {player.name}, {player.position}
            </h2>
          </div>
          <div className="right floated column">
            <button
              className="ui button"
              value={player.id}
              onClick={event => {
                nominatePlayer(event.target.value);
              }}
            >
              Nominate
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatch = dispatch => ({
  nominatePlayer: playerName => dispatch(nominatePlayer(playerName))
});

export default connect(
  null,
  mapDispatch
)(PlayerRow);
