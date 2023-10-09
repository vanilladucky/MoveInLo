import { Image, Text, View } from "react-native";
import BaseButton from "@src/components/utils/button";
import loginIcon from "@src/assets/splash/LandingLogo.png";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  Box,
  CheckIcon,
  FormControl,
  Input,
  Select,
  WarningOutlineIcon,
} from "native-base";

const LoginUI = () => {
  const [accountInfo, setAccountInfo] = useState({
    type: "",
    username: "",
    password: "",
  });
  const router = useRouter();

  const inputHandler = (input, field) => {
    setAccountInfo((prevState) => ({ ...accountInfo, [field]: input }));
    console.log(accountInfo);
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
        <FormControl className={"w-3/4"}>
          <FormControl.Label>Select Account Type</FormControl.Label>
          <Select
            selectedValue={accountInfo.type}
            accessibilityLabel={"Account Type"}
            placeholder={"Account Type"}
            onValueChange={(itemValue) => inputHandler(itemValue, "type")}
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
          >
            <Select.Item label={"Customer"} value={"customer"} />
            <Select.Item label={"Job Seeker"} value={"jobseeker"} />
          </Select>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Please make a selection!
          </FormControl.ErrorMessage>
        </FormControl>
        <Input
          placeholder={"Username"}
          onChangeText={(email) => inputHandler(email, "email")}
        />
        <Input
          placeholder={"Password"}
          onChangeText={(password) => inputHandler(password, "password")}
        />

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
