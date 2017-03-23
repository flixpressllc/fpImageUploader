import React, { Component } from 'react';
import './SearchBar.scss';
import SelectableMedia from './SelectableMedia';

import SearchStore from '../stores/SearchStore';
import * as SearchActions from '../actions/SearchActions';
import dispatcher from '../actions/dispatcher';

class SearchBar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      searchString: ''
    };
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);

    dispatcher.register(this.handleActions.bind(this));
  }

  handleActions (action) {
    switch(action.type) {
      case 'FETCH_SEARCH_RESULTS':
        this.setState({isSearching: true});
      break;
      case 'RECEIVED_SEARCH_RESULTS':
        this.setState({isSearching: false});
      break;
      default: break;
    }
  }

  search() {
    let searchString = this.state.searchString;
    this.setState({page: 1}, () => {
      SearchActions.search(searchString)
    });
  }

  handleChange (e) {
    let searchString = e.target.value;
    this.setState({searchString});
  }

  render() {
    return (
      <div className="fpImageUploader-SearchBar">
        <input className="fpImageUploader-SearchBar-field"
          type="text" onChange={ this.handleChange } value={ this.state.searchString }/>
        <button className="fpImageUploader-SearchBar-button"
          type="button"
          disabled={ this.state.isSearching }
          onClick={ this.search }>
          Search
        </button>
      </div>
    );
  }
}

export default SearchBar;
