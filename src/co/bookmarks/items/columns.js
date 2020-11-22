import React from 'react'
import { Dimensions } from 'react-native'
import { easeInOut } from 'co/style/animation'
import { Wrap } from './style'

let _cachedWidth = Dimensions.get('window').width

export default class SpaceItemsColumns extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            numColumns: this.getColumns()
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.view !== this.props.view)
            this.updateColumns()
    }
    
	onLayout = ({ nativeEvent: { layout: { width } } })=>{
		_cachedWidth = width
        this.updateColumns()
    }
    
    getColumns = ()=>{
        let numColumns = 1

        switch(this.props.view) {
            case 'grid':
            case 'masonry':
                numColumns = parseInt(_cachedWidth / 185)
                if (numColumns<2) numColumns = 2
            break
        }
        
        return numColumns
    }

    updateColumns = ()=>{
        const numColumns = this.getColumns()
        
        if (numColumns != this.state.numColumns){
			easeInOut()
			this.setState({ numColumns })
        }
    }

	render() {
		return (
			<Wrap onLayout={this.onLayout}>
				{this.props.children(this.state.numColumns)}
			</Wrap>
		)
	}
}