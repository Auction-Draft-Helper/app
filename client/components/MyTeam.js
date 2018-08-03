import React, { Component } from "react";
import { connect } from "react-redux";

class MyTeam extends Component {
  render() {
    const { myTeam } = this.props;
    return (
      <div className="bottom-margin">
        <h4 className="bottom-border">My Team</h4>
        {myTeam.length ? (
          <div className="ui list">
            {myTeam.map(player => {
              return (
                <div className="item">
                  {player.name}, ${player.draftAmount}
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
