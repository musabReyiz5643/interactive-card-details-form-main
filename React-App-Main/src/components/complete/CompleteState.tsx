import { useEffect, useState } from "react"
import type { ContextType } from "../../types/ContextType"
import Button from "../../ui/Button"
import { useValidationHook } from "../../hooks/useValidationHook"

const ComplateState = () => {

    const { setIsFormValid } = useValidationHook()

    const [completeState, setCompleteState] = useState<ContextType | null>(null)
    const [loading, setLoading] = useState(false)

    const getCompleteState = async () => {
        try {
            const response = await fetch("../public/context/context.json")
            const data = await response.json()
            setCompleteState(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getCompleteState()
    }, [])

    return (
        <div className="flex flex-col items-center justify-center w-full  ">
            {!loading && completeState && (
                <div className="flex flex-col items-center w-full max-w-md justify-center gap-5 ">
                    <img src={completeState.completeState.image} alt={completeState.completeState.title} className="w-20 h-20 " />
                    <h1 className="text-4xl tracking-wider text-purple-950 ">{completeState.completeState.title}</h1>
                    <p className="text-gray-500 ">{completeState.completeState.description}</p>
                    <Button text={completeState.completeState.button.text} className="mt-10" onClick={() => setIsFormValid(false)} />
                </div>
            )}
        </div>
    )
}

export default ComplateState