// import axios from 'axios'
// import * as cheerio from 'cheerio'

// const url = 'https://www.bahesab.ir/time/hamedan/'

// axios
//   .get(url)
//   .then(response => {
//     const html = response.data
//     const $ = cheerio.load(html)
//     const day = $('#timer').text()
//     return day
//   })
//   .catch(error => {
//     console.log(error)
//   })
console.log('Hello World')
const axios = require('axios')
const cheerio = require('cheerio')
const url = 'https://www.bahesab.ir/time/hamedan/'
axios
  .get(url)
  .then(response => {
    const html = response.data
    const $ = cheerio.load(html)
    const day = $('#azan-time5').text()

    console.log(day)
  })
  .catch(error => {
    console.log(error)
  })
