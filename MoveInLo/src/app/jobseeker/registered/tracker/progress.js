import React, { useEffect, useState } from "react";
import { Text, View, Image, ScrollView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Modal } from "native-base";
import { SERVICE_STATUS } from "@server/enum/ServiceStatus";
import BaseButton from "@src/components/utils/button";
import LandingIcon from "@src/assets/splash/LandingLogo.png";
import TextDisplay from "@src/components/utils/textdisplay";
import ErrorAlert from "@src/components/utils/erroralert";
import getServiceInfo from "@src/api/service/getServiceInfo";
import getUserInfo from "@src/api/auth/getUserInfo";
import getJobProgress from "@src/api/progress/getJobProgress";
import putUpdateCollection from "@src/api/progress/putUpdateCollection";
import putUpdateDelivered from "@src/api/progress/putUpdateDelivered";
import putUpdatePaid from "@src/api/progress/putUpdatePaid";

const JobSeekerTrackerUI = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { accountId, serviceId, jobId } = useLocalSearchParams();

  const [jobInfo, setJobInfo] = useState({});
  const [personnelInfo, setPersonnelInfo] = useState({});
  const [serviceStatus, setServiceStatus] = useState(SERVICE_STATUS.PENDING);

  const fetchAllData = async () => {
    try {
      Promise.all([
        getServiceInfo(serviceId),
        getUserInfo(accountId),
        getJobProgress(jobId),
      ])
        .then(([serviceData, userData, jobData]) => {
          setJobInfo(serviceData.body.serviceInfo[0]);
          setPersonnelInfo(userData.body);
          setServiceStatus(jobData.body.progress[0]);
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage("Error retrieving progress information.");
          setShowAlert(true);
        });
    } catch (e) {
      setErrorMessage("Error retrieving data.");
      setShowAlert(true);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const resetHandler = () => {
    setShowAlert(false);
  };

  const updateCheckIn = async () => {
    try {
      const json = await putUpdateCollection({ jobId });
      const validResponse = json !== null ? !!json.success : false;
      if (validResponse) {
        const newStatus = await getJobProgress(jobId);
        setServiceStatus(newStatus);
      }
    } catch (e) {
      setErrorMessage("Error when checking in.");
      setShowAlert(true);
    }
  };

  const updateWithdraw = () => {
    router.replace("/");
    router.push({
      pathname: "jobseeker/registered/withdrawal/request",
      params: { accountId, jobId },
    });
  };

  const updateCompleted = async () => {
    try {
      const json = await putUpdateDelivered({ jobId });
      const validResponse = json !== null ? !!json.success : false;
      if (validResponse) {
        // TODO: CHECK WHY ITS NOT WORKING!!!
        const newStatus = await getJobProgress(jobId);
        if (newStatus) {
          setServiceStatus(newStatus);
        }
      }
    } catch (e) {
      setErrorMessage("Error when updating completion.");
      setShowAlert(true);
    }
  };

  const updatePayment = async () => {
    try {
      const json = await putUpdatePaid({ jobId });
      const validResponse = json !== null ? !!json.success : false;
      if (validResponse) {
        router.push("jobseeker/registered/tracker/payment");
      } else {
        setErrorMessage("Did not update to paid.");
        setShowAlert(true);
      }
    } catch (e) {
      setErrorMessage("Error when updating payment.");
      setShowAlert(true);
    }
  };

  return (
    <ScrollView className={"flex flex-column m-6"}>
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
      <View className={"mt-4"}>
        <Text className={"font-RobotoBold text-2xl"}>Progress Tracker</Text>

        <View
          className={
            "inline-block top-[107px] mx-[70px] border-b-[1px] border-primary"
          }
        />
        <View
          className={"flex flex-row"}
          style={{ justifyContent: "space-evenly", gap: 20, marginTop: 20 }}
        >
          <View
            className={"flex flex-column"}
            style={{ justifyContent: "center", alignItems: "center", gap: 5 }}
          >
            <Text style={{ fontSize: 25 }}>📅</Text>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Scheduled</Text>

            {serviceStatus === SERVICE_STATUS.PENDING ? (
              <Text style={{ marginTop: 20 }}>●</Text>
            ) : (
              <Text style={{ marginTop: 20 }}>○</Text>
            )}
          </View>

          <View
            className={"flex flex-column"}
            style={{ justifyContent: "center", alignItems: "center", gap: 5 }}
          >
            <Text style={{ fontSize: 25 }}>🚚</Text>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              In Progress
            </Text>

            {serviceStatus === SERVICE_STATUS.PROGRESS ? (
              <Text style={{ marginTop: 20 }}>●</Text>
            ) : (
              <Text style={{ marginTop: 20 }}>○</Text>
            )}
          </View>

          <View
            className={"flex flex-column"}
            style={{ justifyContent: "center", alignItems: "center", gap: 5 }}
          >
            <Text style={{ fontSize: 25 }}>📦</Text>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Delivered!</Text>

            {serviceStatus === SERVICE_STATUS.DELIVERED ? (
              <Text style={{ marginTop: 20 }}>●</Text>
            ) : (
              <Text style={{ marginTop: 20 }}>○</Text>
            )}
          </View>
        </View>

        <View
          className={"flex flex-column"}
          style={{
            justifyContent: "space-between",
            borderWidth: 1,
            borderRadius: 5,
            margin: 10,
            marginLeft: 40,
            marginRight: 40,
            marginTop: 20,
            padding: 12,
          }}
        >
          <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
            Delivery Information
          </Text>
          <TextDisplay
            title={"Collection"}
            content={jobInfo.collectionDate + ", " + jobInfo.collectionTime}
          />
          <TextDisplay
            title={"Delivery"}
            content={jobInfo.deliveryDate + ", " + jobInfo.deliveryTime}
          />

          <TextDisplay title={"Service"} content={jobInfo.serviceType} />
        </View>

        <View
          className={"flex flex-column"}
          style={{
            justifyContent: "space-between",
            borderWidth: 1,
            borderRadius: 5,
            margin: 10,
            marginLeft: 40,
            marginRight: 40,
            marginTop: 15,
            padding: 12,
          }}
        >
          <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
            Intended Recipient
          </Text>
          <TextDisplay title={"Name"} content={personnelInfo.username} />
          <TextDisplay
            title={"Contact number"}
            content={personnelInfo.number}
          />
        </View>

        {/* GOOGLE STATIC MAP */}
        {serviceStatus === SERVICE_STATUS.DELIVERED ? (
          <View
            className={
              "mt-4 flex flex-col item-center justify-center border-2 border-primary p-5 rounded-xl"
            }
          >
            <Text className={"font-RobotoBold text-center text-lg"}>
              Thank you for your service!{" "}
            </Text>
            <Text className={"font-RobotoRegular text-center mt-2"}>
              Our team will contact you regarding the payment.
            </Text>
            <Text className={"font-RobotoRegular text-center"}>
              Do indicate here once you have received the payment
            </Text>
          </View>
        ) : (
          <View
            className={"flex flex-row"}
            style={{ justifyContent: "center", borderWidth: 2, margin: 10 }}
          >
            <Image source={LandingIcon} />
          </View>
        )}

        {/* DYNAMIC BUTTONS */}
        {serviceStatus === SERVICE_STATUS.PENDING ? (
          <View
            className={
              "flex flex-row space-x-4 items-center justify-center mt-4"
            }
          >
            <View>
              <BaseButton
                primary
                width={140}
                title="Check In"
                onPress={() => updateCheckIn()}
              />
            </View>
            <View>
              <BaseButton
                secondary
                width={140}
                title="Withdraw"
                onPress={() => updateWithdraw()}
              />
            </View>
          </View>
        ) : serviceStatus === SERVICE_STATUS.PROGRESS ? (
          <View
            className={
              "flex flex-row space-x-4 items-center justify-center mt-4"
            }
          >
            <View>
              <BaseButton
                primary
                width={180}
                title="Completed"
                onPress={() => updateCompleted()}
              />
            </View>
          </View>
        ) : (
          <View
            className={
              "flex flex-row space-x-4 items-center justify-center mt-4"
            }
          >
            <BaseButton
              primary
              width={180}
              title="Payment Received"
              onPress={() => updatePayment()}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default JobSeekerTrackerUI;
