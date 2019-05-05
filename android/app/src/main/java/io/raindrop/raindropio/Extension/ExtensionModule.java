package io.raindrop.raindropio.Extension;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableNativeArray;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import static io.raindrop.raindropio.Extension.Utils.getImageFromUri;

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
        try {
            //Result
            WritableMap result = Arguments.createMap();
            WritableNativeArray values = new WritableNativeArray();
            String type = "";

            //Read intent
            Intent intent = getCurrentActivity().getIntent();
            String intentAction = intent.getAction();
            String intentType = intent.getType();

            if (Intent.ACTION_SEND.equals(intentAction) && intentType != null) {
                if ("text/plain".equals(intentType)) {
                    //Text
                    values.pushString(Utils.extractUrl(intent.getStringExtra(Intent.EXTRA_TEXT)));
                    type = "url";
                } else if (intentType.startsWith("image/")) {
                    //Single image
                    values.pushMap(getImageFromUri((Uri) intent.getParcelableExtra(Intent.EXTRA_STREAM), getCurrentActivity()));
                    type = "image";
                }
            } else if (Intent.ACTION_SEND_MULTIPLE.equals(intentAction) && intentType != null) {
                if (intentType.startsWith("image/")) {
                    //Multiple images
                    ArrayList<Uri> imageUris = intent.getParcelableArrayListExtra(Intent.EXTRA_STREAM);
                    for (Uri uri : imageUris){
                        values.pushMap(getImageFromUri(uri, getCurrentActivity()));
                    }
                    type = "image";
                }
            }

            if (type.isEmpty())
                throw new Exception("couldn't find provider");

            //Send result
            result.putString("type", type);
            result.putArray("values", values);
            promise.resolve(result);
        }catch (Exception e) {
            promise.reject("error", e);
        }
    }
}