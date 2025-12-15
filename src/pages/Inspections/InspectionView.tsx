import { useParams } from "react-router-dom"

function InspectionView() {
  const { inspectionId } = useParams()

  return <div>Inspectie {inspectionId} bekijken</div>
}

export default InspectionView
