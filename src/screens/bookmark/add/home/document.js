import t from 't'
import React from 'react'
import Navigation from 'modules/navigation'
import DocumentPicker from 'react-native-document-picker'
import Goto from 'co/common/goto'

export default class AddDocument extends React.PureComponent {
    onPress = async ()=>{
        let documents = []
        try{
            documents = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.allFiles],
            })
        }catch(e){}

        if (!documents.length)
            return

        Navigation.replace(this.props, 'bookmark/add/save', {
            values: documents.map(({name, uri, type})=>({
                uri,
                name,
                type
            })),
            type: 'file',
            collectionId: this.props.collectionId
        })
    }

    render() {
        return (
            <Goto 
                last={this.props.last}
                icon={require('assets/images/document.png')}
                label={t.s('add')+' '+t.s('file').toLowerCase()}
                subLabel='PDF, Office'
                onPress={this.onPress} />
        )
    }
}