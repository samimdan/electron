//check if the string includes the day of the persian  week
export const checkDayOfWeek = (day: string) => {
  if (day.includes('جمعه')) {
    return 'جمعه'
  } else if (day.includes('یکشنبه')) {
    return 'یکشنبه'
  } else if (day.includes('دوشنبه')) {
    return 'دوشنبه'
  } else if (day.includes('سه شنبه')) {
    return 'سه شنبه'
  } else if (day.includes('چهارشنبه')) {
    return 'چهارشنبه'
  } else if (day.includes('پنجشنبه')) {
    return 'پنجشنبه'
  } else if (day.includes('شنبه')) {
    return 'شنبه'
  }
}
//check if the string includes the month of the persian
export const checkMonth = (day: string) => {
  if (day.includes('فروردین')) {
    return 'فروردین'
  } else if (day.includes('اردیبهشت')) {
    return 'اردیبهشت'
  } else if (day.includes('خرداد')) {
    return 'خرداد'
  } else if (day.includes('تیر')) {
    return 'تیر'
  } else if (day.includes('مرداد')) {
    return 'مرداد'
  } else if (day.includes('شهریور')) {
    return 'شهریور'
  } else if (day.includes('مهر')) {
    return 'مهر'
  } else if (day.includes('آبان')) {
    return 'آبان'
  } else if (day.includes('آذر')) {
    return 'آذر'
  } else if (day.includes('دی')) {
    return 'دی'
  } else if (day.includes('بهمن')) {
    return 'بهمن'
  } else if (day.includes('اسفند')) {
    return 'اسفند'
  }
}

//get  the persian number from mixed
//  string and return it
//iterate over the string and check if the char is a persian number if so add it to the result string
const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

export const persianNumber = (mixed: string) => {
  let result = ''
  for (let i = 0; i < mixed.length; i++) {
    for (let j = 0; j < persianNumbers.length; j++) {
      if (mixed[i] === persianNumbers[j]) {
        result += persianNumbers[j]
      }
    }
  }

  return result
}
//convert english number to persian

export const englishNumber = (mixed: string) => {
  let result = ''
  for (let i = 0; i < mixed.length; i++) {
    if (!isNaN(parseInt(mixed[i]))) {
      result += persianNumbers[parseInt(mixed[i])]
    } else {
      result += mixed[i]
    }
  }
  return result
}
//convert persian number to english

export const persianToEnglish = (mixed: string) => {
  let result = ''
  for (let i = 0; i < mixed.length; i++) {
    for (let j = 0; j < persianNumbers.length; j++) {
      if (mixed[i] === persianNumbers[j]) {
        result += j
      }
    }
  }
  return result
}
