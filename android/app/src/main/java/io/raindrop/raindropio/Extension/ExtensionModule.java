package io.raindrop.raindropio.Extension;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.util.Log;

import java.util.HashMap;
import java.util.Map;

import io.raindrop.raindropio.R;

public class ExtensionModule extends ReactContextBaseJavaModule {
    public ExtensionModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ShareViewController";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();

        constants.put("stackId", "extensionViewController");

        return constants;
    }

    @ReactMethod
    public void show() {

    }

    @ReactMethod
    public void close() {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity.getClass().getSimpleName().equals("ExtensionActivity")) {
            currentActivity.finish();
        }
    }

    @ReactMethod
    public void data(Promise promise) {
        promise.resolve(processIntent());
    }


    public WritableMap processIntent() {
        WritableMap map = Arguments.createMap();

        String value = "";
        String mime = "";
        String type = "";
        String action = "";

        Activity currentActivity = getCurrentActivity();

        if (currentActivity != null) {
            Intent intent = currentActivity.getIntent();
            action = intent.getAction();
            mime = intent.getType();

            if (Intent.ACTION_SEND.equals(action) && ("image/*".equals(mime) || "image/jpeg".equals(mime) || "image/png".equals(mime) || "image/jpg".equals(mime) ) ) {
                Uri uri = (Uri) intent.getParcelableExtra(Intent.EXTRA_STREAM);
                value = RealPathUtil.getRealPathFromURI(currentActivity, uri);
                type = "image";
            } else {
                value = intent.getStringExtra(Intent.EXTRA_TEXT);

                try {
                    value = Utils.extractUrl(value);
                    type = "url";
                } catch (Exception e) {
                    type = "text";
                }
            }
        } else {
            value = "";
            type = "";
        }

        map.putString("type", type);
        map.putString("value",value);

        return map;
    }
}