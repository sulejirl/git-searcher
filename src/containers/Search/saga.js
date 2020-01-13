import { takeLatest, call, put } from 'redux-saga/effects';
import {searchUsers,getUsersRepositories} from '../../utils/functions';
import {SEARCH_TERM_CHANGED, ON_CLICK_SUGGESTION, SCROLL_COUNT_CHANGED, REPO_SCROLL_COUNT_CHANGED} from './constants'
import {
  userNamesFound,
  onClickSuggestionSuccess,
  nextPage,
  nextRepoPage,
  oneUserNameFound,
  searchTermReset
} from './actions'

export function* searchUserSaga(action){
  if(action.data.length !== 0){
    const data = yield call(searchUsers,{q:action.data})
    let array = data.data.items.map(item=>item.login)
    if(array.length === 1){
      yield put(oneUserNameFound(array[0]))

    } else {
      yield put(userNamesFound(array))
    }
  } else {
    yield put(searchTermReset())
  }

}
export function* scrollCountChangedSaga(action){
  const data = yield call(searchUsers,{q:action.data,page:(action.page+1)})
  let array = data.data.items.map(item=>item.login)
  yield put(nextPage(array))

}
export function* repoScrollCountChangedSaga(action){
  const data = yield call(getUsersRepositories,action.data,(action.page+1))
  let array = data.data.map(item=>{
    let result = {
      name:item.name,
      link:item.html_url,
      stars:item.stargazers_count,
      watchers:item.watchers_count,
    }
    return result;
  })
  yield put(nextRepoPage(array))

}
export function* onClickSuggestionSaga(action){
  const data = yield call(getUsersRepositories,action.data)
  let array = data.data.map(item=>{
    let result = {
      name:item.name,
      link:item.html_url,
      stars:item.stargazers_count,
      watchers:item.watchers_count,
    }
    return result;
  })
  yield put(onClickSuggestionSuccess(array))
}
export default function* adminSaga(){
  yield takeLatest (SEARCH_TERM_CHANGED, searchUserSaga);
  yield takeLatest (ON_CLICK_SUGGESTION, onClickSuggestionSaga);
  yield takeLatest (SCROLL_COUNT_CHANGED, scrollCountChangedSaga);
  yield takeLatest (REPO_SCROLL_COUNT_CHANGED, repoScrollCountChangedSaga);



}
