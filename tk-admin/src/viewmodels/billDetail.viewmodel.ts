import { useState } from "react";
import { useBillProduct } from "../hooks/useBillProduct";
import { useProduct } from "../hooks/useProduct";
import { InsertNewBillProduct } from "../services/bill_product.service";
import { Product } from "../model/Product";
import { BillProduct } from "../model/BillProduct";

export function useBillDetailViewModel(billId: string) {
    const {
        billProducts,
        error: billProductsError,
        loading: billProductsLoading,
        loadNextPage,
    } = useBillProduct(billId)

    const {
        products,
        error: productsError,
        loading: productsLoading,
    } = useProduct()

    const [showAddProduct, setShowAddProduct] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [quantity, setQuantity] = useState(1)
    const [searchText, setSearchText] = useState("")
    const [isComboBoxOpen, setIsComboBoxOpen] = useState(false)
    const [addProductLoading, setAddProductLoading] = useState(false)
    const [addProductError, setAddProductError] = useState<string | null>(null)
    const [createdBillProduct, setCreatedBillProduct] = useState<BillProduct | null>(null)

    const filteredProducts = products?.filter(product =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
    ) ?? []

    function handleOpenAddProduct() {
        setShowAddProduct(true)
    }

    function handleCancelAddProduct() {
        setShowAddProduct(false)
        setSelectedProduct(null)
        setQuantity(1)
        setSearchText("")
        setIsComboBoxOpen(false)
        setAddProductError(null)
    }

    function handleSelectProduct(product: Product) {
        setSelectedProduct(product)
        setSearchText(product.name)
        setIsComboBoxOpen(false)
    }

    function handleIncrementQuantity() {
        setQuantity(prev => prev + 1)
    }

    function handleDecrementQuantity() {
        if (quantity > 1) {
            setQuantity(prev => prev - 1)
        }
    }

    function onDismissCreatedBillProduct() {
        setCreatedBillProduct(null)
    }

    async function handleAddProduct() {
        if (!selectedProduct) return

        try {
            setAddProductLoading(true)
            setAddProductError(null)

            const data = await InsertNewBillProduct(billId, selectedProduct.id, quantity)

            setCreatedBillProduct(data)
            handleCancelAddProduct()
        } catch (exception: any) {
            setAddProductError(exception?.message ?? "Erro ao adicionar produto")
        } finally {
            setAddProductLoading(false)
        }
    }

    return {
        billProducts,
        billProductsError,
        billProductsLoading,
        loadNextPage,
        products: filteredProducts,
        productsError,
        productsLoading,
        showAddProduct,
        selectedProduct,
        quantity,
        searchText,
        isComboBoxOpen,
        addProductLoading,
        addProductError,
        createdBillProduct,
        handleOpenAddProduct,
        handleCancelAddProduct,
        handleSelectProduct,
        handleIncrementQuantity,
        handleDecrementQuantity,
        handleAddProduct,
        onDismissCreatedBillProduct,
        setSearchText,
        setIsComboBoxOpen,
    }
}
