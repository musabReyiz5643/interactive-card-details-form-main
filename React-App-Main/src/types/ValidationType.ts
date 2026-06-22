import type { Dispatch, SetStateAction } from "react"

export type ValidationType = {
    formData: FormValues | null
    setFormData: Dispatch<SetStateAction<ValidationType["formData"]>>
    isFormValid: boolean
    setIsFormValid: Dispatch<SetStateAction<ValidationType["isFormValid"]>>
    watchData: FormValues | null
    setWatchData: Dispatch<SetStateAction<ValidationType["watchData"]>>
}

export type FormValues = {
    CardHolderName: string
    CardNumber: string
    ExpMonth: string
    ExpYear: string
    CVC: string
}