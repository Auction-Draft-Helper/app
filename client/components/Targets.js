import React, { Component } from "react";
import { connect } from "react-redux";

class Targets extends Component {
  render() {
    const { targets } = this.props;
    return (
      <div className="bottom-margin">
        {targets.length ? (
          <div className="ui list">
            {targets.map((player, index) => {
              return (
                <div className="item" key={player.id}>
                  {index + 1}. {player.name}, {player.position}, Avg. Price:
                  {" $" + player["avg. value"]}
                </div>
              );
            })}
          </div>
        ) : (
          <p>There are no players left to target.</p>
        )}
      </div>
    );
  }
}

const mapState = state => ({
  targets: state.draft.targets
});

export default connect(mapState)(Targets);
