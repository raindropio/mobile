import t from 't'
import React from 'react'
import PropTypes from 'prop-types'
import Field from './field'

export default class ScreenSearchBar extends React.PureComponent {
    static propTypes = {
        autoFocus:      PropTypes.bool,
        placeholder:    PropTypes.string,
        showCancel:     PropTypes.bool,

        onChange:       PropTypes.func,
        onSubmit:       PropTypes.func,
        onCancel:       PropTypes.func
    }

    static defaultProps = {
        autoFocus:      false,
        placeholder:    t.s('defaultCollection-0'),
        showCancel:     false
    }

    render() {
        return (
            <Field 
                {...this.props} />
        )
    }
}