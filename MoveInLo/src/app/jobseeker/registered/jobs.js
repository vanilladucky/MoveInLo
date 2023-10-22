import { Text, View } from "react-native";
import House from "@src/assets/splash/House.png";
import BaseRegisteredCard from "@src/components/utils/registeredcard";

const RegisteredJobsUI = () => {
  const registeredJobs = [
    {
      title: "5th January 2024, Mon",
      description: "Hall of Residence 3",
    },
    {
      title: "4th January 2024, Mon",
      description: "Hall of Residence 4",
    },
  ];

  return (
    <View>
      <Text
        className={`font-RobotoBold text-black text-2xl text-left p-5 mt-2`}
      >
        Registered Jobs
      </Text>

      {registeredJobs.map((job, index) => {
        return (
          <BaseRegisteredCard
            key={index}
            source={House}
            title={job.title}
            description={job.description}
          />
        );
      })}
    </View>
  );
};

export default RegisteredJobsUI;
