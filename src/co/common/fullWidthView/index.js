import React from 'react'
import { View, Dimensions } from 'react-native'

export default class FullWidthView extends React.PureComponent {
    static defaultProps = {
        cut: 0,
        style: {}
    }

    state = {
        flex: 1,
        width: undefined,
        ...(this.props.customStyle||this.props.style)
    }

    componentDidMount() {
        Dimensions.addEventListener('change', this.onDimensionsChange)

        this.onDimensionsChange()
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.onDimensionsChange)
    }

    onDimensionsChange = ()=>{
        const { width } = Dimensions.get('window')

        if ((width + this.props.cut) != this.state.width)
            this.setState({ width: width - this.props.cut })
    }

    render() {
        return (
            <View style={this.state} removeClippedSubviews={false}>
                {this.props.children}
            </View>
        )
    }
}