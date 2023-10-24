import Header from 'co/navigation/header'

export default {
    headerBackTitle: ' ', 
    headerBackImage: (
        <Header.Button 
            enabled={false}
            icon='arrow-left'
            color='text.secondary' />
    ),
    statusBarTranslucent: true
}