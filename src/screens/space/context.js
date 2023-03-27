import { createContext, Component } from 'react';

const Context = createContext({})

export default Context

export class SpaceWrap extends Component {
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