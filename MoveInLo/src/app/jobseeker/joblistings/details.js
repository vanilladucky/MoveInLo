import { Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import BaseButton from "@src/components/utils/button";
import TextDisplay from "@src/components/utils/textdisplay";
import { ScrollView } from "native-base";
import { useEffect } from "react";

const router = useRouter();

const ViewMovingJobUI = () => {
  const registerHandler = () => {
    router.replace("/");
    router.push("/jobseeker/registered/register/success");
  };

  const { id } = useLocalSearchParams();

  useEffect(() => {
    // TODO: Add backend logic for getting job details
    console.log(id);
  }, []);

  return (
    <ScrollView>
      <View className={"flex mx-6 mt-10"}>
        <Text className={`font-RobotoBold text-black text-2xl text-center`}>
          Moving Service Job Information
        </Text>

        <View className={"flex flex-col p-4 mt-4 rounded-lg border space-y-2"}>
          <Text className={"text-center font-RobotoBold text-xl text-primary"}>
            Collection Details
          </Text>
          <View>
            <TextDisplay
              title={"Collection Date"}
              content={"15th January 2024, Sun" + "," + "12:50 AM"}
            />
          </View>

          <View>
            <TextDisplay
              title={"Collection Address"}
              content={"123 Jurong West, S123456"}
            />
          </View>

          <Text
            className={`font-RobotoBold text-black text-3xl text-center p-5`}
          >
            PUT MAP HERE
          </Text>
        </View>

        <View className={"flex flex-col p-4 mt-4 rounded-lg border space-y-2"}>
          <Text
            className={"text-center font-RobotoBold text-xl text-secondary"}
          >
            Delivery Details
          </Text>

          <View>
            <TextDisplay
              title={"Delivery Date"}
              content={"15th January 2024, Sun" + "," + "12:50 AM"}
            />
          </View>

          <View>
            <TextDisplay
              title={"Delivery Address"}
              content={"123 Jurong West, S123456"}
            />
          </View>

          <Text
            className={`font-RobotoBold text-black text-3xl text-center p-5`}
          >
            PUT MAP HERE
          </Text>
        </View>

        <View className={`text-2xl items-center mt-5`}>
          <BaseButton
            primary
            title={"Register"}
            onPress={() => registerHandler()}
            width={200}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ViewMovingJobUI;
