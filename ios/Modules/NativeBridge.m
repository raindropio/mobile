#import "NativeBridge.h"
#import <UIKit/UIDevice.h>
#import <WebKit/WebKit.h>

@implementation NativeBridge
RCT_EXPORT_MODULE();

+(BOOL)requiresMainQueueSetup {
  return YES;
}

//Constants
- (NSDictionary *)constantsToExport
{
	return @{
		@"isTablet": @([[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPad),
		@"appVersion": [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"]
	};
}

RCT_EXPORT_METHOD(isExtension:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  if ([[[NSBundle mainBundle] bundlePath] hasSuffix:@".appex"])
    resolve(@(1));
  else
    resolve(nil);
}

RCT_EXPORT_METHOD(setDarkTheme:(BOOL *)enabled) {
  if (@available(iOS 13.0, *)) {
    dispatch_async( dispatch_get_main_queue(), ^{
      UIApplication *app = [[UIApplication class] performSelector:@selector(sharedApplication)];
      
      if (enabled)
       app.delegate.window.overrideUserInterfaceStyle = UIUserInterfaceStyleDark;
      else
        app.delegate.window.overrideUserInterfaceStyle = UIUserInterfaceStyleLight;
      
      app.delegate.window.backgroundColor = [UIColor blackColor];
    });
  }
}

//Init cookies
RCT_EXPORT_METHOD(initCookie:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  //Get saved shared cookies
  NSArray *cookies = [[NSHTTPCookieStorage sharedCookieStorageForGroupContainerIdentifier:@"group.io.raindrop.main"] cookies];
  
  if ([cookies count] > 0) {
    //remove any existing local cookies
    //in the future (maybe in June 2020) move this block out of this "if"
    NSHTTPCookieStorage *existing = [NSHTTPCookieStorage sharedHTTPCookieStorage];
    for (NSHTTPCookie *each in existing.cookies) {
      [existing deleteCookie:each];
    }
    
    for (NSHTTPCookie *cookie in cookies) {
      [[NSHTTPCookieStorage sharedHTTPCookieStorage] setCookie:cookie];
    }
  }

  resolve(@(1));
}

//Save cookies
RCT_EXPORT_METHOD(saveCookie:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  //persist all existing cookies to shared group
  NSArray *cookies = [[NSHTTPCookieStorage sharedHTTPCookieStorage] cookies];
	for(NSHTTPCookie* cookie in cookies)
  {
    [[NSHTTPCookieStorage sharedCookieStorageForGroupContainerIdentifier:@"group.io.raindrop.main"] setCookie:cookie];
  }
  
  resolve(@(1));
  
  //Optional for iOS>=11: Webview will have our cookies
  if (@available(iOS 11.0, *)) {
    dispatch_async( dispatch_get_main_queue(), ^{
      WKHTTPCookieStore *elevenStore = [[WKWebsiteDataStore defaultDataStore] httpCookieStore];
      
      [elevenStore getAllCookies:^(NSArray* oldCookies) {
        //remove old
        for (NSHTTPCookie *each in oldCookies) {
          [elevenStore deleteCookie:each completionHandler:nil];
        }
        
        //add new
        for (NSHTTPCookie *cookie in cookies) {
          [elevenStore setCookie:cookie completionHandler:nil];
        }
      }];
    });
  }
}





@end
