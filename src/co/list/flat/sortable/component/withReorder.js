import React from 'react'
import { LayoutAnimation } from 'react-native'

export default (Component)=>
    class SortableFlatListWrapper extends React.Component {
        state = {
            dragId: null,
            data: this.props.data
        }

        componentDidUpdate(prevProps) {
            if (prevProps.data != this.props.data)
                this.setState({ data: this.props.data })
        }

        reorder = {
            change: (fromId, toId)=>{
                if (fromId == toId || !fromId || !toId) return

                let fromIndex, toIndex

                const data = [...this.state.data]

                for(const index in data){
                    const item = data[index]

                    if (fromId == this.props.keyExtractor(item))
                        fromIndex = parseInt(index)
                    else if (toId == this.props.keyExtractor(item))
                        toIndex = parseInt(index)

                    if (typeof fromIndex != 'undefined' &&
                        typeof toIndex != 'undefined')
                        break
                }

                if (typeof fromIndex == 'undefined' ||
                    typeof toIndex == 'undefined')
                    return

                const sorce = data[fromIndex]
                data.splice(fromIndex, 1)
                data.splice(toIndex, 0, sorce)

                LayoutAnimation.configureNext({
                    ...LayoutAnimation.Presets.easeInEaseOut,
                    duration: 150
                })

                this.setState({
                    data,
                    ...(!this.state.dragId ? { dragId: fromId } : {})
                })
            },

            commit: ()=>{
                const { dragId } = this.state
                const { keyExtractor, onSortEnd } = this.props

                const from = this.props.data.findIndex(item=>
                    keyExtractor(item) == dragId
                )
                
                const to = this.state.data.findIndex(item=>
                    keyExtractor(item) == dragId
                )

                onSortEnd({ from, to })

                this.reorder.reset()
            },

            reset: ()=>{
                if (this.state.data != this.props.data)
                    this.setState({
                        data: this.props.data,
                        dragId: null
                    })
            }
        }

        render() {
            return (
                <Component 
                    {...this.props}
                    {...this.state}
                    reorder={this.reorder} />
            )
        }
    }