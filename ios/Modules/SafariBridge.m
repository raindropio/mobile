#import "SafariBridge.h"
#import <ReactNativeNavigation/ReactNativeNavigation.h>
#import "RNNComponentViewController.h"
#import "RNNElementFinder.h"
#import "RNNElementView.h"
@import SafariServices;

@implementation SafariBridge
RCT_EXPORT_MODULE();

+(BOOL)requiresMainQueueSetup {
  return NO;
}

RCT_EXPORT_METHOD(open:(NSString *)componentId options:(NSDictionary *)options) {
  RCTExecuteOnMainQueue(^{
    NSURL* url = [[NSURL alloc] initWithString:[[options valueForKey:@"url"] stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLFragmentAllowedCharacterSet]]];
    NSNumber* readerMode = [options valueForKey:@"readerMode"];
    NSNumber* reactTag = [options valueForKey:@"reactTag"];
    NSNumber* preferredBarTintColor = [options valueForKey:@"preferredBarTintColor"];
    NSNumber* preferredControlTintColor = [options valueForKey:@"preferredControlTintColor"];
    
    UIViewController *vc = [ReactNativeNavigation findViewController:componentId];
    
    SFSafariViewController *safariViewController = [[SFSafariViewController alloc] initWithURL:url entersReaderIfAvailable:[readerMode boolValue]];
    
    if (preferredBarTintColor) {
      safariViewController.preferredBarTintColor = [RCTConvert UIColor:preferredBarTintColor];
    }
    
    if (preferredControlTintColor) {
      safariViewController.preferredControlTintColor = [RCTConvert UIColor:preferredControlTintColor];
    }
    
    if (@available(iOS 11.0, *)) {
      safariViewController.dismissButtonStyle = SFSafariViewControllerDismissButtonStyleDone;
    }
    
    (void)safariViewController.view;
    
    if ([reactTag intValue] >= 0) {
      if ([vc isKindOfClass:[RNNComponentViewController class]]) {
        
          RNNComponentViewController* rootVc = (RNNComponentViewController*)vc;
          rootVc.previewController = safariViewController;
          rootVc.previewCallback = ^(UIViewController *vc) {
            RNNComponentViewController* theVc = (RNNComponentViewController*)vc;
            [vc.navigationController presentViewController:safariViewController animated:NO completion:nil];
            [theVc.eventEmitter sendComponentDidAppear:theVc.layoutInfo.componentId componentName:@"SAFARI_VIEW"];
          };
        
          UIView *view = [[ReactNativeNavigation getBridge].uiManager viewForReactTag:reactTag];
          [rootVc registerForPreviewingWithDelegate:(id)rootVc sourceView:view];
        
      }
    } else {
      [vc.navigationController presentViewController:safariViewController animated:YES completion:nil];
      if ([vc isKindOfClass:[RNNComponentViewController class]]) {
        RNNComponentViewController* rootVc = (RNNComponentViewController*)vc;
        [rootVc.eventEmitter sendComponentDidAppear:rootVc.layoutInfo.componentId componentName:@"SAFARI_VIEW"];
      }
    }
  });
}

@end
