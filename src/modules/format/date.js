import fnsFormat from 'date-fns/format'

const _options = {}

export const setLocale = (l) => _options.locale = l
export const format = (d, f) => fnsFormat(d,f, _options)
export const until = (d) => d ? format(d, 'MMM Do YYYY') : ''