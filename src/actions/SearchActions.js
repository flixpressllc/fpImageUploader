import dispatcher from './dispatcher';
import SearchStore from '../stores/SearchStore';
import { ajax } from '../utils/ajax';
import { SEARCH_PAGE_SIZE } from '../settings';

const SEARCH_TYPE = 'graphic';

function searchFlixpressAPI (searchString, page) {
  let keywords = encodeURI(searchString);
  page = page ? page : 1;
  let dataType = 'json';
  var url = 'https://search.flixpress.com/api/search' +
    '/' + SEARCH_TYPE +
    '/' + keywords +
    '/' + page +
    '/' + SEARCH_PAGE_SIZE;
  return ajax({url, dataType});
}

export function search (searchString) {
  if (searchString === '') throw new Error('Blank searchString');
  if (searchString === SearchStore.getLastSearchString()) {
    SearchStore.firstPage();
    return;
  }
  dispatcher.dispatch({type:'FETCH_SEARCH_RESULTS', searchString});

  searchFlixpressAPI(searchString).then(results => {
    if (results.status === 200) {

      dispatcher.dispatch({type:'RECEIVED_SEARCH_RESULTS', status: 'success', initialSearch: true, data: results.data, searchString});
    } else {
      console.error('The search returned an error');
      console.error(results);
      dispatcher.dispatch({type:'RECEIVED_SEARCH_RESULTS', status: 'failure'});
    }
  }).catch((e) => {
    dispatcher.dispatch({type:'RECEIVED_SEARCH_RESULTS', status: 'failure', error: e});
  });

}

export function fillCacheAtPageWithString (pageNum, searchString) {
  if (searchString === '') throw new Error('Blank searchString');
  dispatcher.dispatch({type:'FETCH_SEARCH_RESULTS', searchString});

  searchFlixpressAPI(searchString, pageNum).then(results => {
    if (results.status === 200) {

      dispatcher.dispatch({type:'RECEIVED_SEARCH_RESULTS', status: 'success', initialSearch: false, page: pageNum, images: results.data.info});
    } else {
      console.error('The search returned an error');
      console.error(results);
      dispatcher.dispatch({type:'RECEIVED_SEARCH_RESULTS', status: 'failure'});
    }
  }).catch((e) => {
    console.error(e);
    dispatcher.dispatch({type:'RECEIVED_SEARCH_RESULTS', status: 'failure', error: e});
  });

}
