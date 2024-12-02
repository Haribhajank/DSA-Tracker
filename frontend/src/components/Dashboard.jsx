import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [progress, setProgress] = useState({ Arrays: 0, Graphs: 0, Trees: 0 });

    const updateProgress = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.post('${process.env.REACT_APP_BACKEND_URL}/update-progress', { token, progress });
            alert('Progress updated');
        } catch (err) {
            alert('Error updating progress');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-8">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Update Your DSA Progress</h1>
                <div className="space-y-6">
                    {Object.keys(progress).map((topic) => (
                        <div key={topic} className="flex items-center justify-between">
                            <label className="text-lg font-medium text-gray-700">{topic}</label>
                            <div className="flex items-center space-x-4 w-2/3">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={progress[topic]}
                                    onChange={(e) => setProgress({ ...progress, [topic]: parseInt(e.target.value) })}
                                    className="w-full"
                                />
                                <span className="w-10 text-center text-sm bg-gray-200 px-2 py-1 rounded">
                                    {progress[topic]}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 text-center">
                    <button
                        onClick={updateProgress}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-500 transition duration-200"
                    >
                        Update Progress
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
