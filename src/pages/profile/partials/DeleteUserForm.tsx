import { FormEventHandler, useRef, useState } from 'react'
import DangerButton from '@/components/DangerButton'
import { useRouter } from 'next/router'
import axios, { csrf } from '@/lib/axios'
import Modal from '@/components/Modal'
import Label from '@/components/Label'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import SecondaryButton from '@/components/SecondaryButton'
import { useAuth } from '@/hooks/auth'

const DeleteUserForm = () => {
    const { logout } = useAuth({ middleware: 'auth' })

    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false)
    const passwordInput = useRef<HTMLInputElement>()
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState<string | null>(null)

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true)
    }

    const closeModal = () => {
        setConfirmingUserDeletion(false)
    }


    const submitForm: FormEventHandler = async (event) => {
        event.preventDefault()

        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .delete('/api/profile', { data: { password: password } })
            .then(response => {
                setStatus(response.data.status)

                closeModal()
                logout()
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                passwordInput.current?.focus()

                setErrors(error.response.data.errors)
            })
    }


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

            <DangerButton onClick={confirmUserDeletion}>Delete Account</DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={submitForm} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Are you sure you want to delete your account?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Once your account is deleted, all of its resources and data will be permanently deleted. Please
                        enter your password to confirm you would like to permanently delete your account.
                    </p>

                    <div className="mt-6">
                        <Label htmlFor="password" className="sr-only" />

                        <Input
                            id="password"
                            type="password"
                            ref={passwordInput}
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Password"
                        />

                        <InputError messages={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <DangerButton className="ml-3">
                            Delete Account
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>

    )
}

export default DeleteUserForm
