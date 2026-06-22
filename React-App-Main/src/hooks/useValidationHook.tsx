import { createContext, useContext, useState } from "react"
import type { FormValues, ValidationType } from "../types/ValidationType"

const AppContext = createContext<ValidationType | null>(null)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [isFormValid, setIsFormValid] = useState<ValidationType["isFormValid"]>(false)
    const [formData, setFormData] = useState<FormValues | null>(null)
    const [watchData, setWatchData] = useState<FormValues | null>(null)

    return (
        <AppContext.Provider value={{ isFormValid, setIsFormValid, formData, setFormData, watchData, setWatchData }}>
            {children}
        </AppContext.Provider>
    )

}

export const useValidationHook = () => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error("useValidationHook must be used within AppProvider")
    }
    return context
}
