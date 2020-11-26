//
//  ShareViewController.m
//  extension
//
//  Created by Rustem Mussabekov on 10/04/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "ShareViewController.h"
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTUtilsUIOverride.h>
#import <MobileCoreServices/MobileCoreServices.h>
#import "AsyncStorage.h"
#import <WebKit/WebKit.h>

#if __has_include(<React/RCTUtilsUIOverride.h>)
    #import <React/RCTUtilsUIOverride.h>
#endif

NSExtensionContext* extensionContext;
RCTBridge* bridge;

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
  //title
  NSString *title = @"";
  
  //Gather all providers
  NSMutableArray *providers = [NSMutableArray new];
  for (NSExtensionItem *inputItem in context.inputItems) {
    if ([inputItem attributedContentText].string) {
      title = [inputItem attributedContentText].string;
    }
    
    for(NSItemProvider *provider in inputItem.attachments) {
      [providers addObject:provider];
    }
  }
  
  //Get all content from all providers
  [self extractAllFromProviders: providers title:title withCallback:^(NSArray *urls, NSArray *files) {
    if ([urls count] > 0) {
      callback(urls, @"url", nil);
    } else if ([files count] > 0) {
      callback(files, @"file", nil);
    } else {
      callback(nil, nil, [NSException exceptionWithName:@"Error" reason:@"couldn't find provider" userInfo:nil]);
    }
  }];
}

- (void)extractAllFromProviders:(NSArray *)providers title:(NSString *)title withCallback:(void(^)(NSArray *urls, NSArray *files))callback {
  NSMutableArray *urls = [NSMutableArray new];
  NSMutableArray *files = [NSMutableArray new];
  __block NSUInteger index = 0;

  [providers enumerateObjectsUsingBlock:^(NSItemProvider *provider, NSUInteger idx, BOOL *stop)
    {
      [provider.registeredTypeIdentifiers enumerateObjectsUsingBlock:^(NSString *identifier, NSUInteger idx, BOOL *stop)
      {
        [provider loadItemForTypeIdentifier:identifier options:nil completionHandler:^(id<NSSecureCoding> item, NSError *error)
        {
            index += 1;

            // is an URL - Can be a path or Web URL
            if ([(NSObject *)item isKindOfClass:[NSURL class]]) {
              NSURL *url = (NSURL *)item;
    
              //webpage
              if ([url.scheme hasPrefix:@"http"])
                [urls addObject:@{
                  @"link": [url absoluteString],
                  @"title": title
                  }];
              //file
              else{
                //get mimetype
                CFStringRef fileExtension = (__bridge CFStringRef)[url pathExtension];
                CFStringRef UTI = UTTypeCreatePreferredIdentifierForTag(kUTTagClassFilenameExtension, fileExtension, NULL);
                CFStringRef MIMEType = UTTypeCopyPreferredTagWithClass(UTI, kUTTagClassMIMEType);
                CFRelease(UTI);
                
                [files addObject:@{
                  @"uri": [url absoluteString],
                  @"name": [[url absoluteString] lastPathComponent],
                  @"type": (__bridge_transfer NSString *)MIMEType
                  }];
              }

            // is a String
            } else if ([(NSObject *)item isKindOfClass:[NSString class]]) {
              NSString *text = (NSString *)item;
    
              NSDataDetector *detector = [NSDataDetector dataDetectorWithTypes:NSTextCheckingTypeLink
                                                                        error:nil];
              NSTextCheckingResult *result = [detector firstMatchInString:text
                                                                  options:0
                                                                    range:NSMakeRange(0, text.length)];
              
              if (result.resultType == NSTextCheckingTypeLink){
                [urls addObject:@{
                  @"link": [result.URL absoluteString],
                  @"title": @"",
                  }];
              }

            // is an Image
            } else if ([(NSObject *)item isKindOfClass:[UIImage class]]) {
              UIImage *sharedImage = (UIImage *)item;
              NSString *path = [NSTemporaryDirectory() stringByAppendingPathComponent:@"image.png"];
              [UIImagePNGRepresentation(sharedImage) writeToFile:path atomically:YES];
              
              [files addObject:@{
                @"uri": [NSString stringWithFormat:@"%@%@", @"file://", path],
                @"name": @"image.png",
                @"type": @"image/png"
                }];
            }

            if (index == [providers count]) {
              callback(urls, files);
            }
        }];

        // We'll only use the first provider
        *stop = YES;
      }];
  }];
}

- (void)initCookies {
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
}

- (void)closeExtension {
  [AsyncStorage persist];
  
  [extensionContext completeRequestReturningItems:nil completionHandler:^(BOOL expired){
    self.view = nil;
    //[bridge invalidate];
    //bridge = nil;
    //exit(0);
  }];
}

//REACT------------------------
+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

//Constants
- (NSDictionary *)constantsToExport
{
  return @{};
}

RCT_EXPORT_MODULE();

- (void)viewDidLoad {
  [super viewDidLoad];

  [self initCookies];
  [AsyncStorage rewrite];
  
  extensionContext = self.extensionContext;
      
  if (!bridge)
    bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:nil];
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"extension"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:0];
  
  #if __has_include(<React/RCTUtilsUIOverride.h>)
      [RCTUtilsUIOverride setPresentedViewController:self];
  #endif
  
  self.view = rootView;
}

- (void)viewDidDisappear:(BOOL)animated {
  [self closeExtension];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  #if DEBUG
    return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  #else
    return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  #endif
}

RCT_EXPORT_METHOD(close) {
  [self closeExtension];
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
