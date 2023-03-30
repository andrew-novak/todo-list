import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, View, ScrollView, Image } from "react-native";
import CheckBox from "expo-checkbox";

import storage from "./storage";
import TaskDialog from "./TaskDialog";
import TaskList from "./TaskList";
import FabButton from "./FabButton";

const App = () => {
  // task dialog
  const [taskDialog, setTaskDialog] = useState(null);
  const openTaskDialog = () => setTaskDialog({ name: "" });
  const closeTaskDialog = () => setTaskDialog(null);

  // tasks
  const [tasks, setTasks] = useState({});

  const addTask = (name, date) => {
    const newTask = { name, isChecked: false };
    const newTasks = { ...tasks };
    newTasks[date] = [...(newTasks[date] ? newTasks[date] : []), newTask];
    setTasks(newTasks);
    storage.storeTasks(newTasks);
    closeTaskDialog();
  };

  useEffect(() => {
    (async () => {
      const storedTasks = await storage.getTasks();
      storedTasks && setTasks(storedTasks);
    })();
  }, []);

  return (
    <SafeAreaView style={{ height: "100%", width: "100%" }}>
      <TaskDialog
        isOpen={taskDialog !== null}
        onCancel={closeTaskDialog}
        onConfirm={addTask}
      />
      <View
        style={{
          height: 24,
          width: "100%",
          backgroundColor: "#0067ba",
        }}
      />
      <View
        style={{
          height: 84,
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#038eff",
        }}
      >
        {/*<Image
          source={require("./todo-icon.png")}
          style={{ height: 58, width: 58, margin: 12 }}
        />*/}
        <Text style={{ fontSize: 36, marginLeft: 24 }}>Todo List</Text>
      </View>
      <ScrollView style={{ height: "100%" }}>
        <TaskList tasks={tasks} />
        <StatusBar style="auto" />
      </ScrollView>
      <FabButton character="+" onPress={openTaskDialog} />
    </SafeAreaView>
  );
};

export default App;
