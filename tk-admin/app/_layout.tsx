import { COLORS } from "@/src/constants/Color";
import { Stack } from "expo-router";
import * as SystemUi from "expo-system-ui"

SystemUi.setBackgroundColorAsync(COLORS.background)

export default function RootLayout() {
  return <Stack screenOptions={{
    headerShown: false,
    contentStyle: {
      backgroundColor: COLORS.background
    },
  }
}/>;
}
