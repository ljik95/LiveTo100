// import {createStore, applyMiddleware} from 'redux'
// import { createLogger } from 'redux-logger'
// import thunkMiddleware from 'redux-thunk'
// import { AsyncStorage } from "react-native"


// const initialState = {steps: '0', weaponLvl: 1, helmetLvl: 1}

// const GET_STEPS = 'GET_STEPS'
// const GET_WEAPON = 'GET_WEAPON'

// export const getSteps = (steps) => ({type: GET_STEPS, steps})
// export const getWeapon = (weapon) => ({type: GET_WEAPON, weapon})

// export const fetchWeapon = () => async (dispatch) => {
//   try {
//     const value = await AsyncStorage.getItem('weaponLvl');
//     if (value !== null) {
//       console.log(JSON.parse(value))
//       dispatch(getWeapon(JSON.parse(value)));
//     }
//    } catch (err) {
//     console.error(err)
//    }
// }

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case GET_STEPS:
//       return {...state, steps: action.steps}
//     case GET_WEAPON:
//       return {...state, weaponLvl: action.weapon}
//     default:
//       return state
//   }
// }

// const middleware =
//   applyMiddleware(thunkMiddleware, createLogger({collapsed: true})
// )

// const store = createStore(reducer, middleware)

// export default store
