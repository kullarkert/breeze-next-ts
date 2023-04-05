import { InputHTMLAttributes } from 'react'
interface Props extends InputHTMLAttributes<HTMLInputElement> {
    disabled?: boolean
}

const Input = ({ disabled = false, className = '', ...props }: Props) => (
    <input
        disabled={disabled}
        className={`border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm ${className}`}
        {...props}
    />
)

export default Input
