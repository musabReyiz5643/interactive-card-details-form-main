import { useEffect, useState } from "react"
import type { ImagesProps } from "../../types/ImagesType"
import type { ContextType } from "../../types/ContextType"
import { useValidationHook } from "../../hooks/useValidationHook"

const Cards = () => {

    const [images, setImages] = useState<ImagesProps[]>([])
    const [isLoadingImage, setIsLoadingImage] = useState(true)
    const [cardDetails, setCardDetails] = useState<ContextType | null>(null)
    const [isLoadingCardDetails, setIsLoadingCardDetails] = useState(true)

    const getImages = async () => {
        try {
            const response = await fetch("../public/context/images.json")
            const data = await response.json()
            setImages(data)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoadingImage(false)
        }
    }

    const getCardDetails = async () => {
        try {
            const response = await fetch("../public/context/context.json")
            const data = await response.json()
            setCardDetails(data)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoadingCardDetails(false)
        }
    }

    const { watchData } = useValidationHook()
    const [date, setDate] = useState<string>("")

    useEffect(() => {
        if (watchData?.ExpMonth || watchData?.ExpYear) {
            setDate(`${watchData?.ExpMonth}/${watchData?.ExpYear}`)
        } else {
            setDate(`${cardDetails?.card.front.cardDate}`)
        }
    }, [watchData?.ExpMonth, watchData?.ExpYear])

    useEffect(() => {
        getImages()
        getCardDetails()
    }, [])

    return (
        <div className="w-full flex flex-col-reverse md:flex-col gap-0 md:gap-4 ">
            <div className="max-w-[80%] w-full h-full min-h-40 md:min-h-65 front-card p-5 md:p-10 rounded-lg z-10 -translate-y-15 ">
                {!isLoadingImage && <img src={images[2].url} alt={images[2].name} className="w-10 md:w-20 mb-5" />}
                {
                    isLoadingCardDetails ?
                        <p>Loading...</p>
                        :
                        <div className="flex items-start flex-col justify-end min-h-[calc(100%-50px)]">
                            <h1 className="text-white text-lg md:text-3xl tracking-wider">{
                                watchData?.CardNumber || cardDetails?.card.front.cardNumber
                            }</h1>
                            <div className="flex items-center w-full justify-between  mt-9 md:mt-5 ">
                                <h1 className="text-white text-[10px] md:text-base tracking-widest">{watchData?.CardHolderName || cardDetails?.card.front.cardName}</h1>
                                <h1 className="text-white text-[10px] md:text-base tracking-widest">{date === "undefined" ? cardDetails?.card.front.cardDate : date}</h1>
                            </div>
                        </div>
                }
            </div>
            <div className="w-full flex items-start justify-end">
                <div className="w-full max-w-[80%] h-full relative">
                    {!isLoadingImage && <img src={images[1].url} alt={images[1].name} className="w-full" />}
                    <span className="absolute top-1/2 right-10 md:right-15 -translate-y-1/2 text-white text-[10px] md:text-base tracking-widest font-normal">{!watchData?.CVC ? cardDetails?.card.back.cardCvc : watchData?.CVC}</span>
                </div>
            </div>
        </div>
    )


}

export default Cards
