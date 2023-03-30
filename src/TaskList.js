import { useState } from "react";
import { Text, View } from "react-native";
import CheckBox from "expo-checkbox";

import { getDisplayDate } from "./helpers";

const TaskList = ({ tasks }) => {
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
      {taskEntries.map(
        ([date, oneDayTasks], index) => (
          /* Box Start */
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
            {oneDayTasks.map((task, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: index === 0 ? 36 : 12,
                  paddingBottom: index === oneDayTasks.length - 1 ? 36 : 12,
                  paddingLeft: 24,
                }}
              >
                <CheckBox
                  style={{
                    marginRight: 12,
                    height: 30,
                    width: 30,
                  }}
                />
                <Text style={{ fontSize: 20 }}>{task.name}</Text>
              </View>
            ))}
            {/* Tasks End */}
          </View>
        )
        /* Box End */
      )}
    </View>
  );
};

export default TaskList;
