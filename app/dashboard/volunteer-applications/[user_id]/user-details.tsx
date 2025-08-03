import { format } from 'date-fns';
import UpdateStatus from './updateStatus';

export default function UserDetails({ fetchedData }: { fetchedData: any }) {
    return (
        <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-8">Volunteer Details</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div>
                    <h2 className="text-lg font-semibold">First Name</h2>
                        <p className="text-gray-700">{fetchedData.first_name}</p>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">Last Name</h2>
                        <p className="text-gray-700">{fetchedData.last_name}</p>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">Email</h2>
                        <p className="text-gray-700">{fetchedData.email}</p>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">Phone Number</h2>
                        <p className="text-gray-700">{fetchedData.phone_number}</p>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">Preferred Roles</h2>
                        <p className="text-gray-700">{fetchedData.preferred_roles}</p>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">Dietary Restrictions</h2>
                        <p className="text-gray-700">{fetchedData.dietary_restrictions}</p>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">Emergency Contact Name</h2>
                        <p className="text-gray-700">{fetchedData.emergency_contact_name}</p>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">Emergency Contact Phone</h2>
                        <p className="text-gray-700">{fetchedData.emergency_contact_phone}</p>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">Applied Date</h2>
                        <p className="text-gray-700">{format(fetchedData.applied_date, 'PPpp')}</p>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">Volunteer ID</h2>
                        <p className="text-gray-700">{fetchedData.volunteer_id}</p>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">Acknowledged Physical Location</h2>
                        <p className="text-gray-700">{fetchedData.acknowledge_physical_location ? 'Yes' : 'No'}</p>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">Status</h2>
                        <p className="text-gray-700">{fetchedData.status}</p>
                    </div>
                </div>
            <UpdateStatus user_id={fetchedData.account_id} userData={fetchedData} />
            </div>
    );
}
