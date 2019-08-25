package io.raindrop.raindropio;

import com.facebook.react.PackageList;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationPackage;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;

import java.util.Arrays;
import java.util.List;

import io.raindrop.raindropio.Extension.ExtensionPackage;
import io.raindrop.raindropio.NativeBridge.NativeBridgePackage;

public class MainApplication extends NavigationApplication {

    @Override
    protected ReactGateway createReactGateway() {
        ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            @Override
            protected String getJSMainModuleName() {
                return "index.android";
            }

            @Override
            protected List<ReactPackage> getPackages() {
                @SuppressWarnings("UnnecessaryLocalVariable")
                List<ReactPackage> packages = new PackageList(this).getPackages();
                packages.add(new NavigationPackage(this));
                packages.add(new ExtensionPackage());
                packages.add(new NativeBridgePackage());
                /**
                 * Add other packages that fail to be auto-detected here
                 */
                return packages;
            }
        };
        return new ReactGateway(this, isDebug(), host);
    }

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        /**
         * We used function override above,
         * so we just return an empty list here
         */
        return Arrays.<ReactPackage>asList();
    }
}