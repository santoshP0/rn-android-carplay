package org.birkir.carplay.parser

import android.text.Spannable
import android.text.SpannableString
import android.util.Log
import androidx.car.app.CarContext
import androidx.car.app.model.*

import androidx.car.app.navigation.model.MapController
import androidx.car.app.navigation.model.MapTemplate
//import androidx.car.app.navigation.model.NavigationTemplate
import androidx.car.app.navigation.model.PanModeListener
//import androidx.car.app.navigation.model.PlaceListNavigationTemplate
//import androidx.car.app.navigation.model.RoutePreviewNavigationTemplate
import com.facebook.react.bridge.ReadableMap
import org.birkir.carplay.screens.CarScreenContext
data class PointOfInterest(
  val name: String,
  val description: String,
  val latitude: Double,
  val longitude: Double
)
class RCTMapTemplate(
  context: CarContext,
  carScreenContext: CarScreenContext
) : RCTTemplate(context, carScreenContext) {

  override fun parse(props: ReadableMap): Template {
    val type = props.getString("type")
    val actionStrip = props.getArray("actions")?.let {
      parseActionStrip(it)
    }
    val header = props.getMap("header")?.let {
      parseHeader(it)
    }
    val headerAction = props.getMap("headerAction")?.let {
      parseAction(it)
    }
    val itemList = props.getArray("items")?.let {
        parsePlaceItemList(it)
    }
    val pane = props.getMap("pane")?.let {
      parsePane(it)
    }
    val mapActionStrip = props.getArray("mapButtons")?.let {
      parseActionStrip(it)
    }




//    val panModeListener = PanModeListener { isInPanMode ->
//      if (isInPanMode) {
//        eventEmitter.didShowPanningInterface()
//      } else {
//        eventEmitter.didDismissPanningInterface()
//      }
//    }
//    val mapController = MapController.Builder().apply {
//      mapActionStrip?.let { setMapActionStrip(it); }
//      setPanModeListener(panModeListener)
//    }.build()
 //   when (type) {
//      "navigation" -> {
//        return NavigationTemplate.Builder().apply {
//          actionStrip?.let { setActionStrip(it) }
//          props.getString("backgroundColor")?.let {
//            setBackgroundColor(parseColor(it))
//          }
//          props.getMap("travelEstimate")?.let {
//            setDestinationTravelEstimate(parseTravelEstimate(it))
//          }
//          props.getMap("navigationInfo")?.let {
//            setNavigationInfo(parseNavigationInfo(it))
//          }
//          mapActionStrip?.let { setMapActionStrip(it) }
//          setPanModeListener(panModeListener)
//        }.build()
//      }

 //     "place-list-map" -> {
    //val poiList = getPOIList()
//    val itemListBuilder = ItemList.Builder()
//      .setNoItemsMessage("No items to show")



//    poiList.forEach {
//      itemListBuilder.addItem(
//        Row.Builder()
//          .setTitle(it.name)
//          // Each item in the list *must* have a DistanceSpan applied to either the title
//          // or one of the its lines of text (to help drivers make decisions)
//          .addText(SpannableString(" ").apply {
//            setSpan(
//              DistanceSpan.create(
//                Distance.create(Math.random() * 100, Distance.UNIT_KILOMETERS)
//              ), 0, 1, Spannable.SPAN_INCLUSIVE_INCLUSIVE
//            )
//          })
//          .setOnClickListener { onPOISelected(it) }
//          // Setting Metadata is optional, but is required to automatically show the
//          // item's location on the provided map
//          .setMetadata(
//            Metadata.Builder()
//              .setPlace(Place.Builder(CarLocation.create(it.latitude, it.longitude))
//                // Using the default PlaceMarker indicates that the host should
//                // decide how to style the pins it shows on the map/in the list
//                .setMarker(PlaceMarker.Builder().setColor(
//                  CarColor.createCustom(
//                    0xFF543a20.toInt(), 0xFF543a20.toInt()
//                  )
//                ).build())
//                .build())
//              .build()
//          ).build()
//      )
//    }

    return PlaceListMapTemplate.Builder()
      .apply {
          actionStrip?.let { setActionStrip(it) }
          props.getMap("anchor")?.let { setAnchor(parsePlace(it)) }
          if (props.hasKey("currentLocationEnabled")) {
            setCurrentLocationEnabled(props.getBoolean("currentLocationEnabled"))
          }
          headerAction?.let { setHeaderAction(it) }
          itemList?.let { setItemList(it) }
          setLoading(props.isLoading())
          setOnContentRefreshListener {
           // @todo eventEmitter?.contentDidRefresh
          }
          props.getString("title")?.let { setTitle(it) }
        }.build()
 //     }

//      "place-list-navigation" -> {
//        return PlaceListNavigationTemplate.Builder().apply {
//          actionStrip?.let { setActionStrip(it) }
//          header?.let { setHeader(it) }
//          itemList?.let { setItemList(it) }
//          setLoading(props.isLoading())
//          mapActionStrip?.let { setActionStrip(it) }
//          setOnContentRefreshListener {
//            // @todo eventEmitter?.contentDidRefresh
//          }
//          setPanModeListener(panModeListener)
//        }.build()
//      }
//
//      "route-preview" -> {
//        return RoutePreviewNavigationTemplate.Builder().apply {
//          actionStrip?.let { setActionStrip(it) }
//          header?.let { setHeader(it) }
//          headerAction?.let { setHeaderAction(headerAction) }
//          itemList?.let { setItemList(it) }
//          setLoading(props.isLoading())
//          mapActionStrip?.let { setMapActionStrip(it); }
//          props.getMap("navigateAction")?.let { setNavigateAction(parseAction(it)) }
//          setPanModeListener(panModeListener)
//        }.build()
//      }

//      else -> {
//        Log.d(TAG, "Map rendering")
//        return MapTemplate.Builder().apply {
//          header?.let { setHeader(it) }
//          itemList?.let { setItemList(it) }
//          actionStrip?.let { setActionStrip(it) }
//          setMapController(mapController)
//          pane?.let { setPane(it) }
//        }.build()
 //     }
 //   }

  }

  private fun onPOISelected(poi: PointOfInterest) {

  }

  companion object {
    const val TAG = "RCTMapTemplate"
  }
}
