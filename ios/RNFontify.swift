import CoreGraphics
import CoreText
import UIKit

@objc(RNFontify)
class RNFontify: NSObject {

  @objc(hasFont:withResolver:withRejecter:)
  func hasFont(fontName: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    for family in UIFont.familyNames {
      let fontNames = UIFont.fontNames(forFamilyName: family)
      if fontNames.contains(fontName) {
        return resolve(true)
      }
    }
    return resolve(false)
  }

  @objc(registerFontFromFile:withResolver:withRejecter:)
  func registerFontFromFile(
    path: String, resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock
  ) {
    guard let provider = CGDataProvider(url: URL(fileURLWithPath: path) as CFURL) else {
      return reject("ERR_FILE_NOT_FOUND", "Unable to find following path", nil)
    }

    guard let font = CGFont(provider) else {
      return reject("ERR_FONT_LOAD", "Unable to load font", nil)
    }

    var error: Unmanaged<CFError>?
    let success = CTFontManagerRegisterGraphicsFont(font, &error)
    if !success {
      guard let underlyingError = error?.takeRetainedValue() else {
        return reject(
          "ERR_FONT_REGISTRATION_UNKNOWN", "Failed to register font for unknown error", nil)
      }

      if CTFontManagerError(rawValue: CFErrorGetCode(underlyingError)) == CTFontManagerError.alreadyRegistered
      {
        return resolve(font.postScriptName as String?)
      }
      return reject("ERR_FONT_REGISTRATION", "Failed to register font", underlyingError)
    }
    return resolve(font.postScriptName as String?)
  }
}
