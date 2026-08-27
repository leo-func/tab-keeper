import ProductView from "@/src/view/ProductView";
import { useProductViewModel } from "@/src/viewmodels/product.viewmodel";
import { router } from "expo-router";

export default function ProductsScreen() {
  const model = useProductViewModel()

  const goToEdit = (productId: string, name: string) => {
    router.push({
      pathname: "/products/edit/[productId]",
      params: {
        productId,
        name
      }
    })
  }

  const goToCreate = () => router.push("/products/create") 

  return (
    <ProductView 
    {...model}
    goToEdit={goToEdit}
    goToCreate={goToCreate}
    />
  )
}
