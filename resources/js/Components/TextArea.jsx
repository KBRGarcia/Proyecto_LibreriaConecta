import { forwardRef } from 'react';

export default forwardRef(function TextArea({ className = '', ...props }, ref) {
    return (
        <textarea
            {...props}
            className={
                'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                className
            }
            ref={ref}
        />
    );
});
