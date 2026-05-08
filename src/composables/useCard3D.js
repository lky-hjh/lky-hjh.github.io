import { ref, onMounted, onUnmounted } from 'vue'

export function useCard3D(cardRef) {
  const transform = ref('')
  const isHovering = ref(false)

  const handleMouseMove = (e) => {
    if (!cardRef.value) return

    const rect = cardRef.value.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 15
    const rotateY = (centerX - x) / 15

    transform.value = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    isHovering.value = true
  }

  const handleMouseLeave = () => {
    transform.value = ''
    isHovering.value = false
  }

  onMounted(() => {
    if (cardRef.value) {
      cardRef.value.addEventListener('mousemove', handleMouseMove)
      cardRef.value.addEventListener('mouseleave', handleMouseLeave)
    }
  })

  onUnmounted(() => {
    if (cardRef.value) {
      cardRef.value.removeEventListener('mousemove', handleMouseMove)
      cardRef.value.removeEventListener('mouseleave', handleMouseLeave)
    }
  })

  return { transform, isHovering }
}
