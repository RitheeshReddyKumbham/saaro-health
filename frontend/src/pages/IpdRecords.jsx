import React, { useState } from "react";
import Sidebar from "../components/layout/SideBar";
import Header from "../components/layout/Header";
import GenericTable from "../components/ui/GenericTable";
import { FiSearch } from "react-icons/fi";
import { ipdData } from "../data/IpdDummyData";
import { Link } from "react-router-dom";

const columns = [
  { label: "Record ID", accessor: "id" },
  { label: "Patient Name", accessor: "name" },
  { label: "Admission Date", accessor: "admissionDate" },
  { label: "Discharge Date", accessor: "dischargeDate" },
  { label: "Status", accessor: "status" },
  { label: "Actions", accessor: "action" },
];

const IPDRecords = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = ipdData.filter((row) =>
    row.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateSummary = () => {
    console.log("Create Discharge Summary button clicked");
    // Logic to create discharge summary can be added here
  }
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-2 bg-white border-l border-t overflow-y-auto">
          <div className=" max-w-[90%] mx-auto py-8 space-y-10">
            {/* Header */}
            <div className="flex justify-between items-center mb-2 ">
              <h1 className="text-2xl font-bold">IPD Records</h1>
              <Link to='/ipd/discharge'>
                <button
                  className="bg-[#ece8f9] text-[#5e3bea] px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#dcd6f2] transition-colors"
                  onClick={handleCreateSummary}
                >
                  Create Discharge Summary
                </button>
              </Link>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              View and manage patient records, including medical history, treatments, and outcomes.
            </p>

            {/* Search */}
            <div className="relative w-full max-w mb-4">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                placeholder="Search by Patient, Invoice ID, Phone"
                className="w-full pl-10 pr-10 py-2 border rounded-xl bg-[#f1ecf9] text-[#5e3bea] focus:outline-none text-sm"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Table */}
            <GenericTable
              columns={columns}
              data={filteredData}
              renderCell={(row, accessor) => {
                if (accessor === "status") {
                  return (
                    <span className="bg-purple-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                      {row.status}
                    </span>
                  );
                }

                if (accessor === "action") {
                  return (
                    <button className="text-[#5e3bea] text-sm font-medium">
                      View Details
                    </button>
                  );
                }

                return <span className="text-sm">{row[accessor]}</span>;
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default IPDRecords;
