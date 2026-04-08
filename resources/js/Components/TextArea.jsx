import { forwardRef } from 'react';

export default forwardRef(function TextArea({ className = '', ...props }, ref) {
    return (
        <textarea
            {...props}
            className={
                'border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400 rounded-md shadow-sm ' +
                className
            }
            ref={ref}
        />
    );
});
