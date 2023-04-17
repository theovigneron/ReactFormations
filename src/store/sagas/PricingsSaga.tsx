import { call, put,takeEvery } from 'redux-saga/effects';
import { Pricing } from '../../Models/PricingModel';
import { getPricingsRequest } from '../api/PricingsApi';
import { fetchPricings, PricingsFailure, PricingsSuccess } from '../reducers/PricingReducers';

export function* fetchPricingsAsync(){
  try {
    const resultPricings: Pricing[] = yield call(getPricingsRequest);
    yield put(PricingsSuccess(resultPricings))
  }catch (error) {
    yield put(PricingsFailure());
  }
}


export const PricingsWatcher = [
  takeEvery(fetchPricings().type,fetchPricingsAsync),
]

export default PricingsWatcher