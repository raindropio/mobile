import _ from 'lodash-es'

const common = {
    color: {
        transparent: 'transparent',
        warning: '#A2845E',
        danger: '#E52E1B',
        info: '#465C7D',

        yellow: '#F7C300',
        purple: '#7150E7',
        blue: '#1988E0',
        green: '#1aa051',
        asphalt: '#8791A1',
        orange: '#F57416',
        white: '#ffffff',
        black: '#000000',

        google: '#EA4335',
        facebook: '#3B5998',
        twitter: '#1DA1F2',
	    vkontakte: '#45668E',

        article: '#ec8122',
        image: '#1aa051',
        video: '#625AC3',
        audio: '#975DA8',
        document: '#A2845E',
        important: '#F44336',
        broken: '#8791A1',
        tag: '#8791A1',
        duplicate: '#14A2A1',
        created: '#975DA8'
    },

    text: {},
    
    background: {
        warning: '#fff3cd',
        info: '#CDE1FE',
        danger: '#f8d7da'
    }
}

const light = _.merge({}, common, {
    dark: false,

    color: {
        accent: '#1988E0',
        border: '#00000040'
    },

    text: {
        regular: '#000000',
        secondary: '#7F7F7F',
        tertiary: '#999999',
        disabled: '#00000040'
    },

    background: {
        regular: '#ffffff',
        alternative: '#F0F0F0',
        sidebar: '#F6F5F4',
        disabled: '#00000015',
        keyboard: '#D4D7DD',
    }
})

const dark = _.merge({}, common, {
    dark: true,

    color: {
        accent: '#dcc28f',
        border: '#ffffff30'
    },

    text: {
        regular: '#ffffff',
        secondary: '#999999',
        tertiary: '#737373',
        disabled: '#ffffff40'
    },

    background: {
        regular: '#27282B',
        alternative: '#1D1E20',
        sidebar: '#202023',
        disabled: '#ffffff15',
        keyboard: '#333434'
    }
})

const oled = _.merge({}, dark, {
    background: {
        regular: '#1A1A1A',
        alternative: '#000000',
        sidebar: '#000000'
    }
})

export default {
    light,
    dark,
    oled
}