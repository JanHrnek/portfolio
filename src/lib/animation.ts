export const spring = {
  gentle: { type: "spring" as const, stiffness: 80, damping: 20, mass: 1 },
  snappy: { type: "spring" as const, stiffness: 400, damping: 30, mass: 0.5 },
}

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: spring.gentle },
}
