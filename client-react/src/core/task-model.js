const dateUtils = require('./dateutils').dateUtils
const { repeatMode } = require('./repeat-modes')

class TaskModel {
  constructor () {
    this.id = null
    this.name = 'do stuff'
    this.repeatModeId = repeatMode.once.id
    this.every = 1
    this.weeklyDays = Array.from(dateUtils.MO_FR)
    this.monthlyDayOfTheLastWeek = false
    this.startDate = dateUtils.clearTime(new Date())
    this.endDate = dateUtils.clearTime(new Date())
    this.skipDates = []
    this.includeDates = []
    this.neverEnd = true
    this.timesPerDay = 1
    this.tag = ''
    this.goalId = null
    this.assign(Object.values(arguments))
  }

  assign (sources) {
    if (sources && (Array.isArray(sources))) {
      sources.forEach(source => {
        if (source.constructor === TaskModel) {
          this.id = source.id
          this.name = source.name
          this.repeatModeId = source.repeatModeId
          this.every = source.every
          this.weeklyDays = source.weeklyDays.map(el => el)
          this.monthlyDayOfTheLastWeek = source.monthlyDayOfTheLastWeek
          this.startDate = new Date(source.startDate.getTime())
          this.endDate = new Date(source.endDate.getTime())
          this.skipDates = Array.from(source.skipDates)
          this.includeDates = Array.from(source.includeDates)
          this.neverEnd = source.neverEnd
          this.timesPerDay = source.timesPerDay
          this.tag = source.tag
          this.goalId = source.goalId
        } else {
          Object.assign(this, source)
        }
      })
      this.normalize()
      return this
    }
  }

  normalize () {
    if (this.endDate.getTime() < this.startDate.getTime()) {
      this.endDate = new Date(this.startDate.getTime())
    }
    if (!repeatMode.ids.includes(this.repeatModeId)) {
      this.repeatModeId = repeatMode.once.id
    }
  }

  addSkipDate (date) {
    const skipDateData = dateUtils.clearTime(date).getTime()
    if (!this.skipDates.includes(skipDateData)) {
      this.skipDates.push(skipDateData)
    }
    return this
  }

  addIncludeDate (date) {
    const includeDateData = dateUtils.clearTime(date).getTime()
    if (!this.includeDates.includes(includeDateData)) {
      this.includeDates.push(includeDateData)
    }
    return this
  }

  checkDailyRules (date) {
    return (dateUtils.getDaysBetween(date, this.startDate) % this.every === 0)
  }

  checkWeeklyRules (date) {
    let firstDayOfWeek = dateUtils.getStartOfWeek(date)
    let originFirstDayOfWeek = dateUtils.getStartOfWeek(this.startDate)
    let weeksPassed =
      (dateUtils.getDaysBetween(originFirstDayOfWeek, firstDayOfWeek) /
      dateUtils.DAYS_OF_WEEK.length)

    if (weeksPassed % this.every === 0) {
      return this.weeklyDays.includes(date.getDay())
    }
    return false
  }

  checkMonthlyRules (date) {
    if (this.monthlyDayOfTheLastWeek) {
      let dayOfWeek = date.getDay()
      let expectedDayOfWeek = this.startDate.getDay()
      if (dayOfWeek === expectedDayOfWeek) {
        let nextWeekDay = dateUtils.incDay(date, dateUtils.DAYS_OF_WEEK.length)
        return (nextWeekDay.getMonth() !== date.getMonth())
      }
    } else {
      return (date.getDate() === this.startDate.getDate())
    }
    return false
  }

  checkPeriod (date) {
    if (date < this.startDate) {
      return false
    }
    if (!this.neverEnd) {
      if (date > this.endDate) {
        return false
      }
    }
    return true
  }

  includeDate (date) {
    if (!this.containsDate(date)) {
      const dateTime = dateUtils.clearTime(date).getTime()
      if (this.skipDates.includes(dateTime)) {
        this.skipDates = this.skipDates.filter(el => el !== dateTime)
      }
      if (!this.containsDate(date)) {
        this.addIncludeDate(date)
      }
    }
    return this
  }

  excludeDate (date) {
    const dateTime = dateUtils.clearTime(date).getTime()
    if (this.includeDates.includes(dateTime)) {
      this.includeDates = this.includeDates.filter(el => el !== dateTime)
    }
    if (this.containsDate(date)) {
      this.addSkipDate(date)
    }
    return this
  }

  containsDate (date) {
    if (!date) {
      return false
    }
    date = dateUtils.clearTime(date)
    if (this.skipDates.includes(date.getTime())) {
      return false
    } else if (this.includeDates.includes(date.getTime())) {
      return true
    } else if (date.getTime() === this.startDate.getTime()) {
      return true
    } else if (!this.checkPeriod(date)) {
      return false
    } else if (this.repeatModeId === repeatMode.daily.id) {
      return this.checkDailyRules(date)
    } else if (this.repeatModeId === repeatMode.weekly.id) {
      return this.checkWeeklyRules(date)
    } else if (this.repeatModeId === repeatMode.monthly.id) {
      return this.checkMonthlyRules(date)
    } else {
      return false
    }
  }
}

module.exports.TaskModel = TaskModel
