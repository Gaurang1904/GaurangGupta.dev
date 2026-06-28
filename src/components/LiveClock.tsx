import { useState, useEffect } from "react"

export function LiveClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const formatted = time.toLocaleString("en-US", {
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })

  return (
    <span
      style={{
        color: "var(--color-text-secondary)",
        fontFamily: "var(--font-geist)",
        fontSize: 14,
        fontVariantNumeric: "tabular-nums",
        whiteSpace: "nowrap",
        userSelect: "none",
      }}
    >
      {formatted}
    </span>
  )
}
