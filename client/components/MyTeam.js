import React, { Component } from "react";
import { connect } from "react-redux";

class MyTeam extends Component {
  render() {
    const { myTeam } = this.props;
    return (
      <div className="bottom-margin">
        {myTeam.length ? (
          <div className="ui list">
            {myTeam.map((player, index) => {
              return (
                <div className="item" key={player.id}>
                  {index + 1}. {player.name}, {player.position}, ${player.draftAmount}
                </div>
              );
            })}
          </div>
        ) : (
          <p>You have not drafted any players yet.</p>
        )}
      </div>
    );
  }
}

const mapState = state => ({
  myTeam: state.draft.draftedPlayers
});

export default connect(mapState)(MyTeam);
