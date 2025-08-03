"use client";
import { SubmitButton } from "@/components/submit-button";
import { useState } from "react";
import handleStatusUpdate from "@/server/handle-volunteer-status-update";

export default function UpdateStatus({ userData }: { user_id: string, userData: any }) {
    const [selectedStatus, setSelectedStatus] = useState(userData.status);

    const handleStatusChange = (e: any) => {
        setSelectedStatus(e.target.value);
    };

    return (
        <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Update Status</h2>
            <form className="flex items-center">
                <input type="hidden" name="user_id" value={userData.account_id} />
                <input type="hidden" name="application_id" value={userData.volunteer_id} />
                <input type="hidden" name="currentStatus" value={userData.status} />
                <select
                    value={selectedStatus}
                    onChange={handleStatusChange}
                    name="newStatus"
                    className="block w-full mr-4 sm:w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                >
                    <option value="Under Review">Under Review</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                </select>
                <SubmitButton
                    formAction={handleStatusUpdate}
                    pendingText="Saving..."
                    className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                    Save
                </SubmitButton>
            </form>
        </div>
    )
}
