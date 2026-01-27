import { useParams } from "react-router-dom"
import { Header, Accordion } from "../../components"
import type { Field } from "../../types/form"

const SECTIONS: {
  title: string
  disabled: boolean
  fields: Field[]
}[] = [
      {
      title: "Overige notities",
      disabled: false,
      fields: [
        { type: "text", label: "" },
      ]
    },  
    {
      title: "Gedrag volk",
      disabled: false,
      fields: [
        { type: "text", label: "Gedrag" },
      ]
    },
    {
      title: "Koningin gezien",
      disabled: false,  
      fields: [
        { type: "text", label: "" },
      ]
    },
    {
      title: "Aantal bakken",
      disabled: false,
      fields: [
        { type: "number", label: "Aantal" },
      ]
    },
    {
      title: "Ramen bezet",
      disabled: false,
      fields: [
        { type: "number", label: "Aantal" },
      ]
    },
    {
      title: "BRIAS",
      disabled: false,
      fields: [
        { type: "text", label: "j/n" },
      ]
    },
    {
      title: "BRIAS gezond",
      disabled: false,
      fields: [
        { type: "text", label: "j/n" },
      ]
    },
    {
      title: "Belegde zwermcellen",
      disabled: false,
      fields: [
        { type: "text", label: "j/n" },
      ]
    },
    {
      title: "Voorraad voer",
      disabled: false,
      fields: [
        { type: "number", label: "" },
      ]
    },
    {
      title: "Stuifmeel",
      disabled: false,
      fields: [
        { type: "text", label: "j/n" },
      ]
    },
    {
      title: "Mijtval",
      disabled: false,
      fields: [
        { type: "text", label: "j/n" },
      ]
    }
  ]

function InspectionForm() {
  const { inspectionId } = useParams()

  return (
    <div className="App">
      <Header
        title={`Inspectie #${inspectionId}`}
        description="Bewerk inspectie"
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

export default InspectionForm
