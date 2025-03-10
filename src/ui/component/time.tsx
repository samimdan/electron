import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'
type ClockProps = {
  sHour: string
  sMinute: string
  zHour: string
  zMinute: string
  mHour: string
  mMinute: string
}
function Clock({ sHour, sMinute, zHour, zMinute, mHour, mMinute }: ClockProps) {
  const [time, setTime] = useState(new Date())
  const [audio] = useState(new Audio('../../../dist-react/assets/hour.wav'))
  const [azan] = useState(new Audio('../../../dist-react/assets/azan.mp3'))
  const playSound = () => {
    audio.play()
  }
  const playAzan = () => {
    azan.play()
  }
  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date())
    }, 1000)

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(timerID)
  }, [])
  useEffect(() => {
    audio.pause()
  }, [])
  const locatetime = time
    .toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    })
    .replace(/^0/, '')

  const splitTime = locatetime.split(':')
  const hour = splitTime[0]
  const minute = splitTime[1]
  const second = splitTime[2].split(' ')[0]
  const timeOfDay = locatetime.split(' ')[1]
  //play sound on the hour
  if (second === '00' && minute === '00') {
    playSound()
  }
  if (
    parseInt(hour) === parseInt(sHour) &&
    parseInt(minute) === parseInt(sMinute)
  ) {
    playAzan()
  }
  if (
    parseInt(hour) === parseInt(zHour) &&
    parseInt(minute) === parseInt(zMinute)
  ) {
    playAzan()
  }

  if (
    parseInt(hour) === parseInt(mHour) &&
    parseInt(minute) === parseInt(mMinute)
  ) {
    playAzan()
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="clock text-9xl ">{hour}</div>
      <div className="flex items-baseline justify-center w-4">
        <div className="clock text-7xl ">{minute}</div>
        <AnimatePresence mode="wait">
          <motion.div
            className="clock text-xl w-2"
            key={second}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            {second}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="clock text-4xl">{timeOfDay}</div>
    </div>
  )
}

export default Clock
