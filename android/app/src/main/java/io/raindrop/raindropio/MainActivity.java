package io.raindrop.raindropio;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import android.content.res.Configuration;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
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

    //react-native-bootsplash
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        RNBootSplash.init(R.drawable.splash, MainActivity.this);
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
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
            }
        };
    }
}
