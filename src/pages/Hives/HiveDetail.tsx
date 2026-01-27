import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Card, Header } from "../../components"
import type { ApiResponse } from "../../types/api"

type Inspection = {
  id: number
  hive_id: number
  created_at: string
  updated_at: string
}

function HiveDetail() {
  const { hiveId } = useParams()
  const [inspections, setInspections] = useState<Inspection[]>([])

useEffect(() => {
  if (hiveId) {
    fetch(`/api/hives/${hiveId}/inspections`)
      .then(res => res.json())
      .then((json: ApiResponse<Inspection[]>) => {
        // newest first
        const sorted = [...json.data].sort(
          (a, b) => b.id - a.id
        )

        setInspections(sorted)
      })
  }
}, [hiveId])


  return (
    <div className="App">
      <Header title={`Bijenkast ${hiveId}`} description="Inspecties" />
      <div className="Body">
        {inspections.map(inspection => (
          <Card
            key={inspection.id}
            name={`inspectie ${inspection.id}`}
            subname="Uitgevoerd op"
            created_at={inspection.created_at}
            updated_at={inspection.updated_at}
            buttons={[
              {
                type: "primary",
                text: "Bekijk",
                href: `/hives/${hiveId}/inspections/${inspection.id}`
              },
              {
                type: "secondary",
                text: "Bewerk",
                href: `/hives/${hiveId}/inspections/${inspection.id}/edit`
              }
            ]}
          />
        ))}
      </div>
    </div>
  )
}
export default HiveDetail
