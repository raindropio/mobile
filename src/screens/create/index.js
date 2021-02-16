import React from 'react'
import PropTypes from 'prop-types'
import { withOverlay } from 'co/navigation/screen'

import File from './file'
import URL from './url'
import Loading from './loading'
import Loaded from './loaded'
import ErrorComponent from './error'

function BookmarkCreate({ route: { params={} }, ...etc }) {
    const { type } = params

    let Saver
    switch(type) {
        case 'url':     Saver = URL; break;
        case 'file':    Saver = File; break;
        default:        return null;
    }

    return (
        <Saver {...params}>{(items, status)=>{
            let Component

            switch(status) {
                case 'error': 
                    Component = ErrorComponent; 
                break;

                default:
                    //item is new and not yet saved
                    if (!items.length || !items[0]._id)
                        Component = Loading
                    else
                        Component = Loaded
                break;
            }

            return (
                <Component 
                    {...etc}
                    {...params}
                    items={items} />
            )
        }}</Saver>
    )
}

//props
BookmarkCreate.propTypes = {
    route:  PropTypes.shape({
        params: PropTypes.shape({
            collectionId:	    PropTypes.number,
            type:			    PropTypes.string,   //url or file
            values:			    PropTypes.array,     //{ link, title } or { name, uri, type }
            preventDuplicate:   PropTypes.bool,
        })
    })
}

export default withOverlay(BookmarkCreate)