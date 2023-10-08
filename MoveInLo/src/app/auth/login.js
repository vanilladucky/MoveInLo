import { Image, Text, View } from "react-native";
import BaseButton from "@src/components/utils/button";
import BaseInput from "@src/components/utils/inputbox";
import loginIcon from "@src/assets/splash/LandingLogo.png";
import { Link, useRouter } from "expo-router";
import { useState } from "react";

const LoginUI = () => {
  const [accountInfo, setAccountInfo] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();

  const inputHandler = (input, field) => {
    setAccountInfo((prevState) => ({ ...accountInfo, [field]: input }));
    console.log(accountInfo);
  };

  const passwordHandler = (value) => {
    setAccountInfo((prevState) => ({ ...accountInfo, password: value }));
  };

  const submitHandler = () => {
    // Insert backend API call to validate
    console.log(accountInfo);
    if (accountInfo.values) {
      router.push("/customer/home");
    }
  };
  // console.log(accountInfo);

  return (
    <View className={"flex h-full w-full items-center mt-16"}>
      <View className={"mt-10 scale-110 items-center"}>
        <Image source={loginIcon} width={150} height={150} />
        <Text className={"font-RobotoBold text-2xl text-primary mt-5"}>
          MoveInLo!
        </Text>
      </View>

      <View className={"flex flex-row mt-10"}>
        <View className={"border-r-2 flex items-center"}>
          <Text className="font-RobotoBold text-xl my-2 w-40 text-center">
            Login
          </Text>
          <View className={"w-28 border-b-4 border-primary"} />
        </View>
        <View>
          <Link
            href={"/auth/signup"}
            className="font-RobotoBold text-xl my-2 w-40 text-center"
          >
            Sign Up
          </Link>
        </View>
      </View>

      <View className={"mt-10 w-3/4"}>
        <View>
          <Text>Account Type</Text>
        </View>
        <BaseInput
          placeholder={"Username"}
          value={accountInfo.username}
          onChangeText={(input) => inputHandler(input, "username")}
        />
        {
          <BaseInput
            placeholder={"Password"}
            onChangeText={() => passwordHandler}
          />
        }
        <View className={"flex flex-row justify-center space-x-28 mt-2"}>
          <View>
            <Text className={"font-RobotoBold items-center"}>
              Forget Password
            </Text>
          </View>
          <View className={"flex"}>
            <BaseButton
              primary
              title={"Login"}
              onPress={submitHandler}
              width={105}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginUI;
