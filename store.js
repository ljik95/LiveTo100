// import {createStore, applyMiddleware} from 'redux'
// import { createLogger } from 'redux-logger'
// import thunkMiddleware from 'redux-thunk'

// const initialState = {steps: 0, start: new Date()}

// const GET_STEPS = 'GET_STEPS'
// const RESET_STARTDATE = 'RESET_STARTDATE'

// export const getSteps = (steps) => ({type: GET_STEPS, steps})
// export const resetStartDate = () => ({type: RESET_STARTDATE, })

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case GET_STEPS:
//       return {...state, steps}
//     default:
//       return state
//   }
// }

// const middleware =
//   applyMiddleware(thunkMiddleware, createLogger({collapsed: true})
// )

// const store = createStore(reducer, middleware)

// export default store
