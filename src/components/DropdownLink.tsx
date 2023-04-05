import Link, { LinkProps } from 'next/link'
import { Menu } from '@headlessui/react'
import React, { PropsWithChildren, ButtonHTMLAttributes } from 'react'

const DropdownLink = ({ children, ...props }: PropsWithChildren<LinkProps>) => (
    <Menu.Item>
        {({ active }) => (
            <Link
                {...props}
                className={`block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out ${
                    active ? 'bg-gray-100 dark:bg-gray-800' : ''
                }`}>
                {children}
            </Link>
        )}
    </Menu.Item>
)

export const DropdownButton = ({ children, ...props }: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => (
    <Menu.Item>
        {({ active }) => (
            <button
                className={`block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out ${
                    active ? 'bg-gray-100 dark:bg-gray-800' : ''
                }`}
                {...props}>
                {children}
            </button>
        )}
    </Menu.Item>
)

export default DropdownLink
