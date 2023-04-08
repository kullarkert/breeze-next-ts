import AuthCard from '@/components/AuthCard'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import GuestLayout from '@/components/Layouts/GuestLayout'
import PrimaryButton from '@/components/PrimaryButton'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'

const VerifyEmail = () => {
    const { logout, resendEmailVerification } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/dashboard',
    })

    const [status, setStatus] = useState<string | null>(null)

    return (
        <GuestLayout>
            <AuthCard>
                <div className="mb-4 text-sm text-gray-600">
                    Thanks for signing up! Before getting started, could you
                    verify your email address by clicking on the link we just
                    emailed to you? If you didn't receive the email, we will
                    gladly send you another.
                </div>

                {status === 'verification-link-sent' && (
                    <AuthSessionStatus className="mb-4" status='A new verification link has been sent to the email
                        address you provided during registration' />
                )}

                <div className="mt-4 flex items-center justify-between">
                    <PrimaryButton
                        onClick={() => resendEmailVerification({
                            setStatus,
                            setErrors: () => { }
                        })}>
                        Resend Verification Email
                    </PrimaryButton>

                    <button
                        type="button"
                        className="underline text-sm text-gray-600 hover:text-gray-900"
                        onClick={logout}>
                        Logout
                    </button>
                </div>
            </AuthCard>
        </GuestLayout>
    )
}

export default VerifyEmail
