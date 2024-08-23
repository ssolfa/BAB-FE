import { create } from 'zustand'

interface MapStore {
  lat: number
  lng: number
  filterCheck: boolean
  isOpen: boolean
  googleMap: google.maps.Map | null
  setLat: (value: number) => void
  setLng: (value: number) => void
  setGoogleMap: (map: google.maps.Map) => void
  setFilterCheck: () => void
  setIsOpen: () => void
}

export const mapStore = create<MapStore>((set) => ({
  markers: [],
  googleMap: null,
  // 학교 설정이 안되있을 경우 숭실대로 위도 경도 설정
  lat: 37.496336,
  lng: 126.95733,
  filterCheck: false,
  isOpen: true,
  setLat: (value) => set({ lat: value }),
  setLng: (value) => set({ lng: value }),
  setGoogleMap: (map) => set({ googleMap: map }),
  setFilterCheck: () => set((state) => ({ filterCheck: !state.filterCheck })),
  setIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}))
