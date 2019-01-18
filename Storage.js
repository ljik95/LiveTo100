import { AsyncStorage } from "react-native"

export const storeSteps = async (steps) => {
  try {
    if (await AsyncStorage.getItem('steps')) {
      await AsyncStorage.removeItem('steps');
      await AsyncStorage.setItem('steps', steps);
    } else {
      await AsyncStorage.setItem('steps', steps);
    }
  } catch (err) {
    console.error(err)
  }
}

export const storeStartDate = async (start) => {
  try {
    await AsyncStorage.setItem('start', start);
  } catch (err) {
    console.error(err)
  }
}

export const fetchSteps = async () => {
  try {
    const value = await AsyncStorage.getItem('steps');
    if (value !== null) {
      return value
    }
   } catch (err) {
    console.error(err)
   }
}

export const fetchStartDate = async () => {
  try {
    const value = await AsyncStorage.getItem('start');
    if (value !== null) {
      return value
    }
   } catch (err) {
    console.error(err)
   }
}
