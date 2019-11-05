package io.raindrop.raindropio.NativeBridge;

import android.app.Activity;
import android.content.res.TypedArray;

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.res.Configuration;
import android.os.Build;
import android.view.View;
import android.view.Window;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;

public class NativeBridge extends ReactContextBaseJavaModule {
    ReactApplicationContext context;

    public NativeBridge(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
    }

    @Override
    public String getName() {
        return "NativeBridge";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();

        //Is Tablet?
        constants.put("isTablet", false);
        try {
            int layout = this.context.getResources().getConfiguration().screenLayout & Configuration.SCREENLAYOUT_SIZE_MASK;
            constants.put("isTablet", layout == Configuration.SCREENLAYOUT_SIZE_LARGE || layout == Configuration.SCREENLAYOUT_SIZE_XLARGE);
        } catch (Exception e) {}

        //Version
        constants.put("appVersion", "0.0.0");
        try {
            final PackageManager packageManager = this.context.getPackageManager();
            final String packageName = this.context.getPackageName();
            PackageInfo info = packageManager.getPackageInfo(packageName, 0);
            constants.put("appVersion", info.versionName);
        } catch (Exception e) {}

        //topBarHeight
        int topBarHeight = 40;
        try {
            final TypedArray styledAttributes = getCurrentActivity().getTheme().obtainStyledAttributes(
                    new int[] { android.R.attr.actionBarSize }
            );
            topBarHeight = (int) styledAttributes.getDimension(0, 0);
            topBarHeight = (int) (topBarHeight / context.getResources().getDisplayMetrics().density);
        } catch (Exception e) {}
        constants.put("topBarHeight", topBarHeight);

        return constants;
    }

    @ReactMethod
    public void isExtension(final Promise promise) {
        Boolean result = false;

        try {
            Activity currentActivity = getCurrentActivity();
            if (currentActivity.getClass().getSimpleName().equals("ExtensionActivity")) {
                result = true;
            }
        } catch (Exception e) {}
        
        promise.resolve(result);
    }

    @ReactMethod
    public void setDarkTheme(Boolean enabled) {
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        Activity activity = getCurrentActivity();
                        Window window = activity.getWindow();
                        int flags = window.getDecorView().getSystemUiVisibility();

                        if (!enabled) {
                            flags |= View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;
                        } else {
                            flags &= ~View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;
                        }

                        window.getDecorView().setSystemUiVisibility(flags);
                    }
                });
            }
        } catch (Exception e) {}
    }

    @ReactMethod
    public void initCookie(final Promise promise) {
        promise.resolve(true);
    }

    @ReactMethod
    public void saveCookie(final Promise promise) {
        promise.resolve(true);
    }
}