package io.raindrop.raindropio;

import android.content.Context;

import androidx.multidex.MultiDex;

import com.facebook.react.PackageList;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;

import java.util.List;

import io.raindrop.raindropio.Extension.ExtensionPackage;
import io.raindrop.raindropio.NativeBridge.NativeBridgePackage;

public class MainApplication extends NavigationApplication {
    //need for multidex (if minSDK < 21)
    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
        MultiDex.install(this);
    }

    private final ReactNativeHost mReactNativeHost = new NavigationReactNativeHost(this) {
        @Override
        protected String getJSMainModuleName() {
            return "index.android";
        }

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            @SuppressWarnings("UnnecessaryLocalVariable")
            List<ReactPackage> packages = new PackageList(this).getPackages();
            packages.add(new ExtensionPackage());
            packages.add(new NativeBridgePackage());
            /**
                * Add other packages that fail to be auto-detected here
                */
            return packages;
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }
}