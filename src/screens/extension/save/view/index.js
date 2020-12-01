import t from 't'
import _ from 'lodash-es'
import React from 'react'
import { LayoutAnimation } from 'react-native'
import Button from 'co/button'
import { Wrap, Body, Toolbar, Backdrop, Loading, Title } from './style'

export default class SaveView extends React.PureComponent {
    closeButton = (
        <Button 
            icon='close'
            color='background.regular' 
            onPress={this.props.onClose} />
    )

    componentDidUpdate(prevProps) {
		if (this.props.status != prevProps.status)
			LayoutAnimation.easeInEaseOut()
	}

    render() {
        const {item, status, message, collection, onAddTags, onToggleImportant, onEdit, onClose, onTryAgain} = this.props

        let content = null, dismissEnabled = true, showBody = true
    
        switch(status){
            case 'error': 
                dismissEnabled = false
                content = (
                    <Toolbar>
                        <Title>{message||t.s('error')}</Title>
                        {/*<Button white onPress={onTryAgain} title={t.s('tryAgain')} />*/}
                        {this.closeButton}
                    </Toolbar>
                )
            break;
    
            case 'new':
                showBody = false;
            break;

            case 'loading':
            case 'saving':
                dismissEnabled = false
                content = (
                    <Toolbar>
                        <Loading color="white" />
                        <Title>Saving to {collection.title}...</Title>
                        <Button title={t.s('cancel')} onPress={onClose} />
                    </Toolbar>
                )
            break;
            
            case 'removed':
            case 'loaded':
                content = (
                    <Toolbar>
                        <Title>{_.capitalize(t.s('saved'))}</Title>
                        {item ? [
                            <Button key='addTags' icon='hashtag' color='background.regular' onPress={onAddTags} />,
                            <Button key={'important'+item.important} icon='heart-3' variant={item.important ? 'fill' : 'line'} color='background.regular' onPress={onToggleImportant} />,
                            <Button key='edit' icon='edit-box' color='background.regular' onPress={onEdit} />
                        ] : null}
                        {this.closeButton}
                    </Toolbar>
                )
            break;
        }
    
        return (
            <Wrap>
                <Backdrop.Touch onPressIn={dismissEnabled ? onClose : undefined}>
                    <Backdrop.View />
                </Backdrop.Touch>
    
                <Body show={showBody}>
                    {content}
                </Body>
            </Wrap>
        )
    }
}