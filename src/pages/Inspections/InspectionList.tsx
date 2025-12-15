import { useParams } from "react-router-dom"

function InspectionList() {
  const { hiveId } = useParams()

  return <div>Inspecties van hive {hiveId}</div>
}

export default InspectionList
