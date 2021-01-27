import {
  
} from '../constant/constants'



const doneListReducer = (state = [], action) => {
  switch (action.type) {
    case DONE_LIST_ADD_DONE:
      return [...state, action.payload]
    case DONE_LIST_REMOVE_DONE:
      return action.payload
    case DONE_LIST_PLUS_DONE_COUNTER:
      return action.payload
    default:
      return state
  }
}

export {
 
}
