import { View, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <View>
        <Text>Test</Text>
      </View>
    </SafeAreaProvider>
  );
}
