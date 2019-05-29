import fnsFormat from 'date-fns/format'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import isToday from 'date-fns/is_today'
import isYesterday from 'date-fns/is_yesterday'

const _options = {}

export const setLocale = (l) => _options.locale = l
export const format = (d, f) => d ? fnsFormat(d,f, _options) : ''

export const until = (d) => format(d, 'D MMM YYYY')
export const relative = (d) => {
    if (!d) return ''
    if (isToday(d) || isYesterday(d)) return distanceInWordsToNow(d, {..._options, addSuffix: true, includeSeconds: true})

    return format(d, 'D MMM YYYY')
}