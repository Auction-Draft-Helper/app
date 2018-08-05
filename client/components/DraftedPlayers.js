import React, { Component } from "react";
import { connect } from "react-redux";

class DraftedPlayers extends Component {
  render() {
    const { removedPlayers } = this.props;
    return (
      <div>
        {removedPlayers.length ? (
          <div className="ui list">
            {removedPlayers.map(player => {
              return (
                <div className="item" key={player.id}>
                  {player.draftPosition}. {player.name}, {player.position}
                </div>
              );
            })}
          </div>
        ) : (
          <p>No players have been drafted.</p>
        )}
      </div>
    );
  }
}

const mapState = state => ({
  removedPlayers: state.draft.removedPlayers
});

export default connect(mapState)(DraftedPlayers);
