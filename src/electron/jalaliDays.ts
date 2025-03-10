import { rejects } from 'assert'
import axios from 'axios'
import * as cheerio from 'cheerio'

const url = 'https://www.bahesab.ir/time/hamedan/'
export const getDay = async () => {
  const dayPromise = new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(res => {
        const $ = cheerio.load(res.data)
        const day = $('#date').text()

        resolve(day)
      })
      .catch(error => {
        reject(error)
      })
  })
  return dayPromise
}
export const getAzanSobh = async () => {
  const azanSobhPromise = new Promise((resolve, rejects) => {
    axios
      .get(url)
      .then(res => {
        const $ = cheerio.load(res.data)
        const azanSobh = $('div#timer').text()
        resolve(azanSobh)
      })
      .catch(error => {
        rejects(error)
      })
  })
  return azanSobhPromise
}
export const getAzanZohr = async () => {
  const azanZohrPromise = new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(res => {
        const $ = cheerio.load(res.data)
        const azanZohr = $('#azan-time3').text()
        resolve(azanZohr)
      })
      .catch(error => {
        reject(error)
      })
  })
  return azanZohrPromise
}
export const getAzanMaghreb = async () => {
  const azanZohrPromise = new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(res => {
        const $ = cheerio.load(res.data)
        const azanZohr = $('#azan-time5').text()
        resolve(azanZohr)
      })
      .catch(error => {
        reject(error)
      })
  })
  return azanZohrPromise
}
