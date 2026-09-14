import { useState } from "react";
import { useBillProduct } from "../hooks/useBillProduct";
import { useProduct } from "../hooks/useProduct";
import { InsertNewBillProduct, DeleteBillProduct } from "../services/bill_product.service";
import { CloseBill, DeleteBill, OpenBill, InsertPrepaidAmount } from "../services/bill.service";
import { Product } from "../model/Product";

export function useBillDetailViewModel(billId: string, initialClosedAt: string) {
    const {
        billProducts,
        error: billProductsError,
        loading: billProductsLoading,
        loadNextPage,
        HandleRefresh,
        refreshing
    } = useBillProduct(billId)

    const {
        products,
        error: productsError,
        loading: productsLoading,
        loadNextPage: loadMoreProducts,
    } = useProduct()

    const [showAddProduct, setShowAddProduct] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [quantity, setQuantity] = useState(1)
    const [searchText, setSearchText] = useState("")
    const [isComboBoxOpen, setIsComboBoxOpen] = useState(false)
    const [addProductLoading, setAddProductLoading] = useState(false)
    const [addProductError, setAddProductError] = useState<string | null>(null)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [actionLoading, setActionLoading] = useState(false)
    const [isClosed, setIsClosed] = useState(!!initialClosedAt)

    const [showPrepaidSection, setShowPrepaidSection] = useState(false)
    const [prepaidAmount, setPrepaidAmount] = useState("")
    const [prepaidLoading, setPrepaidLoading] = useState(false)

    const filteredProducts = products?.filter(product =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
    ) ?? []

    function handleOpenAddProduct() {
        setShowPrepaidSection(false)
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

    function onDismissSuccessModal() {
        setShowSuccessModal(false)
    }

    async function handleAddProduct() {
        if (!selectedProduct) return

        try {
            setAddProductLoading(true)
            setAddProductError(null)

            await InsertNewBillProduct(billId, selectedProduct.id, quantity)

            setShowSuccessModal(true)
            handleCancelAddProduct()
        } catch (exception: any) {
            setAddProductError(exception?.message ?? "Erro ao adicionar produto")
        } finally {
            setAddProductLoading(false)
        }
    }

    async function handleDeleteBillProduct(billProductId: string) {
        try {
            setActionLoading(true)
            await DeleteBillProduct(billProductId)
        } catch (exception: any) {
            console.log("Erro ao remover produto:", exception?.message)
        } finally {
            setActionLoading(false)
        }
    }

    async function handleCloseBill() {
        try {
            setActionLoading(true)
            await CloseBill(billId)
            setIsClosed(true)
        } catch (exception: any) {
            console.log("Erro ao fechar conta:", exception?.message)
        } finally {
            setActionLoading(false)
        }
    }

    async function handleOpenBill() {
        try {
            setActionLoading(true)
            await OpenBill(billId)
            setIsClosed(false)
        } catch (exception: any) {
            console.log("Erro ao abrir conta:", exception?.message)
        } finally {
            setActionLoading(false)
        }
    }

    async function handleDeleteBill() {
        try {
            setActionLoading(true)
            await DeleteBill(billId)
        } catch (exception: any) {
            console.log("Erro ao excluir conta:", exception?.message)
        } finally {
            setActionLoading(false)
        }
    }

    function handleOpenPrepaidSection() {
        setShowAddProduct(false)
        setShowPrepaidSection(true)
    }

    function handleCancelPrepaid() {
        setShowPrepaidSection(false)
        setPrepaidAmount("")
    }

    async function handleInsertPrepaid() {
        const amount = parseFloat(prepaidAmount)

        try {
            setPrepaidLoading(true)
            await InsertPrepaidAmount(billId, amount)
            setShowPrepaidSection(false)
            setPrepaidAmount("")
        } catch (exception: any) {
            console.log("Erro ao adicionar valor antecipado:", exception?.message)
        } finally {
            setPrepaidLoading(false)
        }
    }

    return {
        billProducts,
        billProductsError,
        billProductsLoading,
        loadNextPage,
        HandleRefresh,
        refreshing,
        products,
        productsError,
        productsLoading,
        loadMoreProducts,
        filteredProducts,
        showAddProduct,
        selectedProduct,
        quantity,
        searchText,
        isComboBoxOpen,
        addProductLoading,
        addProductError,
        showSuccessModal,
        actionLoading,
        isClosed,
        showPrepaidSection,
        prepaidAmount,
        prepaidLoading,
        handleOpenAddProduct,
        handleCancelAddProduct,
        handleSelectProduct,
        handleIncrementQuantity,
        handleDecrementQuantity,
        handleAddProduct,
        handleDeleteBillProduct,
        handleCloseBill,
        handleOpenBill,
        handleDeleteBill,
        handleOpenPrepaidSection,
        handleCancelPrepaid,
        handleInsertPrepaid,
        onDismissSuccessModal,
        setIsComboBoxOpen,
        setPrepaidAmount,
    }
}
