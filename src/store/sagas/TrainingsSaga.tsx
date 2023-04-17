import { PayloadAction } from '@reduxjs/toolkit';
import { call, put,takeEvery } from 'redux-saga/effects';
import { Training } from '../../Models/TrainingModel';
import { getTrainingsRequest, postTrainingsRequest } from '../api/TrainingsApi';
import { createSuccessTrainings, createTrainings, fetchTrainings, TrainingsFailure, TrainingsSuccess } from '../reducers/TrainingReducers';

export function* fetchTrainingsAsync(){
  try {
    const resultTrainings: Training[] = yield call(getTrainingsRequest);
    yield put(TrainingsSuccess(resultTrainings))
  }catch (error) {
    yield put(TrainingsFailure());
  }
}

export function* createTrainingsAsync(data: PayloadAction<Training>){
  try {
    const resultTrainings: Training = yield call(postTrainingsRequest,data.payload);
    yield put(createSuccessTrainings(resultTrainings))
  }catch (error) {
    yield put(TrainingsFailure());
  }
}


export const TrainingsWatcher = [
  takeEvery( createTrainings().type ,createTrainingsAsync),
  takeEvery(fetchTrainings().type,fetchTrainingsAsync),
]

export default TrainingsWatcher