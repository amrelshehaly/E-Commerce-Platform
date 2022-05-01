import {compose, createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'

import {rootReducer} from './root-reducer'

//root-reducer


const middleWares = [process.env.NODE_ENV !== 'production' && logger].filter(Boolean)

const composeEnhancer = (
    process.env.NODE_ENV !== 'production' && 
    window && 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ) || compose


const composeEnhancers = composeEnhancer(applyMiddleware(...middleWares))

export const store =  createStore(rootReducer, undefined, composeEnhancers)