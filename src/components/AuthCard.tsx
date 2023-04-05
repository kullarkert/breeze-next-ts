import { PropsWithChildren } from 'react'
import Link from 'next/link'
import ApplicationLogo from './ApplicationLogo'

const AuthCard = ({ children }: PropsWithChildren) => (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
        <div>
            <Link href="/">
                <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
            </Link>
        </div>

        <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
            {children}
        </div>
    </div>
)

export default AuthCard
