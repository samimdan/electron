import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  checkMonth,
  persianNumber,
  checkDayOfWeek,
  persianToEnglish,
} from './component/persianSplit'
import Clock from './component/time'
import { Card } from 'antd'
import './font/iranSans.css'
import './font/clock.css'
import './index.css'
import './App.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMountainSun, faSun } from '@fortawesome/free-solid-svg-icons'

import { Today } from './component/todoay'
declare global {
  interface Window {
    electronAPI: {
      onCallFunction: (callback: (data: string) => void) => void
    }

    azanAPI: {
      onCallFunction: (callback: (data: string) => void) => void
    }
    azanZohrAPI: {
      onCallFunction: (callback: (data: string) => void) => void
    }
    azanMaghrebAPI: {
      onCallFunction: (callback: (data: string) => void) => void
    }
  }
}

function App() {
  const [message, setMessage] = useState<string>('')
  const [day, setDay] = useState<string>('')
  const [month, setMonth] = useState<string>('')
  const [dayOfWeek, setDayOfWeek] = useState<string>('')
  const [azanSobh, setAzanSobh] = useState<string>('')
  const [azanZohr, setAzanZohr] = useState<string>('')
  const [azanMaghreb, setAzanMaghreb] = useState<string>('')
  //@ts-ignore

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.onCallFunction((data: string) => {
        setMessage(data)
      })
    }
    if (window.azanAPI) {
      window.azanAPI.onCallFunction((data: string) => {
        data = data.split('--')[0]
        setAzanSobh(data)
      })
      if (window.azanZohrAPI) {
        window.azanZohrAPI.onCallFunction((data: string) => {
          const presianTime = data.split(':')
          const hour = presianTime[0]
          const minute = presianTime[1]
          const enHoour = persianToEnglish(hour)
          const enMinute = persianToEnglish(minute)
          setAzanZohr(`${enHoour}:${enMinute}`)
        })
      }
      if (window.azanMaghrebAPI) {
        window.azanMaghrebAPI.onCallFunction((data: string) => {
          const presianTime = data.split(':')
          const hour = presianTime[0]
          const minute = presianTime[1]
          const enHoour = persianToEnglish(hour)
          const enMinute = persianToEnglish(minute)
          const longTime = `${enHoour}:${enMinute}`
          const [lHour, lMinute] = longTime.split(':')
          setAzanMaghreb(
            new Date(0, 0, 0, +lHour, +lMinute).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            }),
          )
        })
      }
    }
  }, [
    window.electronAPI,
    window.azanAPI,
    window.azanZohrAPI,
    window.azanMaghrebAPI,
  ])
  useEffect(() => {
    if (message) {
      setDay(persianToEnglish(persianNumber(message)))
      //@ts-ignore
      setMonth(checkMonth(message))

      //@ts-ignore
      setDayOfWeek(checkDayOfWeek(message))
    }
  }, [message])

  return (
    <>
      <div className="bg-[#282a3690] rounded-md flex flex-col justify-between gap-4 items-center py-5 drag-area   h-screen w-screen dracula">
        <Card
          className="justify-center items-center  "
          title="Days"
          variant="borderless"
          style={{ width: 200 }}>
          <span className="flex  items-center justify-between">
            <section className="flex flex-col items-center justify-center">
              <p className="clock text-9xl">{day}</p>
              <p className="bold">{month}</p>
              <p className="bold">{dayOfWeek}</p>
            </section>
            <section>
              {
                <Clock
                  sHour={azanSobh.split(':')[0]}
                  sMinute={azanSobh.split(':')[1]}
                  zHour={azanZohr.split(':')[0]}
                  zMinute={azanZohr.split(':')[1]}
                  mHour={azanMaghreb.split(':')[0]}
                  mMinute={azanMaghreb.split(':')[1]}
                />
              }{' '}
            </section>
          </span>
        </Card>

        <Card
          title={<span>Holly Time</span>}
          variant="borderless"
          style={{ width: 200 }}>
          <div className="clock flex justify-between items-center  text-black">
            <div className="flex items-center justify-center">
              <span className="text-4xl clock">{azanSobh.split(':')[0]}</span>
              <motion.span
                className="text-4xl clock"
                initial={{ opacity: 0 }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}>
                :
              </motion.span>
              <span className="text-4xl clock">
                {azanSobh.split(':')[1]} AM
              </span>
            </div>
            <span>
              <FontAwesomeIcon
                className="text-xl text-blue-900 "
                icon={faMountainSun}
              />
            </span>
          </div>
          <div className="clock flex justify-between items-center  text-black">
            <div className="flex items-center justify-center">
              <span className="text-4xl clock">{azanZohr.split(':')[0]}</span>
              <motion.span
                className="text-4xl clock"
                initial={{ opacity: 0 }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}>
                :
              </motion.span>
              <span className="text-4xl clock">
                {azanZohr.split(':')[1]} PM
              </span>
            </div>
            <span>
              <FontAwesomeIcon
                className="text-xl text-amber-300 "
                icon={faSun}
              />
            </span>
          </div>
          <div className="clock flex justify-between items-center  text-black">
            <div className="flex items-center justify-center">
              <span className="text-4xl clock">
                {azanMaghreb.split(':')[0]}
              </span>
              <motion.span
                className="text-4xl clock"
                initial={{ opacity: 0 }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}>
                :
              </motion.span>
              <span className="text-4xl clock">
                {azanMaghreb.split(':')[1]}
              </span>
            </div>
            <span>
              <FontAwesomeIcon
                className="text-xl text-bronze-900 "
                icon={faSun}
              />
            </span>
          </div>

          <div></div>
        </Card>
        <Card
          title={<span>Date</span>}
          variant="borderless"
          style={{ width: 200 }}>
          <Today />
        </Card>
      </div>
    </>
  )
}

export default App
