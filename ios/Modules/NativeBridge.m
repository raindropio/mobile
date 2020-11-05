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

@end