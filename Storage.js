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

export const storeWeapon = async (lvl) => {
  try {
    if (await AsyncStorage.getItem('weaponLvl') !== null) {
      await AsyncStorage.removeItem('weaponLvl');
      await AsyncStorage.setItem('weaponLvl', JSON.stringify(lvl));
    } else {
      console.log(await AsyncStorage.getItem('weaponLvl'), 'IDK')
      await AsyncStorage.setItem('weaponLvl', JSON.stringify(lvl));
    }
  } catch (err) {
    console.error(err)
  }
}

export const storeHelmet = async (lvl) => {
  try {
    if (await AsyncStorage.getItem('helmetLvl') !== null) {
      await AsyncStorage.removeItem('helmetLvl');
      await AsyncStorage.setItem('helmetLvl', JSON.stringify(lvl));
    } else {
      console.log(await AsyncStorage.getItem('helmetLvl'), 'IDK')
      await AsyncStorage.setItem('helmetLvl', JSON.stringify(lvl));
    }
  } catch (err) {
    console.error(err)
  }
}

export const storeStage = async (stage) => {
  try {
    if (await AsyncStorage.getItem('stage') !== null) {
      await AsyncStorage.removeItem('stage');
      await AsyncStorage.setItem('stage', JSON.stringify(stage));
    } else {
      console.log(await AsyncStorage.getItem('stage'), 'IDK')
      await AsyncStorage.setItem('stage', JSON.stringify(stage));
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

export const fetchWeapon = async () => {
  try {
    const value = await AsyncStorage.getItem('weaponLvl');
    if (value !== null) {
      return JSON.parse(value);
    }
   } catch (err) {
    console.error(err)
   }
}

export const fetchHelmet = async () => {
  try {
    const value = await AsyncStorage.getItem('helmetLvl');
    if (value !== null) {
      console.log(JSON.parse(value))
      return JSON.parse(value);
    }
   } catch (err) {
    console.error(err)
   }
}

export const fetchStage = async () => {
  try {
    const value = await AsyncStorage.getItem('stage');
    if (value !== null) {
      return JSON.parse(value);
    }
   } catch (err) {
    console.error(err)
   }
}

