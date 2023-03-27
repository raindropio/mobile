import { Platform, KeyboardAvoidingView as KAV, StatusBar, View } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

export const KeyboardAvoidingView = Platform.select({
    ios: ({ children, style, verticalOffset=true })=>{
        const headerHeight = useHeaderHeight();
    
        return (
            <KAV
                style={style}
                behavior='padding'
                keyboardVerticalOffset={verticalOffset ? headerHeight + StatusBar.currentHeight : undefined}
            >
                {children}
            </KAV>
        );
    },
    android: View
})