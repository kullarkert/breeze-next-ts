import Button from '@/components/Button'
import DangerButton from '@/components/DangerButton'

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

            <DangerButton>Delete Account</DangerButton>
        </section>

    )
}

export default DeleteUserForm
