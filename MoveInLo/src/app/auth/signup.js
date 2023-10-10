import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import BaseButton from "@src/components/utils/button";
import BaseInput from "@src/components/utils/inputbox";
import {
  CheckIcon,
  FormControl,
  Select,
  WarningOutlineIcon,
} from "native-base";
import { useState } from "react";
import ErrorAlert from "@src/components/utils/erroralert";

const SignUpUI = () => {
  const [newAccountInfo, setNewAccountInfo] = useState({
    email: "",
    username: "",
    password: "",
    age: "",
    type: "",
    number: "",
  });
  const [invalidInput, setInvalidInput] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  const inputHandler = (input, field) => {
    setNewAccountInfo((prevState) => ({ ...prevState, [field]: input }));
  };

  const invalidHandler = (bool, field) => {
    setInvalidInput((prevState) => ({ ...prevState, [field]: bool }));
  };

  const resetHandler = () => {
    newAccountInfo.type = "";
    newAccountInfo.username = "";
    newAccountInfo.password = "";
    newAccountInfo.email = "";
    newAccountInfo.age = "";
    newAccountInfo.number = "";
    setShowAlert(false);
  };

  const isValidInput = () => {
    // TODO: Insert backend logic
    const validType = newAccountInfo.type !== "";
    const validEmail =
      newAccountInfo.email !== "" &&
      newAccountInfo.email.includes("@") &&
      newAccountInfo.email.includes(".com");
    const validUsername = newAccountInfo.username !== "";
    const validPassword =
      newAccountInfo.password !== "" &&
      newAccountInfo.password.includes("*[A-Z]");
    const validAge = newAccountInfo.age >= 18 && newAccountInfo.age < 100;
    const validNumber = newAccountInfo.number.length === 8;

    return (
      validType &&
      validEmail &&
      validUsername &&
      validPassword &&
      validAge &&
      validNumber
    );
  };

  const submitHandler = () => {
    invalidHandler(!newAccountInfo.username, "username");
    invalidHandler(!newAccountInfo.password, "password");
    invalidHandler(!newAccountInfo.type, "type");
    console.log(newAccountInfo);

    if (true) {
      router.push("/auth/pdpa");
    } else {
      setShowAlert(true);
    }
  };

  return (
    <View className={"flex h-full w-full items-center"}>
      {!isValidInput() && (
        <View className={"absolute z-10 w-3/4"}>
          <ErrorAlert
            title={"Please try again!"}
            message={"You have missing or invalid inputs!"}
            onPress={() => resetHandler()}
            shown={showAlert}
          />
        </View>
      )}
      <View className={"flex flex-row mt-20"}>
        <Pressable
          onPress={() => {
            router.push("/auth/login");
          }}
        >
          <Text className="font-RobotoBold text-xl my-2 w-40 text-center">
            Login
          </Text>
        </Pressable>
        <View className={"border-l-2 flex items-center"}>
          <Text className="font-RobotoBold text-xl my-2 w-40 text-center">
            Sign Up
          </Text>
          <View className={"w-28 border-b-4 border-primary"} />
        </View>
      </View>

      <View className={"flex flex-col w-3/4 mt-4"}>
        <BaseInput title={"Email"} placeholder={"Enter your email"} />

        <BaseInput title={"Username"} placeholder={"Enter a username"} />

        <View className={"flex flex-row mt-2 space-x-4"}>
          <FormControl className={"w-1/2"}>
            <Text className={"font-RobotoMedium"}>Account Type</Text>
            <Select
              selectedValue={newAccountInfo.type}
              accessibilityLabel={"Select"}
              placeholder={"Select"}
              onValueChange={(itemValue) => inputHandler(itemValue, "type")}
              _selectedItem={{
                endIcon: <CheckIcon size="3" />,
              }}
            >
              <Select.Item label={"Customer"} value={"customer"} />
              <Select.Item label={"Job Seeker"} value={"jobseeker"} />
            </Select>
            {invalidInput.type && (
              <FormControl.ErrorMessage
                className={"mt-0 mb-2"}
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                <Text className={"text-red-600"}>Please make a selection!</Text>
              </FormControl.ErrorMessage>
            )}
          </FormControl>
          <View className={"-mt-2.5 w-36"}>
            <BaseInput
              title={"Age"}
              placeholder={"Enter your age"}
              width={"full"}
            />
          </View>
        </View>

        <BaseInput
          title={"Phone Number"}
          placeholder={"Enter your phone number"}
        />

        <BaseInput title={"Password"} placeholder={"Enter your password"} />

        <BaseInput
          title={"Re-enter password"}
          placeholder={"Re-enter your password"}
        />

        <View className={"mt-4"}>
          <Text className={"font-RobotoMedium"}>
            Note:{" "}
            <Text className={"font-RobotoRegular"}>
              Remember to keep your personal information safe and do not share
              it with anyone.
            </Text>
          </Text>
        </View>

        <View className={"mt-6"}>
          <View>
            <BaseButton
              primary
              title={"Sign up"}
              onPress={() => submitHandler()}
              width={"full"}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignUpUI;
