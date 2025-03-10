import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
export const Today = () => {
  const [day, setDay] = useState<string>('')
  const [month, setMonth] = useState<string>('')
  const [monthName, setMonthName] = useState<string>('')
  const [dayOfWeek, setDayOfWeek] = useState<string>('')
  const [animateCondition, setAnimateCondition] = useState<boolean>(false)
  const [monthInsideText, setMonthInsideText] = useState<string>('')
  useEffect(() => {
    setDayOfWeek(new Date().toLocaleDateString('en-US', { weekday: 'long' }))
    setDay(new Date().toLocaleDateString('en-US', { day: 'numeric' }))
    setMonth(new Date().toLocaleDateString('en-US', { month: 'numeric' }))
    setMonthName(new Date().toLocaleDateString('en-US', { month: 'long' }))
    const timerID = setInterval(() => {
      setDayOfWeek(new Date().toLocaleDateString('en-US', { weekday: 'long' }))
      setDay(new Date().toLocaleDateString('en-US', { day: 'numeric' }))
      setMonth(new Date().toLocaleDateString('en-US', { month: 'numeric' }))
      setMonthName(new Date().toLocaleDateString('en-US', { month: 'long' }))
    }, 2700000)

    return () => clearInterval(timerID)
  }, [])
  useEffect(() => {
    const toggleTimer = setInterval(() => {
      setAnimateCondition(!animateCondition)
    }, 6000)
    if (animateCondition) {
      setMonthInsideText(month)
    }
    if (!animateCondition) {
      setMonthInsideText(monthName)
    }
    return () => clearInterval(toggleTimer)
  })
  return (
    <div className="flex items-center justify-between gap-4 relative">
      <div>
        <div className=" clock text-3xl text-black">{dayOfWeek}</div>
        <div className="clock text-4xl border-2 rounded-[50%] py-2 my-4 text-black text-center">
          {day}
        </div>
      </div>
      <AnimatePresence>
        <motion.div
          className="text-center clock text-3xl left-24  w-12 absolute text-black"
          key={monthInsideText}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 3, delay: 2, ease: 'easeInOut' }}>
          {monthInsideText}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
