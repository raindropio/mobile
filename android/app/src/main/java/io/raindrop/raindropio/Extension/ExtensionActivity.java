package io.raindrop.raindropio.Extension;

import com.facebook.react.ReactActivity;
import android.content.res.Configuration;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import android.os.Bundle;

import io.raindrop.raindropio.BuildConfig;

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

    //react-native-screens
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(null);
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ExtensionActivityDelegate(this, getMainComponentName());
    }

    public static class ExtensionActivityDelegate extends ReactActivityDelegate {
        public ExtensionActivityDelegate(ReactActivity activity, String mainComponentName) {
            super(activity, mainComponentName);
        }

        @Override
        protected ReactRootView createRootView() {
            ReactRootView reactRootView = new ReactRootView(getContext());
            // If you opted-in for the New Architecture, we enable the Fabric Renderer.
            reactRootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
            return reactRootView;
        }
    }
}