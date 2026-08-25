import ProductView from "@/src/view/ProductView";
import { useProductViewModel } from "@/src/viewmodels/product.viewmodel";

export default function ProductsScreen() {
  const model = useProductViewModel()

  return (
    <ProductView {...model}/>
  )
}
