import AsyncStorage from "@react-native-async-storage/async-storage";

export const getTasks = async () => {
  try {
    const tasks = JSON.parse(await AsyncStorage.getItem("tasks"));
    return tasks;
  } catch (error) {
    throw new Error(error);
  }
};

export const storeTasks = async (tasks) => {
  try {
    await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    throw new Error(error);
  }
};

export default { getTasks, storeTasks };
