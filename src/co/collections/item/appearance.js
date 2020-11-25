import React from 'react'
import { ThemeProvider, useTheme } from 'styled-components'
import { connect } from 'react-redux'
import { makeCollection } from 'data/selectors/collections'

const getColors = (color,accent)=>({
    color: {
        ...color,
        ...(accent ? { accent } : {})
    }
})

function CollectionAppearance({ children, accent }) {
    const { dark, color } = useTheme()

    if (dark)
        return children

    return (
        <ThemeProvider theme={getColors(color, accent)}>
            {children}
        </ThemeProvider>
    )
}

export default connect(
    ()=>{
        const getCollection = makeCollection()

        return (state, { _id }) => ({
            accent: getCollection(state, _id).color
        })
    }
)(CollectionAppearance)