import { Text, View } from "react-native";
import BaseButton from "@src/components/utils/button";
import BaseInput from "@src/components/utils/inputbox";
import { useRouter } from "expo-router";

const SignUpUI = () => {
  const router = useRouter();

  return (
    <View className={"flex h-full w-full items-center mt-10"}>
      <View className={"flex flex-row"}>
        <View className={"border-r-2"}>
          <Text
            className="font-RobotoBold text-xl my-2 w-40 text-center"
            onPress={() => router.push("/auth/login")}
          >
            Login
          </Text>
        </View>
        <View className={"border-r-2 flex items-center"}>
          <Text className="font-RobotoBold text-xl my-2 w-40 text-center">
            Sign Up
          </Text>
          <View className={"w-28 border-b-4 border-primary"} />
        </View>
      </View>

      <View className={"flex flex-col w-3/4 mt-8"}>
        <BaseInput placeholder={"Email"} />
        <BaseInput placeholder={"Username"} />
        <BaseInput placeholder={"Age"} />
        <BaseInput placeholder={"Phone Number"} />
        <BaseInput placeholder={"Password"} />
        <BaseInput placeholder={"Re-enter Password"} />
        <View className={"mt-4 p"}>
          <Text className={"font-RobotoMedium"}>Note:</Text>
          <Text className={"font-RobotoRegular"}>
            Remember to keep your personal information safe and do not share it
            with anyone.
          </Text>
        </View>
        <View className={"mt-6"}>
          <BaseButton
            primary
            title={"Login"}
            link={"customer/home"}
            width={"full"}
          />
        </View>
        <BaseButton title={"Back"} link={"/"} />
      </View>

      <BaseButton title={"Forget Password"} link={"auth/forgetpassword"} />
    </View>
  );
};

export default SignUpUI;
