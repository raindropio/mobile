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

import static io.raindrop.raindropio.Extension.Utils.getFileFromUri;

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

        return constants;
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
                } else {
                    //Single file
                    values.pushMap(getFileFromUri((Uri) intent.getParcelableExtra(Intent.EXTRA_STREAM), getCurrentActivity()));
                    type = "file";
                }
            } else if (Intent.ACTION_SEND_MULTIPLE.equals(intentAction) && intentType != null) {
                //Multiple files
                ArrayList<Uri> fileUris = intent.getParcelableArrayListExtra(Intent.EXTRA_STREAM);
                for (Uri uri : fileUris){
                    values.pushMap(getFileFromUri(uri, getCurrentActivity()));
                }
                type = "file";
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