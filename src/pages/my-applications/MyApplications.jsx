import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const MyApplications = () => {
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        if (user?.email) {
            axios.get(`http://localhost:3000/applications?email=${user.email}`, { withCredentials: true })
                .then((res) => setApplications(res.data))
                .catch((err) => console.log(err));
        }
    }, [user]);

    return (
        <div className="max-w-6xl mx-auto py-10 px-4">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">My Job Applications</h2>

            {applications.length === 0 && (
                <p className="text-gray-600 text-lg">You have not applied to any jobs yet.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {applications.map((app) => (
                    <div key={app._id} className="border rounded-lg p-5 bg-white shadow-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <img src={app.companyLogo} alt="" className="w-14 h-14 rounded-md border" />
                            <div>
                                <h2 className="text-xl font-semibold">{app.jobTitle}</h2>
                                <p className="text-blue-600">{app.company}</p>
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-1">
                            Applied on: {new Date(app.appliedAt).toLocaleDateString()}
                        </p>

                        <span className={`inline-block px-3 py-1 mt-2 text-sm rounded-full border 
              ${app.status === "pending" ? "text-orange-600 bg-orange-50 border-orange-200" :
                                app.status === "approved" ? "text-green-600 bg-green-50 border-green-200" :
                                    "text-red-600 bg-red-50 border-red-200"}`}>
                            Status: {app.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyApplications;
