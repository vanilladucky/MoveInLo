import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Box,
  CheckIcon,
  FormControl,
  Select,
  WarningOutlineIcon,
} from "native-base";
import BaseButton from "@src/components/utils/button";
import BaseInput from "@src/components/utils/inputbox";
import ErrorAlert from "@src/components/utils/erroralert";
import postNewAccount from "@src/api/auth/postNewAccount";

const SignUpUI = () => {
  const [newAccountInfo, setNewAccountInfo] = useState({
    email: "",
    username: "",
    age: "",
    type: "",
    number: "",
    password: "",
    passwordCheck: "",
  });
  const [invalidInput, setInvalidInput] = useState({
    email: false,
    username: false,
    age: false,
    type: false,
    number: false,
    password: false,
    passwordCheck: false,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  const inputHandler = (input, field) => {
    setNewAccountInfo((prevState) => ({ ...prevState, [field]: input }));
    setShowAlert(false);
  };

  const invalidHandler = (bool, field) => {
    setInvalidInput((prevState) => ({ ...prevState, [field]: bool }));
    return bool;
  };

  const validationHandler = (field) => {
    // TODO: Insert backend logic
    const validEmail =
      newAccountInfo.email !== "" &&
      newAccountInfo.email.includes("@") &&
      newAccountInfo.email.includes(".com");

    const validType = newAccountInfo.type !== "";

    const validUsername = newAccountInfo.username !== "";

    const validPassword =
      newAccountInfo.password.length >= 8 &&
      /[A-Z]/.test(newAccountInfo.password) &&
      /[0-9]/.test(newAccountInfo.password) &&
      /[!@#$%^&*()_+]/.test(newAccountInfo.password);

    const validAge = newAccountInfo.age > 16;

    const validNumber =
      newAccountInfo.number.length === 8 &&
      /^[0-9]+$/.test(newAccountInfo.number);

    const matchingPassword =
      newAccountInfo.password === newAccountInfo.passwordCheck;

    switch (field) {
      case "type":
        return invalidHandler(validType, field);

      case "email":
        return invalidHandler(validEmail, field);

      case "username":
        return invalidHandler(validUsername, field);

      case "age":
        return invalidHandler(validAge, field);

      case "number":
        return invalidHandler(validNumber, field);

      case "password":
        return invalidHandler(validPassword, field);

      case "passwordCheck":
        return invalidHandler(matchingPassword, field);
    }
  };

  const isValidInput = () => {
    return Object.keys(newAccountInfo).reduce((isValid, field) => {
      const validField = validationHandler(field);
      return isValid && validField;
    }, true);
  };

  const submitHandler = async () => {
    if (isValidInput()) {
      await postNewAccount(newAccountInfo).then((json) => {
        const validResponse = json !== null ? !!json.success : false;
        if (validResponse) {
          console.log(json);
          router.push({
            pathname: "/auth/pdpa",
            params: { type: json.body.type },
          });
        } else {
          setErrorMessage(json.body);
          setShowAlert(true);
        }
      });
    } else {
      setShowAlert(true);
    }
  };

  return (
    <View className={"flex h-full w-full items-center"}>
      {/* ALERT */}
      {showAlert && (
        <View className={"absolute z-10 w-3/4"}>
          <ErrorAlert
            title={"Please try again!"}
            message={errorMessage ?? "You have missing or invalid inputs!"}
            onPress={() => setShowAlert(false)}
            shown={showAlert}
          />
        </View>
      )}

      {/* Toggle to Login */}
      <View className={"flex flex-row mt-8"}>
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

      {/* Form */}
      <View className={"flex flex-col w-3/4 mt-2"}>
        <BaseInput
          title={"Email"}
          placeholder={"Enter your email"}
          defaultValue={newAccountInfo.email}
          onChangeText={(email) => inputHandler(email, "email")}
        />
        {showAlert && !invalidInput.email && (
          <View>
            <Text className={"text-error font-RobotoRegular text-[13px]"}>
              Please enter a valid email.
            </Text>
          </View>
        )}

        <BaseInput
          title={"Username"}
          placeholder={"Enter a username"}
          defaultValue={newAccountInfo.username}
          onChangeText={(username) => inputHandler(username, "username")}
        />

        {showAlert && !invalidInput.username && (
          <View>
            <Text className={"text-error font-RobotoRegular text-[13px]"}>
              Username is missing.
            </Text>
          </View>
        )}

        <View className={"flex flex-row mt-2 space-x-4"}>
          <View className={"w-1/2"}>
            <FormControl>
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
                <Select.Item label={"Customer"} value={"Customer"} />
                <Select.Item label={"Job Seeker"} value={"JobSeeker"} />
              </Select>
            </FormControl>
            {showAlert && !invalidInput.type && (
              <Box
                className={"mt-0 mb-2"}
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                <Text className={"text-red-600 font-RobotoRegular text-[13px]"}>
                  Please make a selection!
                </Text>
              </Box>
            )}
          </View>

          <View className={"-mt-2.5 w-36"}>
            <BaseInput
              title={"Age"}
              placeholder={"Enter your age"}
              defaultValue={newAccountInfo.age}
              onChangeText={(age) => inputHandler(age, "age")}
            />

            {showAlert && !invalidInput.age && (
              <View>
                <Text className={"text-error font-RobotoRegular text-[13px]"}>
                  Users aged 16 and below cannot register!
                </Text>
              </View>
            )}
          </View>
        </View>

        <BaseInput
          title={"Phone Number"}
          placeholder={"Enter your phone number"}
          defaultValue={newAccountInfo.number}
          onChangeText={(number) => inputHandler(number, "number")}
        />
        {showAlert && !invalidInput.number && (
          <View className={"mb-2"}>
            <Text className={"text-error font-RobotoRegular text-[13px]"}>
              Phone number must be numeric and have 8 digits.
            </Text>
          </View>
        )}

        <BaseInput
          title={"Password"}
          placeholder={"Enter your password"}
          defaultValue={newAccountInfo.password}
          onChangeText={(password) => inputHandler(password, "password")}
        />
        {showAlert && !invalidInput.password && (
          <View className={"mb-2"}>
            <Text className={"text-error font-RobotoRegular text-[13px]"}>
              Password must be at least 8 characters with 1 capital letter, 1
              number and 1 special character.
            </Text>
          </View>
        )}

        <BaseInput
          title={"Re-enter password"}
          placeholder={"Re-enter your password"}
          defaultValue={newAccountInfo.passwordCheck}
          onChangeText={(passwordCheck) =>
            inputHandler(passwordCheck, "passwordCheck")
          }
        />
        {showAlert && !invalidInput.passwordCheck && (
          <View className={"mb-2"}>
            <Text className={"text-error font-RobotoRegular text-[13px]"}>
              Both passwords must match.
            </Text>
          </View>
        )}

        <View className={"mt-2"}>
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
              width={"%full%"}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignUpUI;
