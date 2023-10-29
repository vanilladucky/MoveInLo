import React, { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import { router } from "expo-router";
import { Modal } from "native-base";
import QuestionIcon from "@src/assets/splash/QuestionIcon.png";
import BaseButton from "@src/components/utils/button";
import postWithdrawService from "@src/api/service/postWithdrawService";
import ErrorAlert from "@src/components/utils/erroralert";
import * as SecureStore from "expo-secure-store";

const CancelServiceUI = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [trackerInfo, setTrackerInfo] = useState({
    accountId: "",
    serviceId: "",
    jobId: "",
  });

  const getTrackerInfo = async () => {
    try {
      const accountId = await SecureStore.getItemAsync("accountId");
      const serviceId = await SecureStore.getItemAsync("serviceId");
      const jobId = await SecureStore.getItemAsync("jobId");
      setTrackerInfo({ accountId, serviceId, jobId });
    } catch (e) {
      setErrorMessage("Error fetching info to cancel service.");
      setShowAlert(true);
    }
  };

  useEffect(() => {
    getTrackerInfo();
  }, []);

  const resetHandler = () => {
    setShowAlert(false);
  };

  const withdrawHandler = async () => {
    try {
      await postWithdrawService(trackerInfo).then((json) => {
        const validResponse = json !== null ? !!json.success : false;
        if (validResponse) {
          router.push("customer/tracker/cancelsuccess");
        } else {
          setErrorMessage(json.body);
          setShowAlert(true);
        }
      });
    } catch (e) {
      setErrorMessage("Error calling API endpoint to cancel service.");
      setShowAlert(true);
    }
  };

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
      {showAlert && (
        <Modal isOpen={showAlert} onClose={() => resetHandler()}>
          <Modal.Content className={"bg-transparent"}>
            <Modal.Body>
              <ErrorAlert
                title={"Please try again!"}
                message={errorMessage ?? "Failed to cancel service"}
                onPress={() => resetHandler()}
                shown={showAlert}
              />
            </Modal.Body>
          </Modal.Content>
        </Modal>
      )}
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
            onPress={() => withdrawHandler()}
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
