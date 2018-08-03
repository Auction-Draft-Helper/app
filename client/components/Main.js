import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "../store/index";
import PlayersList from "./PlayersList";
import Header from "./Header";
import Search from "./Search";
import NominatedPlayer from "./NominatedPlayer";
import RightMenu from "./RightMenu";
import About from "./About";

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
              <div className="five wide column">
                {/* <div className="ui statistics">
                  <div class="statistic">
                    <div class="value">
                      <i className="user icon" />
                      2,999
                    </div>
                    <div class="label">Your Points</div>
                  </div>
                  <div class="statistic">
                    <div class="value">
                      <i className="users icon" />
                      2,000
                    </div>
                    <div class="label">Avg. Opponent's Points</div>
                  </div>
                </div> */}
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
