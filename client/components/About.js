import React, { Component } from "react";

class About extends Component {
  render() {
    const { toggleAbout } = this.props;
    return (
      <div className="bottom-margin">
        <div className="ui yellow message">
          <i className="close icon" onClick={() => toggleAbout()} />
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
      </div>
    );
  }
}

export default About
