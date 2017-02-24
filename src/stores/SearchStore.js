import { EventEmitter } from 'events';
import dispatcher from '../actions/dispatcher';
import { clone, isNotEmpty } from 'happy-helpers';


class SearchStore extends EventEmitter {
  constructor () {
    super();
    this.state = {
      images: [],
      searchString: ''
    }
  }

  getImages () {
    return clone(this.state.images);
  }

  getImageCount () {
    return this.state.images.length;
  }

  processResults (results, searchString) {
    this.state.searchString = searchString;
    console.log(results)
    this.state.images = results.info;
    this.emit('change')
  }

  handleActions(action) {
    switch(action.type) {
      case 'RECEIVED_SEARCH_RESULTS':
        if (action.results.status === 200) {
          this.processResults(action.results.data, action.searchString);
        } else {
          console.error('The search returned an error');
          console.error(action.results);
        }
      break;
      default: break;
    }
  }
}

const searchStore = new SearchStore();
dispatcher.register(searchStore.handleActions.bind(searchStore))

window.searchStore = searchStore;
export default searchStore;
