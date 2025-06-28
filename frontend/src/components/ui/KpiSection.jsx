import React from "react";

const getChangeColor = (type) =>
  type === "positive" ? "text-green-500" : "text-red-500";

const KPISection = ({ kpis }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {kpis.map((kpi) => (
        <div
          key={kpi.label}
          className="bg-[#f8f9fa] rounded-xl px-6 py-5 flex flex-col items-start shadow-sm"
        >
          <div className="text-sm text-gray-500 mb-1">{kpi.label}</div>
          <div className="text-2xl font-semibold mb-1">{kpi.value}</div>
          <div className={`${getChangeColor(kpi.changeType)} text-sm font-medium`}>
            {kpi.change}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPISection;
