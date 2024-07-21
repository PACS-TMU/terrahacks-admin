"use client";
import { SubmitButton } from "@/components/submit-button";
import { useState } from "react";
import handleStatusUpdate from "@/server/handle-status-update";
import { format } from "date-fns";

export default function UpdateStatus({ userData, adminLogs }: { user_id: string, userData: any, adminLogs: any }) {
    const [selectedStatus, setSelectedStatus] = useState(userData.applications.status);

    const handleStatusChange = (e: any) => {
        setSelectedStatus(e.target.value);
    };

    return (
        <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Update Status</h2>
            <form className="flex items-center">
                <input type="hidden" name="user_id" value={userData.account_id} />
                <input type="hidden" name="application_id" value={userData.application_id} />
                <input type="hidden" name="currentStatus" value={userData.applications.status} />
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
            {adminLogs.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold mt-8 mb-4">Admin Logs</h2>
                    <ul className="space-y-4">
                        {adminLogs.map((log: any, index: number) => (
                            <li key={index} className="p-4 border border-gray-200 rounded-lg shadow-sm">
                                <div className="flex flex-col space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold">Admin ID</h3>
                                        <p className="text-gray-700">{log.admin_id}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold">Admin Name</h3>
                                        <p className="text-gray-700">{log.admins.first_name} {log.admins.last_name}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold">Timestamp</h3>
                                        <p className="text-gray-700">{format(log.timestamp, 'PPpp')}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold">Status Change</h3>
                                        <p className="text-gray-700">{log.previous_status} → {log.new_status}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}