import React, { Component } from 'react';
import './ApiMediaContainer.scss';
import SelectableMedia from './SelectableMedia';

import SearchStore from '../stores/SearchStore';
import * as SearchActions from '../actions/SearchActions';
import dispatcher from '../actions/dispatcher';

class ApiMediaContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      images: []
    };
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
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
    let images = SearchStore.getCurrentPage();
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

  nextPage() {
    SearchStore.nextPage();
  }

  prevPage() {
    SearchStore.prevPage();
  }

  render() {
    let images = this.state.images.map((img,i) => {
      return (
        <SelectableMedia key={i} disabled={false} onSelect={()=> {}}>
          <img src={ img.thumbnail_url } role="presentation" />
        </SelectableMedia>
      )
    });
    return (
      <div className="fpImageUploader-ApiMediaContainer">

        Page: {SearchStore.getCurrentPageNumber()}
        Total Pages: {SearchStore.getPageCount()}
        <div className="fpImageUploader-ApiMediaContainer-container">
          { images }
        </div>

        <button className="fpImageUploader-ApiMediaContainer-button"
          type="button"
          disabled={ this.state.isSearching }
          onClick={ this.nextPage }>
          Next Page
        </button><br/>

        <button className="fpImageUploader-ApiMediaContainer-button"
          type="button"
          disabled={ this.state.isSearching }
          onClick={ this.prevPage }>
          Prev Page
        </button><br/>
      </div>
    );
  }
}

export default ApiMediaContainer;
