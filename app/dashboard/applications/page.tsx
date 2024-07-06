'use client';

import { useState, useEffect } from 'react';
import applicationsRender from '@/server/applications';

export default function Applications() {
    const [applications, setApplications] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchApplications() {
            try {
                const data = await applicationsRender();
                setApplications(data);
            } catch (err) {
                setError(err.message);
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