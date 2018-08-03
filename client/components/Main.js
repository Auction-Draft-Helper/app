import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "../store/index";
import PlayersList from "./PlayersList";
import Header from "./Header";
import MyTeam from "./MyTeam";
import DraftedPlayers from "./DraftedPlayers";
import Search from "./Search";
import NominatedPlayer from "./NominatedPlayer";

class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <div className="header">
            <Header />
          </div>
          <div className="body">
            <div className="ui grid">
              <div className="four wide column">
                <MyTeam />
                <DraftedPlayers />
              </div>
              <div className="twelve wide column">
                <Search />
                <NominatedPlayer />
                <PlayersList />
              </div>
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default Main;
