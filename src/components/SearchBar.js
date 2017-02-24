import React, { Component } from 'react';
import './SearchBar.scss';

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
    this.reRender = this.reRender.bind(this);

    dispatcher.register(this.handleActions.bind(this));
  }

  componentDidMount () {
    SearchStore.on('change', this.reRender);
  }

  componentWillUnmout () {
    SearchStore.removeListener('change', this.reRender);
  }

  reRender() {
    this.forceUpdate();
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
    SearchActions.search(searchString);
  }

  handleChange (e) {
    let searchString = e.target.value;
    this.setState({searchString});
  }

  render() {
    let images = SearchStore.getImages().map(img => {
      return <img src={ img.thumbnail_url } role="presentation" style={{maxWidth: '100px'}} />
    });
    return (
      <div className="fpImageUploader-SearchBar">
        <input className="fpImageUploader-SearchBar-field"
          type="text" onChange={ this.handleChange } value={ this.state.searchString }/>
        <button className="fpImageUploader-SearchBar-button"
          type="button"
          disabled={ this.state.isSearching }
          onClick={ this.search }>
          Search
        </button><br/>
        Store: { images }
      </div>
    );
  }
}

export default SearchBar;
