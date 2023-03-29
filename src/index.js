import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Image,
} from "react-native";
import CheckBox from "expo-checkbox";

const todos = {
  "2023-04-01": [
    { name: "Abcde", isChcked: true },
    { name: "Abc", isChecked: false },
    { name: "Abcde", isChcked: true },
    { name: "Abc", isChecked: false },
    { name: "Abcde", isChcked: true },
    { name: "Abc", isChecked: false },
    { name: "Abcde", isChcked: true },
    { name: "Abc", isChecked: false },
    { name: "Abcde", isChcked: true },
    { name: "Abc", isChecked: false },
    { name: "Abcde", isChcked: true },
  ],
  "2023-04-02": [
    { name: "Abcde", isChcked: true },
    { name: "Abc", isChecked: false },
  ],
};

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const styles = StyleSheet.create({});

const getDateForDisplay = (storeDate) => {
  const [year, month, day] = storeDate.split("-");
  const date = `${parseInt(day)} ${monthNames[parseInt(month)]} ${year}`;
  return date;
};

const App = () => {
  const displayTodos = Object.fromEntries(
    Object.entries(todos).map(([date, todo], index) => [
      getDateForDisplay(date),
      todo,
    ])
  );
  return (
    <SafeAreaView style={{ height: "100%", width: "100%" }}>
      <View
        style={{
          height: 24,
          width: "100%",
          backgroundColor: "rgb(0, 103, 186)",
        }}
      />
      <View
        style={{
          height: 84,
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "rgb(3, 142, 255)",
        }}
      >
        {/*<Image
          source={require("./todo-icon.png")}
          style={{ height: 58, width: 58, margin: 12 }}
        />*/}
        <Text style={{ fontSize: 46, marginLeft: 24 }}>Todo List</Text>
      </View>
      <ScrollView
        style={{ height: "100%" }}
        contentContainerStyle={{
          backgroundColor: "#fff",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          padding: 32,
          paddingTop: 16,
          backgroundColor: "rgb(181, 232, 251)",
        }}
      >
        {Object.entries(displayTodos).map(([date, oneDayTodos], index) => (
          <View key={index}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingTop: 16,
                paddingBottom: 16,
                width: "100%",
              }}
            >
              <View
                style={{
                  flex: 1,
                  height: 1.5,
                  backgroundColor: "black",
                  marginRight: 8,
                }}
              />
              <Text style={{ fontSize: 30 }}>{date}</Text>
              <View
                style={{
                  flex: 1,
                  height: 1.5,
                  backgroundColor: "black",
                  marginLeft: 8,
                }}
              />
            </View>
            {oneDayTodos.map((todo, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 12,
                  paddingBottom: 12,
                  paddingLeft: 16,
                  paddingRight: 16,
                }}
              >
                <CheckBox
                  style={{
                    marginRight: 12,
                    height: 30,
                    width: 30,
                  }}
                />
                <Text size={30} style={{ fontSize: 26 }}>
                  {todo.name}
                </Text>
              </View>
            ))}
          </View>
        ))}
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
