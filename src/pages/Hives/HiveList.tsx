import { Card, Header } from "../../components"

function HiveList() {
  return (
    <div className="App">
      <Header title="Bijenkasten" description="Kies een bijenkast" />
      <div className="Body">
        <Card
          name="Bijenkast 1"
          subname="Laatste inspectie"
          date="20/05/2025 20:00"
          buttons={[
            { type: "primary", text: "Bekijk kast", href: "/hives/1" }
          ]}
        />
      </div>
    </div>
  )
}

export default HiveList
