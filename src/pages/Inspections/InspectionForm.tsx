import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Header } from "../../components"
import styles from "./styles.module.css"
import getClassNameFactory from "../../lib/get-class-name-factory"

const getClassName = getClassNameFactory("Inspection", styles)

type Inspection = {
  id?: number
  hive_id: number
  user_id?: number
  queen_id?: number
  date?: string
  behaviour?: string
  queen_seen?: boolean
  honeycomb_count?: number
  windows_occupied?: number
  BRIAS?: string
  BRIAS_healthy?: string
  invested_swarm_cells?: string
  stock_food?: number
  pollen?: number
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
    queen_seen: false,
    honeycomb_count: 0,
    windows_occupied: 0,
    BRIAS: "",
    BRIAS_healthy: "",
    invested_swarm_cells: "",
    stock_food: 0,
    pollen: 0,
    mite_fall: 0,
    date: (() => {
      const today = new Date()
      const year = today.getFullYear()
      const month = String(today.getMonth() + 1).padStart(2, '0')
      const day = String(today.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    })(),
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const handleChange = <K extends keyof Inspection>(
    field: K,
    value: Inspection[K]
  ) => {
    setInspection(prev => ({ ...prev, [field]: value }))
  }


  const validate = (inspection: Inspection) => {
    const errors: Record<string, string> = {}

    if (!inspection.date) {
      errors.date = "Datum is verplicht"
    }

    if (!inspection.behaviour?.trim()) {
      errors.behaviour = "Gedrag is verplicht"
    }

    if (inspection.honeycomb_count! < 0) {
      errors.honeycomb_count = "Mag niet negatief zijn"
    }

    if (inspection.windows_occupied! < 0) {
      errors.windows_occupied = "Mag niet negatief zijn"
    }

    if (inspection.stock_food! < 0) {
      errors.stock_food = "Mag niet negatief zijn"
    }

    if (inspection.pollen! < 0) {
      errors.pollen = "Mag niet negatief zijn"
    }

    if (inspection.mite_fall! < 0) {
      errors.mite_fall = "Mag niet negatief zijn"
    }

    return errors
  }

  const createInspection = async () => {
    if (!hiveId) return

    const validationErrors = validate(inspection)

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors)
      return
    }

    setFieldErrors({})
    setLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append("hive_id", inspection.hive_id.toString())
    formData.append("user_id", "1")
    formData.append("queen_id", "1")
    formData.append("date", inspection.date || "")
    formData.append("behaviour", inspection.behaviour || "")
    formData.append("queen_seen", inspection.queen_seen ? "1" : "0")
    formData.append("honeycomb_count", inspection.honeycomb_count!.toString())
    formData.append("windows_occupied", inspection.windows_occupied!.toString())
    formData.append("BRIAS", inspection.BRIAS || "")
    formData.append("BRIAS_healthy", inspection.BRIAS_healthy || "")
    formData.append("invested_swarm_cells", inspection.invested_swarm_cells || "")
    formData.append("stock_food", inspection.stock_food!.toString())
    formData.append("pollen", inspection.pollen!.toString())
    formData.append("mite_fall", inspection.mite_fall!.toString())

    try {
      const res = await fetch("/api/inspection", {
        method: "POST",
        body: formData,
      })

      const json = await res.json()

      if (!res.ok) {
        if (res.status === 422 && json.errors) {
          setFieldErrors(
            Object.fromEntries(
              Object.entries(json.errors).map(([key, value]) => [
                key,
                (value as string[])[0],
              ])
            )
          )
          return
        }

        throw new Error(json.message || "Failed to create inspection")
      }

      navigate(`/hives/${hiveId}`)
    } catch (err: any) {
      setError(err.message || "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  const fields = [
    { label: "Datum", type: "date", field: "date" },
    { label: "Gedrag", type: "text", field: "behaviour" },
    { label: "Koningin gezien", type: "select", field: "queen_seen" },
    { label: "Aantal bakken", type: "number", field: "honeycomb_count" },
    { label: "Ramen bezet", type: "number", field: "windows_occupied" },
    { label: "BRIAS", type: "text", field: "BRIAS" },
    { label: "BRIAS gezond", type: "text", field: "BRIAS_healthy" },
    { label: "Belegde zwermcellen", type: "text", field: "invested_swarm_cells" },
    { label: "Voorraad voer", type: "number", field: "stock_food" },
    { label: "Stuifmeel", type: "number", field: "pollen" },
    { label: "Mijtval", type: "number", field: "mite_fall" },
  ]

return (
  <div className="App">
    <Header
      title={`Nieuwe inspectie voor bijenkast ${hiveId}`}
      description="Vul de gegevens in"
    />

    <div className="Body">
      {error && (
        <div style={{ color: "red", marginBottom: "12px" }}>
          {error}
        </div>
      )}

      <div className={getClassName("CreateForm")}>
        {fields.map(({ label, type, field }) => (
          <label
            key={field}
            style={{ width: "100%", marginBottom: "12px", display: "block" }}
          >
            {label}

            {type === "select" && field === "queen_seen" ? (
              <select
                value={
                  inspection.queen_seen === true
                    ? "yes"
                    : inspection.queen_seen === false
                    ? "no"
                    : ""
                }
                onChange={e =>
                  handleChange(
                    field as keyof Inspection,
                    e.target.value === "yes"
                  )
                }
                className={getClassName("Input")}
              >
                <option value="">-- kies --</option>
                <option value="yes">Ja</option>
                <option value="no">Nee</option>
              </select>
            ) : (
              <input
                type={type}
                value={(inspection as any)[field]}
                onChange={e =>
                  handleChange(
                    field as keyof Inspection,
                    type === "number"
                      ? parseInt(e.target.value) || 0
                      : e.target.value
                  )
                }
                className={getClassName("Input")}
              />
            )}

            {fieldErrors[field] && (
              <div style={{ color: "red", fontSize: "12px" }}>
                {fieldErrors[field]}
              </div>
            )}
          </label>
        ))}

        <div className={getClassName("Actions")}>
          <button
            className={getClassName("Button")}
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
