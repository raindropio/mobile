import React from 'react'
import Loading from 'screens/bookmark/create/loading'
import Height from 'co/navigation/height'

function ExtensionLoading(props) {
    return (
        <>
            <Height height={280} />
            <Loading {...props} />
        </>
    )
}

ExtensionLoading.options = {
    headerTransparent: true,
    title: ''
}

export default ExtensionLoading