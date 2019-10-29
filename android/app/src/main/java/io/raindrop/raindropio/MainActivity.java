package io.raindrop.raindropio;

import android.content.res.Configuration;
import android.util.Log;

import com.reactnativenavigation.NavigationActivity;

public class MainActivity extends NavigationActivity {
    @Override
    protected void addDefaultSplashLayout() {
        switch (getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK) {
            case Configuration.UI_MODE_NIGHT_YES:
                setContentView(R.layout.splash_dark);
                break;
            case Configuration.UI_MODE_NIGHT_NO:
                setContentView(R.layout.splash_light);
                break;
            default:
                setContentView(R.layout.splash_light);
        }
    }
}
