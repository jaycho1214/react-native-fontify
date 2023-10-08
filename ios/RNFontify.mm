#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RNFontify, NSObject)

RCT_EXTERN_METHOD(hasFont:(NSString *)fontName withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(registerFontFromFile:(NSString *)path withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
    return NO;
}

@end
