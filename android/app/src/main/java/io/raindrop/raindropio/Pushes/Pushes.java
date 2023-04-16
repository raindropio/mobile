package io.raindrop.raindropio.Pushes;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.google.firebase.messaging.RemoteMessage;
import com.pusher.pushnotifications.PushNotificationReceivedListener;
import com.pusher.pushnotifications.PushNotifications;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashSet;
import java.util.Set;

import io.raindrop.raindropio.BuildConfig;

public class Pushes extends ReactContextBaseJavaModule {
    /*
        React Native Specific
    */
    ReactApplicationContext context;
    static Set<String> pushes = new HashSet<String>();

    public Pushes(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
    }

    @Override
    public String getName() {
        return "Pushes";
    }

    @ReactMethod
    public void setUserId(String userId, String token) {
        PushNotifications.setUserId(userId, new DumbTokenProvider(token));
        Log.d("pushNotifications", "Set userId: "+userId+" with token: "+token);
    }

    @ReactMethod
    public void clear() {
        PushNotifications.clearAllState();
    }

    /*
        Activity Specific
    */
    static public void init(@NonNull final Activity activity) {
        PushNotifications.start(activity.getApplicationContext(), BuildConfig.PUSHER_ID);
    }

    static public void onResume(@NonNull final Activity activity) {
        PushNotifications.setOnMessageReceivedListenerForVisibleActivity(activity, new PushNotificationReceivedListener() {
            @Override
            public void onMessageReceived(RemoteMessage remoteMessage) {
                Pushes.onIntent(remoteMessage.toIntent(), activity);
            }
        });
    }

    static public void onIntent(Intent intent, @NonNull final Activity activity) {
        Bundle extras = intent.getExtras();
        if (extras == null) return;

        String raindrop = extras.getString("raindrop");
        if (raindrop == null) return;

        //prevent duplicates
        if (pushes.contains(raindrop)) return;
        pushes.add(raindrop);

        try {
            JSONObject json = new JSONObject(raindrop);
            String link = json.getString("link");
            Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(link));
            activity.startActivity(browserIntent);
        } catch (JSONException e) {}
    }
}