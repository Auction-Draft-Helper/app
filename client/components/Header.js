import React, { Component } from "react";

class Header extends Component {
  render() {
    const { toggleAbout } = this.props;
    return (
      <div className="ui grid">
        <div className="two column row">
          <div className="left floated column">
            <h1>
              <i className="football ball icon" />
              Fantasy Auction Wizard
            </h1>
          </div>
          <div className="right floated column">
            <div className="ui text menu no-margin">
              <div className="right menu">
                <a className="item white" onClick={() => toggleAbout()}>
                  About
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
