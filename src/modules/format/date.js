import parseISO from 'date-fns/parseISO'
import fnsFormat from 'date-fns/format'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import isToday from 'date-fns/isToday'
import isYesterday from 'date-fns/isYesterday'
import isThisYear from 'date-fns/isThisYear'

const _options = {}

export const setLocale = (l) => _options.locale = l
export const validDate = (d) => typeof d == 'string' ? parseISO(d) : d 
export const format = (d, f) => d ? fnsFormat(validDate(d),f, _options) : ''

export const until = (d) => format(d, 'PP')
export const relative = (d) => {
    if (!d) return ''

    const date = validDate(d)
    if (isToday(date) || isYesterday(date)) return formatDistanceToNow(date, {..._options, addSuffix: true, includeSeconds: true})

    return format(d, 'PP')
}

export const short = (d, options={}) => {
    if (!d) return ''

    const date = validDate(d)
    const { time=true } = options
    return format(date,
        isThisYear(date) ? 
            (!isToday(date) ? 'MMM d, ' : '') + (time ? 'p' : '') :
            'PP'
    )
}