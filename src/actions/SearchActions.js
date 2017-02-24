import dispatcher from './dispatcher';
import { SEARCH_PAGE_SIZE } from '../settings';
import { ajax } from '../utils/ajax';

const SEARCH_TYPE = 'graphic';

function searchFlixpressAPI (searchString) {
  let keywords = encodeURI(searchString);
  let page = 1; // for now,
  let dataType = 'json';
  var url = 'https://search.flixpress.com/api/search' +
    '/' + SEARCH_TYPE +
    '/' + keywords +
    '/' + page +
    '/' + SEARCH_PAGE_SIZE;
  return ajax({url, dataType});
}

export function search (searchString) {
  dispatcher.dispatch({type:'FETCH_SEARCH_RESULTS', searchString});
  searchFlixpressAPI(searchString).then(results => {
    dispatcher.dispatch({type:'RECEIVED_SEARCH_RESULTS', status:'success'});
  }).catch(error => {
    dispatcher.dispatch({type:'RECEIVED_SEARCH_RESULTS', status:'failure'});
  })

}