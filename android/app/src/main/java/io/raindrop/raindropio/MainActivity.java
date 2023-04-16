package io.raindrop.raindropio;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

import android.content.Intent;
import android.os.Bundle;

import com.zoontek.rnbootsplash.RNBootSplash;

import io.raindrop.raindropio.Pushes.Pushes;

public class MainActivity extends ReactActivity {
	/**
		* Returns the name of the main component registered from JavaScript. This is used to schedule
		* rendering of the component.
		*/
	@Override
	protected String getMainComponentName() {
		return "app";
	}

	//react-native-screens
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		RNBootSplash.init(this); // <- initialize the splash screen
		Pushes.init(this);
		super.onCreate(null); // or super.onCreate(null) with react-native-screens
	}

	/**
		* Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
		* DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
		* (aka React 18) with two boolean flags.
		*/
	@Override
	protected ReactActivityDelegate createReactActivityDelegate() {
		return new DefaultReactActivityDelegate(
			this,
			getMainComponentName(),
			// If you opted-in for the New Architecture, we enable the Fabric Renderer.
			DefaultNewArchitectureEntryPoint.getFabricEnabled(), // fabricEnabled
			// If you opted-in for the New Architecture, we enable Concurrent React (i.e. React 18).
			DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled() // concurrentRootEnabled
		);
	}

	protected void onStart() {
		super.onStart();
		Pushes.onIntent(getIntent(), this);
	}

	@Override
	public void onNewIntent(Intent intent) {
		super.onNewIntent(intent);
		setIntent(intent);
		Pushes.onIntent(intent, this);
	}

	@Override
	protected void onResume() {
		super.onResume();
		Pushes.onResume(this);
	}
}