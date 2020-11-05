import React from 'react'

const Context = React.createContext({})

export default Context

export class SpaceWrap extends React.Component {
    state = {
        spaceId: null,
        setSpaceId: (spaceId)=>{
            this.setState({ spaceId })
        }
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}