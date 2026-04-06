import { forwardRef } from 'react';

export default forwardRef(function SelectInput({ className = '', children, ...props }, ref) {
    return (
        <select
            {...props}
            className={
                'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm transition-colors duration-200 ' +
                className
            }
            ref={ref}
        >
            {children}
        </select>
    );
});
