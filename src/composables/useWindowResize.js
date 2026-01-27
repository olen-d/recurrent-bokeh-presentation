import { computed, onMounted, onBeforeUnmount, ref } from 'vue'

const debounce = (callback, wait) => {
  let timeoutId = null

  return (...args) => {
    window.clearTimeout(timeoutId)

    timeoutId = window.setTimeout(() => {
      callback.apply(null, args)
    }, wait)
  }
}

export const useWindowResize = () => {
  const width = ref(0)
  const height = ref(0)

  const handleResize = debounce(() => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }, 250)

  onMounted(()=> {
    handleResize();
    window.addEventListener('resize', handleResize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
  })

  return { width, height }
}
