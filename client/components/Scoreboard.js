import React, { Component } from "react";
import { connect } from "react-redux";

class Scoreboard extends Component {
  render() {
    const { myTeamsPoints, opponentsTeamsPoints } = this.props;
    return (
      <div className="ui card full-width">
        <div className="content">
          <div className="header">Scoreboard</div>
        </div>
        <div className="content">
          <div className="ui horizontal statistics">
            <div className="statistic">
              <div className="value">{Math.round(myTeamsPoints)}</div>
              <div className="label">My Projected Points</div>
            </div>
            <div className="statistic">
              <div className="value">
                {Math.round(opponentsTeamsPoints / 9)}
              </div>
              <div className="label">Avg. Opponent</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  myTeamsPoints: state.draft.myTeamsPoints,
  opponentsTeamsPoints: state.draft.opponentsTeamsPoints
});

export default connect(mapState)(Scoreboard);
