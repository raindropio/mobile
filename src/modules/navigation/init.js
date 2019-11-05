import Navigation from 'modules/navigation'
import { setDarkTheme } from 'modules/native'
import baseStyle from 'co/screen/styles/base'
import { themeIsDark } from 'co/style/colors'

export default function() {
    Navigation.setDefaultOptions(baseStyle())
    setDarkTheme(themeIsDark())
}