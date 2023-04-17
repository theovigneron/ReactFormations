import { LOADING_STATUS } from "../reducers/TrainingReducers"

export const getLoadingStatus = (state: any): LOADING_STATUS => ( state.pricings.loadingStatus)
export const getPricings = (state: any): any[] => ( state.pricings.pricings)
