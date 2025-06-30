import React, { useState } from 'react';
import Sidebar from '../components/layout/SideBar';
import Header from '../components/layout/Header';
import GenericTable from '../components/ui/GenericTable';

import { medicineData } from '../data/ConsultDummyData';

const columns = [
    { label: 'Medicine', accessor: 'medicine' },
    { label: 'Dosage', accessor: 'dosage' },
    { label: 'Frequency', accessor: 'frequency' },
    { label: 'Duration', accessor: 'duration' },
    { label: 'Notes', accessor: 'notes' },
  ];

const ConsultationForm=()=> {
    const [formData, setFormData] = useState({
        vitals: {
            bp: '',
            pulse: '',
            height: '',
            weight: '',
            temperature: '',
            spo2: '',
            rbs: ''
        },
        complaints: ['', '', ''],
        pastHistory: '',
        surgicalHistory: '',
        drugAllergy: '',
        physicalExamination: ['', '', ''],
        diagnosis: {
            provisional: ['', ''],
            final: ['', '']
        },
        tests: ['', ''],
        testNotes: ['', ''],
        advice: '',
        followUp: ['', '']
    });

    const handleChange = (section, field, index = null) => (e) => {
        const value = e.target.value;

        if (index !== null) {
            setFormData((prev) => ({
                ...prev,
                [section]: prev[section].map((item, i) => (i === index ? value : item))
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [field]: value
                }
            }));
        }
    };

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-2 bg-white border-l border-t overflow-y-auto">
                    <div className="max-w-[90%] mx-auto py-8 space-y-10">
                        <div className="max-w-6xl mx-auto  space-y-6 font-sans text-sm">
                            <div className="text-xl font-semibold">Consultation for Arjun</div>

                            {/* Vitals */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {Object.entries(formData.vitals).map(([key, value]) => (
                                    <input
                                        key={key}
                                        value={value}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                vitals: { ...formData.vitals, [key]: e.target.value }
                                            })
                                        }
                                        placeholder={key.toUpperCase()}
                                        className="border p-2 rounded"
                                    />
                                ))}
                            </div>

                            {/* Chief Complaints */}
                            <div>
                                <div className="font-semibold">Chief Complaints</div>
                                {formData.complaints.map((complaint, i) => (
                                    <input
                                        key={i}
                                        value={complaint}
                                        onChange={(e) => {
                                            const newComplaints = [...formData.complaints];
                                            newComplaints[i] = e.target.value;
                                            setFormData({ ...formData, complaints: newComplaints });
                                        }}
                                        placeholder="Enter Complaints"
                                        className="block w-full border p-2 rounded mt-2"
                                    />
                                ))}
                            </div>

                            {/* Medical History */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input
                                    value={formData.pastHistory}
                                    onChange={(e) => setFormData({ ...formData, pastHistory: e.target.value })}
                                    placeholder="Enter past medical history"
                                    className="border p-2 rounded"
                                />
                                <input
                                    value={formData.surgicalHistory}
                                    onChange={(e) => setFormData({ ...formData, surgicalHistory: e.target.value })}
                                    placeholder="Enter surgical history"
                                    className="border p-2 rounded"
                                />
                                <input
                                    value={formData.drugAllergy}
                                    onChange={(e) => setFormData({ ...formData, drugAllergy: e.target.value })}
                                    placeholder="Enter drug allergies or history"
                                    className="border p-2 rounded"
                                />
                            </div>

                            {/* Physical Examination */}
                            <div>
                                <div className="font-semibold">Physical Examination</div>
                                {formData.physicalExamination.map((exam, i) => (
                                    <input
                                        key={i}
                                        value={exam}
                                        onChange={(e) => {
                                            const updated = [...formData.physicalExamination];
                                            updated[i] = e.target.value;
                                            setFormData({ ...formData, physicalExamination: updated });
                                        }}
                                        placeholder="Enter Physical Examination"
                                        className="block w-full border p-2 rounded mt-2"
                                    />
                                ))}
                            </div>

                            {/* Diagnosis */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <div className="font-semibold">Provisional Diagnosis</div>
                                    {formData.diagnosis.provisional.map((text, i) => (
                                        <input
                                            key={i}
                                            value={text}
                                            onChange={(e) => {
                                                const updated = [...formData.diagnosis.provisional];
                                                updated[i] = e.target.value;
                                                setFormData({
                                                    ...formData,
                                                    diagnosis: { ...formData.diagnosis, provisional: updated }
                                                });
                                            }}
                                            placeholder="Enter Provisional Diagnosis"
                                            className="block w-full border p-2 rounded mt-2"
                                        />
                                    ))}
                                </div>
                                <div>
                                    <div className="font-semibold">Final Diagnosis</div>
                                    {formData.diagnosis.final.map((text, i) => (
                                        <input
                                            key={i}
                                            value={text}
                                            onChange={(e) => {
                                                const updated = [...formData.diagnosis.final];
                                                updated[i] = e.target.value;
                                                setFormData({
                                                    ...formData,
                                                    diagnosis: { ...formData.diagnosis, final: updated }
                                                });
                                            }}
                                            placeholder="Enter Final Diagnosis"
                                            className="block w-full border p-2 rounded mt-2"
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Investigations */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {formData.tests.map((test, i) => (
                                    <input
                                        key={i}
                                        value={test}
                                        onChange={(e) => {
                                            const updated = [...formData.tests];
                                            updated[i] = e.target.value;
                                            setFormData({ ...formData, tests: updated });
                                        }}
                                        placeholder="Search tests"
                                        className="border p-2 rounded"
                                    />
                                ))}
                                {formData.testNotes.map((note, i) => (
                                    <input
                                        key={i}
                                        value={note}
                                        onChange={(e) => {
                                            const updated = [...formData.testNotes];
                                            updated[i] = e.target.value;
                                            setFormData({ ...formData, testNotes: updated });
                                        }}
                                        placeholder="Add a note for the lab"
                                        className="border p-2 rounded"
                                    />
                                ))}
                            </div>

                            {/* Medication Table (Static) */}
                            <div>
                                <div className="font-semibold mb-2">Medication / Prescription</div>
                                <GenericTable columns={columns} data={medicineData} />
                            </div>

                            {/* Advice */}
                            <textarea
                                value={formData.advice}
                                onChange={(e) => setFormData({ ...formData, advice: e.target.value })}
                                placeholder="Enter advice"
                                className="w-full border p-2 rounded"
                                rows={3}
                            />

                            {/* Follow-up */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {formData.followUp.map((val, i) => (
                                    <input
                                        key={i}
                                        type="date"
                                        value={val}
                                        onChange={(e) => {
                                            const updated = [...formData.followUp];
                                            updated[i] = e.target.value;
                                            setFormData({ ...formData, followUp: updated });
                                        }}
                                        className="border p-2 rounded"
                                    />
                                ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 mt-4">
                                <button className="bg-purple-600 text-white px-4 py-2 rounded">Save & Finalize</button>
                                <button className="bg-gray-200 px-4 py-2 rounded">Print Prescription</button>
                                <button className="bg-green-500 text-white px-4 py-2 rounded ml-auto">Send via WhatsApp</button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default ConsultationForm;