import t from 't'

const all = {
    'list':     { label: t.s('view_list'), icon: 'list-check-2' },
    'grid':     { label: t.s('view_grid'), icon: 'layout-grid' },
    //'masonry':  { label: t.s('view_masonry') },
    'simple':   { label: t.s('view_simple'), icon: 'menu' },
}

export function getOptions() {
    return Object.keys(all).map(id=>({
        id,
        ...(all[id] ? all[id] : {}),
    }))
}

export function getLabel(view) {
    const selected = all[view]
    if (selected)
        return selected.label
}

export function getIcon(view) {
    const selected = all[view]
    if (selected)
        return selected.icon
}