import { format } from 'date-fns';
import UpdateStatus from './updateStatus';

export default function UserDetails({ user_id, userData, appQuestions, appResponses, tmuStudentNum, accommodation, adminLogs }: { user_id: string, userData: any, appQuestions: any, appResponses: any, tmuStudentNum: string, accommodation: any, adminLogs: any }) {
    return (
        <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-8">User Details</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div>
                    <h2 className="text-lg font-semibold">Applicant Name</h2>
                    <p className="text-gray-700">{userData.first_name} {userData.last_name}</p>
                </div>
                <div>
                    <h2 className="text-lg font-semibold">Email</h2>
                    <p className="text-gray-700">{userData.email}</p>
                </div>
                <div>
                    <h2 className="text-lg font-semibold">User ID</h2>
                    <p className="text-gray-700">{user_id}</p>
                </div>
                <div>
                    <h2 className="text-lg font-semibold">Application ID</h2>
                    <p className="text-gray-700">{userData.application_id}</p>
                </div>
                <div>
                    <h2 className="text-lg font-semibold">Current Status</h2>
                    <p className="text-gray-700">{userData.applications.status}</p>
                </div>
                <div>
                    <h2 className="text-lg font-semibold">Applied Date</h2>
                    <p className="text-gray-700">{format(userData.applications.applied_date, 'PPpp')}</p>
                </div>
                <div>
                    <h2 className="text-lg font-semibold">School</h2>
                    <p className="text-gray-700">{userData.school}</p>
                </div>
                {tmuStudentNum && (
                    <div>
                        <h2 className="text-lg font-semibold">TMU Student Number</h2>
                        <p className="text-gray-700">{tmuStudentNum}</p>
                    </div>
                )}
                <div>
                    <h2 className="text-lg font-semibold">Field of Study</h2>
                    <p className="text-gray-700">{userData.field_of_study}</p>
                </div>
                <div>
                    <h2 className="text-lg font-semibold">Level of Study (as of Fall 2024)</h2>
                    <p className="text-gray-700">{userData.level_of_study}</p>
                </div>
                <div>
                    <h2 className="text-lg font-semibold">Graduation Year</h2>
                    <p className="text-gray-700">{userData.grad_year}</p>
                </div>
                <div>
                    <h2 className="text-lg font-semibold">City</h2>
                    <p className="text-gray-700">{userData.city}</p>
                </div>
                <div>
                    <h2 className="text-lg font-semibold">Province/State</h2>
                    <p className="text-gray-700">{userData.province_state}</p>
                </div>
                <div>
                    <h2 className="text-lg font-semibold">Country</h2>
                    <p className="text-gray-700">{userData.country}</p>
                </div>
                {accommodation && (
                    <div className="col-span-1 sm:col-span-2">
                        <h2 className="text-lg font-semibold">Accommodation Request</h2>
                        <p className="text-gray-700">{accommodation.description}</p>
                    </div>
                )}
                <div>
                    <h2 className="text-lg font-semibold">Dietary Restrictions</h2>
                    <p className="text-gray-700">{userData.dietary_restrictions}</p>
                </div>
                <div>
                    <h2 className="text-lg font-semibold">GitHub</h2>
                    {userData.github === 'N/A' ?
                        <p className="text-gray-700">
                            No GitHub provided
                        </p> :
                        <a
                            href={userData.github}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sky-600 underline hover:text-sky-500 focus:text-sky-500 duration-300 ease-in-out"
                        >
                            {userData.github}
                        </a>
                    }
                </div>
                <div>
                    <h2 className="text-lg font-semibold">LinkedIn</h2>
                    {userData.linkedin === 'N/A' ?
                        <p className="text-gray-700">No LinkedIn provided</p> :
                        <a
                            href={userData.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sky-600 underline hover:text-sky-500 focus:text-sky-500 duration-300 ease-in-out"
                        >
                            {userData.linkedin}
                        </a>
                    }
                </div>
            </div>
            {appQuestions.map((question: any, index: number) => (
                <div key={question.question_id} className="mb-8 space-y-2">
                    <h2 className="text-lg font-semibold">Question {question.question_id}</h2>
                    <p className="text-gray-700">{question.question}</p>
                    <h2 className="text-lg font-semibold">Response {question.question_id}</h2>
                    <p className="text-gray-800 text-lg">{appResponses[index].response}</p>
                </div>
            ))}
            <UpdateStatus user_id={user_id} userData={userData} adminLogs={adminLogs} />
        </div>
    );
}
