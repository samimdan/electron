function getDayAndSend(data: string) {
  console.log(data)
}
window.dayApi.onCallFunction((data: string) => {
  getDayAndSend(data)
})
