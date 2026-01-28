import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Header, Accordion } from "../../components"
import type { Field } from "../../types/form"
import type { ApiResponse } from "../../types/api"

export type Inspection = {
  id: number
  user_id: number
  hive_id: number
  queen_id: number
  date: string
  behaviour: string
  queen_seen: number
  honeycomb_count: number
  windows_occupied: number
  BRIAS: string
  BRIAS_healthy: string
  invested_swarm_cells: number
  stock_food: number
  pollen: number
  mite_fall: number
  created_at: string
  updated_at: string
}

const SECTIONS: {
  title: string
  disabled: boolean
  fields: Field<Inspection>[]
}[] = [
  {
    title: "Overige notities",
    disabled: true,
    fields: [
      { type: "text", label: "Notities", name: "id" } // voorlopig dummy, kan later aangepast
    ]
  },
  {
    title: "Gedrag volk",
    disabled: true,
    fields: [
      { type: "text", label: "Gedrag", name: "behaviour" }
    ]
  },
  {
    title: "Koningin gezien",
    disabled: true,
    fields: [
      { type: "checkbox", label: "Koningin gezien", name: "queen_seen"}
    ]
  },
  {
    title: "Aantal bakken",
    disabled: true,
    fields: [
      { type: "number", label: "Aantal", name: "honeycomb_count" }
    ]
  },
  {
    title: "Ramen bezet",
    disabled: true,
    fields: [
      { type: "number", label: "Aantal", name: "windows_occupied" }
    ]
  },
  {
    title: "BRIAS",
    disabled: true,
    fields: [
      { type: "text", label: "j/n", name: "BRIAS" }
    ]
  },
  {
    title: "BRIAS gezond",
    disabled: true,
    fields: [
      { type: "text", label: "j/n", name: "BRIAS_healthy" }
    ]
  },
  {
    title: "Belegde zwermcellen",
    disabled: true,
    fields: [
      { type: "number", label: "Aantal", name: "invested_swarm_cells" }
    ]
  },
  {
    title: "Voorraad voer",
    disabled: true,
    fields: [
      { type: "number", label: "Gram", name: "stock_food" }
    ]
  },
  {
    title: "Stuifmeel",
    disabled: true,
    fields: [
      { type: "number", label: "Gram", name: "pollen" }
    ]
  },
  {
    title: "Mijtval",
    disabled: true,
    fields: [
      { type: "number", label: "Aantal", name: "mite_fall" }
    ]
  }
]

function InspectionView() {
  const { inspectionId } = useParams()
  const [inspections, setInspections] = useState<Inspection[]>([])

  useEffect(() => {
    fetch("/api/inspections")
      .then(res => res.json())
      .then((json: ApiResponse<Inspection[]>) => {
        setInspections(json.data)
      })
  }, [])

  const inspection = inspections.find(
    i => i.id === Number(inspectionId)
  ) ?? null

  return (
    <div className="App">
      <Header
        title={`Inspectie #${inspectionId}`}
        description={inspection ? `Uitgevoerd op ${inspection.created_at}` : "Uitgevoerd op"}
      />

      <div className="Body">
        {SECTIONS.map(({ title, disabled, fields }) => (
          <Accordion
            key={title}
            title={title}
            disabled={disabled}
            fields={fields}
            inspection={inspection}
          />
        ))}
      </div>
    </div>
  )
}

export default InspectionView
