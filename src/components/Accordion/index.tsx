import { useState } from "react"
import styles from "./styles.module.css"
import getClassNameFactory from "../../lib/get-class-name-factory"
import { ChevronUp } from "lucide-react"
import type { Field } from "../../types/form"
const getClassName = getClassNameFactory("Accordion", styles)

type AccordionProps = {
  title: string
  fields: Field[]
  disabled: boolean
  defaultOpen?: boolean
}

export const Accordion = ({
  title,
  disabled,
  fields,
  defaultOpen = false
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
          {fields.map((field, index) => (
            <div key={index} className={getClassName("field")}>
              <p>{field.label}</p>
              {(() => {
                switch (field.type) {
                  case "text":
                  case "date":
                    return (
                      <input
                        type={field.type}
                        disabled={disabled}
                        value={field.value ?? ""}
                        readOnly
                      />
                    )

                  case "number":
                    return (
                      <input
                        type="number"
                        disabled={disabled}
                        value={field.value ?? 0}
                        readOnly
                      />
                    )

                  case "boolean":
                    return (
                      <input
                        type="checkbox"
                        checked={field.value ?? false}
                        disabled
                        readOnly
                      />
                    )
                }
              })()}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
