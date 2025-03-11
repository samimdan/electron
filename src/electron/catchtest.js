const si = require('systeminformation')

async function getSystemInfo() {
  const cpu = await si.cpu()
  const memory = await si.mem()
  const osInfo = await si.osInfo()
  const battery = await si.battery()
  const graphics = await si.graphics()

  console.log({
    cpu,
    memory,
    osInfo,
    battery,
    graphics,
  })
}

getSystemInfo()
