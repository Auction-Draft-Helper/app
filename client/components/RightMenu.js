import React, { Component } from "react";
import { connect } from "react-redux";
import { tabSelection } from "../store/draft";
import RightMenuDisplay from "./RightMenuDisplay";

class RightMenu extends Component {
  render() {
    const { selectedTab, tabSelection } = this.props;

    return (
      <div>
        <div className="ui secondary pointing menu">
          <a
            className={
              selectedTab === "Drafted Players" ? "active item" : "item"
            }
            onClick={() => tabSelection("Drafted Players")}
          >
            Drafted Players
          </a>
          <a
            className={selectedTab === "My Team" ? "active item" : "item"}
            onClick={() => tabSelection("My Team")}
          >
            My Team
          </a>
          <a
            className={selectedTab === "Targets" ? "active item" : "item"}
            onClick={() => tabSelection("Targets")}
          >
            Targets
          </a>
          <a
            className={selectedTab === "Videos" ? "active item" : "item hide"}
            onClick={() => tabSelection("Videos")}
          >
            Videos
          </a>
        </div>
        <RightMenuDisplay />
      </div>
    );
  }
}

const mapState = state => ({
  selectedTab: state.draft.selectedTab
});

const mapDispatch = dispatch => ({
  tabSelection: tab => dispatch(tabSelection(tab))
});

export default connect(
  mapState,
  mapDispatch
)(RightMenu);
