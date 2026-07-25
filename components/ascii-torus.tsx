"use client"

import { useEffect, useState } from "react"

const width = 48
const height = 18
const shades = ".,-~:;=!*#$@"

function renderTorus(rotationA: number, rotationB: number) {
  const output = Array<string>(width * height).fill(" ")
  const depth = Array<number>(width * height).fill(0)

  for (let theta = 0; theta < Math.PI * 2; theta += 0.16) {
    const cosTheta = Math.cos(theta)
    const sinTheta = Math.sin(theta)

    for (let phi = 0; phi < Math.PI * 2; phi += 0.07) {
      const cosPhi = Math.cos(phi)
      const sinPhi = Math.sin(phi)
      const circleX = cosTheta + 2
      const inverseZ = 1 / (sinPhi * circleX * Math.sin(rotationA) + sinTheta * Math.cos(rotationA) + 5)
      const transformedX = circleX * (Math.cos(rotationB) * cosPhi + Math.sin(rotationA) * Math.sin(rotationB) * sinPhi)
        - sinTheta * Math.cos(rotationA) * Math.sin(rotationB)
      const transformedY = circleX * (Math.sin(rotationB) * cosPhi - Math.sin(rotationA) * Math.cos(rotationB) * sinPhi)
        + sinTheta * Math.cos(rotationA) * Math.cos(rotationB)
      const x = Math.floor(width / 2 + width * 0.52 * inverseZ * transformedX)
      const y = Math.floor(height / 2 - height * 0.9 * inverseZ * transformedY)
      const luminance = cosPhi * cosTheta * Math.sin(rotationB)
        - Math.cos(rotationA) * cosTheta * sinPhi
        - Math.sin(rotationA) * sinTheta
        + Math.cos(rotationB) * (Math.cos(rotationA) * sinTheta - cosTheta * Math.sin(rotationA) * sinPhi)
      const index = x + width * y

      if (y >= 0 && y < height && x >= 0 && x < width && inverseZ > depth[index]) {
        depth[index] = inverseZ
        output[index] = shades[Math.max(0, Math.min(shades.length - 1, Math.floor((luminance + 1) * 5.5)))]
      }
    }
  }

  return Array.from({ length: height }, (_, row) => output.slice(row * width, (row + 1) * width).join("")).join("\n")
}

export function AsciiTorus() {
  const [frame, setFrame] = useState(() => renderTorus(0.7, 0.2))

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let rotationA = 0.7
    let rotationB = 0.2
    const timer = window.setInterval(() => {
      rotationA += 0.08
      rotationB += 0.04
      setFrame(renderTorus(rotationA, rotationB))
    }, 90)

    return () => window.clearInterval(timer)
  }, [])

  return <pre className="ascii-torus" aria-hidden="true">{frame}</pre>
}
