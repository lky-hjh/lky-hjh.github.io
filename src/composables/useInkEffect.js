import { ref, onMounted, onUnmounted } from 'vue'

export function useInkEffect(options = {}) {
  const maxStrokes = options.maxStrokes || 300
  const strokes = ref([])
  let lastX = 0
  let lastY = 0
  let isFirstMove = true
  let lastMoveTime = 0
  let stationaryTime = 0
  let strokeId = 0

  const createStroke = (x, y, isDiffusion = false) => {
    const id = ++strokeId
    const size = isDiffusion
      ? Math.random() * 30 + 20
      : Math.random() * 20 + 15
    const opacity = isDiffusion
      ? Math.random() * 0.2 + 0.1
      : Math.random() * 0.3 + 0.2

    strokes.value.push({
      id,
      x,
      y,
      size,
      opacity,
      rotation: Math.random() * 360,
      fading: false
    })

    if (strokes.value.length > maxStrokes) {
      strokes.value.shift()
    }

    // 墨迹淡出
    setTimeout(() => {
      const stroke = strokes.value.find(s => s.id === id)
      if (stroke) stroke.fading = true
    }, 3000)

    // 移除元素
    setTimeout(() => {
      const index = strokes.value.findIndex(s => s.id === id)
      if (index > -1) strokes.value.splice(index, 1)
    }, 5000)
  }

  const createDiffusionEffect = (x, y) => {
    for (let i = 0; i < 3; i++) {
      const angle = Math.random() * Math.PI * 2
      const distance = Math.random() * 20 + 5
      const newX = x + Math.cos(angle) * distance
      const newY = y + Math.sin(angle) * distance
      createStroke(newX, newY, true)
    }
  }

  const handleMouseMove = (e) => {
    const currentX = e.clientX
    const currentY = e.clientY
    const currentTime = Date.now()

    if (isFirstMove) {
      lastX = currentX
      lastY = currentY
      lastMoveTime = currentTime
      isFirstMove = false
      return
    }

    // 检测静止
    if (Math.abs(currentX - lastX) < 2 && Math.abs(currentY - lastY) < 2) {
      stationaryTime += currentTime - lastMoveTime
      if (stationaryTime > 50) {
        createDiffusionEffect(currentX, currentY)
      }
    } else {
      stationaryTime = 0
    }

    // 在两点之间创建过渡墨迹
    const dx = currentX - lastX
    const dy = currentY - lastY
    const distance = Math.sqrt(dx * dx + dy * dy)
    const steps = Math.floor(distance / 1.5)

    for (let i = 1; i < steps; i++) {
      const x = lastX + (dx * i) / steps
      const y = lastY + (dy * i) / steps
      createStroke(x, y)
    }

    lastX = currentX
    lastY = currentY
    lastMoveTime = currentTime
  }

  const handleClick = (e) => {
    createStroke(e.clientX, e.clientY)
  }

  const handleMouseLeave = () => {
    isFirstMove = true
    stationaryTime = 0
  }

  onMounted(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('click', handleClick)
    document.addEventListener('mouseleave', handleMouseLeave)
  })

  onUnmounted(() => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('click', handleClick)
    document.removeEventListener('mouseleave', handleMouseLeave)
  })

  return { strokes }
}
