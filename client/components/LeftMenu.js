import React, { Component } from "react";
import changeCase from "change-case";
import MyTeam from "./MyTeam";
import DraftedPlayers from "./DraftedPlayers";
import Targets from "./Targets";

class LeftMenu extends Component {
  constructor(props){
    super(props);
    this.draftedPlayers = "draftedPlayers";
    this.myTeam = "myTeam";
    this.targets = "targets";
    this.state = {selectedTab: this.draftedPlayers};
    this.changeTab = this.changeTab.bind(this);
  }

  changeTab(tab) {
    this.setState({
      selectedTab: tab
    });
  }

  render() {
    const {draftedPlayers, myTeam, targets, changeTab, state} = this;
    const {selectedTab} = state;

    return (
      <div>
        <div className="ui secondary pointing menu">
          {[draftedPlayers, myTeam, targets].map((tab) => {
            return (
              <a
                className={`${selectedTab === tab ? "active" : ""} item`}
                onClick={() => changeTab(tab)}
                key={tab}
              >
                {changeCase.titleCase(tab)}
              </a>
            )
          })}
        </div>
        {(function() {
          if (selectedTab === draftedPlayers) return <DraftedPlayers />;
          if (selectedTab === myTeam) return <MyTeam />;
          if (selectedTab === targets) return <Targets />
        })()}
      </div>
    );
  }
}

export default LeftMenu;
