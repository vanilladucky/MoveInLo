import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import QuestionIcon from "@src/assets/splash/QuestionIcon.png";
import { Screen } from "react-native-screens";
import BaseButton from "@src/components/utils/button";

const router = useRouter();

const JobWithdrawalRequestUI = () => {
  const { id } = useLocalSearchParams();

  const withdrawHandler = () => {
    // TODO: Update database to WITHDRAWN status
    console.log(id);
    router.push("jobseeker/registered/withdrawal/success");
  };

  return (
    <View>
      <Screen
        className={`flex flex-col h-full w-full items-center justify-center`}
        style={{ top: 17 }}
      >
        <Image source={QuestionIcon} style={{ alignSelf: "center" }} />
        <Text
          className={`font-RobotoBold text-black text-2xl text-center mt-4`}
        >
          Withdraw Registered Job?
        </Text>
        <View className={"w-4/5"}>
          <Text
            className={`font-RobotoRegular text-black text-center mt-4`}
            style={{ fontSize: 15 }}
          >
            We will send an application to our team for review if you intend to
            withdraw
          </Text>
        </View>

        <View className={`text-2xl items-center mt-6`}>
          <BaseButton
            secondary
            title={"Withdraw"}
            onPress={() => withdrawHandler()}
            width={140}
          />
        </View>
      </Screen>
    </View>
  );
};

export default JobWithdrawalRequestUI;
