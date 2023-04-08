import { forwardRef, useEffect, useImperativeHandle, useRef, InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    disabled?: boolean
    isFocused?: boolean
}


export default forwardRef(function Input(
    { disabled = false, className = '', isFocused = false, ...props }: Props,
    ref
) {
    const localRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }))

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus()
        }
    }, [])

    return (
        <input
            {...props}
            disabled={disabled}
            className={
                'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm ' +
                className
            }
            ref={localRef}
        />
    )
})
