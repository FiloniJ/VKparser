// Прочее
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

window.addEventListener('unhandledrejection', e => {
  console.log(e)
  alert('Ошибка - подробности в консоли')
})