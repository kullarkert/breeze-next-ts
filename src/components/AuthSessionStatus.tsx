import { HTMLAttributes } from 'react';

const AuthSessionStatus = ({ status, className, ...props }: HTMLAttributes<HTMLDivElement> & { status?: string | null, className?: string }) => (
    <>
        {status && (
            <div
                className={`${className} font-medium text-sm text-green-600`}
                {...props}>
                {status}
            </div>
        )}
    </>
)

export default AuthSessionStatus
