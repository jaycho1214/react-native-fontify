package com.rnfontify

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

import android.graphics.Typeface
import com.facebook.react.views.text.ReactFontManager
import java.io.File

class RNFontifyModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }

  fun getSystemFonts(): List<String> {
      val fontPaths = listOf(
          "/system/fonts",
          "/system/font",
          "/data/fonts"
      )

      val fontFiles = mutableListOf<String>()
      for (path in fontPaths) {
          val fontsDir = File(path)
          if (fontsDir.exists() && fontsDir.isDirectory) {
              for (file in fontsDir.listFiles() ?: emptyArray()) {
                  if (file.path.endsWith(".ttf") || file.path.endsWith(".otf")) {
                      fontFiles.add(file.name)
                  }
              }
          }
      }
      return fontFiles
  }

  @ReactMethod
  fun hasFont(fontName: String, promise: Promise) {
    if (getSystemFonts().contains(fontName)) {
      return promise.resolve(true)
    }
    val field = ReactFontManager.getInstance()::class.java.getDeclaredField("mCustomTypefaceCache")
    field.isAccessible = true
    val customTypefaceCache: Map<String, Typeface> =
      field.get(ReactFontManager.getInstance()) as Map<String, Typeface>
    return promise.resolve(customTypefaceCache[fontName] != null)
  }

  @ReactMethod
  fun registerFontFromFile(path: String, fontName: String, promise: Promise) {
    val file = File(path)

    if (!file.canRead() || !file.exists()) {
      return promise.reject("ERR_FILE_NOT_FOUND", "Unable to find following path", null)
    }

    try {
      val typeface = Typeface.createFromFile(file)
      ReactFontManager.getInstance().addCustomFont(fontName, typeface)
      promise.resolve(fontName)
    } catch (e: Throwable) {
      promise.reject("ERR_FONT_REGISTRATION", "Failed to register font", e)
    }
  }

  companion object {
    const val NAME = "RNFontify"
  }
}
