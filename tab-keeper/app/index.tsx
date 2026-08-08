import { getProfileByCode } from "@/src/services/user.model";
import { useBillViewModel } from "@/src/viewmodels/bill.viewmodel";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Index() {
  useEffect(() => {
    async function test() {
      console.log(await getProfileByCode('b8d7'));
    }

    test();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
