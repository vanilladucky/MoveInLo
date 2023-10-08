import { Text, View } from "react-native";
import BaseButton from "@src/components/utils/button";

const LoginUI = () => {
  return (
    <View>
      <Text className="">Login Page</Text>
      <BaseButton title={"Back"} link={"/"} />
      <BaseButton title={"Forget Password"} link={"auth/forgetpassword"} />
      <BaseButton title={"Login"} link={"customer/home"} />
    </View>
  );
};

export default LoginUI;
