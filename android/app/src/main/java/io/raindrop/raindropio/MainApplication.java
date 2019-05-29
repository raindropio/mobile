package io.raindrop.raindropio;

import android.content.Context;
import android.support.multidex.MultiDex;

//RN libraries
import com.dylanvann.fastimage.FastImageViewPackage;
import com.dooboolab.RNIap.RNIapPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import io.raindrop.raindropio.Extension.ExtensionPackage;
import io.raindrop.raindropio.NativeBridge.NativeBridgePackage;
import com.thebylito.navigationbarcolor.NavigationBarColorPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.goldenowl.twittersignin.TwitterSigninPackage;
import com.babisoft.ReactNativeLocalization.ReactNativeLocalizationPackage;
import com.wix.interactable.Interactable;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.github.droibit.android.reactnative.customtabs.CustomTabsPackage;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;

//rn-fbsdk
import com.facebook.CallbackManager;

//------------
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {
  //rn-fbsdk
  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }
  //--------------

  @Override
  protected void attachBaseContext(Context base) {
      super.attachBaseContext(base);
      MultiDex.install(this);
  }

  @Override
  protected ReactGateway createReactGateway() {
      ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
          @Override
          protected String getJSMainModuleName() {
            return "index.android";
          }
      };
      return new ReactGateway(this, isDebug(), host);
  }

  @Override
  public boolean isDebug() {
      return BuildConfig.DEBUG;
  }

  protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new ReactNativeConfigPackage(),
        new ExtensionPackage(),
        new FastImageViewPackage(),
        new CustomTabsPackage(),
        new FBSDKPackage(mCallbackManager),
        new RNGoogleSigninPackage(),
        new Interactable(),
        new ReactNativeLocalizationPackage(),
        new TwitterSigninPackage(),
        new NativeBridgePackage(),
        new RNCWebViewPackage(),
        new AsyncStoragePackage(),
        new NavigationBarColorPackage(),
        new PickerPackage(),
        new RNIapPackage()
      );
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
      return getPackages();
  }
}
