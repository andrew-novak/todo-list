import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, View, ScrollView, Image } from "react-native";
import CheckBox from "expo-checkbox";
import { registerRootComponent } from "expo";

import { getNextObjectKey } from "./helpers";
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

  useEffect(() => {
    (async () => {
      const storedTasks = await storage.getTasks();
      storedTasks && setTasks(storedTasks);
    })();
  }, []);

  const addTask = (name, date) => {
    if (name.length < 1) {
      return;
    }
    const newTasks = { ...tasks };
    if (!newTasks[date]) {
      newTasks[date] = {};
    }
    const nextKey = getNextObjectKey(newTasks[date]);
    newTasks[date][nextKey] = { name, isChecked: false };
    setTasks(newTasks);
    storage.storeTasks(newTasks);
    closeTaskDialog();
  };

  const onCheckboxToggle = (date, id) => {
    const newTasks = { ...tasks };
    newTasks[date][id].isChecked = !newTasks[date][id].isChecked;
    setTasks(newTasks);
    storage.storeTasks(newTasks);
  };

  const onTaskRemove = (date, id) => {
    const newTasks = { ...tasks };
    delete newTasks[date][id];
    if (Object.keys(newTasks[date]).length < 1) {
      delete newTasks[date];
    }
    setTasks(newTasks);
    storage.storeTasks(newTasks);
  };

  return (
    <SafeAreaView style={{ height: "100%", width: "100%" }}>
      <TaskDialog
        isOpen={taskDialog !== null}
        buttonColor="#55a465"
        onCancel={closeTaskDialog}
        onConfirm={addTask}
      />
      <View
        style={{
          height: 24,
          width: "100%",
          backgroundColor: "#488854",
        }}
      />
      <View
        style={{
          height: 84,
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#55a465",
        }}
      >
        <Image
          source={require("./todoIcon.png")}
          style={{
            height: 58,
            width: 58,
            margin: 12,
            borderRadius: 9999,
            borderWidth: 2,
            borderColor: "white",
          }}
        />
        <Text
          style={{
            fontSize: 36,
            marginLeft: 0,
            color: "#e9eee7",
            fontStyle: "italic",
            fontWeight: 600,
          }}
        >
          Todo List
        </Text>
      </View>
      <ScrollView style={{ height: "100%" }}>
        <TaskList
          tasks={tasks}
          checkboxColor="#55a465"
          onCheckboxToggle={onCheckboxToggle}
          onTaskRemove={onTaskRemove}
        />
        <StatusBar style="auto" />
      </ScrollView>
      <FabButton
        character="+"
        textColor="#e9eee7"
        backgroundColor="#55a465"
        onPress={openTaskDialog}
      />
    </SafeAreaView>
  );
};

export default registerRootComponent(App);
