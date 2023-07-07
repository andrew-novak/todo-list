import { useState, useEffect } from "react";
import {
  Pressable,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { getDisplayDate } from "./helpers";

const TaskDialog = ({
  isOpen,
  buttonColor,
  onCancel: passedOnCancel,
  onConfirm: passedOnConfirm,
}) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const openDatePicker = () => setIsDatePickerOpen(true);
  const closeDatePicker = () => setIsDatePickerOpen(false);

  const handleDateSelect = (event, selectedDate) => {
    setDate(selectedDate);
    closeDatePicker();
  };

  const resetState = () => {
    setName("");
    setDate(new Date());
  };

  const onCancel = () => {
    passedOnCancel();
    resetState();
  };

  const onConfirm = () => {
    const dateNoTime = date;
    dateNoTime.setHours(0, 0, 0, 0);
    passedOnConfirm(name, dateNoTime);
    resetState();
  };

  if (!isOpen) return null;
  return (
    <View
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.17)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 5,
      }}
    >
      <Pressable
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.65)",
        }}
        onPress={onCancel}
      />
      <View
        style={{
          width: "80%",
          padding: 36,
          backgroundColor: "white",
          borderRadius: 4,
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 24, marginBottom: 24 }}>
          Add Task
        </Text>
        <TextInput
          value={name}
          style={{
            borderWidth: 1,
            borderRadius: 4,
            fontSize: 24,
            paddingTop: 4,
            paddingBottom: 4,
            paddingLeft: 8,
            marginBottom: 24,
          }}
          onChangeText={setName}
        />
        {isDatePickerOpen && (
          <DateTimePicker
            value={date}
            mode="date"
            style={{ backgroundColor: "yellow", color: "red" }}
            onChange={handleDateSelect}
          />
        )}
        <TouchableOpacity onPress={openDatePicker}>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 4,
              fontSize: 24,
              paddingTop: 4,
              paddingBottom: 4,
              paddingLeft: 8,
              marginBottom: 24,
            }}
          >
            <Text style={{ fontSize: 24 }}>{getDisplayDate(date)}</Text>
          </View>
        </TouchableOpacity>
        <Button title="Add" color={buttonColor} onPress={onConfirm} />
      </View>
    </View>
  );
};

export default TaskDialog;
