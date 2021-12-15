/**
 * Copyright (c) Rustem Mussabekov, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTLinkingManager.h> //incoming links
#import <FBSDKCoreKit/FBSDKCoreKit.h> //react-native-fbsdk-next

//#ifdef FB_SONARKIT_ENABLED
//#import <FlipperKit/FlipperClient.h>
//#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
//#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
//#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
//#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
//#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>
//static void InitializeFlipper(UIApplication *application) {
//  FlipperClient *client = [FlipperClient sharedClient];
//  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
//  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
//  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
//  [client addPlugin:[FlipperKitReactPlugin new]];
//  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
//  [client start];
//}
//#endif

#import "RNBootSplash.h" //react-native-bootsplash
#import <WebKit/WebKit.h>
#import <RNScreens/UIViewController+RNScreens.h> //react-native-screens

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
//  #ifdef FB_SONARKIT_ENABLED
//    InitializeFlipper(application);
//  #endif
  [[FBSDKApplicationDelegate sharedInstance] application:application
                         didFinishLaunchingWithOptions:launchOptions]; //react-native-fbsdk-next

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"app"
                                            initialProperties:nil];

  if (@available(iOS 13.0, *)) {
      rootView.backgroundColor = [UIColor systemBackgroundColor];
  } else {
      rootView.backgroundColor = [UIColor whiteColor];
  }

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  [RNBootSplash initWithStoryboard:@"BootSplash" rootView:rootView]; //react-native-bootsplash
  
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<NSString *,id> *)options {
  return
  //react-native-fbsdk-next
  [[FBSDKApplicationDelegate sharedInstance] application:app openURL:url options:options]
  ||
  //incoming links
  [RCTLinkingManager application:app openURL:url options:options];
}

//incoming links
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity
 restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler
{
  return [RCTLinkingManager application:application
                   continueUserActivity:userActivity
                     restorationHandler:restorationHandler];
}

//storage and cookies (do not use 'sharedCookieStorageForGroupContainerIdentifier' - buggy)
- (void)saveCookies {
  NSString *suiteName = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"AppGroup"];
  NSUserDefaults *defaults = [[NSUserDefaults alloc] initWithSuiteName:suiteName];
  
  NSHTTPCookieStorage *storage = [NSHTTPCookieStorage sharedHTTPCookieStorage];
  NSData *cookies = [NSKeyedArchiver archivedDataWithRootObject:[storage cookies]];

  //persist all existing cookies to shared group
  [defaults setObject:cookies forKey:@"cookies"];
  [defaults synchronize];
}

- (void)applicationWillTerminate:(UIApplication *)application {
  [self saveCookies];
}

- (void)applicationDidEnterBackground:(UIApplication *)application {
  [self saveCookies];
}

@end
