import { Component } from "react";
import { requireNativeComponent, Platform, View } from "react-native"

const DropViewNative = Platform.OS === 'ios' && Platform.isPad && parseInt(Platform.Version, 10)>=11 && requireNativeComponent("iPadDropView", null)

export const dropViewSupported = DropViewNative ? true : false

export default class DropView extends Component {
    onDrop = ({nativeEvent})=>
        this.props.onDrop && this.props.onDrop(nativeEvent)

    render() {
        let { children, onDrop, ...rest } = this.props;

        if (!dropViewSupported)
            return (
                <View {...rest}>{children}</View>
            )

        return (
            <DropViewNative {...rest} onDrop={this.onDrop}>
                {children}
            </DropViewNative>
        );
    }
}