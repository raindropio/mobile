//common theme
const common = {
    color: {
        warning: '#A2845E',
        danger: '#E52E1B',
        article: '#ec8122',
        image: '#1aa051',
        video: '#625AC3',
        audio: '#975DA8',
        document: '#A2845E',
        important: '#F44336',
        broken: '#8791A1',
        tag: '#8791A1'
    },

    text: {},
    
    background: {
        warning: '#fff3cd',
        danger: '#f8d7da'
    }
}

export default {
    light: {
        dark: false,

        color: {...common.color,
            accent: '#1988E0', //colors.primary
            border: '#D9D9D9' //colors.border
        },

        text: {...common.text,
            regular: '#000000', //colors.text
            secondary: '#00000070', //colors.primaryText
            tertiary: '#00000050',  //colors.secondaryText
            disabled: '#00000040' //text.disabled
        },

        background: {...common.background,
            regular: 'white', //colors.background
            alternative: '#F6F5F4', //colors.sidebar
        }
    },

    dark: {
        dark: true,

        color: {...common.color,
            accent: '#dcc28f',
            border: '#4B4D4F'
        },

        text: {...common.text,
            regular: '#ffffff',
            secondary: '#ffffff70',
            tertiary: '#ffffff50',
            disabled: '#ffffff40'
        },

        background: {...common.background,
            regular: '#2C2E31',
            alternative: '#27292C',
        }
    }
}