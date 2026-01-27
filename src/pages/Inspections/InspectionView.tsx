import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Header, Accordion } from "../../components"
import type { Field } from "../../types/form"
import type { ApiResponse } from "../../types/api"

type Inspection = {
  id: number
  hive_id: number
  created_at: string
  updated_at: string
}

const SECTIONS: {
  title: string
  disabled: boolean
  fields: Field[]
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
        { type: "text", label: "" },
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
  const [inspection, setInspection] = useState<Inspection | null>(null)

  useEffect(() => {
    if (inspectionId) {
      fetch(`/api/inspections/${inspectionId}`)
        .then(res => res.json())
        .then((json: ApiResponse<Inspection>) => setInspection(json.data))
    }
  }, [inspectionId])

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
          />
        ))}
      </div>
    </div>
  )
}

export default InspectionView
