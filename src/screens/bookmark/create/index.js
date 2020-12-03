import React from 'react'
import PropTypes from 'prop-types'
import Height from 'co/navigation/height'

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
    }

    return (
        <>
            <Height height={280} />

            <Saver {...params}>{(items, status)=>{
                let Component

                switch(status) {
                    case 'error': 
                        Component = ErrorComponent; 
                    break;

                    case 'loaded':
                    case 'removed':
                        Component = Loaded;
                    break;

                    default: 
                        Component = Loading; 
                    break;
                }

                return (
                    <Component 
                        {...etc}
                        {...params}
                        items={items} />
                )
            }}</Saver>
        </>
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

//options
BookmarkCreate.options = {
    animationEnabled: false,
    headerTransparent: true,
    headerStyle: {
        elevation: 0,
        shadowOpacity: 0
    },
    title: ''
}

export default BookmarkCreate