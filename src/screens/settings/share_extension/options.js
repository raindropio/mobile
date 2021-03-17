import t from 't'

const options = [
    { id: -1,   icon: 'inbox',      label: t.s('defaultCollection--1') },
    { id: 0,    icon: 'history',    label: t.s('lastUsed') }
]

export function getOption(id) {
    return options.find(option=>option.id === id) || {}
}

export default options