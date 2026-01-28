import { useState } from "react"
import styles from "./styles.module.css"
import getClassNameFactory from "../../lib/get-class-name-factory"
import { ChevronUp } from "lucide-react"
import type { Field } from "../../types/form"
import type { Inspection } from "../../pages/Inspections/InspectionView" // type-only import

const getClassName = getClassNameFactory("Accordion", styles)

type AccordionProps = {
  title: string
  fields: Field[]
  disabled: boolean
  defaultOpen?: boolean
  inspection?: Inspection | null
}

export const Accordion = ({
  title,
  disabled,
  fields,
  defaultOpen = false,
  inspection = null
}: AccordionProps) => {
  const [open, setOpen] = useState<boolean>(defaultOpen)

  return (
    <div className={getClassName("wrapper")}>
      <button
        type="button"
        className={getClassName()}
        onClick={() => setOpen(!open)}
      >
        <span>{title}</span>
        <ChevronUp
          className={getClassName("icon")}
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {open && (
        <div className={getClassName("fields")}>
          {fields.map((field, index) => {
            const value = inspection ? inspection[field.name as keyof Inspection] : ""

            return (
              <div key={index} className={getClassName("field")}>
                <p>{field.label}</p>

                {field.type === "checkbox" ? (
                  <input
                    type="checkbox"
                    disabled={disabled}
                    checked={Boolean(value)}
                  />
                ) : (
                  <input
                    type={field.type}
                    disabled={disabled}
                    value={value as string | number}
                  />
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
