import React from 'react'

import isToday from 'date-fns/isToday'
import isYesterday from 'date-fns/isYesterday'
import format from 'date-fns/format'
import formatRelative from 'date-fns/formatRelative'
import { parseDate } from './parse'
import { locale } from './locale'

export const shortDate = (original) => {
    let d
    try{ d = parseDate(original) } catch(e){}

    try{
        if (isToday(d) || isYesterday(d))
            return formatRelative(d, Date.now(), { locale })
    }catch(e){}

    try{
        return format(d, 'PP', { locale })
    }catch(e){}

    return ''
}

export const ShortDate = React.memo(
    function({ date }) {
        return shortDate(date)
    }
)