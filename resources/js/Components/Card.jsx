export default function Card({ title, value, icon, color = 'indigo', description }) {
    const colors = {
        indigo: 'bg-indigo-500',
        green: 'bg-green-500',
        yellow: 'bg-yellow-500',
        red: 'bg-red-500',
        blue: 'bg-blue-500',
        purple: 'bg-purple-500',
    };

    return (
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg border border-transparent dark:border-gray-700 transition-colors duration-200">
            <div className="p-5">
                <div className="flex items-center">
                    <div className={`flex-shrink-0 ${colors[color]} rounded-md p-3`}>
                        {icon}
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                {title}
                            </dt>
                            <dd className="flex items-baseline">
                                <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                    {value}
                                </div>
                            </dd>
                            {description && (
                                <dd className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    {description}
                                </dd>
                            )}
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}
