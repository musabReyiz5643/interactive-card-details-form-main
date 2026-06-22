import type React from "react"
import { cn } from "../lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    containerClassName?: string
}


const Input = ({ label, className, error, containerClassName, type = "text", ...props }: InputProps) => {

    return (
        <div className={cn("flex flex-col gap-2 w-full", containerClassName)}>
            {label && (
                <label className="text-sm font-bold uppercase tracking-widest text-[#21092f]">
                    {label}
                </label>
            )}
            <input
                type={type}
                className={cn(
                    `w-full rounded-lg border-2 border-gray-400 px-4 py-2 text-lg font-medium text-[#21092f] transition-all duration-200 placeholder:text-gray-400 focus:border-[#6348fe] focus:outline-none`,
                    error && `focus:border-[#ff5252] border-red-400`,
                    className
                )}
                {...props}
            />
            {error && label && (
                <span className="text-[10px] md:text-base font-medium text-[#ff5252]">
                    {error}
                </span>
            )}
        </div>
    )

}

export default Input
