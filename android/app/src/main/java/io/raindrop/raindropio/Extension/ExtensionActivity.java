package io.raindrop.raindropio.Extension;

import com.facebook.react.ReactActivity;
import android.content.res.Configuration;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

import io.raindrop.raindropio.MainActivity;

public class ExtensionActivity extends ReactActivity {
    /**
        * Returns the name of the main component registered from JavaScript. This is used to schedule
        * rendering of the component.
        */
    @Override
    protected String getMainComponentName() {
        return "extension";
    }

    //fix Appearance react module
    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        getReactInstanceManager().onConfigurationChanged(this, newConfig);
    }

    //fix react-native-gesture-handler
    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(ExtensionActivity.this);
            }
        };
    }
}
