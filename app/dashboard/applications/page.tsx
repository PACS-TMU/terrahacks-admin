'use client';

import { useState, useEffect } from 'react';
import applicationsRender from '@/server/applications';
import { columns } from './columns';
import { DataTable } from './data-table';
import Intro from '@/components/intro';

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
        <>
            <Intro />
            <div className="container mx-auto py-10">
                <DataTable columns={columns} data={applications} />
            </div>
        </>

    );
}