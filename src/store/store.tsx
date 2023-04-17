import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
// REDUCERS
import TrainingReducers from './reducers/TrainingReducers';
// SAGA MIDDLEWARES
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects';
import TrainingsWatcher from './sagas/TrainingsSaga';
import PricingsWatcher from './sagas/PricingsSaga';
import PricingReducers from './reducers/PricingReducers';

// diagnostic reducer - > all reducers
const rootReducer = combineReducers({
    trainings: TrainingReducers,
    pricings: PricingReducers
});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
        traceLimit: 50
    }) || compose;

const sagaMiddleware = createSagaMiddleware()

const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware),
);

function* rootSagas() {
    yield all([
        ...TrainingsWatcher,
        ...PricingsWatcher
    ])
}

export const store = createStore(rootReducer, {}, enhancer);
sagaMiddleware.run(rootSagas)