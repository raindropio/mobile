import t from 't'

export const plan = ({ plan, status, stopAt })=>{
    if (!plan)
        return ''

    if (plan == 'legacy' || status == 'canceled')
        return t.s('until')+' '+stopAt

    if (plan.includes('monthly'))
        return t.s('monthly')

    if (plan.includes('annual'))
        return t.s('yearly')
}