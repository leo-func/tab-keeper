import { router, useLocalSearchParams } from "expo-router";
import EditProductView from "@/src/view/EditProductView";

export default function EditProductScreen() {
    const { productId, name } = useLocalSearchParams<{ productId: string; name: string }>();
    console.log(productId)

    return (
        <EditProductView productId={productId} initialName={name} onBack={() => router.back()}/>
    )
}
