import { TouchableOpacity, View, Text } from "react-native";

const FabButton = ({ character, onPress }) => {
  return (
    <View style={{ bottom: 16, right: 16, position: "absolute" }}>
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            backgroundColor: "rgb(3, 142, 255)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "black",
              marginTop: -6,
              fontSize: 48,
            }}
          >
            +
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FabButton;
