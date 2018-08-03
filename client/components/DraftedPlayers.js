import React, { Component } from "react";
import { connect } from "react-redux";

class DraftedPlayers extends Component {
  render() {
    const { removedPlayers } = this.props;
    return (
      <div>
        <h4 className="bottom-border">Drafted Players</h4>
        {removedPlayers.length ? (
          <div className="ui list">
            {removedPlayers.map(player => {
              return (
                <div className="item">
                  {player.draftPosition}. {player.name}
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
