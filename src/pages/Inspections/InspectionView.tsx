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
        { type: "text", label: "" },
      ]
    },
    {
      title: "Gedrag volk",
      disabled: true,
      fields: [
        { type: "text", label: "Gedrag" },
      ]
    },
    {
      title: "Koningin gezien",
      disabled: true,  
      fields: [
        { type: "boolean", label: "gezien" },
      ]
    },
    {
      title: "Aantal bakken",
      disabled: true,
      fields: [
        { type: "number", label: "Aantal" },
      ]
    },
    {
      title: "Ramen bezet",
      disabled: true,
      fields: [
        { type: "number", label: "Aantal" },
      ]
    },
    {
      title: "BRIAS",
      disabled: true,
      fields: [
        { type: "text", label: "j/n" },
      ]
    },
    {
      title: "BRIAS gezond",
      disabled: true,
      fields: [
        { type: "text", label: "j/n" },
      ]
    },
    {
      title: "Belegde zwermcellen",
      disabled: true,
      fields: [
        { type: "text", label: "j/n" },
      ]
    },
    {
      title: "Voorraad voer",
      disabled: true,
      fields: [
        { type: "number", label: "" },
      ]
    },
    {
      title: "Stuifmeel",
      disabled: true,
      fields: [
        { type: "text", label: "j/n" },
      ]
    },
    {
      title: "Mijtval",
      disabled: true,
      fields: [
        { type: "number", label: "aantal" },
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
