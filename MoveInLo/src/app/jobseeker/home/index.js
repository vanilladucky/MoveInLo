import { Text, View } from "react-native";
import BaseButton from "@src/components/utils/button";

const CustomerHomeUI = () => {
  return (
    <View>
      <Text>Home</Text>
      <BaseButton title={"as"} link={"/home/index"} />
    </View>
  );
};

export default CustomerHomeUI;
