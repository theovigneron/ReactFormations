import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Training } from '../../Models/TrainingModel';

export enum LOADING_STATUS {"NOT_STARTED", "LOADED", "PENDING"}


export interface TrainingState{
    loadingStatus: LOADING_STATUS,
    trainings: Training[]
}


const initialState: TrainingState = {
  loadingStatus : LOADING_STATUS.NOT_STARTED,
  trainings: []
}

const TrainingReducers = createSlice({
  name: 'Trainings', 
  initialState,
  reducers : {
    fetchTrainings(state) {
      state.loadingStatus = LOADING_STATUS.PENDING
    },
    /* Retour des requetes fetch / upsert / delete */
    TrainingsSuccess(state, action: PayloadAction<any[]>) {
      state.loadingStatus = LOADING_STATUS.LOADED;
      state.trainings = [...action.payload]
    },
    TrainingsFailure(state){
      state.loadingStatus = LOADING_STATUS.LOADED;
    },
    createTrainings(state, action: any){
      state.loadingStatus = LOADING_STATUS.PENDING;
    },
    createSuccessTrainings(state, action: PayloadAction<Training>){
      state.trainings.push(action.payload)
      state.trainings = {...state.trainings}
    }
  }
})

export const { 
    fetchTrainings,
    TrainingsSuccess,
    TrainingsFailure,
    createTrainings,
    createSuccessTrainings
} = TrainingReducers.actions
export default TrainingReducers.reducer;