import { fetchSearchStore, SearchStore } from '@apis/Marker/fetchSearchStore'

import '@assets/mapIcon/markerAnimation.css'

import { MapWrapper } from '@components/MapCard/GoogleMapCard/Map.style'

import greyIcon from '@assets/mapIcon/greyIcon'
import smallGreyIcon from '@assets/mapIcon/smallGreyIcon'
import smallYellowIcon from '@assets/mapIcon/smallYellowIcon'
import yellowIcon from '@assets/mapIcon/yellowIcon'
import { LoginStore } from '@stores/loginStore'
import { MarkerStoreInfo } from '@stores/tempStore'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
  googleMap: google.maps.Map | undefined
  setGoogleMap: (map: google.maps.Map) => void
  markers: google.maps.marker.AdvancedMarkerElement[]
  entryMarkers: MarkerStoreInfo[]
  stores: MarkerStoreInfo[]
  setStore: (stores: MarkerStoreInfo[]) => void
  searchValue: string
  sendSearchValue: string
  setMarker: (marker: google.maps.marker.AdvancedMarkerElement[]) => void
  lat: number
  setLat: (value: number) => void
  lng: number
  setLng: (value: number) => void
}

interface StoreInfo {
  price: number
  discountPrice: number
  check: boolean
}

interface SchoolLoc {
  lat: number
  lng: number
}

interface SendInfo {
  searchValue: string
  storeId: string
  page: string
}

