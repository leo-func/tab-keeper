import { getBillProducts, getBills } from "@/src/services/bill.service";
import { getProduct } from "@/src/services/product.service";
import { getProfileByCode } from "@/src/services/user.model";
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
