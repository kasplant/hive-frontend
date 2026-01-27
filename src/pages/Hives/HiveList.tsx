import { Card, Header } from "../../components"
import { useEffect, useState } from "react"
import type { Hive, ApiResponse } from "../../types/api"
import styles from './styles.module.css'
import getClassNameFactory from '../../lib/get-class-name-factory'
const getClassName = getClassNameFactory('Hives', styles)

function HiveList() {
  const [hives, setHives] = useState<Hive[]>([])
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState("")

  useEffect(() => {
    fetch("/api/hives")
      .then(res => res.json())
      .then((json: ApiResponse<Hive[]>) => setHives(json.data))
  }, [])

  const createHive = async () => {
    const formData = new FormData()
    formData.append("name", name)
    formData.append("user_id", "1")   // required by API
    formData.append("queen_id", "1")  // required by API

    const res = await fetch("/api/hive", {
      method: "POST",
      body: formData,
    })

    if (!res.ok) {
      throw new Error("Failed to create hive")
    }

    const json = await res.json()

    setHives(prev => [
      ...prev,
      {
        id: json.id,
        name,
        temperature: null,
        humidity: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as Hive,
    ])

    setName("")
    setShowForm(false)
  }

  return (
    <div className="App">
      <Header title="Bijen horen erbij" description="Kies jouw bijenkast" />

      <div className="Body">
        {/* Create hive UI */}
        {!showForm && (
          <button
          className={getClassName('NewHiveButton')}
          onClick={() => setShowForm(true)}>
            Nieuwe bijenkast
          </button>
        )}

        {showForm && (
          <div className={getClassName('CreateHiveForm')}>
            <input
              className={getClassName('CreateHiveInput')}
              type="text"
              placeholder="Naam van de bijenkast"
              value={name}
              onChange={e => setName(e.target.value)}
            />

            <div className={getClassName('CreateHiveActions')}>
              <button
                className={getClassName('NewHiveButton')}
                onClick={createHive}
                disabled={!name}
              >
                Bevestigen
              </button>

              <button
                className={getClassName('SecondaryButton')}
                onClick={() => setShowForm(false)}
              >
                Annuleren
              </button>
            </div>
          </div>
        )}

        {/* Current hive list */}
        {hives.map(hive => (
          <Card
            key={hive.id}
            name={hive.name}
            subname="Aangemaakt op"
            temperature={hive.temperature}
            humidity={hive.humidity}
            created_at={hive.created_at}
            updated_at={hive.updated_at}
            buttons={[
              { type: "primary", text: "Bekijk kast", href: `/hives/${hive.id}` },
              { type: "secondary", text: "Nieuwe inspectie", href: `/hives/${hive.id}/inspections/new` }
            ]}
          />
        ))}
      </div>
    </div>
  )
}

export default HiveList
