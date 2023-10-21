import { Text, View, Image } from "react-native";
import React from "react";
import SuccessIcon from "@src/assets/splash/SuccessTickIcon.png";

const PaymentUI = () => {
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
      <View className={`flex flex-column`} style={{ alignItems: "center" }}>
        <Image source={SuccessIcon} />
        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
          Payment Sent!
        </Text>
        <View className={"w-2/3"}>
          <Text
            className={"font-RobotoRegular"}
            style={{
              fontSize: 15,
              marginTop: 15,
              textAlign: "center",
            }}
          >
            Do notify the deliverer that you have transferred the payment!
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PaymentUI;
