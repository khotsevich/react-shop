import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { restReducer } from './reducers/rest.reducer'
import { userReducer } from './reducers/user.reducer'

const rootReducer = combineReducers({
  user: userReducer,
  rest: restReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)
