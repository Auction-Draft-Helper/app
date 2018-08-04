import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "../store/index";
import PlayersList from "./PlayersList";
import Header from "./Header";
import Search from "./Search";
import NominatedPlayer from "./NominatedPlayer";
import RightMenu from "./RightMenu";
import About from "./About";
import Scoreboard from "./Scoreboard";

class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <div className="header-custom">
            <Header />
          </div>
          <div className="body">
            <About />
            <div className="ui grid">
              <div className="five wide column mobile-hide">
                <Scoreboard />
                <RightMenu />
              </div>
              <div className="eleven wide column">
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
