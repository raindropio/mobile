//
//  ShareViewController.m
//  extension
//
//  Created by Rustem Mussabekov on 10/04/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "ShareViewController.h"
#import "React/RCTRootView.h"
#import "React/RCTBundleURLProvider.h"
#import <MobileCoreServices/MobileCoreServices.h>
#import <ReactNativeNavigation/ReactNativeNavigation.h>
#import "AsyncStorage.h"

NSExtensionContext* extensionContext;
UIViewController* mainViewController;
UIViewController* rnnViewController;
NSString *stackId = @"extensionViewController";
BOOL *firstStart = true;

@implementation ShareViewController

- (BOOL)isContentValid {
  return YES;
}

- (void)didSelectPost {
  [self.extensionContext completeRequestReturningItems:@[] completionHandler:nil];
}

- (NSArray *)configurationItems {
  return @[];
}

- (void)extractDataFromContext:(NSExtensionContext *)context withCallback:(void(^)(NSArray *values, NSString* contentType, NSException *exception))callback {
  //Gather all providers
  NSMutableArray *providers = [NSMutableArray new];
  for (NSExtensionItem *inputItem in context.inputItems) {
    for(NSItemProvider *provider in inputItem.attachments) {
      [providers addObject:provider];
    }
  }
  
  //Get all content from all providers
  [self extractAllFromProviders: providers withCallback:^(NSArray *urls, NSArray *images) {
    if ([urls count] > 0) {
      callback(urls, @"url", nil);
    } else if ([images count] > 0) {
      callback(images, @"image", nil);
    } else {
      callback(nil, nil, [NSException exceptionWithName:@"Error" reason:@"couldn't find provider" userInfo:nil]);
    }
  }];
}

- (void)extractAllFromProviders:(NSArray *)providers withCallback:(void(^)(NSArray *urls, NSArray *images))callback {
  NSMutableArray *urls = [NSMutableArray new];
  NSMutableArray *images = [NSMutableArray new];
  
  __block int index = 0;
  
  for (NSItemProvider *provider in providers) {
    //Is url
    if([provider hasItemConformingToTypeIdentifier:@"public.url"]) {
      [provider loadItemForTypeIdentifier:@"public.url" options:nil completionHandler:^(id<NSSecureCoding> item, NSError *error) {
        NSURL *url = (NSURL *)item;
        [urls addObject:[url absoluteString]];
        
        index++;
        if (index == [providers count]){
          callback(urls, images);
        }
      }];
    }
    
    //Is text
    else if ([provider hasItemConformingToTypeIdentifier:@"public.plain-text"]){
      [provider loadItemForTypeIdentifier:@"public.plain-text" options:nil completionHandler:^(id<NSSecureCoding> item, NSError *error) {
        NSString *text = (NSString *)item;
        
        NSDataDetector *detector = [NSDataDetector dataDetectorWithTypes:NSTextCheckingTypeLink
                                                                   error:nil];
        NSTextCheckingResult *result = [detector firstMatchInString:text
                                                            options:0
                                                              range:NSMakeRange(0, text.length)];
        
        if (result.resultType == NSTextCheckingTypeLink){
          [urls addObject:[result.URL absoluteString]];
        }
        
        index++;
        if (index == [providers count]){
          callback(urls, images);
        }
      }];
    }
    
    //Is image
    else if (@available(iOS 11.0, *) && [provider hasItemConformingToTypeIdentifier:@"public.image"]){
      [provider loadItemForTypeIdentifier:@"public.image" options:nil completionHandler:^(id<NSSecureCoding> item, NSError *error) {
        [provider loadDataRepresentationForTypeIdentifier:@"public.image" completionHandler:^(NSData * _Nullable data, NSError * _Nullable error) {
          NSString *name = [NSString stringWithFormat: @"%@", [NSNumber numberWithDouble:[[NSDate date] timeIntervalSince1970]] ];
          
          //Try to get real file name
          if ([(NSObject *)item isKindOfClass:[NSURL class]]){
            NSURL* url = (NSURL *)item;
            name = [[[url absoluteString] lastPathComponent] stringByDeletingPathExtension];
          }
          
          //Write to temp file
          UIImage *sharedImage = [UIImage imageWithData:data];
          NSString *filePath = [NSTemporaryDirectory() stringByAppendingPathComponent:name];
          NSString *fullPath = [filePath stringByAppendingPathExtension:@"jpeg"];
          [UIImageJPEGRepresentation(sharedImage, .9) writeToFile:fullPath atomically:YES];
          
          [images addObject:@{
                            @"uri": fullPath,
                            @"name": [NSString stringWithFormat:@"%@.%@", name, @"jpeg"],
                            @"type": @"image/jpeg"
                            }];
          
          index++;
          if (index == [providers count]){
            callback(urls, images);
          }
        }];
      }];
    }
    
    //Something other
    else {
      index++;
      if (index == [providers count]){
        callback(urls, images);
      }
    }
  }
}

//REACT------------------------
+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

//Constants
- (NSDictionary *)constantsToExport
{
  return @{
    @"stackId": stackId,
  };
}

RCT_EXPORT_MODULE();

- (void)viewDidLoad {
  [super viewDidLoad];
  
  [AsyncStorage rewrite];
  
  mainViewController = self;
  extensionContext = self.extensionContext;
  
  NSURL *jsCodeLocation;
  
  #if DEBUG
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  #else
    jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  #endif
  
  [ReactNativeNavigation bootstrap:jsCodeLocation launchOptions:nil];
}

/*
 Fix when initially called from SFSafariViewController and closed by pop gesture,
 second open will freeze entire SFSVC, so just close extension... dirty hack I know
 */
- (void)viewWillAppear:(BOOL)animated {
  [super viewWillAppear:animated];
  if (firstStart == false)
    exit(0);
  
  firstStart = false;
}

RCT_EXPORT_METHOD(show) {
  dispatch_async( dispatch_get_main_queue(), ^{
    if (rnnViewController == nil){
      rnnViewController = [ReactNativeNavigation findViewController:stackId];
      
      if (rnnViewController){
        //rnnViewController.modalTransitionStyle = UIModalTransitionStyleCrossDissolve;
        [mainViewController presentViewController:rnnViewController animated:YES completion:nil];
      }
    }
  });
}

RCT_EXPORT_METHOD(close) {
  [AsyncStorage persist];
  [mainViewController dismissViewControllerAnimated:true completion:^{
    [extensionContext completeRequestReturningItems:nil
                                  completionHandler:^(BOOL expired){
                                    exit(0);
                                  }];
  }];
}

RCT_REMAP_METHOD(data,
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  [self extractDataFromContext: extensionContext withCallback:^(NSArray* values, NSString* contentType, NSException* err) {
    if(err) {
      reject(@"error", err.description, nil);
    } else {
      resolve(@{
                @"type": contentType,
                @"values": values
                });
    }
  }];
}

@end
