import { EventEmitter } from 'events';
import dispatcher from '../actions/dispatcher';
import * as SearchActions from '../actions/SearchActions';
import { clone, isNotEmpty } from 'happy-helpers';
import { SEARCH_PAGE_SIZE } from '../settings';

const initialState = {
  pages: [],
  searchString: '',
  totalResults: 0,
  totalPages: 0,
  currentPage: 1
};

class SearchStore extends EventEmitter {
  constructor () {
    super();
    this.state = clone(initialState);
  }

  reset () {
    this.state = clone(initialState);
  }

  getPage () {
    return clone(this.state.pages[this.state.currentPage - 1]);
  }

  firstPage () {
    if (this.state.page === 1) return;
    this.state.currentPage = 1;
    this.emit('change');
  }

  nextPageNumber () {
    return this.state.currentPage + 1;
  }

  prevPageNumber () {
    return this.state.currentPage - 1;
  }

  nextPage () {
    let nextPageNumber = this.nextPageNumber();
    if (nextPageNumber <= this.state.totalPages) {
      this.fillIfEmpty(nextPageNumber).then(() => {
        this.state.currentPage = nextPageNumber;
        this.emit('change');
      })
    }
  }

  fillIfEmpty (pageNum) {
    let _this = this;
    return new Promise(resolve => {
      if (isNotEmpty(_this.state.pages[pageNum - 1])) {
        resolve();
        return;
      }
      _this.cacheFillPromise = resolve;
      SearchActions.fillCacheAtPageWithString(pageNum, _this.state.searchString);
    });
  }

  prevPage () {
    if (this.prevPageNumber() > 0) {
      this.state.currentPage = this.prevPageNumber();
      this.emit('change');
    }
  }

  pageExists (num) {
    return num > 0 && num <= this.state.totalPages;
  }

  pageHasContent (num) {
    return isNotEmpty(this.state.pages[num - 1]);
  }

  pageNeedsContent (num) {
    if (!this.pageExists(num)) return false;
    return !this.pageHasContent(num);
  }

  getLastSearchString () {
    return this.state.searchString;
  }

  fillPage (pageNum, images) {
    this.state.pages[pageNum - 1] = images;
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
        if (action.status === 'failure') return;
        if (action.initialSearch) {
          this.processInitialResults(action.data, action.searchString);
        } else {
          this.state.pages[action.page - 1] = action.images;
          this.cacheFillPromise();
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
