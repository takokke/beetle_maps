// ブートストラップ ローダ
// Dynamic Library Import を使用して導入
(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
  key: process.env.API_KEY
});

// ライブラリの読み込み
let map;


async function initMap() {
  console.log("マップ生成開始")
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: 34.6648863, lng: 133.916252 },
    zoom: 15,
    mapTypeControl: true
  });
  // geocoderのコンストラクタ
  let geocoder = new google.maps.Geocoder();
  // マーカーの初期化
  let marker;

  // 地図の検索
  $("#search").on('click', function() {
    let place = $("#keyword").val();
    geocoder.geocode({
      address: place
    }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        let bounds = new google.maps.LatLngBounds();
        for (let i in results) {
          if (results[0].geometry) {
            // 緯度経度を取得
            let latlng = results[0].geometry.location;
            // mapのcenterに取得した緯度経度をセット
            map.setCenter(latlng);
            map.setZoom(15);
          }
        }
      } else if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
        console.log(status);

      } else {
        console.log(status);

      }
    });
  });


  /*******************************************************
   投稿詳細画面
   ********************************************************/
  const patternShow = /https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+\/posts\/\d+/g;
  if ( patternShow.test(location.href) ) {
    // location.hrefからposts/:idの:id部分を取り出す。つまり末尾の文字を取り出す
    const postId = location.href.substr(location.href.length - 1);

    // show.json.jbuilderからデータを取得
    let showJsonUrl = `/posts/${postId}.json`;
    const response = await fetch(showJsonUrl).then((res) => res.json()).catch(error => console.error(error));
    const item = response.data.item;

    // 緯度経度を取得
    const lat_lng = new google.maps.LatLng(item.latitude, item.longitude);

    // 地図の中心をlat_lngに合わせる
    map.panTo(lat_lng);

    marker = new google.maps.Marker({
      position: lat_lng,
      map
    });
  }



  /*******************************************************
   新規投稿画面
   ******************************************************/
  let patternNew = /https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+\/posts\/new/g
  if ( patternNew.test(location.href) ) {
    // 地図上でクリックしたときのイベント
    map.addListener('click', function(e) {
      console.log("マップクリック")
      getClickLatLng(e.latLng, map);
      getClickAddress(e.latLng);
      toggleMarker(e.latLng, map);
    });
  }


  /********************************************************
   地図一覧画面
   ********************************************************/
  let patternMap = /https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+map/g
  if (patternMap.test(location.href)) {
    let json_url = "/posts.json"
    const response = await fetch(json_url).then((res) => res.json()).catch(error => console.error(error));
    const items = response.data.items;
    items.forEach((item) => {
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(item.latitude, item.longitude),
        map,
        title: item.creature_name,
      });
      const information = new google.maps.InfoWindow({
        content: `
          <div class="information container p-0">
            <div class="mb-3 d-flex align-items-center">
              <img class="rounded-circle mr-2" src="${item.user.image}" width="40" height="40"><p class="lead m-0 font-weight-bold">${item.user.name}</p>
            </div>
            <div class="mb-3">
              <img class="thumbnail" src="${item.image}" width="220" loading="lazy">
            </div>
            <div>
              <h1 class="h4 font-weight-bold">${item.creature_name}</h1>
              <p class="text-muted" style="width: 220px;">${item.address}</p>
              <p class="lead" style="width: 220px;">${item.caption}</p>
            </div>
          </div>
        `,
        ariaLabel: item.creature_name,
      });
      marker.addListener("click", () => {
        information.open({
          anchor: marker,
          map,
        })
      })
    });
  }

  /**********************************************************************
  関数の定義
  ********************************************************************/
  const getClickLatLng = (lat_lng, map) => {
    $("#lat-input").val(lat_lng.lat());
    $("#lng-input").val(lat_lng.lng());
  }

  // リバースジオコーディングで住所を取得
  const getClickAddress = (lat_lng) => {
    let latlng = {
      lat: parseFloat(lat_lng.lat()),
      lng: parseFloat(lat_lng.lng()),
    };
    geocoder.geocode({ location: latlng }).then((response) => {
      if (response.results[0]) {
        let longAddressStr = response.results[0].formatted_address;
        // 住所から"日本"を取り除く
        let addressStr = longAddressStr.substr(longAddressStr.indexOf('日本') + 3)
        // 郵便番号が含まれている場合取り除く
        if ( addressStr.match(/〒/)) {
          let postCode = addressStr.substr(addressStr.indexOf("〒"), 9);
          addressStr = addressStr.replace(postCode + " ", "");
        }
        // 市区町村まで文字列を取り出す
        if ( addressStr.indexOf('市') != -1 ) {
          addressStr = addressStr.substr(0, addressStr.indexOf('市') + 1);
        } else if ( addressStr.indexOf('区') != -1 ) {
          addressStr = addressStr.substr(0, addressStr.indexOf('区') + 1);
        } else if ( addressStr.indexOf('町') != -1 ) {
          addressStr = addressStr.substr(0, addressStr.indexOf('町') + 1);
        } else if ( addressStr.indexOf('村') != -1 ) {
          addressStr = addressStr.substr(0, addressStr.indexOf('村') + 1);
        }
        $("#address").val(addressStr);
      } else {
        window.alert("No results found");
      }
    }).catch((e) => window.alert("Geocoder failed due to: " + e));
  }

  const toggleMarker = (lat_lng, map) => {

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
    map.panTo(lat_lng);
  }
}

initMap();
