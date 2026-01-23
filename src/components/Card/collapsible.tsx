import React, { useState } from "react";
import styles from "./collapsible.module.css";
import { ChevronUp } from "lucide-react";

type Props = {
  temperature?: number | null;
  humidity?: number | null;
  defaultOpen?: boolean;
};

export default function Collapsible({
  temperature,
  humidity,
  defaultOpen = false
}: Props) {
  const [open, setOpen] = useState<boolean>(defaultOpen);

  const formatNum = (n?: number | null, suffix = "") =>
    n === null || n === undefined ? "—" : `${n}${suffix}`;
  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.button}
        onClick={() => setOpen(!open)}
      >
        <span>Sensor gegevens</span>
        <ChevronUp
          className={styles.icon}
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {open && (
        <div className={styles.fields}>
          <div className={styles.field}>
            <p className={styles.label}>Temperatuur</p>
            <p className={styles.value}>{formatNum(temperature, " °C")}</p>
          </div>

          <div className={styles.field}>
            <p className={styles.label}>Vochtigheid</p>
            <p className={styles.value}>{formatNum(humidity, " %")}</p>
          </div>
        </div>
      )}
    </div>
  );
}


