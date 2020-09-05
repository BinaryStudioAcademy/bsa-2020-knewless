import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  fetchPathsAndTagsRoutine,
  fetchPathsByTagRoutine,
  fetchAllPathsRoutine,
  fetchAllAuthorPathsRoutine,
  fetchAllTagsRoutine
} from '../../routines';
import * as pathsService from '../../services/paths.service';
import { Routine } from 'redux-saga-routines';

function* getPathsAndTags() {
  try {
    const paths = yield call(pathsService.getAllPathsRequest);
    const myPaths = yield call(pathsService.getAllStudentPathsRequest);
    const tags = yield call(pathsService.getTags);

    yield put(fetchPathsAndTagsRoutine.success({
      tags,
      paths,
      myPaths
    }));
  } catch (error) {
    yield put(fetchPathsAndTagsRoutine.failure(error?.message));
  }
}

function* watchGetPathsAndTagsRequest() {
  yield takeEvery(fetchPathsAndTagsRoutine.TRIGGER, getPathsAndTags);
}

function* getPathsByTag(action: Routine<any>) {
  try {
    const paths = yield call(pathsService.getPathsByTagRequest, action.payload);

    yield put(fetchPathsByTagRoutine.success({
      paths
    }));
  } catch (error) {
    yield put(fetchPathsByTagRoutine.failure(error?.message));
  }
}

function* watchGetPathsByTagRequest() {
  yield takeEvery(fetchPathsByTagRoutine.TRIGGER, getPathsByTag);
}

function* getAllPaths() {
  try {
    const paths = yield call(pathsService.getAllPathsRequest);

    yield put(fetchAllPathsRoutine.success({
      paths
    }));
  } catch (error) {
    yield put(fetchAllPathsRoutine.failure(error?.message));
  }
}

function* watchGetAllPathsRequest() {
  yield takeEvery(fetchAllPathsRoutine.TRIGGER, getAllPaths);
}

function* getAllTags() {
  try {
    const tags = yield call(pathsService.getTags);

    yield put(fetchAllTagsRoutine.success({
      tags
    }));
  } catch (error) {
    yield put(fetchAllTagsRoutine.failure(error?.message));
  }
}

function* watchGetAllTagsRequest() {
  yield takeEvery(fetchAllTagsRoutine.TRIGGER, getAllTags);
}

function* getAllAuthorPaths() {
  try {
    const myPaths = yield call(pathsService.getAllAuthorPathsRequest);

    yield put(fetchAllAuthorPathsRoutine.success({
      myPaths
    }));
  } catch (error) {
    yield put(fetchAllAuthorPathsRoutine.failure(error?.message));
  }
}

function* watchGetAllAuthorPathsRequest() {
  yield takeEvery(fetchAllAuthorPathsRoutine.TRIGGER, getAllAuthorPaths);
}

export default function* pathsPageContainerSagas() {
  yield all([
    watchGetPathsAndTagsRequest(),
    watchGetPathsByTagRequest(),
    watchGetAllPathsRequest(),
    watchGetAllAuthorPathsRequest(),
    watchGetAllTagsRequest()
  ]);
}
