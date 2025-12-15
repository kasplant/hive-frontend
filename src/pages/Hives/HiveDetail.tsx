import { useParams } from "react-router-dom"
import { Card, Header } from "../../components"

function HiveDetail() {
  const { hiveId } = useParams()

  return (
    <div className="App">
      <Header title={`Bijenkast ${hiveId}`} description="Inspecties" />
      <div className="Body">
        <Card
          name="Inspectie #137"
          subname="Uitgevoerd op"
          date="20/05/2025 20:00"
          buttons={[
            {
              type: "primary",
              text: "Bekijk",
              href: `/hives/${hiveId}/inspections/137`
            },
            {
              type: "secondary",
              text: "Bewerk",
              href: `/hives/${hiveId}/inspections/137/edit`
            }
          ]}
        />
      </div>
    </div>
  )
}

export default HiveDetail
