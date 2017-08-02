const dateUtils = require('../utils/dateutils').dateUtils
const { repeatMode } = require('../immutable/repeat-modes');

class TaskModel {
  constructor (sources) {
    if (this.assign(sources))  {
      return
    }
    this.id = null
    this.name = 'do stuff'
    this.repeatModeId = repeatMode.once.id
    this.every = 1
    this.weeklyDays = Array.from(dateUtils.MO_FR)
    this.monthlyDayOfTheLastWeek = false
    this.startDate = dateUtils.clearTime(new Date())
    this.endDate = dateUtils.clearTime(new Date())
    this.skipDates = []
    this.neverEnd = true
  }

  assign(sources) {
    if ((sources) && (Array.isArray(sources)))  {
      Object.assign(this, ...sources)
      this.normalize()
      return true
    }
  }

  normalize() {
    if (this.endDate.getTime() < this.startDate.getTime()) {
      this.setEndDate(this.startDate)
    }
    if (!repeatMode.ids.includes(this.modeId)) {
      this.repeatModeId = repeatMode.once.id
    }
  }

  checkDailyRules (date) {
    if (this.dailyRules) {
      return (dateUtils.getDaysBetween(date, this.startDate) % this.dailyRules.every === 0)
    }
    return false
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
    if (this.startDate) {
      if (date < this.startDate) {
        return false
      }
    }
    if ((this.endDate) && (!this.neverEnd)) {
      if (date > this.endDate) {
        return false
      }
    }
    return true
  }

  containsDate (date) {
    if (!date) {
      return false
    }
    date = dateUtils.clearTime(date)
    if (this.skipDates.includes(date.getTime())) {
      return false
    } else if (date.getTime() === this.startDate.getTime()) {
      return true
    } else if (!this.checkPeriod(date)) {
      return false
    } else if (this.repeatModeId === repeatMode.daily) {
      return this.checkDailyRules(date)
    } else if (this.repeatModeId === repeatMode.weekly) {
      return this.checkWeeklyRules(date)
    } else if (this.repeatModeId === repeatMode.monthly) {
      return this.checkMonthlyRules(date)
    } else {
      return false
    }
  }
}

module.exports.TaskModel = TaskModel