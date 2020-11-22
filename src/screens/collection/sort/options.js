import t from 't'

const all = {
    'score':        {label: t.s('byRelevance')+' ↓'},
    'created':      {label: t.s('byDate')+' ↑'},
    '-created':     {label: t.s('byDate')+' ↓'},
    'title':        {label: t.s('byName')+' (A-Z)'},
    '-title':       {label: t.s('byName')+' (Z-A)'},
    'domain':       {label: t.s('sites')+' (A-Z)'},
    '-domain':      {label: t.s('sites')+' (Z-A)'},
    'sort':         {label: t.s('manual'), subLabel:`Drag'n'drop ${t.s('soon').toLowerCase()}`}
}

export function getOptions(sorts={}) {
    return Object.keys(sorts)
        .filter(id=>sorts[id] && sorts[id].enabled)
        .map(id=>({
            id,
            ...sorts[id],
            ...(all[id] ? all[id] : {}),
        }))
}

export function getLabel(sort) {
    const selected = all[sort]
    if (selected)
        return selected.label
}