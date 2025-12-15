import { useEffect, useState } from "react"
import { Card, Header } from "../../components"

function Dashboard() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (!isMobile) return <p>Desktop size</p>

  return (
    <div className="App">
      <Header title="Bijen horen erbij" description="Kies jouw bijenkast" />
      <div className="Body">
        <Card
          name="Bijenkast 1"
          subname="Laatste inspectie"
          date="20/05/2025 20:00"
          buttons={[
            { type: "primary", text: "Bekijk kast", href: "/hives/1" },
            { type: "secondary", text: "Nieuwe inspectie", href: "/hives/1/inspections/new" }
          ]}
        />
      </div>
    </div>
  )
}

export default Dashboard
