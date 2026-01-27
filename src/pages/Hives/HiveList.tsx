import { Card, Header } from "../../components"
import { useEffect, useState } from "react"
import type { Hive, ApiResponse } from "../../types/api"

function HiveList() {
  const [hives, setHives] = useState<Hive[]>([])

  useEffect(() => {
    fetch("/api/hives")
      .then(res => res.json())
      .then((json: ApiResponse<Hive[]>) => setHives(json.data))
  }, [])

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
            // date={new Date(hive.created_at).toLocaleString()}
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
