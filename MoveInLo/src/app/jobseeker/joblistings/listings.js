import { Text, View } from "react-native";
import HouseIcon from "@src/assets/splash/House.png";
import { ScrollView } from "native-base";
import BaseJobCard from "@src/components/utils/jobcard";

const JobListingsUI = () => {
  const jobListings = [
    {
      title: "18 Jan 2023, 12.00 AM",
      description: "Hall of Residence 3",
    },
  ];
  return (
    <ScrollView>
      <View className={"h-full w-full mt-2"}>
        <Text className={`font-RobotoBold text-black text-2xl text-left m-6`}>
          Job Listings
        </Text>

        <View className={`flex-row`}>
          {jobListings.map((job, index) => {
            return (
              <BaseJobCard
                key={index}
                id={1}
                source={HouseIcon}
                title={job.title}
                description={job.description}
              />
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default JobListingsUI;
