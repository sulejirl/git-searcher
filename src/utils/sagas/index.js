
import { all } from 'redux-saga/effects';
import search from '../../containers/Search/saga';

export default function* rootSaga() {
  yield all([
    search(),
  ]);
}
