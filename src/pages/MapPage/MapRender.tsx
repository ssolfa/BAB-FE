import { fetchMarker } from '@apis/Marker/fetchMarker'
import Map from '@components/MapCard/GoogleMapCard/Map'
import MapModal from '@components/MapCard/ModalCard/MapModal'
import AfterSearchBar from '@components/MapCard/SearchCard/AfterSearchBar'
import SearchBar from '@components/MapCard/SearchCard/SearchBar'
import { Status } from '@googlemaps/react-wrapper'
import { MapContainer, SpinnerContainer } from '@pages/MapPage/MapRender.style'
import { LoginStore } from '@stores/loginStore'
import managerRegisterInfoStore from '@stores/managerRegisterInfoStore'
import { useStudentInfoStore } from '@stores/studentInfoStore'
import { MarkerStoreInfo } from '@stores/tempStore'
import { mapStore } from '@stores/mapStore'
import { lazy, ReactElement, Suspense, useEffect, useState } from 'react'
import { SyncLoader } from 'react-spinners'

//////////////  최상부 컨테이너  //////////////

const render = (status: Status): ReactElement => {
  if (status === Status.FAILURE) {
    return <div>에러 발생!!</div>
  }
  return <></>
}
const AsyncWrapper = lazy(() =>
  import('@googlemaps/react-wrapper').then((module) => ({
    default: module.Wrapper,
  })),
)
export default function MapRender() {
  const { kakao_token } = LoginStore((state) => state)
  const { isStoreRegistered } = managerRegisterInfoStore((state) => state)
  const { isSchoolSet } = useStudentInfoStore((state) => state)
  const { isOpen } = mapStore()
  const [googleMap, setGoogleMap] = useState<google.maps.Map>()
  const [markers, setMarker] = useState<
    google.maps.marker.AdvancedMarkerElement[]
  >([])
  const [lat, setLat] = useState<number>(37.496336)
  const [lng, setLng] = useState<number>(126.95733)
  const [filterCheck, setFilterCheck] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [sendSearchValue, setSendSearchValue] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [entryMarkers, setEntryMarker] = useState<MarkerStoreInfo[]>([])
  const [stores, setStore] = useState<MarkerStoreInfo[]>([])

  function handleFilterCheck(): void {
    setFilterCheck((prev) => !prev)
  }

  function handleSearchValue(value: string): void {
    setSearchValue(value)
  }

  function handleSendSearchValue(value: string): void {
    setSendSearchValue(value)
  }

  function findDiscount(id: number): boolean {
    let check = false
    stores.forEach((info) => {
      if (info.storeId === id) {
        if (info.discountPrice !== 0) {
          check = true
        } else {
          check = false
        }
      }
    })
    return check
  }
  useEffect(() => {
    if (filterCheck === true) {
      if (markers.length) {
        console.log('필터 실행')
        markers.forEach((marker) => {
          const check = findDiscount(parseInt(marker.id))
          if (check === false) {
            marker.map = null
          }
        })
      }
    } else {
      if (markers.length) {
        console.log('리렌더 실행')
        markers.forEach((marker) => {
          const check = findDiscount(parseInt(marker.id))
          if (check === false) {
            marker.map = googleMap
          }
        })
      }
    }
  }, [filterCheck])

  useEffect(() => {
    if (searchValue) {
      if (filterCheck === true) {
        handleFilterCheck()
      }
    }
  }, [searchValue])

  useEffect(() => {
    const getMarkers = async () => {
      const markers: MarkerStoreInfo[] = await fetchMarker(kakao_token)
      setEntryMarker(markers)
    }
    getMarkers()
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <MapContainer>
        {loading ? (
          <SpinnerContainer>
            <SyncLoader color="#4f7233" margin={5} />
          </SpinnerContainer>
        ) : (
          <Suspense
            fallback={
              <SpinnerContainer>
                <SyncLoader color="#4f7233" margin={5} />
              </SpinnerContainer>
            }
          >
            <AsyncWrapper apiKey={import.meta.env.VITE_API_KEY} render={render}>
              <Map
                googleMap={googleMap}
                setGoogleMap={setGoogleMap}
                markers={markers}
                stores={stores}
                setStore={setStore}
                entryMarkers={entryMarkers}
                setMarker={setMarker}
                searchValue={searchValue}
                sendSearchValue={sendSearchValue}
                lat={lat}
                setLat={setLat}
                lng={lng}
                setLng={setLng}
              />
              {searchValue === '' ? (
                <SearchBar
                  handleFilterCheck={handleFilterCheck}
                  handleSearchValue={handleSearchValue}
                  handleSendSearchValue={handleSendSearchValue}
                />
              ) : (
                <AfterSearchBar
                  handleFilterCheck={handleFilterCheck}
                  searchValue={searchValue}
                  handleSearchValue={handleSearchValue}
                  handleSendSearchValue={handleSendSearchValue}
                />
              )}
            </AsyncWrapper>
          </Suspense>
        )}
        {isSchoolSet === false && isStoreRegistered === false ? (
          isOpen === true ? (
            <MapModal />
          ) : null
        ) : null}
      </MapContainer>
    </>
  )
}
