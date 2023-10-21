import React from "react";
import LandingIcon from "@src/assets/splash/LandingLogo.png";
import BaseButton from "@src/components/utils/button";
import { View, Text, Image } from "react-native";

const SchedulingOptionsUI = () => {
  return (
    <View
      style={{
        alignContent: "center",
        justifyContent: "center",
        flex: true,
        flexDirection: "column",
        display: "flex",
      }}
    >
      <View className={`flex flex-column`}>
        <View
          className={"flex flex-row"}
          style={{ margin: 10, justifyContent: "center" }}
        >
          <Image source={LandingIcon} />
        </View>
        <View
          className={"flex flex-row"}
          style={{
            margin: 10,
            justifyContent: "center",
            paddingLeft: 15,
            paddingRight: 15,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              fontWeight: "bold",
              color: "#181C62",
            }}
          >
            What type of Moving Service do you require?
          </Text>
        </View>
        <View
          className={"flex flex-row"}
          style={{ justifyContent: "space-evenly", marginTop: 13 }}
        >
          <BaseButton
            style={{
              backgroundColor: "#181C62",
              padding: 8,
              paddingLeft: 15,
              paddingRight: 15,
              borderRadius: 7,
            }}
            title="Move In"
            link="/customer/schedule/movein"
          />
          <BaseButton
            style={{
              backgroundColor: "#181C62",
              padding: 8,
              paddingLeft: 15,
              paddingRight: 15,
              borderRadius: 7,
            }}
            title="Move Out"
            link="/customer/home"
          />
        </View>
      </View>
    </View>
  );
};

export default SchedulingOptionsUI;
