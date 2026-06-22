import { useEffect } from "react"
import Cards from "../components/card/Cards"
import MainForm from "../components/form/MainForm"
import { useValidationHook } from "../hooks/useValidationHook"
import ComplateState from "../components/complete/CompleteState"

function App() {

    const { formData, isFormValid } = useValidationHook()

    useEffect(() => {
        isFormValid && console.log(formData)
    }, [isFormValid])

    return (

        <div className="w-full min-h-screen flex items-center justify-center p-4 flex-col ">
            <div className="w-full max-w-7xl gap-0 md:gap-10 grid grid-cols-1 md:grid-cols-2 mt-auto ">
                <Cards />
                {isFormValid ? <ComplateState /> : <MainForm />}
            </div>
            <footer className="attribution w-full mt-auto  text-center">
                Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
                Coded by <a href="#" target="_blank">Musab Akgün</a>.
            </footer>
        </div>
    )
}

export default App
