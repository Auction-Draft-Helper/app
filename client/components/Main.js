import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "../store/index";
import PlayersList from "./PlayersList";
import Header from "./Header";
import Search from "./Search";
import NominatedPlayer from "./NominatedPlayer";
import LeftMenu from "./LeftMenu";
import About from "./About";
import Scoreboard from "./Scoreboard";

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {showAbout: true};
    this.toggleAbout = this.toggleAbout.bind(this);
  }

  toggleAbout() {
    this.setState({
      showAbout: !this.state.showAbout
    });
  }
  
  render() {
    const {toggleAbout, state} = this
    return (
      <Provider store={store}>
        <div>
          <div className="header-custom">
            <Header toggleAbout={toggleAbout} />
          </div>
          <div className="body">
            {state.showAbout ? <About toggleAbout={toggleAbout} /> : <div />}
            <div className="ui grid">
              <div className="five wide column mobile-hide">
                <Scoreboard />
                <LeftMenu />
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
