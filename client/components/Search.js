import React, { Component } from "react";
import { connect } from "react-redux";
import { searchTermChange } from "../store/draft";
import debounce from "debounce";

class SearchModule extends Component {
  render() {
    const { searchTermChange, searchTerm } = this.props;
    return (
      <div className="ui large fluid icon input">
        <input
          value={searchTerm}
          className="prompt"
          placeholder="Search for a player..."
          onChange={event => {
            debounce(searchTermChange(event.target.value), 100);
          }}
        />
        <i className="search icon" />
      </div>
    );
  }
}

const mapState = state => ({
  searchTerm: state.draft.searchTerm
});

const mapDispatch = dispatch => ({
  searchTermChange: searchTerm => dispatch(searchTermChange(searchTerm))
});

export default connect(
  mapState,
  mapDispatch
)(SearchModule);
