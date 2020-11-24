import React from 'react'
import { ThemeProvider, useTheme } from 'styled-components'
import { connect } from 'react-redux'
import { makeCollection } from 'data/selectors/collections'

function CollectionAppearance({ children, accent }) {
    const { dark, color } = useTheme()

    if (dark || !accent)
        return children

    return (
        <ThemeProvider theme={{color: {...color, accent}}}>
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