import {Routes, Route} from "react-router-dom"

import ProtectedRoute from "./components/routes/ProtectedRoute"
import Dashboard from "./pages/Dashboard"
import AiAssistant from "./pages/AiAssistant"
import Invoice from "./pages/Invoice"
import CreateRx from "./pages/CreateRx"
import AllPatients from "./pages/AllPatients"
import IPDRecords from "./pages/IpdRecords"
import Settings from "./pages/Settings"
import Templates from "./pages/Template"
import DropDownConfiguration from "./pages/DropDownConfiguration"
import Medicines from "./pages/Medicine"
import PatientQueue from "./pages/PatientQueue" 
function App() {


  return (
    <>
      
      <Routes>
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/ai" element={<ProtectedRoute><AiAssistant /></ProtectedRoute>} />
        <Route path="/invoice" element={<ProtectedRoute><Invoice /></ProtectedRoute>} />
        <Route path="/create-rx" element={<ProtectedRoute><CreateRx /></ProtectedRoute>} />
        <Route path="/all-patients" element={<ProtectedRoute><AllPatients /></ProtectedRoute>} />
        <Route path="/ipd" element={<ProtectedRoute><IPDRecords /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/template-library" element={<ProtectedRoute><Templates /></ProtectedRoute>} />
        <Route path="/dropdown-library" element={<ProtectedRoute><DropDownConfiguration /></ProtectedRoute>} />
        <Route path="/medicine-library" element={<ProtectedRoute><Medicines /></ProtectedRoute>} />
        <Route path="/patient-queue" element={<ProtectedRoute><PatientQueue /></ProtectedRoute>} />
     </Routes>
      </>
  )
}

export default App
