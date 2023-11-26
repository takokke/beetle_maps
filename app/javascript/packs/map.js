// ブートストラップ ローダ
(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
  key: process.env.API_KEY
});

// ライブラリの読み込み
let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  // 地図の中心と倍率は公式から変更しています。
  map = new Map(document.getElementById("map"), {
    center: { lat: 34.6648863, lng: 133.916252 }, 
    zoom: 15,
    mapTypeControl: true
  });
  // geocoderのコンストラクタ
  let geocoder = new google.maps.Geocoder();
  // マーカーの初期化
  let marker;
  
  // 地図上でクリックしたときのイベント
  map.addListener('click', function(e) {
    getClickLatLng(e.latLng, map);
    getClickAddress(e.latLng);
    toggleMarker(e.latLng, map);
  });
  
  // 地図の検索
  $('#search').on('click', function() {
    let place = $("#keyword").val();
    // let geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      address: place
    }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        let bounds = new google.maps.LatLngBounds();
        for (let i in results) {
          if (results[0].geometry) {
            // 緯度経度を取得
            let latlng = results[0].geometry.location;
            // mapのcenterに取得した緯度経度をセット
            map.setCenter(latlng)
          }
        }
      } else if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
        alert("見つかりません");
      } else {
        console.log(status);
        alert("エラー発生");
      }
    });
  });
  
  
  /**********************************************************************
  関数の定義
  ********************************************************************/
  function getClickLatLng(lat_lng, map) {
    $("#ido").val(lat_lng.lat());
    $("#keido").val(lat_lng.lng());
  }
  
  // リバースジオコーディングで住所を取得
  function getClickAddress(lat_lng) {
    let latlng = {
      lat: parseFloat(lat_lng.lat()),
      lng: parseFloat(lat_lng.lng()),
    };
    geocoder.geocode({ location: latlng }).then((response) => {
      if (response.results[0]) {
        let addressStr = response.results[0].formatted_address;
        addressStr = addressStr.substr(addressStr.indexOf('日本') + 3)
        if ( addressStr.match(/〒/)) {
          let postal = addressStr.substr(addressStr.indexOf("〒"), 9);
          console.log(postal);
          addressStr = addressStr.replace(postal + " ", "");
        };
        console.log(addressStr)
      } else {
        window.alert("No results found");
      }
    }).catch((e) => window.alert("Geocoder failed due to: " + e)); 
  }
  
  function toggleMarker(lat_lng, map) {
    
    // もし、直前に追加したマーカーが残っているなら、マップから隠す
    if (marker) {
      marker.setMap(null);
    }
    // マーカーを削除する
    marker = null;
    
    // マーカーを設置
    marker = new google.maps.Marker({
      position: lat_lng,
      map: map
    });

    // 座標の中心をずらす
    // http://syncer.jp/google-maps-javascript-api-matome/map/method/panTo/
    map.panTo(lat_lng);
  }
}

initMap();