export default function Map({
  googleMap,
  setGoogleMap,
  markers,
  entryMarkers,
  setStore,
  setMarker,
  searchValue,
  sendSearchValue,
  stores,
  lat,
  setLat,
  lng,
  setLng,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState<number | undefined>(16)
  const navigate = useNavigate()
  const { kakao_token } = LoginStore((state) => state)
  const schoolLocations: SchoolLoc[] = [
    //한국공학대학교
    {
      lat: 37.340189,
      lng: 126.733596,
    },
    //인하대학교
    {
      lat: 37.450022,
      lng: 126.653488,
    },
    //숭실대학교
    {
      lat: 37.496336,
      lng: 126.95733,
    },
  ]

  //마커 감시변수
  const intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('drop')
        intersectionObserver.unobserve(entry.target)
      }
    })
  })

  //할인 확인 함수 o
  function findIsDiscount(id: number): StoreInfo {
    let storeinfo: StoreInfo
    storeinfo! = { check: false, price: 0, discountPrice: 0 }

    stores.forEach((info) => {
      if (info.storeId === id) {
        if (info.discountPrice === 0) {
          storeinfo.check = false
          storeinfo.price = info.menuPrice
          storeinfo.discountPrice = 0
        } else {
          storeinfo.check = true
          storeinfo.price = info.menuPrice
          storeinfo.discountPrice = info.discountPrice
        }
      }
    })
    return storeinfo
  }

  //데이터 기준으로 학교 위도 경도 확인
  //더미데이터가 아닌 값만 있어야 테스트 가능
  function findLocation(stores: MarkerStoreInfo[]): SchoolLoc {
    let closestSchool: SchoolLoc = { lat: 0, lng: 0 }
    let latitudeAvg: number = 0
    let longitudeAvg: number = 0

    stores.forEach((store) => {
      latitudeAvg += store.latitude as number
      longitudeAvg += store.longitude as number
    })
    latitudeAvg /= stores.length
    longitudeAvg /= stores.length

    let minDistance = Infinity
    schoolLocations.forEach((school) => {
      const latDifference = school.lat - latitudeAvg
      const lngDifference = school.lng - longitudeAvg
      const distance = Math.hypot(latDifference, lngDifference)

      if (distance < minDistance) {
        closestSchool = school
        minDistance = distance
      }
    })
    return closestSchool
  }

  //지도 범위안 가게 필터링함수
  function filterMarker(Stores: MarkerStoreInfo[]): MarkerStoreInfo[] {
    const filteredMarker: MarkerStoreInfo[] = []
    if (googleMap) {
      const bounds = googleMap.getBounds()
      //남서쪽 경도 위도
      const minLat = bounds?.getSouthWest().lat()
      const minLng = bounds?.getSouthWest().lng()
      //북동쪽 경도 위도
      const maxLat = bounds?.getNorthEast().lat()
      const maxLng = bounds?.getNorthEast().lng()
      if (Stores.length) {
        Stores.forEach((store) => {
          if (
            store.latitude! < maxLat! &&
            store.latitude! > minLat! &&
            store.longitude! < maxLng! &&
            store.longitude! > minLng!
          ) {
            filteredMarker.push(store)
          }
        })
      }
    }
    return filteredMarker
  }

  async function findPlaces(
    searchValue: string,
    latitude?: number,
    longitude?: number,
  ): Promise<MarkerStoreInfo[]> {
    let Stores: MarkerStoreInfo[] = []
    const searchStores: SearchStore[] = await fetchSearchStore(
      kakao_token,
      searchValue,
      latitude === undefined ? 0 : latitude,
      longitude === undefined ? 0 : longitude,
    )
    console.log(searchStores)
    searchStores.forEach((searchStore) => {
      const tempStore: MarkerStoreInfo = {
        storeId: searchStore.storeId,
        storeName: searchStore.storeName,
        latitude: searchStore.latitude,
        longitude: searchStore.longitude,
        menuPrice: searchStore.menuList[0].price,
        discountPrice:
          searchStore.menuList[0].discountPrice === null
            ? 0
            : searchStore.menuList[0].price -
              searchStore.menuList[0].discountPrice,
      }
      Stores.push(tempStore)
    })
    Stores = filterMarker(Stores)
    return Stores
  }

  useEffect(() => {
    if (googleMap) {
      googleMap.setCenter({ lat: lat, lng: lng })
    }
  }, [lat, lng])

  //지도 초기화 o
  useEffect(() => {
    if (ref.current) {
      let location: SchoolLoc
      const Stores: MarkerStoreInfo[] = []
      entryMarkers.forEach((marker) => {
        Stores.push(marker)
      })
      setStore(Stores)
      location = findLocation(Stores)
      console.log(location)
      setLat(location.lat)
      setLng(location.lng)
      const initialMap = new window.google.maps.Map(ref.current, {
        center: { lat, lng },
        zoom: 15,
        disableDefaultUI: true,
        mapId: 'eb4ca83b18a77f42',
      })
      setGoogleMap(initialMap)
      initialMap.addListener('zoom_changed', () => {
        setZoom(initialMap.getZoom())
      })
    }
  }, [entryMarkers])

  //이전 검색마커 삭제기능 && 검색기능
  useEffect(() => {
    const updateStoresAndMarkers = async () => {
      if (searchValue) {
        console.log('검색 실행')
        if (markers.length !== 0) {
          markers.forEach((marker) => {
            marker.map = null
          })
        }
        setMarker([])
        const Stores = await findPlaces(searchValue, lat, lng)
        setStore(Stores)
      }
    }

    updateStoresAndMarkers()
  }, [searchValue])

  //zoom값에 따라 아이콘 조절기능
  useEffect(() => {
    let storeinfo: StoreInfo
    if (zoom! < 15) {
      markers.forEach((marker) => {
        storeinfo = findIsDiscount(parseInt(marker.id))
        if (storeinfo.check === true) {
          marker.content = smallYellowIcon()
        } else {
          marker.content = smallGreyIcon()
        }
      })
    } else {
      markers.forEach((marker) => {
        storeinfo = findIsDiscount(parseInt(marker.id))
        if (storeinfo.check === true) {
          marker.content = yellowIcon(
            storeinfo.price,
            (storeinfo.price - storeinfo.discountPrice) as number,
          )
        } else {
          marker.content = greyIcon(storeinfo.price)
        }
      })
    }
  }, [zoom])

  //마커 삽입기능
  useEffect(() => {
    ;(async () => {
      if (stores.length) {
        const { AdvancedMarkerElement } = (await google.maps.importLibrary(
          'marker',
        )) as google.maps.MarkerLibrary
        const Markers: google.maps.marker.AdvancedMarkerElement[] = []
        stores.forEach((info) => {
          const logo =
            info.discountPrice === 0
              ? greyIcon(info.menuPrice)
              : yellowIcon(info.menuPrice, info.discountPrice)
          logo.classList.add('drop')
          const markerView = new AdvancedMarkerElement({
            map: googleMap,
            position: new google.maps.LatLng(
              info.latitude as number,
              info.longitude as number,
            ),
            title: info.storeName,
            content: logo,
          })
          markerView.addListener('click', () => {
            const sendInfo: SendInfo = {
              searchValue: sendSearchValue,
              storeId: markerView.id,
              page: 'map',
            }
            navigate('/shopdetail', {
              state: sendInfo!,
            })
          })
          markerView.id = info.storeId.toString()
          const marker = markerView.content as HTMLElement
          marker.style.opacity = '0'
          marker.addEventListener('animationend', () => {
            marker.classList.remove('drop')
            marker.style.opacity = '1'
          })
          const time = 0.5 + Math.random()
          marker.style.setProperty('--delay-time', time + 's')
          intersectionObserver.observe(marker)
          Markers.push(markerView)
        })
        setMarker(Markers)
      } else {
        console.log('없어 ㅋㅋ')
      }
    })()
  }, [stores])

  return <MapWrapper ref={ref} id="map" />
}
