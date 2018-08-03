import React, { Component } from "react";
import { connect } from "react-redux";
import MyTeam from "./MyTeam";
import DraftedPlayers from "./DraftedPlayers";
import Targets from "./Targets";

class RightMenuDisplay extends Component {
  render() {
    const { selectedTab } = this.props;
    if (selectedTab === "My Team") {
      return <MyTeam />;
    } else if (selectedTab === "Drafted Players") {
      return <DraftedPlayers />;
    } else {
      return <Targets />;
    }
  }
}

const mapState = state => ({
  selectedTab: state.draft.selectedTab
});

export default connect(mapState)(RightMenuDisplay);
