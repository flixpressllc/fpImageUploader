import dispatcher from './dispatcher';
import { CACHE_PAGE_SIZE } from '../settings';
import { ajax } from '../utils/ajax';

const SEARCH_TYPE = 'graphic';

function searchFlixpressAPI (searchString, page) {
  let keywords = encodeURI(searchString);
  page = page ? page : 1;
  let dataType = 'json';
  var url = 'https://search.flixpress.com/api/search' +
    '/' + SEARCH_TYPE +
    '/' + keywords +
    '/' + page +
    '/' + CACHE_PAGE_SIZE;
  return ajax({url, dataType});
}

export function search (searchString) {
  if (searchString === '') throw new Error('Blank searchString');
  dispatcher.dispatch({type:'FETCH_SEARCH_RESULTS', searchString});
  searchFlixpressAPI(searchString).then(results => {
    dispatcher.dispatch({type:'RECEIVED_SEARCH_RESULTS', status:'success', results, searchString});

  }).catch(error => {
    dispatcher.dispatch({type:'RECEIVED_SEARCH_RESULTS', status:'failure'});
  })

}

export function getCacheForSearch (searchString, cachePage) {
  dispatcher.dispatch({type:'FETCH_SEARCH_CACHE', searchString});
  searchFlixpressAPI(searchString).then(results => {
    dispatcher.dispatch({type:'RECEIVED_SEARCH_CACHE', status:'success', results, searchString});

  }).catch(error => {
    dispatcher.dispatch({type:'RECEIVED_SEARCH_CACHE', status:'failure'});
  })
}