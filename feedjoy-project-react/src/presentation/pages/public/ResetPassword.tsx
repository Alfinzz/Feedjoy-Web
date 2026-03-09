// Reset Password Page
// Public page for resetting password with token

import ResetPasswordForm from "../../components/auth/ResetPasswordForm";

export default function ResetPassword() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
                <div className="inline-block bg-primary/10 p-3 rounded-2xl mb-4">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                            />
                        </svg>
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 font-poppins mb-2">
                    Reset Password
                </h1>
                <p className="text-gray-500 font-urbanist">
                    Buat password baru untuk akun Anda
                </p>
            </div>

            {/* Form */}
            <ResetPasswordForm />
        </div>
    );
}
