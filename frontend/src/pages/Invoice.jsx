import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/layout/SideBar";
import Header from "../components/layout/Header";
import KPISection from "../components/ui/KpiSection";
import GenericTable from "../components/ui/GenericTable";

import { FiSearch } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { INVOICE_KPIS,invoicesData } from "../data/InvoiceDummyData";


const dateOptions = ["All", "Last 30 days", "Last 90 days"];
const statusOptions = ["All", "Paid", "Unpaid", "Partially Paid"];
const modeOptions = ["All", "Cash", "UPI", "Card", "Insurance"];

const columns = [
  { label: "Invoice ID", accessor: "id" },
  { label: "Patient Name", accessor: "name" },
  { label: "Date of Invoice", accessor: "date" },
  { label: "Amount (₹)", accessor: "amount" },
  { label: "Status", accessor: "status" },
  { label: "Payment Mode", accessor: "mode" },
  { label: "Actions", accessor: "action" },
];

const Invoice = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modeFilter, setModeFilter] = useState("All");

  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showModeDropdown, setShowModeDropdown] = useState(false);

  const filteredInvoices = invoicesData.filter((invoice) => {
    const searchMatch =
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.name.toLowerCase().includes(searchTerm.toLowerCase());

    const today = new Date();
    const invoiceDate = new Date(invoice.date);
    let dateMatch = true;

    if (dateFilter === "Last 30 days") {
      const past = new Date();
      past.setDate(today.getDate() - 30);
      dateMatch = invoiceDate >= past;
    } else if (dateFilter === "Last 90 days") {
      const past = new Date();
      past.setDate(today.getDate() - 90);
      dateMatch = invoiceDate >= past;
    }

    const statusMatch = statusFilter === "All" || invoice.status === statusFilter;
    const modeMatch = modeFilter === "All" || invoice.mode === modeFilter;

    return searchMatch && dateMatch && statusMatch && modeMatch;
  });

  return (
     <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
      <main className="flex-1 p-2 bg-white border-l border-t overflow-y-auto">
      <div className="p-6 max-w-[90%] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Invoices</h1>
          <button className="bg-[#ece8f9] text-[#5e3bea] px-4 py-2 rounded-xl text-sm font-medium">
            Create Invoice
          </button>
        </div>

        {/* KPI */}
        <KPISection kpis={INVOICE_KPIS} />

        {/* Section Title */}
        <div className="text-lg font-medium mb-2 mt-6">All Invoices</div>

        {/* Search + Filters */}
        <div className="flex flex-col gap-4 mb-4 w-full">
          {/* 🔍 Search */}
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

          {/* Filters */}
          <div className="relative flex flex-wrap gap-2">
            {/* Date Filter */}
            <div className="relative">
              <button
                onClick={() => setShowDateDropdown(!showDateDropdown)}
                className="px-3 py-1 bg-[#f1ecf9] text-[#5e3bea] rounded-xl text-sm flex items-center gap-2"
              >
                <span>Date Range</span>
                <IoIosArrowDown />
              </button>
              {showDateDropdown && (
                <div className="absolute top-10 left-0 z-10 bg-white border rounded shadow text-sm">
                  {dateOptions.map((val) => (
                    <button
                      key={val}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${dateFilter === val ? "bg-gray-200" : ""}`}
                      onClick={() => {
                        setDateFilter(val);
                        setShowDateDropdown(false);
                      }}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Status Filter */}
            <div className="relative">
              <button
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                className="px-3 py-1 bg-[#f1ecf9] text-[#5e3bea] rounded-xl text-sm flex items-center gap-2"
              >
                <span>Payment Status</span>
                <IoIosArrowDown />
              </button>
              {showStatusDropdown && (
                <div className="absolute top-10 left-0 z-10 bg-white border rounded shadow text-sm">
                  {statusOptions.map((val) => (
                    <button
                      key={val}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${statusFilter === val ? "bg-gray-200" : ""}`}
                      onClick={() => {
                        setStatusFilter(val);
                        setShowStatusDropdown(false);
                      }}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mode Filter */}
            <div className="relative">
              <button
                onClick={() => setShowModeDropdown(!showModeDropdown)}
                className="px-3 py-1 bg-[#f1ecf9] text-[#5e3bea] rounded-xl text-sm flex items-center gap-2"
              >
                <span>Mode</span>
                <IoIosArrowDown />
              </button>
              {showModeDropdown && (
                <div className="absolute top-10 left-0 z-10 bg-white border rounded shadow text-sm">
                  {modeOptions.map((val) => (
                    <button
                      key={val}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${modeFilter === val ? "bg-gray-200" : ""}`}
                      onClick={() => {
                        setModeFilter(val);
                        setShowModeDropdown(false);
                      }}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <GenericTable
          columns={columns}
          data={filteredInvoices}
          renderCell={(row, accessor) => {
            if (accessor === "status") {
              return (
                <span className={`text-sm px-3 py-1 rounded-full`}>
                  {row.status}
                </span>
              );
            }
            if (accessor === "action") {
              return (
                <Link to={`/invoice/${row.id}`}>
                  <button className="text-[#5e3bea] text-sm font-medium">View</button>
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

export default Invoice;
