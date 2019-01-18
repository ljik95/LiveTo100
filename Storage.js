import { AsyncStorage } from "react-native"

export const storeSteps = async (steps) => {
  try {
    if (await AsyncStorage.getItem('steps')) {
      await AsyncStorage.removeItem('steps');
      await AsyncStorage.setItem('steps', JSON.stringify(steps));
    } else {
      await AsyncStorage.setItem('steps', JSON.stringify(steps));
    }
  } catch (err) {
    console.error(err)
  }
}

export const storeStartDate = async (start) => {
  try {
    await AsyncStorage.setItem('start', JSON.stringify(start));
  } catch (err) {
    console.error(err)
  }
}

export const storeGold = async (gold) => {
  try {
    if (await AsyncStorage.getItem('gold') !== null) {
      await AsyncStorage.removeItem('gold');
      await AsyncStorage.setItem('gold', JSON.stringify(gold));
    } else {
      console.log(await AsyncStorage.getItem('gold'), 'IDK')
      await AsyncStorage.setItem('gold', JSON.stringify(gold));
    }
  } catch (err) {
    console.error(err)
  }
}

export const fetchSteps = async () => {
  try {
    const value = await AsyncStorage.getItem('steps');
    if (value !== null) {
      return JSON.parse(value);
    }
   } catch (err) {
    console.error(err)
   }
}

export const fetchStartDate = async () => {
  try {
    const value = await AsyncStorage.getItem('start');
    if (value !== null) {
      return JSON.parse(value);
    }
   } catch (err) {
    console.error(err)
   }
}

export const fetchGold = async () => {
  try {
    const value = await AsyncStorage.getItem('gold');
    if (value !== null) {
      return JSON.parse(value);
    }
   } catch (err) {
    console.error(err)
   }
}
