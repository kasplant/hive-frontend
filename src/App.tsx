import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard/Dashboard"
import { HiveList, HiveDetail } from "./pages/Hives"
import {
  InspectionList,
  InspectionView,
  InspectionForm
} from "./pages/Inspections"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/hives" element={<HiveList />} />
        <Route path="/hives/:hiveId" element={<HiveDetail />} />

        <Route path="/hives/:hiveId/inspections" element={<InspectionList />} />
        <Route path="/hives/:hiveId/inspections/new" element={<InspectionForm />} />
        <Route
          path="/hives/:hiveId/inspections/:inspectionId"
          element={<InspectionView />}
        />
        <Route
          path="/hives/:hiveId/inspections/:inspectionId/edit"
          element={<InspectionForm />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
