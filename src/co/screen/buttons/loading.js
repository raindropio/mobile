import cancel from './cancel'

export default {
    ...cancel,
    rightButtons: [{
        id: 'loading',
        component: {
            name: 'component/loading'
        }
    }]
}