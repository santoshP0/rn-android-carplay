package org.birkir.carplay

import android.annotation.SuppressLint
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.os.Build
import android.content.IntentFilter
import android.content.res.Configuration
import android.os.Bundle
import android.util.Log
import androidx.car.app.CarContext.SCREEN_SERVICE
import androidx.car.app.Screen
import androidx.car.app.ScreenManager
import androidx.car.app.Session
import androidx.lifecycle.DefaultLifecycleObserver
import androidx.lifecycle.LifecycleOwner
import com.facebook.react.ReactHost
import com.facebook.react.ReactInstanceEventListener
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.modules.appregistry.AppRegistry
import com.facebook.react.modules.core.TimingModule
import com.facebook.react.modules.debug.DevSettingsModule
import org.birkir.carplay.screens.CarScreen


class CarPlaySession(private val reactHost: ReactHost) : Session(), DefaultLifecycleObserver {
  private lateinit var screen: CarScreen

  @SuppressLint("UnspecifiedRegisterReceiverFlag")
  override fun onCreateScreen(intent: Intent): Screen {
    Log.d(TAG, "On create screen " + intent.action + " - " + intent.dataString)
    val lifecycle = lifecycle
    lifecycle.addObserver(this)
    screen = CarScreen(carContext)
    screen.marker = "root"

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
      carContext.registerReceiver(object : BroadcastReceiver() {
        override fun onReceive(context: Context, intent: Intent) {
          if ("org.birkir.carplay.APP_RELOAD" == intent.action) {
            reactHost.currentReactContext?.let { invokeStartTask(it) }
          }
        }
      }, IntentFilter("org.birkir.carplay.APP_RELOAD"), Context.RECEIVER_NOT_EXPORTED)
    } else {
      carContext.registerReceiver(object : BroadcastReceiver() {
        override fun onReceive(context: Context, intent: Intent) {
          if ("org.birkir.carplay.APP_RELOAD" == intent.action) {
            reactHost.currentReactContext?.let { invokeStartTask(it) }
          }
        }
      }, IntentFilter("org.birkir.carplay.APP_RELOAD"))
    }

    runJsApplication()
    return screen
  }

  private fun runJsApplication() {
    val reactContext = reactHost.currentReactContext
    if (reactContext == null) {
      reactHost.addReactInstanceEventListener(
        object : ReactInstanceEventListener {
          override fun onReactContextInitialized(reactContext: ReactContext) {
            invokeStartTask(reactContext)
            reactHost.removeReactInstanceEventListener(this)
          }
        })
    } else {
      invokeStartTask(reactContext)
    }
  }

  private fun invokeStartTask(reactContext: ReactContext) {
    try {
      val catalystInstance = reactContext.catalystInstance
      val jsAppModuleName = "AndroidAuto"
      val appParams = WritableNativeMap()
      appParams.putDouble("rootTag", 1.0)
      val appProperties = Bundle.EMPTY
      if (appProperties != null) {
        appParams.putMap("initialProps", Arguments.fromBundle(appProperties))
      }

      catalystInstance.getJSModule(AppRegistry::class.java)?.runApplication(jsAppModuleName, appParams)

      val carModule = reactHost.currentReactContext?.getNativeModule(CarPlayModule::class.java)
      carModule!!.setCarContext(carContext, screen)

    } catch (e: Exception) {
      e.printStackTrace()
    }
  }

  override fun onDestroy(owner: LifecycleOwner) {
    Log.i(TAG, "onDestroy")
    val context = carContext
  }

  override fun onNewIntent(intent: Intent) {
    Log.d(TAG, "CarPlaySession.onNewIntent")
  }

  override fun onCarConfigurationChanged(configuration: Configuration) {
    Log.d(TAG, "CarPlaySession.onCarConfigurationChanged")
  }

  companion object {
    const val TAG = "CarPlaySession"
  }
}
