//
//  AsyncStorage.m
//  rn3
//
//  Created by Rustem Mussabekov on 08/05/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "AsyncStorage.h"

@implementation AsyncStorage

NSString *RCTStorageDirectory = @"RCTAsyncLocalStorage_V1";

+(NSUserDefaults *)getDefaults {
  return [[NSUserDefaults alloc] initWithSuiteName:@"group.io.raindrop.main"];
}

+(NSString *)getFolderPath {
  NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  return [[paths objectAtIndex:0] stringByAppendingPathComponent:RCTStorageDirectory];
}


+(void)persist {
  @try {
    NSMutableArray *files = [NSMutableArray new];
    
    NSString *documentsDirectory = [self getFolderPath];
    NSArray *filePathsArray = [[NSFileManager defaultManager] subpathsOfDirectoryAtPath:documentsDirectory  error:nil];
    
    if ([filePathsArray count] == 0)
      return;
    
    for (NSString *fileName in filePathsArray){
      [files addObject:@{
                         @"name": fileName,
                         @"content": [NSString stringWithContentsOfFile:[documentsDirectory stringByAppendingPathComponent:fileName] encoding:NSUTF8StringEncoding error:nil]
                         }];
    }
    
    //NSLog(@"%@", [NSString stringWithFormat:@"%@",  @([files count])]);
    NSData *archive = [NSKeyedArchiver archivedDataWithRootObject:files];
    
    NSUserDefaults *appSharedDefaults = [self getDefaults];
    [appSharedDefaults setObject:archive forKey:RCTStorageDirectory];
    [appSharedDefaults synchronize];
  }
  @catch (NSException *exception) {
    
  }
}

+(void)rewrite {
  @try {
    NSUserDefaults *appSharedDefaults = [self getDefaults];
    NSData *storageData = [appSharedDefaults objectForKey:RCTStorageDirectory];
    
    if ([storageData length] > 0) {
      NSArray *entries = [NSKeyedUnarchiver unarchiveObjectWithData:storageData];
      for (NSObject *entry in entries) {
        [[entry valueForKey:@"content"] writeToFile:[[self getFolderPath] stringByAppendingPathComponent:[entry valueForKey:@"name"]] atomically:YES encoding:NSUTF8StringEncoding error:nil];
      }
    }
  }
  @catch (NSException *exception) {
    
  }
}

@end
