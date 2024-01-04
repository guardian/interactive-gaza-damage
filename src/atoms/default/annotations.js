export function annnotationsForStep(step) {
  return annotations.filter(d => {
    return d.steps.includes(step)
  })
}

const annotations = [
  {
    id: "orchards",
    steps: [3, 4, 5],
    location: [34.55, 31.54908],
    config: {
      text: "Razed orchards and agricultural fields",
      position: "top-middle",
      textWidth: 158,
      lineLength: 20,
    },
  },
  {
    id: "solar-panels",
    steps: [3, 4, 5],
    location: [34.54185, 31.54866],
    config: {
      text: "Seven destroyed solar panels and one greenhouse",
      position: "top-middle",
      textWidth: 220,
      lineLength: 20,
    },
  },
];

