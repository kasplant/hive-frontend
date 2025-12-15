import { useParams } from "react-router-dom"

function InspectionForm() {
  const { inspectionId } = useParams()

  return (
    <div>
      {inspectionId ? "Inspectie bewerken" : "Nieuwe inspectie"}
    </div>
  )
}

export default InspectionForm
