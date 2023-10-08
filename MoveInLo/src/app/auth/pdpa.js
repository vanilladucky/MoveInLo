import { Text, View } from "react-native";
import BaseButton from "@src/components/utils/button";

const PDPAUI = () => {
  return (
    <View>
      <Text className="">PDPA Page</Text>
      <BaseButton title={"Login"} link={"home"} />
    </View>
  );
};

export default PDPAUI;
