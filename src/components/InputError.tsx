import { HTMLAttributes } from 'react'
interface Props extends HTMLAttributes<HTMLParagraphElement> {
    messages?: string[]
}

const InputError = ({ messages = [], className = '', ...props }: Props) => (
    <>
        {messages?.length > 0 && (
            <>
                {messages.map((message, index) => (
                    <p
                        {...props}
                        className={`text-sm text-red-600 ${className}`}
                        key={index}>
                        {message}
                    </p>
                ))}
            </>
        )}
    </>
)

export default InputError
