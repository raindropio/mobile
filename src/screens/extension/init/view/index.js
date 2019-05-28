import t from 't'
import React from 'react'
import { Wrap, Loading, Message } from './style'
import { ButtonLink } from 'co/common/button'

export default class ExtensionInitView extends React.PureComponent {
    state = {
        showCancel: false
    }

    componentDidMount() {
        this._timeout = setTimeout(()=>{
            this.setState({showCancel: true})
        }, 3000)
    }

    componentWillUnmount() {
        this._timeout && clearTimeout(this._timeout)
    }

    render() {
        return (
            <Wrap>
                {this.props.message ? <Message>{this.props.message}</Message> : <Loading />}

                {(this.props.message || this.state.showCancel) && (
                    <ButtonLink onPress={this.props.onClose}>
                        {t.s('cancel')}
                    </ButtonLink>
                )}
            </Wrap>
        )
    }
}