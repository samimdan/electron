import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'
import soundazan from '../assets/bell.mp3'
import soundhour from '../assets/hour.wav'
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

  const soundAzan = new Audio(soundhour)
  const soundHour = new Audio(soundazan)
  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date())
    }, 1000)

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(timerID)
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
  useEffect(() => {
    if (second === '00' && minute === '00') {
      soundHour.play()
    }
    if (
      parseInt(hour) === parseInt(sHour) &&
      parseInt(minute) === parseInt(sMinute) &&
      second === '00'
    ) {
      soundAzan.play()
    }
    if (
      parseInt(hour) === parseInt(zHour) &&
      parseInt(minute) === parseInt(zMinute) &&
      second === '00'
    ) {
      soundAzan.play()
    }

    if (
      parseInt(hour) === parseInt(mHour) &&
      parseInt(minute) === parseInt(mMinute) &&
      second === '00'
    ) {
      soundAzan.play()
    }
  }, [hour, minute, second])

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
