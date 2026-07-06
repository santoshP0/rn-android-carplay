package org.birkir.carplay

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.util.Log
import androidx.car.app.CarAppService
import androidx.car.app.Session
import androidx.car.app.SessionInfo
import androidx.car.app.validation.HostValidator
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost

class CarPlayService : CarAppService() {
  private var reactHost: ReactHost? = null
  override fun onCreate() {
    super.onCreate()
    reactHost = (application as ReactApplication).reactHost
  }

  override fun createHostValidator(): HostValidator {
    return HostValidator.ALLOW_ALL_HOSTS_VALIDATOR
  }

  override fun onCreateSession(sessionInfo: SessionInfo): Session {
    Log.d(TAG, "onCreateSession: sessionId = ${sessionInfo.sessionId}, display = ${sessionInfo.displayType}")
    return CarPlaySession(reactHost!!)
  }

  companion object {
    var TAG = "CarPlayService"
  }
}
