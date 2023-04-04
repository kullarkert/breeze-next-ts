import Button from '@/components/Button'

import { useRouter } from 'next/router'

const DeleteUserForm = () => {
    const router = useRouter()

    return (
        <section className="space-y-6">
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Delete Account
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Once your account is deleted, all of its resources and data will be permanently deleted.
                    Before deleting your account, please download any data or information that you wish to retain.
                </p>
            </header>

            <Button className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150">Delete Account</Button>
        </section>

    )
}

export default DeleteUserForm
