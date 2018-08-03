import React, { Component } from "react";
import { connect } from "react-redux";
import PlayerRow from "./PlayerRow";

class PlayersList extends Component {
  render() {
    const { searchTerm } = this.props;
    const searchFilter = player => {
      if (
        player.name.indexOf(searchTerm) !== -1 ||
        player.name.toLowerCase().indexOf(searchTerm) !== -1
      ) {
        return true;
      } else {
        return false;
      }
    };
    return (
      <div>
        <h4 className="top-margin">Available Players</h4>
        <div className="ui list no-top-margin">
          {this.props.players.filter(searchFilter).map(player => {
            return <PlayerRow player={player} key={player.id} />;
          })}
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  players: state.draft.playersArr,
  searchTerm: state.draft.searchTerm
});

export default connect(mapState)(PlayersList);
