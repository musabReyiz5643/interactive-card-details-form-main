import { cn } from "../lib/utils"

interface ButtonType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string | undefined,
    className?: string,
    onClick?: () => void
}

const Button = ({ text, className, onClick }: ButtonType) => {

    return (
        <button onClick={onClick} className={cn("w-full h-auto bg-purple-950 text-white rounded-lg cursor-pointer p-3", className)}>
            {text}
        </button>
    )
}

export default Button