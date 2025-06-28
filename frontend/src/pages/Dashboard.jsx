import KPISection from "../components/ui/KpiSection";
import GenericTable from "../components/ui/GenericTable";
import BarGraph from "../components/ui/charts/BarGraph";
import LineGraph from "../components/ui/charts/LineGraph";
import Sidebar from "../components/layout/SideBar";
import Header from "../components/layout/Header";
import { Link } from "react-router-dom";
import { kpis, todayAppointments, patientGrowthData, appointmentTypeData, plannedSurgeries } from "../data/DashboardDummyData";

const columns = [
  { label: "Patient Name", accessor: "name" },
  { label: "Time", accessor: "time" },
  { label: "Type", accessor: "type" },
  { label: "Status", accessor: "status" },
]


const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-2 bg-white border-l border-t overflow-y-auto">
          <div className="max-w-[90%] mx-auto py-8 space-y-10">
            <div className="flex flex-row justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back, Dr. Amelia Carter</p>
              </div>
              <Link to='/ai' >
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Ask Saaro AI
                </button>
              </Link>
            </div>

            <div className="w-max-lg mx-auto mb-8">
              <KPISection kpis={kpis} />
            </div>


            <div>
              <h2 className="text-lg font-semibold mb-3">Today's Appointments</h2>
              <GenericTable

                data={todayAppointments}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border rounded-xl">
                <h3 className="text-sm font-medium mb-3">Patient Growth</h3>
                <LineGraph data={patientGrowthData} />
              </div>
              <div className="p-4 border rounded-xl">
                <h3 className="text-sm font-medium mb-3">Appointment Types</h3>
                <BarGraph data={appointmentTypeData} />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3">Planned Surgeries</h2>
              <GenericTable
                columns={columns}
                data={plannedSurgeries}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
