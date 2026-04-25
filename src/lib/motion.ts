export const revealEase = [0.16, 1, 0.3, 1] as const

export const sectionRevealStates = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
}

export const contentRevealTransition = {
  duration: 0.6,
  ease: revealEase,
}

export const revealViewport = { once: true, amount: 0.15 } as const
