'use client';

import { useState, useEffect } from 'react';
import applicationsRender from '@/server/applications';

export default function Applications() {
    const [applications, setApplications] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchApplications() {
            try {
                const data = await applicationsRender();
                setApplications(data);
            } catch (err) {
                // Since err is of type unknown, we need to narrow down its type
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    // Handle cases where the error is not an Error object
                    setError("An unknown error occurred");
                }
            }
        }

        fetchApplications();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>This is the Applications page</h1>
            {applications ? (
                <div>
                    <h2>Applications:</h2>
                    <pre>{JSON.stringify(applications, null, 2)}</pre>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}