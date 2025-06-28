import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import Sidebar from "../components/layout/SideBar";
import Header from "../components/layout/Header";
import GenericTable from "../components/ui/GenericTable";
import { patientsData } from "../data/AllPatientsDummyData";
const categoryOptions = ["All", "New", "Follow-up", "Chronic", "Emergency"];


const columns = [
  { label: "UID", accessor: "uid" },
  { label: "Name", accessor: "name" },
  { label: "Phone", accessor: "phone" },
  { label: "Last Visit", accessor: "lastVisit" },
  { label: "Category", accessor: "category" },
  { label: "Action", accessor: "action" },
];

const AllPatients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const filteredPatients = patientsData.filter((row) => {
    const matchesSearch = Object.values(row)
      .some(val => val.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === "All" || row.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-2 bg-white border-l border-t overflow-y-auto">
      <div className="p-6 max-w-[95%] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">All Patients</h1>
          <button className="bg-[#ece8f9] text-[#5e3bea] px-4 py-2 rounded-xl text-sm font-medium">
            Register Patient
          </button>
        </div>

        <div className="relative w-full max-w-md mb-4">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Name, Phone, UID"
            className="w-full pl-10 pr-4 py-2 border rounded-xl bg-[#f1ecf9] text-[#5e3bea] focus:outline-none text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mb-4">
           <button onClick={() => setCategoryDropdownOpen(!setCategoryDropdownOpen)} className="px-3 py-1 bg-gray-100 rounded-lg text-sm flex items-center gap-2">
              <span>category</span>
              <IoIosArrowDown />
            </button>
            {categoryDropdownOpen && (
              <div className="absolute top-10 left-0 z-10 bg-white border rounded shadow text-sm">
                {categoryOptions.map((category) => (
                  <button
                    key={category}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${categoryFilter === category ? "bg-gray-200" : ""}`}
                    onClick={() => {
                      setCategoryFilter(tag);
                      setCategoryDropdownOpen(false);
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
        </div>

        <GenericTable
          columns={columns}
          data={filteredPatients}
          renderCell={(row, accessor) => {
            if (accessor === "category") {
              return (
                <span className={`text-sm px-3 py-1 bg-gray rounded-full`}>
                  {row.category}
                </span>
              );
            }

            if (accessor === "action") {
              return (
                <button className="text-[#5e3bea] font-medium text-sm">
                  View History
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

export default AllPatients;
