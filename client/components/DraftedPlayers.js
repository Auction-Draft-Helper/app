import React, { Component } from "react";
import { connect } from "react-redux";

class DraftedPlayers extends Component {
  render() {
    const { removedPlayers } = this.props;
    const listLength = removedPlayers.length;
    return (
      <div>
        {removedPlayers.length ? (
          <div className="ui list">
            {removedPlayers.map((player, index) => {
              return (
                <div className="item" key={player.id}>
                  {listLength - index}. {player.name}, {player.position}
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
