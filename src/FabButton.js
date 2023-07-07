import { TouchableHighlight, View, Text } from "react-native";

const FabButton = ({ character, textColor, backgroundColor, onPress }) => {
  return (
    <View style={{ bottom: 16, right: 16, position: "absolute" }}>
      <TouchableHighlight
        //activeOpacity={0.6}
        //underlayColor="#DDDDDD"
        style={{ borderRadius: 32 }}
        onPress={onPress}
      >
        <View
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            backgroundColor: backgroundColor || "rgb(3, 142, 255)",
            justifyContent: "center",
            alignItems: "center",
            // shadow
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 2,
          }}
        >
          <Text
            style={{
              color: textColor || "black",
              marginTop: -6,
              fontSize: 48,
            }}
          >
            +
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default FabButton;
