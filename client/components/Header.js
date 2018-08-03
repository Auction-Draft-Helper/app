import React, { Component } from "react";
import { connect } from "react-redux";
import { aboutToggle } from "../store/draft";

class Header extends Component {
  render() {
    const { aboutToggle } = this.props;
    return (
      <div className="ui grid">
        <div className="two column row">
          <div className="left floated column">
            <h1>
              <i className="football ball icon" />Auction Draft Helper
            </h1>
          </div>
          <div className="right floated column">
            <div className="ui text menu no-margin">
              <div className="right menu">
                <a className="item white" onClick={() => aboutToggle()}>
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

const mapDispatch = dispatch => ({
  aboutToggle: () => dispatch(aboutToggle())
});

export default connect(
  null,
  mapDispatch
)(Header);
