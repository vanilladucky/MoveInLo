import { Slot } from "expo-router";
import Footer from "@src/components/navbar/footer";
import Header from "@src/components/navbar/header";

export default function HomeLayout() {
  return (
    <>
      <Header />
      <Slot />
      <Footer />
    </>
  );
}
