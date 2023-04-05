import { useState, FormEventHandler, useEffect } from 'react'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Button from '@/components/Button'

import axios, { csrf } from '@/lib/axios'
import { useAuth } from '@/hooks/auth'
import { Transition } from '@headlessui/react'

const UpdateProfileInformationForm = () => {
    const { user } = useAuth({ middleware: 'auth' })

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    useEffect(() => {
        if (user !== undefined) {
            setName(user.name)
            setEmail(user.email)
        }
    }, [user])

    const submitForm: FormEventHandler = async event => {
        event.preventDefault()

        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .put('/api/profile', { name: name, email: email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(Object.values(error.response.data.errors).flat() as never[])
            })
    }

    return (
        <section>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile information and email address
                </p>
            </header>

            <form onSubmit={submitForm} className="mt-6 space-y-6">
                {/* Name */}
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        type="text"
                        name="name"
                        value={name}
                        className="block mt-1 w-full"
                        onChange={event => setName(event.target.value)}
                        required
                        autoFocus
                    />
                    <InputError messages={errors.email} className="mt-2" />
                </div>
                {/* Email Address */}
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        className="block mt-1 w-full"
                        onChange={event => setEmail(event.target.value)}
                        required
                        autoFocus
                    />

                    <InputError messages={errors.email} className="mt-2" />
                </div>

                {/* TODO add email verification link */}

                <div className="flex items-center gap-4">
                    <Button>Save</Button>

                    {status === 'profile-updated' && (
                        <Transition
                            show={true}
                            enterFrom="opacity-0"
                            leaveTo="opacity-0"
                            className="transition ease-in-out"
                        >
                            <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
                        </Transition>
                    )}
                </div>
            </form>
        </section>

    )
}

export default UpdateProfileInformationForm
