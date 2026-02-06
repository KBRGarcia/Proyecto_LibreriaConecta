import { Fragment } from 'react';

export default function Modal({ show, onClose, maxWidth = 'md', children }) {
    const maxWidthClasses = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    onClick={onClose}
                />
                <div
                    className={`relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all w-full ${maxWidthClasses[maxWidth]}`}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
