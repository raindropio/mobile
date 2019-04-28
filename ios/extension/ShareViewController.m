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

#define URL_IDENTIFIER @"public.url"
#define IMAGE_IDENTIFIER @"public.image"
#define TEXT_IDENTIFIER (NSString *)kUTTypePlainText
#define PDF_IDENTIFIER @"com.adobe.pdf"

NSExtensionContext* extensionContext;
UIViewController* mainViewController;
UIViewController* rnnViewController;
NSString *stackId = @"extensionViewController";

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

- (void)extractDataFromContext:(NSExtensionContext *)context withCallback:(void(^)(NSString *value, NSString* contentType, NSException *exception))callback {
  NSExtensionItem *item = [context.inputItems firstObject];
  NSArray *attachments = item.attachments;

  __block NSItemProvider *urlProvider = nil;
  __block NSItemProvider *imageProvider = nil;
  __block NSItemProvider *textProvider = nil;
  __block NSItemProvider *pdfProvider = nil;

  [attachments enumerateObjectsUsingBlock:^(NSItemProvider *provider, NSUInteger idx, BOOL *stop) {
      if([provider hasItemConformingToTypeIdentifier:URL_IDENTIFIER]) {
          urlProvider = provider;
      } else if ([provider hasItemConformingToTypeIdentifier:TEXT_IDENTIFIER]){
          textProvider = provider;
      } else if ([provider hasItemConformingToTypeIdentifier:IMAGE_IDENTIFIER]){
          imageProvider = provider;
      } else if ([provider hasItemConformingToTypeIdentifier:PDF_IDENTIFIER]){
          pdfProvider = provider;
      }
  }];

  if(urlProvider) {
      [urlProvider loadItemForTypeIdentifier:URL_IDENTIFIER options:nil completionHandler:^(id<NSSecureCoding> item, NSError *error) {
          NSURL *url = (NSURL *)item;

          callback([url absoluteString], @"url", nil);
      }];
  } else if (imageProvider) {
      [imageProvider loadItemForTypeIdentifier:IMAGE_IDENTIFIER options:nil completionHandler:^(id<NSSecureCoding> item, NSError *error) {
          UIImage *sharedImage;
          NSString *filePath = [NSTemporaryDirectory() stringByAppendingPathComponent:@"RNSE_TEMP_IMG"];
          NSString *fullPath = [filePath stringByAppendingPathExtension:@"png"];
        
          if ([(NSObject *)item isKindOfClass:[UIImage class]]){
            sharedImage = (UIImage *)item;
          }else if ([(NSObject *)item isKindOfClass:[NSURL class]]){
            NSURL* url = (NSURL *)item;
            NSData *data = [NSData dataWithContentsOfURL:url];
            sharedImage = [UIImage imageWithData:data];
          }
        
          [UIImagePNGRepresentation(sharedImage) writeToFile:fullPath atomically:YES];
        
          if(callback) {
            callback(fullPath, @"image", nil);
          }
      }];
  } else if (textProvider) {
      [textProvider loadItemForTypeIdentifier:TEXT_IDENTIFIER options:nil completionHandler:^(id<NSSecureCoding> item, NSError *error) {
          NSString *text = (NSString *)item;
        
          NSDataDetector *detector = [NSDataDetector dataDetectorWithTypes:NSTextCheckingTypeLink
                                                                   error:nil];

          NSTextCheckingResult *result = [detector firstMatchInString:text
                                                            options:0
                                                              range:NSMakeRange(0, text.length)];
        
          if (result.resultType == NSTextCheckingTypeLink)
            callback([result.URL absoluteString], @"url", nil);
          else
            callback(text, @"text", nil);
      }];
  } else if (pdfProvider) {
    [pdfProvider loadItemForTypeIdentifier:PDF_IDENTIFIER options:nil completionHandler:^(id<NSSecureCoding> item, NSError *error) {
      callback(nil, nil, [NSException exceptionWithName:@"Error" reason:@"PDF Files are not supported yet" userInfo:nil]);
    }];
  } else {
      callback(nil, nil, [NSException exceptionWithName:@"Error" reason:@"couldn't find provider" userInfo:nil]);
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

RCT_EXPORT_METHOD(show) {
  dispatch_async( dispatch_get_main_queue(), ^{
    if (rnnViewController == nil){
      rnnViewController = [ReactNativeNavigation findViewController:stackId];
      
      if (rnnViewController){
        //rnnViewController.modalTransitionStyle = UIModalTransitionStyleCrossDissolve;
        rnnViewController.modalPresentationCapturesStatusBarAppearance = YES;
        [mainViewController showViewController:rnnViewController sender:mainViewController];
      }
    }
  });
}

RCT_EXPORT_METHOD(close) {
  [extensionContext completeRequestReturningItems:nil
                                completionHandler:nil];
  exit(0);
  /*[mainViewController dismissViewControllerAnimated:true completion:^{
    
  }];*/
}

RCT_REMAP_METHOD(data,
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  [self extractDataFromContext: extensionContext withCallback:^(NSString* val, NSString* contentType, NSException* err) {
    if(err) {
      reject(@"error", err.description, nil);
    } else {
      resolve(@{
                @"type": contentType,
                @"value": val
                });
    }
  }];
}

@end
