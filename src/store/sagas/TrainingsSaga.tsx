import { call, put,takeEvery } from 'redux-saga/effects';
import { Training } from '../../Models/TrainingModel';
import { TypedResult } from '../api/Result';
import { getTrainingsRequest } from '../api/TrainingsApi';
import { fetchTrainings, TrainingsFailure, TrainingsSuccess } from '../reducers/TrainingReducers';

export function* fetchTrainingsAsync(){
  try {
    const resultTrainings: Training[] = yield call(getTrainingsRequest);
    yield put(TrainingsSuccess(resultTrainings))
  }catch (error) {
    yield put(TrainingsFailure());
  }
}

export const TrainingsWatcher = [
  takeEvery(fetchTrainings().type,fetchTrainingsAsync),
]

export default TrainingsWatcher