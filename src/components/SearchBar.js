import React, { Component } from 'react';
import './SearchBar.scss';

import SearchStore from '../stores/SearchStore';
import * as SearchActions from '../actions/SearchActions';
import dispatcher from '../actions/dispatcher';

class SearchBar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      searchString: '',
      images: [],
      page: 0
    };
    this.search = this.search.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getCurrentPage = this.getCurrentPage.bind(this);

    dispatcher.register(this.handleActions.bind(this));
  }

  componentDidMount () {
    SearchStore.on('change', this.getCurrentPage);
  }

  componentWillUnmout () {
    SearchStore.removeListener('change', this.getCurrentPage);
  }

  getCurrentPage() {
    let images = SearchStore.getPage();
    this.setState({images})
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

  nextPage() {
    SearchStore.nextPage();
  }

  prevPage() {
    SearchStore.prevPage();
  }

  handleChange (e) {
    let searchString = e.target.value;
    this.setState({searchString});
  }

  render() {
    let images = this.state.images.map((img,i) => {
      return <img key={i} src={ img.thumbnail_url } role="presentation" style={{maxWidth: '100px'}} />
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
        <button className="fpImageUploader-SearchBar-button"
          type="button"
          disabled={ this.state.isSearching }
          onClick={ this.nextPage }>
          Next Page
        </button><br/>
        <button className="fpImageUploader-SearchBar-button"
          type="button"
          disabled={ this.state.isSearching }
          onClick={ this.prevPage }>
          Prev Page
        </button><br/>
      </div>
    );
  }
}

export default SearchBar;
