import React, { useState } from 'react';
import GenericTable from '../components/ui/GenericTable';
import TabHeader from '../components/ui/TabHeader';
import Sidebar from "../components/layout/SideBar";
import Header from "../components/layout/Header";
import { reviewData,templatesData } from '../data/SettingsData';


const reviewColumns = [
    { label: 'Patient Name', accessor: 'name' },
    { label: 'Rating', accessor: 'rating' },
    { label: 'Review Text', accessor: 'text' },
    { label: 'Date', accessor: 'date' },
    { label: 'Status', accessor: 'status' },
    { label: 'Action', accessor: 'action' },
];

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');



    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [experience, setExperience] = useState(0);
    const [specialization, setSpecialization] = useState('');
    const [education, setEducation] = useState('');
    const [bio, setBio] = useState('');

    const tabs = [
        { id: 'profile', label: 'Profile & Availability' },
        { id: 'reviews', label: 'Manage Reviews' },
        { id: 'templates', label: 'Templates & Branding' },
    ];

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const filteredData = reviewData.filter((row) => {
        return row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.rating.toLowerCase().includes(searchTerm.toLowerCase())
    })

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-2 bg-white border-l border-t overflow-y-auto">
                    <div className=" max-w-[90%] mx-auto py-8 space-y-10">
                        <h1 className="text-2xl font-semibold mb-4">Settings</h1>
                        <div className='flex justify-start w-max mb-4 ml-0'>
                            <TabHeader tabs={tabs} activeTabId={activeTab} setActiveTabId={setActiveTab} />
                        </div>


                        {activeTab === 'profile' && (
                            <div className="space-y-6">
                                <h2 className="font-semibold text-gray-900">Profile & Availability</h2>
                                <div className="flex items-center gap-4">
                                    <div>
                                        <label className="block font-medium text-gray-700 mb-1">Profile Picture</label>
                                        <div className="mb-6 max-w-lg border-2 border-dashed border-gray-300 p-6 rounded-lg text-center">
                                            <p className="font-medium mb-1">Upload picture</p>
                                            <p className="text-sm text-gray-500 mb-2">
                                                Recommended size: 512 × 512 pixels
                                            </p>
                                            <input
                                                type="file"
                                                onChange={handleAvatarChange}
                                                className="hidden"
                                                id="logo-upload"
                                            />
                                            <label
                                                htmlFor="logo-upload"
                                                className="inline-block px-4 py-1 bg-gray-200 rounded cursor-pointer hover:bg-gray-300 text-sm"
                                            >
                                                Upload
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input
                                            id="name"
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter your name"
                                            className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                                        <input
                                            id="mobile"
                                            type="tel"
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value)}
                                            placeholder="Enter mobile number"
                                            className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                                        <input
                                            id="experience"
                                            type="number"
                                            value={experience}
                                            onChange={(e) => setExperience(e.target.value)}
                                            placeholder="e.g., 5"
                                            className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                                        <input
                                            id="specialization"
                                            type="text"
                                            value={specialization}
                                            onChange={(e) => setSpecialization(e.target.value)}
                                            placeholder="e.g., Cardiology, Pediatrics"
                                            className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                                        <input
                                            id="education"
                                            type="text"
                                            value={education}
                                            onChange={(e) => setEducation(e.target.value)}
                                            placeholder="e.g., MBBS, MD"
                                            className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio / About</label>
                                    <textarea
                                        id="bio"
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        placeholder="Tell us about yourself..."
                                        className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 h-28 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>


                                <div className="mt-10">
                                    <h2 className="text-xl font-bold text-left mb-4">
                                        OPD & Appointment Timing Management
                                    </h2>

                                    <div className="flex flex-col md:flex-row justify-around  gap-4">
                                        {/* Left column */}
                                        <div className="flex-1 space-y-4 text-left">
                                            <button className="bg-[#ede9fe] font-semibold px-5 py-2 rounded-full text-black">
                                                Add OPD Location
                                            </button>

                                            <div className="flex flex-wrap justify-between items-start gap-6 w-full">
                                                <div className="flex-1 min-w-[200px]">
                                                    <h3 className="font-semibold text-lg text-gray-800">Clinic Name</h3>
                                                    <p className="text-purple-600 text-sm">City, Full Address</p>
                                                </div>

                                                <div className="flex-shrink-0 w-full max-w-md">
                                                    <img
                                                        src="https://plus.unsplash.com/premium_photo-1682130157004-057c137d96d5?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2xpbmljfGVufDB8fDB8fHww"
                                                        alt="Clinic"
                                                        className="rounded-xl object-cover w-full h-auto"
                                                    />
                                                </div>
                                            </div>


                                            <div className="flex flex-wrap gap-2">
                                                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
                                                    <span key={day} className="px-4 py-2 bg-gray-100 rounded-full text-sm">{day}</span>
                                                ))}
                                            </div>

                                            <div className="grid grid-cols-2 gap-8 w-1/2">
                                                <div className="space-y-1">
                                                    <p className="text-sm text-[#7c3aed]">Start Time</p>
                                                    <p className="text-black font-medium">9:00 AM</p>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm text-[#7c3aed]">End Time</p>
                                                    <p className="text-black font-medium">5:00 PM</p>
                                                </div>
                                                <div className="space-y-1 col-span-2">
                                                    <p className="text-sm text-[#7c3aed]">Time Slot</p>
                                                    <p className="text-black font-medium">10 Mins.</p>
                                                </div>
                                            </div>
                                        </div>


                                    </div>

                                    {/* Toggle */}
                                    <div className="mt-6 bg-gray-50 rounded-md p-4 flex justify-between items-center">
                                        <span className="font-medium">Active</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div>
                                <h2 className="font-semibold mb-3">Manage Reviews</h2>
                                <input
                                    type='text'
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full border rounded px-3 py-2 mb-3"
                                    placeholder="Filter by name"
                                />
                                <GenericTable
                                    columns={reviewColumns}
                                    data={filteredData}
                                    renderCell={(row, accessor) => {
                                        if (accessor === 'action') {
                                            return (
                                                <button className="text-purple-600 text-sm font-medium">Respond</button>
                                            );
                                        }
                                        if (accessor === 'status') {
                                            return (
                                                <span className={"text-sm bg-gray-100 px-3 py-1 rounded-full"}>
                                                    {row.status}
                                                </span>
                                            );
                                        }
                                        return <span className="text-sm">{row[accessor]}</span>;
                                    }}
                                />
                            </div>
                        )}

                        {activeTab === 'templates' && (
                            <div>
                                <h2 className="font-semibold mb-3 text-xl">Prescription & Discharge Templates</h2>
                                {templatesData.map((item, idx) => (
                                    <div key={idx} className="mb-4 flex flex-row justify-between items-start">
                                        <div>
                                            <p className="block mb-1 text-md font-semibold">{item.label}</p>
                                            <p className='mb-1 text-sm'>{item.des}</p>
                                            <label className="inline-block bg-[#ede9fe] text-[#5e3bea] px-4 py-2 rounded-xl text-sm cursor-pointer hover:bg-[#ddd6fe] transition">
                                                Upload
                                                <input type="file" className="hidden" />
                                            </label>
                                        </div>
                                        <img
                                            src={item.img}
                                            alt={item.label}
                                            className="w-[300px] h-[180px] object-cover rounded-lg"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}




                    </div>
                </main>
            </div>
        </div>
    );
};

export default Settings;
