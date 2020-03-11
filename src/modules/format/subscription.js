import t from 't'
import { until } from 'modules/format/date'

export const plan = ({ plan, status, stopAt })=>{
    if (!plan)
        return ''

    if (plan == 'legacy' || status == 'canceled')
        return t.s('until')+' '+until(stopAt)

    if (plan.includes('monthly'))
        return t.s('monthly')

    if (plan.includes('annual'))
        return t.s('yearly')
}