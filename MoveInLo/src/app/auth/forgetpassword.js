import { Text, View } from "react-native";
import BaseInput from "@src/components/utils/inputbox";
import BaseButton from "@src/components/utils/button";
import {
  Box,
  CheckIcon,
  Collapse,
  FormControl,
  HStack,
  Select,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import { useState } from "react";
import ErrorAlert from "@src/components/utils/erroralert";
import { useRouter } from "expo-router";

const ForgetPasswordUI = () => {
  const [accountInfo, setAccountInfo] = useState({
    type: "",
    email: "",
    newPassword: "",
    newPassword2: "",
  });

  const [invalidInput, setInvalidInput] = useState({
    type: "",
    email: "",
    password: "",
    doNotMatch: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  const inputHandler = (input, field) => {
    setAccountInfo((prevState) => ({ ...prevState, [field]: input }));
    setShowAlert(false);
  };

  const messageHandler = async (message, field) => {
    setInvalidInput((prevState) => ({ ...prevState, [field]: message }));
  };

  const resetHandler = () => {
    setShowAlert(false);
  };

  const message = () => {
    return Object.values(invalidInput).reduce((finalMessage, key) => {
      const m = key !== "" ? "\n  - " + key : "";
      return finalMessage + m;
    }, "Error(s): ");
  };

  const searchHandler = async () => {
    // TODO: Backend logic to find email
    const validEmail = accountInfo.email !== "";
    const validType = accountInfo.type !== "";

    await messageHandler(
      !validType ? "Account type not selected." : "",
      "type"
    );

    await messageHandler(!validEmail ? "Invalid email address" : "", "email");

    if (validType && validEmail) {
      setIsVisible(true);
    } else {
      setShowAlert(true);
    }
  };

  const submitHandler = async () => {
    // TODO: Backend logic for validating email
    const validEmail = accountInfo.email !== "";
    const validNewPassword = accountInfo.newPassword.length >= 8;
    const matchingPassword =
      accountInfo.newPassword2 === accountInfo.newPassword;

    const redirectedRoute =
      accountInfo.type === "customer" ? "customer/home" : "jobseeker/home";

    await messageHandler(
      !validNewPassword ? "Invalid password." : "",
      "password"
    );

    await messageHandler(
      !matchingPassword ? "Passwords do not match!" : "",
      "doNotMatch"
    );

    await messageHandler(!validEmail ? "Invalid email address" : "", "email");

    console.log(accountInfo);

    if (validNewPassword && matchingPassword) {
      // TODO: Update password in database
      router.push(redirectedRoute);
    } else {
      setShowAlert(true);
    }
  };

  return (
    <View className={"flex h-full w-full items-center"}>
      <View className={"absolute z-10 w-3/4 h-28"}>
        {showAlert && (
          <ErrorAlert
            message={message()}
            onPress={() => resetHandler()}
            shown={showAlert}
          />
        )}
      </View>
      <Text className={"font-RobotoBold text-2xl mt-36"}>Forget Password</Text>

      <View className={"w-3/4 mt-8 flex flex-col"}>
        <FormControl className={"w-1/2"}>
          <Text className={"font-RobotoMedium"}>Account Type</Text>
          <Select
            selectedValue={accountInfo.type}
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
        </FormControl>
        <Box
          className={"flex flex-row space-x-2 mt-0 mb-2"}
          style={{
            display: showAlert && accountInfo.type === "" ? "" : "none",
          }}
        >
          <View className={"mt-0.5 ml-1"}>
            <WarningOutlineIcon size="xs" color={"red.500"} />
          </View>
          <Text className={"text-red-600"}>Please make a selection!</Text>
        </Box>

        <View className={"mt-2"}>
          <BaseInput
            title={"Email"}
            defaultValue={accountInfo.email}
            placeholder={"Enter your email address"}
            onChangeText={(email) => inputHandler(email, "email")}
          />
        </View>

        <View className={"items-end mt-4"}>
          <BaseButton title={"Search"} onPress={searchHandler} />
        </View>

        <Collapse isOpen={isVisible}>
          <VStack className={"w-full space-y-2"}>
            <HStack className={"mt-5 items-center"}>
              <BaseInput
                title={"New Password"}
                defaultValue={accountInfo.newPassword}
                onChangeText={(input) => inputHandler(input, "newPassword")}
              />
            </HStack>
            <HStack>
              <BaseInput
                title={"Re-enter new password"}
                defaultValue={accountInfo.newPassword2}
                onChangeText={(input) => inputHandler(input, "newPassword2")}
              />
            </HStack>
          </VStack>

          <View className={"items-end mt-4"}>
            <BaseButton title={"Submit"} onPress={submitHandler} />
          </View>
        </Collapse>
      </View>
    </View>
  );
};

export default ForgetPasswordUI;
