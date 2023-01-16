import maplibre, { Map, RequestParameters, ResponseCallback, } from "maplibre-gl"

import "maplibre-gl/dist/maplibre-gl.css"
import { makeRequest } from "maplibre-gl/src/util/ajax"
import * as localforage from "localforage";

maplibre.addProtocol("local", (params: RequestParameters, callback: ResponseCallback<any>) => {
  // replace local with http
  params.url = params.url.replace(/^local:\/\//, 'http://')

  localforage.getItem(params.url, (err, data) => {
    if (!err && data) {
      console.log("hit cache", params.url)

      callback(null, data)
    } else {
      console.log('fetch new', params.url)

      makeRequest(params, (err, data) => {
        if (err) {
          callback(err)
        } else {
          // todo: figure out why this throws an exception if we don't copy the
          localforage.setItem(params.url, copyBuffer(data))
          callback(null, data)
        }
      })
    }
  })

  return {
    cancel: () => {
      // todo: actually cancel in progress requests
    }
  }
})

function copyBuffer(src: ArrayBuffer) : ArrayBuffer  {
  var dst = new ArrayBuffer(src.byteLength);
  new Uint8Array(dst).set(new Uint8Array(src));
  return dst;
}


const map = new Map({
  container: "map", // the id of the div element
  style: "src/styles.json",
  zoom: 12, // starting zoom
  center: [-118.805, 34.027] // starting location [longitude, latitude]
});

