import { View, Text } from "react-native";
import { ScrollView } from "native-base";
import React from "react";
import LandingIcon from "@src/assets/splash/LandingLogo.png";
import BaseCard from "@src/components/utils/card";
import BaseButton from "@src/components/utils/button";

const CustomerHomeUI = () => {
  const cardInfo = [
    {
      title: "Schedule a pickup",
      description:
        "Specify the date, time, and location for our team to collect your items.",
      source: LandingIcon,
    },
    {
      title: "Expert Storage",
      description:
        "Your belongings will be securely stored in our warehouses until you need them back.",
      source: LandingIcon,
    },
    {
      title: "Convenient delivery",
      description:
        "Choose a delivery date and location, and we'll bring your items right to you.",
      source: LandingIcon,
    },
    {
      title: "Track progress",
      description:
        "Stay updated with the collection, storage, and delivery processes.",
      source: LandingIcon,
    },
  ];

  return (
    <ScrollView className={"h-full w-full"}>
      <View
        className={`flex flex-column m-4`}
        style={{
          flexDirection: "column",
          borderColor: "red",
          alignItems: "left",
          margin: 10,
          marginTop: 17,
          justifyContent: "space-evenly",
        }}
      >
        <Text className={"font-RobotoBold text-2xl"}>
          Welcome to Our Moving & Storage Service!
        </Text>
        <View className={"mt-2"}>
          <Text className={"font-RobotoLight"}>
            Store your items hassle-free
          </Text>
        </View>
      </View>

      <View className={"pl-5"}>
        <Text style={{ flex: 0.3, fontWeight: "bold", fontSize: 18 }}>
          How It Works
        </Text>
      </View>

      {cardInfo.map((data, index) => {
        return (
          <BaseCard
            key={index}
            source={data.source}
            index={index + 1}
            title={data.title}
            description={data.description}
          />
        );
      })}

      <View className={"flex items-center w-full mt-2"}>
        <BaseButton primary title={"Schedule"} link={"customer/schedule"} />
      </View>
    </ScrollView>
  );
};

export default CustomerHomeUI;
