import React, { useMemo } from 'react'
import { ThemeProvider, useTheme } from 'styled-components'
import { connect } from 'react-redux'
import { makeCollection } from 'data/selectors/collections'

function CollectionColorTint({ children, accent }) {
    const { dark, color } = useTheme()

    if (dark)
        return children

    const theme = useMemo(
        ()=>({
            color: {
                ...color,
                ...(accent ? { accent } : {})
            }
        }),
        [color, accent]
    )

    return (
        <ThemeProvider theme={theme}>
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
)(CollectionColorTint)