import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import Sidebar from "../components/layout/SideBar";
import Header from "../components/layout/Header";
import GenericTable from "../components/ui/GenericTable";
import { rxData } from "../data/RxDummyData";
import { Link } from "react-router-dom";


const columns = [
  { label: "UID", accessor: "uid" },
  { label: "Name", accessor: "name" },
  { label: "Phone", accessor: "phone" },
  { label: "Last Visit", accessor: "lastVisit" },
  { label: "Category", accessor: "category" },
  { label: "Action", accessor: "action" },
];

const CreateRx = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = rxData.filter((row) =>
    Object.values(row).some((val) =>
      val.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleRegisterPatient = () => {
    console.log("Register Patient button clicked");
  }
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-2 bg-white border-l border-t overflow-y-auto">
          <div className="max-w-[90%] mx-auto py-8 space-y-10">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Create Rx</h1>
              <button onClick={handleRegisterPatient} className="bg-[#ece8f9] text-[#5e3bea] px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#dcd6f2] transition-colors">
                Register Patient
              </button>
            </div>

            <div className="relative w-full max-w mb-6">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                placeholder="Search by Patient, Invoice ID, Phone"
                className="w-full pl-10 pr-10 py-2 border rounded-xl bg-[#f1ecf9] text-[#5e3bea] focus:outline-none text-sm"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <GenericTable
              columns={columns}
              data={filteredData}
              renderCell={(row, accessor) => {
                if (accessor === "category") {
                  const colorMap = {
                    "Follow-up": "bg-purple-100 text-purple-700",
                    "Emergency": "bg-red-100 text-red-600",
                    "Chronic": "bg-blue-100 text-blue-600",
                  };

                  return (
                    <span className={`text-sm px-3 py-1 rounded-full ${colorMap[row.category]}`}>
                      {row.category}
                    </span>
                  );
                }

                if (accessor === 'action') {
                  return (
                    <Link to={`/${row.uid}/consult`}>
                      <span className={`text-sm px-3 py-1 `}>
                        Consult
                      </span>
                    </Link>
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

export default CreateRx;
