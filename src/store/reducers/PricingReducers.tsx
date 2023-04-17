import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pricing } from '../../Models/PricingModel';

export enum LOADING_STATUS {"NOT_STARTED", "LOADED", "PENDING"}


export interface PricingsState{
    loadingStatus: LOADING_STATUS,
    pricings: Pricing[]
}


const initialState: PricingsState = {
  loadingStatus : LOADING_STATUS.NOT_STARTED,
  pricings: []
}

const PricingsReducers = createSlice({
  name: 'Pricingss', 
  initialState,
  reducers : {
    fetchPricings(state) {
      state.loadingStatus = LOADING_STATUS.PENDING
    },
    /* Retour des requetes fetch / upsert / delete */
    PricingsSuccess(state, action: PayloadAction<any[]>) {
      state.loadingStatus = LOADING_STATUS.LOADED;
      state.pricings = [...action.payload]
    },
    PricingsFailure(state){
      state.loadingStatus = LOADING_STATUS.LOADED;
    },
    createPricingss(state){
      state.loadingStatus = LOADING_STATUS.PENDING;
    },
    createSuccessPricingss(state, action: PayloadAction<Pricing>){
      state.loadingStatus = LOADING_STATUS.LOADED;
      state.pricings = [...state.pricings, action.payload]
    }
  }
})

export const { 
    fetchPricings,
    PricingsSuccess,
    PricingsFailure,
    createPricingss,
    createSuccessPricingss
} = PricingsReducers.actions
export default PricingsReducers.reducer;