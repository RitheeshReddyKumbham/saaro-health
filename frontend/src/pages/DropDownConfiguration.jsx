import React, { act } from "react";
import Sidebar from "../components/layout/SideBar";
import Header from "../components/layout/Header";
import GenericTable from "../components/ui/GenericTable";
import { dropDownData } from "../data/DropDownDummyData";

const columns = [
    { label: "Entry Name", accessor: "name" },
    { label: "Section", accessor: "section" },
    { label: "Created By", accessor: "creator" },
    { label: "Actions", accessor: "action" },
]

const DropDownConfiguration = () => {

    const handleNewEntry = () => {
        console.log("Created new entry");
    }

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-2 bg-white border-l border-t overflow-y-auto">
                    <div className="max-w-[90%] mx-auto py-8 space-y-10">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold">Dropdown Configuration</h2>
                            <button
                                onClick={handleNewEntry}
                                className="bg-[#a381f0] text-white font-semibold px-4 py-2 rounded-full hover:bg-[#e0dbf6]">
                                + Add New Entry
                            </button>
                        </div>

                        <div className="overflow-x-auto rounded-xl">
                            <GenericTable
                                columns={columns}
                                data={dropDownData}
                                renderCell={(row, accessor) => {
                                    if (accessor === "name") {
                                        return <span className="text-sm">{row[accessor]}</span>;
                                    }
                                    if (accessor === 'action') {
                                        return <span className="text-sm text-[#7c69a7] font-semibold">{row[accessor]}</span>;
                                    }

                                    return <span className="text-md text-[#7c69a7]">{row[accessor]}</span>;
                                }}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DropDownConfiguration;
