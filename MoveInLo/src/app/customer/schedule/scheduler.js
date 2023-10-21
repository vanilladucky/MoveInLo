import React, { useState } from "react";
import { Text, View, Image, ScrollView } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import BaseButton from "@src/components/utils/button";
import BaseInput from "@src/components/utils/inputbox";
import LandingIcon from "@src/assets/splash/LandingLogo.png";
import DateFormat from "@src/components/utils/dateformat";
import TimeFormat from "@src/components/utils/timerformat";
import { router, useLocalSearchParams } from "expo-router";

const SchedulerUI = () => {
  const { type } = useLocalSearchParams();
  const [info, setInfo] = useState({
    collectionDate: null,
    collectionTime: null,
    collectionAddress: null,
    deliveryDate: null,
    deliveryTime: null,
    deliverAddress: null,
    serviceType: type,
  });
  const [deliveryDateModalVisible, setDeliveryDateModalVisible] =
    React.useState(false);
  const [collectionDateModalVisible, setCollectionDateModalVisible] =
    React.useState(false);
  const [deliveryTimeModalVisible, setDeliveryTimeModalVisible] =
    React.useState(false);
  const [collectionTimeModalVisible, setCollectionTimeModalVisible] =
    React.useState(false);

  const inputHandler = (input, field) => {
    setInfo((prevState) => ({ ...prevState, [field]: input }));
  };

  const dateHandler = (date, field) => {
    inputHandler(DateFormat(date), field);
    setCollectionDateModalVisible(false);
    setDeliveryDateModalVisible(false);
  };

  const timeHandler = (date, field) => {
    inputHandler(TimeFormat(date), field);
    setCollectionTimeModalVisible(false);
    setDeliveryTimeModalVisible(false);
  };

  console.log(info); // For testing purposes
  return (
    <ScrollView className={"h-full m-3"}>
      <View className={"h-[120vh]"}>
        <View className={"flex flex-col m-3"}>
          <Text className={"font-RobotoBold text-2xl mt-2"}>
            Schedule{" "}
            <Text className={"text-secondary"}>
              Moving {type === "MoveIn" ? "In" : "Out"}
            </Text>{" "}
            Service
          </Text>

          <Text className={"font-RobotoMedium text-lg mt-4 underline"}>
            Part 1: Collection
          </Text>

          <View className={"flex flex-col mt-3"}>
            <Text className={"font-RobotoMedium"}>
              Choose a Collection Date
            </Text>

            <View className={"mt-2"}>
              <BaseButton
                primary
                textSize={13}
                title={info.collectionDate ?? "Select Date"}
                onPress={() => setCollectionDateModalVisible(true)}
              />

              <DateTimePicker
                isVisible={collectionDateModalVisible}
                mode={"date"}
                onConfirm={(date) => dateHandler(date, "collectionDate")}
                onCancel={() => setCollectionDateModalVisible(false)}
              />
            </View>
          </View>

          <View className={"mt-4"}>
            <Text className={"font-RobotoMedium"}>Set Collection Time</Text>

            <View className={"mt-2"}>
              <BaseButton
                primary
                textSize={13}
                title={info.collectionTime ?? "Select Time"}
                onPress={() => setCollectionTimeModalVisible(true)}
              />
            </View>

            <DateTimePicker
              isVisible={collectionTimeModalVisible}
              mode={"time"}
              onConfirm={(time) => timeHandler(time, "collectionTime")}
              onCancel={() => setCollectionTimeModalVisible(false)}
            />
          </View>

          <View className={"mt-4"}>
            <View className={"items-center my-4"}>
              <Image source={LandingIcon} />
            </View>

            <BaseInput
              title="Enter Collection Address"
              placeholder={"e.g. 123 Main st."}
              onChangeText={(address) =>
                inputHandler(address, "collectionAddress")
              }
            />
          </View>

          {/* PART 2 */}
          <View className={"flex flex-col mt-3"}>
            <Text className={"font-RobotoMedium text-lg mt-4 underline"}>
              Part 2: Delivery
            </Text>

            <Text className={"font-RobotoMedium mt-4"}>
              Choose a Delivery Date
            </Text>

            <View className={"mt-2"}>
              <BaseButton
                primary
                textSize={13}
                title={info.deliveryDate ?? "Select Date"}
                onPress={() => setDeliveryDateModalVisible(true)}
              />

              <DateTimePicker
                isVisible={deliveryDateModalVisible}
                mode={"date"}
                onConfirm={(date) => dateHandler(date, "deliveryDate")}
                onCancel={() => setDeliveryDateModalVisible(false)}
              />
            </View>
          </View>

          <View className={"mt-4"}>
            <Text className={"font-RobotoMedium"}>Set Delivery Time</Text>

            <View className={"mt-2"}>
              <BaseButton
                primary
                textSize={13}
                title={info.deliveryTime ?? "Select Time"}
                onPress={() => setDeliveryTimeModalVisible(true)}
              />
            </View>

            <DateTimePicker
              isVisible={deliveryTimeModalVisible}
              mode={"time"}
              onConfirm={(time) => timeHandler(time, "deliveryTime")}
              onCancel={() => setDeliveryTimeModalVisible(false)}
            />
          </View>

          <View className={"mt-4"}>
            <View className={"items-center my-4"}>
              <Image source={LandingIcon} />
            </View>

            <BaseInput
              title="Enter Delivery Address"
              placeholder={"e.g. 123 Main st."}
              onChangeText={(address) =>
                inputHandler(address, "deliveryAddress")
              }
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
              margin: 5,
              marginTop: 15,
            }}
          >
            <BaseButton
              title="Schedule"
              width="70%"
              link={"/customer/schedule/schedulesuccess"}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
              margin: 5,
            }}
          >
            <BaseButton title="Cancel" width="70%" onPress={router.back} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SchedulerUI;
