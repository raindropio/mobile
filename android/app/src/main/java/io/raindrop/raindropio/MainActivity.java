package io.raindrop.raindropio;

import com.facebook.react.ReactActivity;
import android.content.res.Configuration;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import com.facebook.react.ReactActivityDelegate;
import com.zoontek.rnbootsplash.RNBootSplash;

public class MainActivity extends ReactActivity {
    /**
        * Returns the name of the main component registered from JavaScript. This is used to schedule
        * rendering of the component.
        */
    @Override
    protected String getMainComponentName() {
        return "app";
    }

    //fix Appearance react module
    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        getReactInstanceManager().onConfigurationChanged(this, newConfig);
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            //react-native-bootsplash
            @Override
            protected void loadApp(String appKey) {
                RNBootSplash.init(MainActivity.this);
                super.loadApp(appKey);
            }

            //fix react-native-gesture-handler
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
            }
        };
    }
}
