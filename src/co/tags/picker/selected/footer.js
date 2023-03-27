import { connect } from 'react-redux'
import { makeTagsAutocomplete } from 'data/selectors/tags'

import t from 't'
import Goto from 'co/goto'

function SelectedFooter({ onTabChange, count }) {
    if (!count)
        return null 

    return (
        <Goto
            last 
            icon='arrow-left-s'
            action=''
            onPress={()=>onTabChange(0)}
            label={`${t.s('showAll')} ${t.s('tags').toLowerCase()}`} />
    )
}

export default connect(
    () => {
        const getTagsAutocomplete = makeTagsAutocomplete()
    
        return (state, { spaceId='global' }) => ({
            count: getTagsAutocomplete(state, spaceId).length,
        })
    }
)(SelectedFooter)