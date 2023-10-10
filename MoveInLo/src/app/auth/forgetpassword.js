import { Text, View } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import {
  Box,
  Button,
  CheckIcon,
  Collapse,
  FormControl,
  HStack,
  Modal,
  Select,
  VStack,
} from "native-base";
import ErrorAlert from "@src/components/utils/erroralert";
import BaseInput from "@src/components/utils/inputbox";
import BaseButton from "@src/components/utils/button";

const ForgetPasswordUI = () => {
  const [accountInfo, setAccountInfo] = useState({
    type: "",
    email: "",
    newPassword: "",
    passwordCheck: "",
  });

  const [invalidInput, setInvalidInput] = useState({
    type: "",
    email: "",
    newPassword: "",
    passwordCheck: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const inputHandler = (input, field) => {
    setAccountInfo((prevState) => ({ ...prevState, [field]: input }));
    setShowAlert(false);
  };

  const invalidHandler = (bool, field) => {
    setInvalidInput((prevState) => ({ ...prevState, [field]: bool }));
    return bool;
  };

  const resetHandler = () => {
    setShowAlert(false);
  };

  const validationHandler = (field) => {
    // TODO: Insert backend logic
    const validEmail =
      accountInfo.email !== "" &&
      accountInfo.email.includes("@") &&
      accountInfo.email.includes(".com");

    const validType = accountInfo.type !== "";

    const validPassword =
      accountInfo.newPassword.length >= 8 &&
      /[A-Z]/.test(accountInfo.newPassword) &&
      /[0-9]/.test(accountInfo.newPassword) &&
      /[!@#$%^&*()_+]/.test(accountInfo.newPassword);

    const matchingPassword =
      accountInfo.newPassword === accountInfo.passwordCheck;

    switch (field) {
      case "type":
        return invalidHandler(validType, field);

      case "email":
        return invalidHandler(validEmail, field);

      case "newPassword":
        return invalidHandler(validPassword, field);

      case "passwordCheck":
        return invalidHandler(matchingPassword, field);
    }
  };

  const searchHandler = () => {
    // TODO: Backend logic to find email
    const validEmail = validationHandler("email");
    const validType = validationHandler("type");

    if (validType && validEmail) {
      setIsVisible(true);
    } else {
      setShowAlert(true);
    }
  };

  const submitHandler = () => {
    // TODO: Backend logic for validating email
    const validNewPassword = validationHandler("newPassword");
    const matchingPassword = validationHandler("passwordCheck");
    console.log(validNewPassword, matchingPassword);

    if (validNewPassword && matchingPassword) {
      // TODO: Update newPassword in database
      setModalVisible(true);
    } else {
      setShowAlert(true);
    }
  };

  const redirectedRoute =
    accountInfo.type === "customer" ? "customer/home" : "jobseeker/home";

  const acknowledgementHandler = () => {
    setModalVisible(false);
    router.push(redirectedRoute);
  };

  return (
    <View className={"flex h-full w-full items-center"}>
      <Modal isOpen={modalVisible} onClose={setModalVisible} size={"sm"}>
        <Modal.Content maxH="212">
          <Modal.Body>
            <View className={"mt-2 items-center"}>
              <Text className={"font-RobotoBold text-lg"}>
                Changed Password
              </Text>
              <Text className={"font-RobotoRegular mt-4"}>
                Your password has been changed successfully.
              </Text>
              <Button
                onPress={acknowledgementHandler}
                className={"mt-8 w-20 h-10 bg-primary"}
              >
                <Text className={"font-RobotoBold text-white"}>OK</Text>
              </Button>
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <View className={"absolute z-10 w-3/4 h-20"}>
        {showAlert && (
          <ErrorAlert
            message={"You have missing or invalid inputs!"}
            onPress={() => resetHandler()}
            shown={showAlert}
          />
        )}
      </View>
      <Text className={"font-RobotoBold text-2xl mt-28"}>Forget Password</Text>

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
          <Text className={"text-red-600"}>Please make a selection!</Text>
        </Box>

        <View className={"mt-2"}>
          <BaseInput
            title={"Email"}
            defaultValue={accountInfo.email}
            placeholder={"Enter your email address"}
            onChangeText={(email) => inputHandler(email, "email")}
          />
          {showAlert && !invalidInput.email && (
            <View className={"mb-2"}>
              <Text className={"text-error font-RobotoRegular text-[13px]"}>
                Please enter a valid email.
              </Text>
            </View>
          )}
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
              {showAlert && !invalidInput.newPassword && (
                <View className={"-mt-1"}>
                  <Text
                    className={
                      "text-error text-justify font-RobotoRegular text-[13px]"
                    }
                  >
                    Password must be at least 8 characters with 1 capital
                    letter, 1 number and 1 special character.
                  </Text>
                </View>
              )}
            </HStack>
            <HStack>
              <BaseInput
                title={"Re-enter new password"}
                defaultValue={accountInfo.passwordCheck}
                onChangeText={(input) => inputHandler(input, "passwordCheck")}
              />
            </HStack>
            <HStack>
              {showAlert && !invalidInput.passwordCheck && (
                <View className={"mb-2"}>
                  <Text className={"text-error font-RobotoRegular text-[13px]"}>
                    Both passwords must match.
                  </Text>
                </View>
              )}
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
