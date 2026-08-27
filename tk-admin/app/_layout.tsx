import { Stack, usePathname } from "expo-router";
import * as SystemUi from "expo-system-ui";

import { FloatingMenu } from "@/src/components/FloatingMenu";
import { COLORS } from "@/src/constants/Color";
import { useFloatingMenu } from "@/src/hooks/useFloatingMenu";

SystemUi.setBackgroundColorAsync(COLORS.background);

export default function RootLayout() {
  const pathname = usePathname();
  const {HandleLogout} = useFloatingMenu();

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: COLORS.background,
          },
        }}
      />

      {pathname !== "/" && pathname !== "/login" && !pathname.startsWith("/profiles/edit") && !pathname.startsWith("/profiles/create") && !pathname.startsWith("/products/create") && !pathname.startsWith("/products/edit") && (
        <FloatingMenu
          onLogout={HandleLogout}
        />
      )}
    </>
  );
}