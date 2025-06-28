import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import Sidebar from "../components/layout/SideBar";
import Header from "../components/layout/Header";
import GenericTable from "../components/ui/GenericTable";
import { medicines } from "../data/MedicineDummyData";

const columns = [
    { label: "Name", accessor: "name" },
    { label: "Composition", accessor: "composition" },
    { label: "Frequency", accessor: "frequency" },
    { label: "Dosage", accessor: "dosage" },
    { label: "Notes", accessor: "notes" },
    { label: "Created By", accessor: "createdBy" },
    { label: "Actions", accessor: "actions" },

]



const Medicines = () => {

    const [searchTerm, setSearchTerm] = useState("");

    const filteredMedicines = medicines.filter((row) => {
        return row.name.toLowerCase().includes(searchTerm.toLowerCase())
    })

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-2 bg-white border-l border-t overflow-y-auto">
                    <div className="max-w-[90%] mx-auto py-8 space-y-10">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold">Medicines</h2>
                            <button className="bg-[#f4f0fd] text-black font-semibold px-4 py-2 rounded-full hover:bg-[#e0dbf6]">
                                + Add Medicine
                            </button>
                        </div>
                    
                        <div className="relative w-full mb-4">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder=" Search Medicine"
                                className="w-full pl-10 pr-4 py-2 border rounded-xl bg-[#f1ecf9] text-[#5e3bea] focus:outline-none text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="overflow-x-auto border border-gray-200 rounded-xl">
                            <GenericTable
                                columns={columns}
                                data={filteredMedicines}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Medicines;
