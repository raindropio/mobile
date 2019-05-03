import t from 't'
import _ from 'lodash'
import React from 'react'
import { LayoutAnimation } from 'react-native'
import { ButtonLink, ButtonIcon } from 'co/common/button'
import { Wrap, Body, Toolbar, Backdrop, Loading, Title, Icon } from './style'

const
	star = require('assets/images/star.png'),
	starFilled = require('assets/images/starFilled.png'),
	addTags = require('assets/images/addTags.png'),
    edit = require('assets/images/edit.png'),
    close = require('assets/images/closeCircle.png'),
    closeButtonStyle = {opacity: 0.8}

export default class SaveView extends React.PureComponent {
    componentDidUpdate(prevProps) {
		if (this.props.status != prevProps.status || this.props.collection.color != prevProps.collection.color)
			LayoutAnimation.easeInEaseOut()
	}

    render() {
        const {item, status, collection, onAddTags, onToggleImportant, onEdit, onClose, onTryAgain} = this.props

        let content = null, dismissEnabled = true, showBody = true
    
        switch(status){
            case 'error': 
                content = (
                    <Toolbar>
                        <Title>{t.s('saveError')}</Title>
                        <ButtonLink white onPress={onTryAgain}>{t.s('tryAgain')}</ButtonLink>
                    </Toolbar>
                )
            break;
    
            case 'notFound':
                showBody = false;
            break;

            case 'loading':
            case 'saving':
                dismissEnabled = false
                content = (
                    <Toolbar>
                        <Loading color="white" />
                        <Title>Saving to {collection.title}...</Title>
                        <ButtonLink white onPress={onClose}>{t.s('cancel')}</ButtonLink>
                    </Toolbar>
                )
            break;
            
            case 'removed':
            case 'loaded':
                content = (
                    <Toolbar>
                        <Title>{_.capitalize(t.s('saved'))}</Title>
                        <ButtonIcon white source={addTags} onPress={onAddTags} />
                        {item ? [
                            <ButtonIcon key='important' white source={item.important ? starFilled : star} onPress={onToggleImportant} />,
                            <ButtonIcon key='edit' white source={edit} onPress={onEdit} />
                        ] : null}
                        <ButtonIcon white source={close} onPress={onClose} style={closeButtonStyle} />
                    </Toolbar>
                )
            break;
        }
    
        return (
            <Wrap>
                <Backdrop.Touch onPressIn={dismissEnabled ? onClose : undefined}>
                    <Backdrop.View />
                </Backdrop.Touch>
    
                <Body color={collection.color} show={showBody}>
                    {content}
                </Body>
            </Wrap>
        )
    }
}