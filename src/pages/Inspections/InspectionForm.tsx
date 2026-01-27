import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Header } from "../../components"
import styles from './styles.module.css'
import getClassNameFactory from '../../lib/get-class-name-factory'

const getClassName = getClassNameFactory('Inspection', styles)

type Inspection = {
  id?: number
  hive_id: number
  user_id?: number
  queen_id?: number
  date?: string
  behaviour?: string
  queen_seen?: string
  honeycomb_count?: number
  windows_occupied?: number
  BRIAS?: string
  BRIAS_healthy?: string
  invested_swarm_cells?: string
  stock_food?: number
  pollen?: string
  mite_fall?: number
  created_at?: string
  updated_at?: string
}

function InspectionForm() {
  const { hiveId } = useParams<{ hiveId: string }>()
  const navigate = useNavigate()

  const [inspection, setInspection] = useState<Inspection>({
    hive_id: hiveId ? parseInt(hiveId) : 0,
    behaviour: "",
    queen_seen: "",
    honeycomb_count: 0,
    windows_occupied: 0,
    BRIAS: "",
    BRIAS_healthy: "",
    invested_swarm_cells: "",
    stock_food: 0,
    pollen: "",
    mite_fall: 0,
    date: new Date().toISOString().slice(0, 10),
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (field: keyof Inspection, value: string | number) => {
    setInspection(prev => ({ ...prev, [field]: value }))
  }

const createInspection = async () => {
  if (!hiveId) return

  setLoading(true)
  setError(null)

  const formData = new FormData()
  formData.append("hive_id", inspection.hive_id.toString())
  formData.append("user_id", "1")
  formData.append("queen_id", "1")
  formData.append("date", inspection.date || "")
  formData.append("behaviour", inspection.behaviour || "")
  formData.append("queen_seen", inspection.queen_seen || "")
  formData.append("honeycomb_count", (inspection.honeycomb_count || 0).toString())
  formData.append("windows_occupied", (inspection.windows_occupied || 0).toString())
  formData.append("BRIAS", inspection.BRIAS || "")
  formData.append("BRIAS_healthy", inspection.BRIAS_healthy || "")
  formData.append("invested_swarm_cells", inspection.invested_swarm_cells || "")
  formData.append("stock_food", (inspection.stock_food || 0).toString())
  formData.append("pollen", inspection.pollen || "")
  formData.append("mite_fall", (inspection.mite_fall || 0).toString())

  try {
    const res = await fetch("/api/inspection", {
      method: "POST",
      body: formData,
    })

    const json = await res.json()
    console.log("Server response:", json);

    if (!res.ok) throw new Error(json.error || "Failed to create inspection")
    navigate(`/hives/${hiveId}/inspections/${json.data.id}`);
  } catch (err: any) {
    setError(err.message || "Unknown error")
  } finally {
    setLoading(false)
  }
}

  const fields = [
    { label: "Datum", type: "date", field: "date" },
    { label: "Gedrag", type: "text", field: "behaviour" },
    { label: "Koningin gezien", type: "text", field: "queen_seen" },
    { label: "Aantal bakken", type: "number", field: "honeycomb_count" },
    { label: "Ramen bezet", type: "number", field: "windows_occupied" },
    { label: "BRIAS", type: "text", field: "BRIAS" },
    { label: "BRIAS gezond", type: "text", field: "BRIAS_healthy" },
    { label: "Belegde zwermcellen", type: "text", field: "invested_swarm_cells" },
    { label: "Voorraad voer", type: "number", field: "stock_food" },
    { label: "Stuifmeel", type: "text", field: "pollen" },
    { label: "Mijtval", type: "number", field: "mite_fall" },
  ]

  return (
    <div className="App">
      <Header title={`Nieuwe inspectie voor bijenkast ${hiveId}`} description="Vul de gegevens in" />

      <div className="Body">
        {error && <div style={{ color: "red", marginBottom: "12px" }}>{error}</div>}

        <div className={getClassName('CreateForm')}>
          {fields.map(({ label, type, field }) => (
            <label key={field} style={{ width: "100%", marginBottom: "12px", display: "block" }}>
              {label}
              <input
                type={type}
                value={(inspection as any)[field]}
                onChange={e =>
                  handleChange(
                    field as keyof Inspection,
                    type === "number" ? parseInt(e.target.value) || 0 : e.target.value
                  )
                }
                className={getClassName('Input')} // **all inputs use the same class**
              />
            </label>
          ))}

          <div className={getClassName('Actions')}>
            <button
              className={getClassName('Button')}
              onClick={createInspection}
              disabled={loading}
            >
              {loading ? "Bezig..." : "Bevestigen"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InspectionForm
