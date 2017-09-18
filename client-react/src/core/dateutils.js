class DateUtils {
  constructor () {
    this.DATE_SEPARATOR = '-'
    this.MILISECONDS_IN_DAY = 24 * 60 * 60 * 1000 // consider timezones change e.g. last sun of oct
    this.DAYS_IN_WEEK = 7;

    [this.SU, this.MO, this.TU, this.WE, this.TH, this.FR, this.SA] = [0, 1, 2, 3, 4, 5, 6]
    this.DAYS_OF_WEEK = [this.SU, this.MO, this.TU, this.WE, this.TH, this.FR, this.SA]
    this.DAYS_OF_WEEK_MONDAY_BASED = [this.MO, this.TU, this.WE, this.TH, this.FR, this.SA, this.SU]
    this.MO_FR = [this.MO, this.TU, this.WE, this.TH, this.FR]
    this.SA_SU = [this.SA, this.SU]
    this.DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    [this.JAN, this.DEC] = [0, 11]
    this.MONTH_IN_YEAR = 12
    this.MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    this.MONTH_NAMES_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  }

  sameDay (dateOne, dateTwo) {
    if ((!dateOne) || (!dateTwo)) {
      return false
    }
    return ((dateOne.getDate() === dateTwo.getDate()) &&
      (dateOne.getMonth() === dateTwo.getMonth()) &&
      (dateOne.getFullYear() === dateTwo.getFullYear()))
  }

  isToday (date) {
    return this.sameDay(new Date(), date)
  }

  sameDayOrBefore (date, dateToCompare) {
    return (this.sameDay(date, dateToCompare) || (date > dateToCompare))
  }

  sameDayOrAfter (date, dateToCompare) {
    return (this.sameDay(date, dateToCompare) || (date < dateToCompare))
  }

  daysInMonth (year, month) {
    return new Date(year, month + 1, 0).getDate()
  }

  incDay (date, numberOfDays = 1) {
    let result = new Date(date.getTime())
    result.setDate(result.getDate() + numberOfDays)
    return result
  }

  decDay (date, numberOfDays = 1) {
    return this.incDay(date, 0 - numberOfDays)
  }

  incMonth (date) {
    let [year, month, day] = this.decodeDate(date)
    if (month === this.DEC) {
      month = this.JAN
      if (year) {
        year++
      }
    } else {
      month++
    }
    let daysInMonth = this.daysInMonth(year, month, 1)
    return new Date(year, month, day > daysInMonth ? daysInMonth : day)
  }

  decMonth (date) {
    let [year, month, day] = this.decodeDate(date)
    if (month === this.JAN) {
      month = this.DEC
      if (year) {
        year--
      }
    } else {
      month--
    }
    let daysInMonth = this.daysInMonth(year, month, 1)
    return new Date(year, month, day > daysInMonth ? daysInMonth : day)
  }

  incYear (date, numberOfYears = 1) {
    return new Date(date.getFullYear() + numberOfYears, date.getMonth(), date.getDate())
  }

  decYear (date, numberOfYears = 1) {
    return new Date(date.getFullYear() - numberOfYears, date.getMonth(), date.getDate())
  }

  getStartOfMonth (date) {
    return new Date(date.getFullYear(), date.getMonth(), 1)
  }

  getStartOfWeek (date, mondayBased = true) {
    return this.decDay(
      date,
      mondayBased
        ? this.mondayBasedDayOfWeek(date)
        : date.getDay())
  }

  mondayBasedDayOfWeekIdx (index) {
    return (index === 0 ? 6 : (index - 1))
  }

  mondayBasedDayOfWeek (date) {
    return this.mondayBasedDayOfWeekIdx(date.getDay())
  }

  getUTCTime (date) {
    return date.getTime() + date.getTimezoneOffset()
  }

  getDaysBetween (startDate, endDate) {
    return Math.abs(Math.floor(
      (Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) -
      Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())) /
      this.MILISECONDS_IN_DAY))
  }

  decodeDate (date) {
    return [date.getFullYear(), date.getMonth(), date.getDate()]
  }

  clearTime (date) {
    return new Date(...this.decodeDate(date))
  }

  getElementAsString (element) {
    return (element > 9) ? element : '0' + element
  }

  toCustomString (date, separator) {
    return [date.getFullYear(), this.getElementAsString(date.getMonth() + 1), this.getElementAsString(date.getDate())].join(separator)
  }

  toISOString (date) {
    return this.toCustomString(date, this.DATE_SEPARATOR)
  }

  fromCustomString (dateString, separator) {
    let dateData = dateString.split(separator)
    return new Date(dateData[0], parseInt(dateData[1], 10) - 1, dateData[2])
  }

  fromISOString (dateString) {
    return this.fromCustomString(dateString, this.DATE_SEPARATOR)
  }

  today () {
    return this.clearTime(new Date())
  }
}

module.exports.dateUtils = new DateUtils()
