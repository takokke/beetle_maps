// ブートストラップ ローダ
(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
  key: process.env.API_KEY
});

// ライブラリの読み込み
let map;

// マーカーを初期化
let markers = [];

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  // 地図の中心と倍率は公式から変更しています。
  map = new Map(document.getElementById("map"), {
    center: { lat: 34.6648863, lng: 133.916252 }, 
    zoom: 15,
    mapTypeControl: true
  });
  
  // クリックイベントを追加、緯度経度
  map.addListener('click', function(e) {
    $("#ido").val(e.latLng.lat());
    $("#keido").val(e.latLng.lng());

    getClickLatLng(e.latLng, map);
  });
  
  // 地図の検索
  $('#search').on('click', function() {
    let place = $("#keyword").val();
    let geocoder = new google.maps.Geocoder();      // geocoderのコンストラクタ
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
  
  function setMapOnAll(map) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }
  
  function hideMarkers() {
    setMapOnAll(null);
  }
  
  function deleteMarkers() {
    hideMarkers();
    markers = [];
  }
  
  function getClickLatLng(lat_lng, map) {
    
    
    
    // マーカーを削除
    deleteMarkers();
    // マーカーを設置
    var marker = new google.maps.Marker({
      position: lat_lng,
      map: map
    });
    markers.push(marker);
    // 座標の中心をずらす
    // http://syncer.jp/google-maps-javascript-api-matome/map/method/panTo/
    map.panTo(lat_lng);
    console.log(marker)
  }
}

initMap()