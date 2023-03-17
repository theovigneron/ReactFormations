import { LOADING_STATUS } from "../reducers/TrainingReducers"

export const getLoadingStatus = (state: any): LOADING_STATUS => ( state.trainings.loadingStatus)
export const getTrainings = (state: any): any[] => ( state.trainings.trainings)
