import { Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import BaseButton from "@src/components/utils/button";
import TextDisplay from "@src/components/utils/textdisplay";
import { Modal, ScrollView } from "native-base";
import React, { useEffect, useState } from "react";
import ErrorAlert from "@src/components/utils/erroralert";
import getServiceInfo from "@src/api/service/getServiceInfo";
import postAcceptJob from "@src/api/job/postAcceptJob";
import * as SecureStore from "expo-secure-store";

const router = useRouter();

const ViewMovingJobUI = () => {
  const [jobInfo, setJobInfo] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { serviceId, jobId } = useLocalSearchParams();
  const registerHandler = async () => {
    try {
      const accountId = await SecureStore.getItemAsync("accountId");
      const json = await postAcceptJob({ accountId, jobId });

      const validResponse = json !== null ? !!json.success : false;
      if (validResponse) {
        router.replace("/");
        router.push("/jobseeker/registered/register/success");
      }
    } catch (e) {
      setErrorMessage("Error registering job.");
      setShowAlert(true);
    }
  };

  const resetHandler = () => {
    setShowAlert(false);
  };

  const getJobDetails = async () => {
    try {
      const json = await getServiceInfo(serviceId);
      const validResponse = json !== null ? !!json.success : false;
      if (validResponse) {
        setJobInfo(json.body.serviceInfo[0]);
      }
    } catch (e) {
      setErrorMessage("Error fetching job details from API.");
      setShowAlert(true);
    }
  };

  useEffect(() => {
    getJobDetails();
  }, []);

  return (
    <ScrollView>
      <View>
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
        <View className={"flex mx-6 mt-10"}>
          <Text className={`font-RobotoBold text-black text-2xl text-center`}>
            Moving Service Job Information
          </Text>
          <View>
            <View
              className={"flex flex-col p-4 mt-4 rounded-lg border space-y-2"}
            >
              <Text
                className={"text-center font-RobotoBold text-xl text-primary"}
              >
                Collection Details
              </Text>
              <View>
                <TextDisplay
                  title={"Collection Date"}
                  content={
                    jobInfo.collectionDate + ", " + jobInfo.collectionTime
                  }
                />
              </View>

              <View>
                <TextDisplay
                  title={"Collection Address"}
                  content={jobInfo.collectionAddress}
                />
              </View>

              <Text
                className={`font-RobotoBold text-black text-3xl text-center p-5`}
              >
                PUT MAP HERE
              </Text>
            </View>

            <View
              className={"flex flex-col p-4 mt-4 rounded-lg border space-y-2"}
            >
              <Text
                className={"text-center font-RobotoBold text-xl text-secondary"}
              >
                Delivery Details
              </Text>

              <View>
                <TextDisplay
                  title={"Delivery Date"}
                  content={jobInfo.deliveryDate + ", " + jobInfo.deliveryTime}
                />
              </View>

              <View>
                <TextDisplay
                  title={"Delivery Address"}
                  content={jobInfo.deliveryAddress}
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
        </View>
      </View>
    </ScrollView>
  );
};

export default ViewMovingJobUI;
