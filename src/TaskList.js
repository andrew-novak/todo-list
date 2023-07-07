import { useState } from "react";
import { Text, View } from "react-native";
import CheckBox from "expo-checkbox";
import Ionicons from "@expo/vector-icons/Ionicons";

import { getDisplayDate } from "./helpers";

const TaskList = ({ tasks, checkboxColor, onCheckboxToggle, onTaskRemove }) => {
  const [dateOffset, setDateOffset] = useState(0);
  const onLayout = (event) => {
    var { x, y, width, height } = event.nativeEvent.layout;
    setDateOffset(height / 2);
  };
  const taskEntries = Object.entries(tasks);
  return (
    <View
      style={{
        alignItems: "flex-start",
        justifyContent: "flex-start",
        backgroundColor: "#ffffff",
        paddingLeft: 24,
        paddingRight: 24,
      }}
    >
      {taskEntries.map(([date, oneDayTasks], index) => {
        const oneDayTasksEntries = Object.entries(oneDayTasks);
        /* Box Start */
        return (
          <View
            key={index}
            style={{
              position: "relative",
              width: "100%",
              flexDirection: "column",
              alignItems: "flex-start",
              marginTop: index === 0 ? 36 : 24,
              marginBottom: index === taskEntries.length - 1 ? 36 : 12,
              borderWidth: 1,
            }}
          >
            {/* Date Start */}
            <View
              style={{
                position: "absolute",
                width: "100%",
                alignItems: "center",
                top: -dateOffset,
              }}
              onLayout={index === 0 && onLayout}
            >
              <Text
                style={{
                  fontSize: 24,
                  backgroundColor: "white",
                  paddingLeft: 8,
                  paddingRight: 8,
                }}
              >
                {getDisplayDate(new Date(date))}
              </Text>
            </View>
            {/* Date End */}
            {/* Tasks Start*/}
            {oneDayTasksEntries.map(([id, task], index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: index === 0 ? 36 : 12,
                  paddingBottom:
                    index === oneDayTasksEntries.length - 1 ? 36 : 12,
                  paddingLeft: 24,
                  paddingRight: 24,
                }}
              >
                <CheckBox
                  value={task.isChecked}
                  color={checkboxColor || null}
                  style={{
                    height: 30,
                    width: 30,
                    // shadow
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    elevation: 2,
                  }}
                  onValueChange={() => onCheckboxToggle(date, id)}
                />
                <Text
                  style={{
                    flexGrow: 1,
                    paddingLeft: 12,
                    paddingRight: 12,
                    fontSize: 20,
                    textDecorationLine: task.isChecked
                      ? "line-through"
                      : "none",
                  }}
                >
                  {task.name}
                </Text>
                {tasks[date][id].isChecked && (
                  <Ionicons
                    name="trash-outline"
                    size={28}
                    color="red"
                    onPress={() => onTaskRemove(date, id)}
                  />
                )}
              </View>
            ))}
            {/* Tasks End */}
          </View>
        );
        /* Box End */
      })}
    </View>
  );
};

export default TaskList;
