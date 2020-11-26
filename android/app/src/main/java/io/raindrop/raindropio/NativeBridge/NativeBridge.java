package io.raindrop.raindropio.NativeBridge;

import android.app.Activity;
import android.content.ContentResolver;
import android.content.Intent;
import android.content.res.TypedArray;

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.res.Configuration;
import android.net.Uri;
import android.os.Build;
import android.view.View;
import android.view.Window;
import android.webkit.MimeTypeMap;

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

        return constants;
    }

    @ReactMethod
    public void openFileUrl(String url, String mimeType) {
        ContentResolver cR = context.getContentResolver();
        MimeTypeMap mime = MimeTypeMap.getSingleton();

        //details
        Uri uri = Uri.parse(url);
        String detectedMimeType = mime.getExtensionFromMimeType(cR.getType(uri));

        //start activity
        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.setDataAndType(uri, (mimeType != null && !mimeType.isEmpty()) ? mimeType : detectedMimeType);
        intent.setFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
        getCurrentActivity().startActivity(Intent.createChooser(intent, ""));
    }
}