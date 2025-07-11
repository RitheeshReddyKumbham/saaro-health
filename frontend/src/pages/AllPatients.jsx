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
  const [categoryFilter, setCategoryFilter] = useState("Category");

  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const filteredPatients = patientsData.filter((row) => {
    const matchesSearch = Object.values(row)
      .some(val => val.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === "Category" || row.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-2 bg-white border-l border-t overflow-y-auto">
          <div className=" max-w-[90%] mx-auto py-8 space-y-10">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">All Patients</h1>
              <button className="bg-[#ece8f9] text-[#5e3bea] px-4 py-2 rounded-xl text-sm font-medium">
                Register Patient
              </button>
            </div>

            <div className="relative w-full  mb-2">
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
              <button
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                className="px-3 py-1 bg-gray-100 rounded-lg text-sm flex items-center gap-2"
              >
                <span>{categoryFilter}</span>
                <IoIosArrowDown />
              </button>
              {categoryDropdownOpen && (
                <div className="absolute mt-2 bg-white border rounded shadow text-sm z-50">
                  {categoryOptions.map((category) => (
                    <button
                      key={category}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${categoryFilter === category ? "bg-gray-200" : ""
                        }`}
                      onClick={() => {
                        setCategoryFilter(category);
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
                    <span className="text-sm px-3 py-1 bg-purple-100 text-purple-800 w-[120px] text-center rounded-full inline-block">
                      {row.category}
                    </span>
                  );
                }

                if (accessor === "action") {
                  return (
                    <button className="text-[#7c69a7] font-medium text-sm">
                      View History
                    </button>
                  );
                }
                if(accessor==='name'){
                  return <span className="text-sm ">{row[accessor]}</span>;
                }
                

                return <span className="text-sm text-[#7c69a7]">{row[accessor]}</span>;
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AllPatients;
