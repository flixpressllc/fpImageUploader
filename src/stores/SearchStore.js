import { EventEmitter } from 'events';
import dispatcher from '../actions/dispatcher';
import { clone, isEmpty } from 'happy-helpers';
import { SEARCH_PAGE_SIZE } from '../settings';


class SearchStore extends EventEmitter {
  constructor () {
    super();
    this.state = {
      pages: [],
      searchString: '',
      totalResults: 0,
      totalPages: 0
    }
  }

  getPage (num) {
    if (isEmpty(this.state.pages[num - 1])) {
      console.log('need to fetch');
      
      return [];
    }
    return clone(this.state.pages[num - 1]);
  }

  getPageCount () {
    return this.state.totalPages;
  }

  getImageCount () {
    return this.state.totalResults;
  }

  paginate (images) {
    let ai = -1;
    return images.reduce((a,image,i) => {
      if (i % SEARCH_PAGE_SIZE === 0) {
        a[++ai] = [];
      }
      a[ai].push(image);
      return a;
    },[]);
  }

  processInitialResults (results, searchString) {
    console.log(results)
    this.state.searchString = searchString;
    this.state.pages = this.paginate(results.info);
    this.state.totalResults = results.totalSearchResults;
    this.state.totalPages = Math.ceil(this.state.totalResults / SEARCH_PAGE_SIZE)
    this.emit('change')
  }

  handleActions(action) {
    switch(action.type) {
      case 'RECEIVED_SEARCH_RESULTS':
        if (action.results.status === 200) {
          this.processInitialResults(action.results.data, action.searchString);
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
