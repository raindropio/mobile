import t from 't'
import React from 'react'
import Warning from 'co/common/alert/warning'

export default class GroupNotEmpty extends React.PureComponent {
    static options() {
        return {
            topBar: {
                title: {
                    text: t.s('remove')+' '+t.s('group').toLowerCase()
                },
                largeTitle: {
					visible: true
				}
            }
        }
    }

    render() {
        return (
            <Warning message={t.s('removeGroupError')} />
        )
    }
}