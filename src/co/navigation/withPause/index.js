import React from 'react'

export default Component => {
    class PauseRender extends React.Component {
        state = {
            focused: this.props.navigation.isFocused()
        }

        componentDidMount() {
            this._focus = this.props.navigation.addListener('focus', this.onFocus)
            this._blur = this.props.navigation.addListener('blur', this.onBlur)
        }

        componentWillUnmount() {
            this._focus && this._focus()
            this._blur && this._blur()
        }

        onFocus = ()=>
            this.setState({ focused: true })

        onBlur = ()=>
            this.setState({ focused: false })

        shouldComponentUpdate(nextProps, nextState) {
            console.log(nextState.focused)
            return nextState.focused
        }

        render() {
            return <Component {...this.props} />
        }
    }

    PauseRender.options = Component.options

    return PauseRender
}