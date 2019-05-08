//
//  AsyncStorage.h
//  rn3
//
//  Created by Rustem Mussabekov on 08/05/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface AsyncStorage : NSObject
+(void)persist; //Save content of AsyncStorage to sharedDefaults
+(void)rewrite; //Load content from sharedDefaults and rewrite AsynStorage
@end
