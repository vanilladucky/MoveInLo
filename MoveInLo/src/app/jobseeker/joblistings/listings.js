import { Text, View } from "react-native";
import HouseIcon from "@src/assets/splash/House.png";
import { Modal, ScrollView } from "native-base";
import BaseJobCard from "@src/components/utils/jobcard";
import React, { useEffect, useState } from "react";
import ErrorAlert from "@src/components/utils/erroralert";
import getJobListings from "@src/api/job/getJobListings";
import { useNavigation } from "expo-router";

const JobListingsUI = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [jobListings, setJobListings] = useState([]);
  const navigation = useNavigation();

  const fetchJobListings = async () => {
    try {
      const json = await getJobListings();
      const validResponse = json !== null ? !!json.success : false;
      if (validResponse) {
        setJobListings(json.body);
      }
    } catch (e) {
      setErrorMessage("Error fetching info for job listings.");
      setShowAlert(true);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchJobListings();
    });

    return () => {
      unsubscribe(); // Cleanup when the component is unmounted
    };
  }, [navigation]);

  const resetHandler = () => {
    setShowAlert(false);
  };

  return (
    <ScrollView>
      <View className={"h-full w-full mt-2"}>
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
        <Text className={`font-RobotoBold text-black text-2xl text-left m-6`}>
          Job Listings
        </Text>

        <View className={`flex-col`}>
          {!jobListings.length ? (
            <View
              className={
                "flex h-full w-full items-center justify-center px-5 -mt-4"
              }
            >
              <View className={"px-5 border-t-2 w-full "}>
                <Text
                  className={
                    "text-center font-RobotoMedium text-lg text-secondary mt-5"
                  }
                >
                  No Jobs Found!
                </Text>
              </View>
            </View>
          ) : (
            jobListings.map((job, index) => {
              return (
                <BaseJobCard
                  key={index}
                  listingInfo={{
                    serviceId: job.serviceId,
                    jobId: job.jobId,
                  }}
                  source={HouseIcon}
                  title={job.title}
                  description={job.subtitle}
                />
              );
            })
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default JobListingsUI;
