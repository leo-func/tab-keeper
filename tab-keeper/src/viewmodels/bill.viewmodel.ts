import { useEffect, useState } from "react";
import { Bill } from "../model/bill.model";
import { getBills } from "../services/bill.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { getProfileId } from "../services/storage.service";

export function useBillViewModel(billId?: string) {
    const [bills, setBills] = useState<Bill[] | null> (null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null> (null)

    useEffect(() => {
        async function loadBills () {
            const profileId = await getProfileId()

            console.log(profileId)
            if (!profileId) {
                return
            }

            HandleBills(profileId)
        }

        loadBills()
    }, [])


    async function HandleBills(profileId: string) {
        try {
            setLoading(true)
            setError(null)

            const data = await getBills(profileId)

            setBills(data)
            
        } catch (exception) {
            setError(exception as Error)
        } finally {
            setLoading(false)
        }
    }


    function goToDetails(name: string, billId: string) {
        router.push('/bills/details')
    }

    return {
        bills,
        loading,
        error,
        HandleBills,
        goToDetails
    }
}