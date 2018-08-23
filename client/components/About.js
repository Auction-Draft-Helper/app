import React, { Component } from "react";
import { connect } from "react-redux";
import { aboutToggle } from "../store/draft";

class About extends Component {
  render() {
    const { aboutOn, aboutToggle } = this.props;
    return (
      <div className="bottom-margin">
        {aboutOn ? (
          <div className="ui yellow message">
            <i className="close icon" onClick={() => aboutToggle()} />
            <div className="header">About Fantasy Auction Wizard</div>
            <p>
              Welcome to Fantasy Auction Wizard! Before you start, please note
              this site is optimized for standard Yahoo! auction leagues, but
              more specifically:
            </p>
            <ul className="list">
              <li>10 team leagues</li>
              <li>
                Rosters comprised of 1 QB, 2 RBs, 2 WRs, 1 TE, 1 RB/WR/TE flex,
                1 K, 1 DST, and 6 bench positions
              </li>
              <li>0.5 points per reception</li>
            </ul>
            <p>If this works for you, get started!</p>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

const mapState = state => ({
  aboutOn: state.draft.aboutOn
});

const mapDispatch = dispatch => ({
  aboutToggle: () => dispatch(aboutToggle())
});

export default connect(
  mapState,
  mapDispatch
)(About);
