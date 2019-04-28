package io.raindrop.raindropio;

import android.content.Intent;
import com.reactnativenavigation.NavigationActivity;
import android.util.Log;

public class MainActivity extends NavigationActivity {
    @Override
    protected void addDefaultSplashLayout() {
        setContentView(R.layout.splash);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        //fb-sdk
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }
}
