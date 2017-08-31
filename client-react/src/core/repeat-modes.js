const mode = (id, title) => { return {id, title} }

export const repeatMode = {
  once: mode(0, 'once'),
  daily: mode(1, 'daily'),
  weekly: mode(2, 'weekly'),
  monthly: mode(3, 'monthly'),
  all: [],
  ids: []
}

repeatMode.all.push(
  repeatMode.once,
  repeatMode.daily,
  repeatMode.weekly,
  repeatMode.monthly,
)

repeatMode.ids.push(
  repeatMode.once.id,
  repeatMode.daily.id,
  repeatMode.weekly.id,
  repeatMode.monthly.id,
)

