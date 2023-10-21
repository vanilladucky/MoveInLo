import { Text, View, Image } from "react-native";
import BaseButton from "@src/components/utils/button";
import QuestionIcon from "@src/assets/splash/QuestionIcon.png";
import React from "react";
import { router } from "expo-router";

const CancelServiceUI = () => {
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
          <Image source={QuestionIcon} />
        </View>
        <View
          className={"flex flex-column"}
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
            Cancel Moving Service?
          </Text>
          <Text
            style={{
              fontSize: 15,
              textAlign: "center",
              color: "#181C62",
              margin: -40,
              marginBottom: -60,
              padding: 60,
            }}
          >
            We will remove your scheduled moving service if you intend to
            withdraw.
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
            secondary
            title="Cancel"
            link="customer/tracker/cancelsuccess"
          />
          <BaseButton
            style={{
              backgroundColor: "#181C62",
              padding: 8,
              paddingLeft: 15,
              paddingRight: 15,
              borderRadius: 7,
            }}
            title="Back"
            onPress={() => router.back()}
          />
        </View>
      </View>
    </View>
  );
};

export default CancelServiceUI;
