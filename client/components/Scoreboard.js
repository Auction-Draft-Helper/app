import React, { Component } from "react";
import { connect } from "react-redux";

class Scoreboard extends Component {
  render() {
    const { myTeamsPoints, opponentsTeamsPoints, remainingBudget } = this.props;
    return (
      <div className="ui card full-width">
        <div className="content">
          <div className="two column row">
            <div className="left floated column">
              <h3>Scoreboard</h3>
            </div>
            <div className="right floated right aligned column">
              <div
                className="mini ui icon button custom-circle"
                data-tooltip="If you fall behind early it's OK - the goal is to get the players on the target list and at good values."
                data-position="right center"
                data-inverted=""
                data-variation="basic"
              >
                <i className="info icon" />
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <p>Remaining budget: ${remainingBudget}</p>
          <div className="ui horizontal statistics">
            <div className="statistic">
              <div className="value">
                {Math.round(myTeamsPoints).toLocaleString()}
              </div>
              <div className="label">My Projected Points</div>
            </div>
            <p />
            <div className="statistic">
              <div className="value">
                {Math.round(opponentsTeamsPoints / 9).toLocaleString()}
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
  opponentsTeamsPoints: state.draft.opponentsTeamsPoints,
  remainingBudget: state.draft.model.constraints["avg. value"].max
});

export default connect(mapState)(Scoreboard);
