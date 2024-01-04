export function annnotationsForStep(step) {
  return annotations.filter(d => {
    return d.steps.includes(step)
  })
}

const annotations = [
  {
    id: "orchards",
    steps: [4, 5],
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
    steps: [4, 5],
    location: [34.54185, 31.54866],
    config: {
      text: "Seven destroyed solar panels and one greenhouse",
      position: "top-middle",
      textWidth: 220,
      lineLength: 20,
    },
  },
  {
    id: "greenhouses",
    steps: [4, 5],
    location: [34.54719, 31.54389],
    config: {
      text: "Three destroyed greenhouses and nearby solar panels",
      position: "right-middle",
      textWidth: 220,
      lineLength: 24,
    },
  },
  {
    id: "entire-neighbourhood",
    steps: [5, 6],
    location: [34.55014, 31.53942],
    config: {
      text: "Entire neighborhood, with over 150 buildings, flattened",
      position: "top-middle",
      textWidth: 236,
      lineLength: 32,
    },
  },
  {
    id: "mosque-1",
    steps: [5, 6],
    location: [34.547, 31.53882],
    config: {
      text: "Destroyed mosque",
      position: "bottom-middle",
      textWidth: 160,
      lineLength: 0,
    },
  },
];



