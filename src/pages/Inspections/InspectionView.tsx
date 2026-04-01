import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Header } from "../../components"
import type { ApiResponse } from "../../types/api"

export type Inspection = {
  id: number
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

type InspectionField = {
  label: string
  value: string | number | boolean
  type: "text" | "number" | "boolean" | "date"
}

function InspectionView() {
  const { inspectionId } = useParams()
  const [inspection, setInspection] = useState<Inspection | null>(null)

  useEffect(() => {
    if (inspectionId) {
      fetch(`/api/inspection/${inspectionId}`)
        .then(res => res.json())
        .then((json: ApiResponse<Inspection[]>) => {
          const data = json.data?.[0]
          if (data) setInspection(data)
        })
        .catch(err => console.error("Failed to load inspection:", err))
    }
  }, [inspectionId])

  const getFields = (data: Inspection | null): InspectionField[] => {
    if (!data) return []

    return [
      { label: "Datum", value: data.date, type: "date" },
      { label: "Gedrag", value: data.behaviour || "", type: "text" },
      { label: "Koningin gezien", value: Boolean(data.queen_seen), type: "boolean" },
      { label: "Aantal bakken", value: data.honeycomb_count || 0, type: "number" },
      { label: "Ramen bezet", value: data.windows_occupied || 0, type: "number" },
      { label: "BRIAS", value: data.BRIAS || "", type: "text" },
      { label: "BRIAS gezond", value: data.BRIAS_healthy || "", type: "text" },
      { label: "Belegde zwermcellen", value: data.invested_swarm_cells || "", type: "text" },
      { label: "Voorraad voer", value: data.stock_food || 0, type: "number" },
      { label: "Stuifmeel", value: data.pollen || "", type: "text" },
      { label: "Mijtval", value: data.mite_fall || 0, type: "number" },
    ]
  }

  const fields = getFields(inspection)

  return (
    <div className="App">
      <Header
        title={`Inspectie #${inspectionId}`}
        description={inspection ? `Uitgevoerd op ${inspection.date}` : "Laden..."}
      />

      <div className="Body">
        <div style={{ width: "100%" }}>
          <div style={{
            backgroundColor: "var(--background)",
            borderRadius: "10px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}>
            {fields.map(({ label, value, type }) => (
              <div key={label} style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}>
                <label style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "var(--primary-text)",
                }}>{label}</label>

                {type === "boolean" ? (
                  <input type="checkbox" checked={value as boolean} disabled readOnly 
                  style={{
                    width: "40px",
                    height: "40px",
                    margin: "0 auto",
                    }} />
                ) : (
                  <input
                    type={type}
                    value={value as string | number}
                    disabled
                    readOnly
                    style={{
                      width: "100%",
                      height: "45px",
                      backgroundColor: "#f8f8f8",
                      border: "1px solid var(--secondary-text)",
                      borderRadius: "8px",
                      padding: "10px 12px",
                      fontFamily: "'Inter', Arial, sans-serif",
                      fontSize: "16px",
                      boxSizing: "border-box",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InspectionView
