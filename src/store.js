import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  
} from './reducer/Reducers'

const reducer = combineReducers({
  
})



const initialState = {
  
}

const store = createStore(reducer, initialState, composeWithDevTools())

export default store
