import { create } from 'zustand'

interface Discount {
  menuId: number
  menuPrice: number
  menuName: string
  discountPrice: number
  isChecked: boolean
}

export interface DiscountEvent {
  discountId: number
  storeName: string
  startDate: string
  endDate: string
  discountTitle: string
  discounts: Discount[]
}

interface DiscountEventState {
  currentEvent: DiscountEvent
  discountEvents: DiscountEvent[]
  setEventPeriod: (startDate: string, endDate: string) => void
  setEventMessage: (message: string) => void
  setDiscountChecked: (id: number, isChecked: boolean) => void
  setDiscountPrice: (id: number, price: number) => void
  initializeDiscounts: (
    menu: {
      menuId: number
      image: string
      name: string
      price: number
      isDiscounted?: boolean
    }[],
  ) => void
  addDiscountEventWithId: (
    discountId: number,
    storeName: string,
    discountTitle: string,
    startDate: string,
    endDate: string,
    createDiscountMenuDataDtoList: {
      menuId: number
      menuName: string
      menuPrice: number
      discountPrice: number
    }[],
  ) => void

  removeDiscountEventById: (eventId: number) => void
}

const discountEventStore = create<DiscountEventState>((set, get) => ({
  currentEvent: {
    discountId: 0,
    storeName: '',
    startDate: '',
    endDate: '',
    discountTitle: '',
    discounts: [],
  },
  discountEvents: [],
  setEventPeriod: (startDate, endDate) =>
    set((state) => ({
      currentEvent: {
        ...state.currentEvent,
        startDate,
        endDate,
      },
    })),
  setEventMessage: (message) =>
    set((state) => ({
      currentEvent: {
        ...state.currentEvent,
        discountTitle: message,
      },
    })),
  setDiscountChecked: (id, isChecked) =>
    set((state) => ({
      currentEvent: {
        ...state.currentEvent,
        discounts: state.currentEvent.discounts.map((discount) =>
          discount.menuId === id
            ? { ...discount, isChecked: isChecked }
            : discount,
        ),
      },
    })),
  setDiscountPrice: (id, price) =>
    set((state) => ({
      currentEvent: {
        ...state.currentEvent,
        discounts: state.currentEvent.discounts.map((discount) =>
          discount.menuId === id
            ? { ...discount, discountPrice: price }
            : discount,
        ),
      },
    })),
  initializeDiscounts: (menu) =>
    set((state) => {
      const discounts = menu.map((item) => {
        console.log('Initializing discount for item:', item) // 연동 후 업데이트 됐나 확인
        return {
          menuId: item.menuId,
          menuPrice: item.price,
          menuName: item.name,
          discountPrice: 0,
          isChecked: false,
        }
      })

      return {
        currentEvent: {
          ...state.currentEvent,
          discounts: discounts,
        },
      }
    }),
  addDiscountEventWithId: (
    discountId,
    storeName,
    discountTitle,
    startDate,
    endDate,
    createDiscountMenuDataDtoList,
  ) => {
    const state = get()
    const newEvent: DiscountEvent = {
      discountId: discountId,
      storeName: storeName,
      discountTitle: discountTitle,
      startDate: startDate,
      endDate: endDate,
      discounts: createDiscountMenuDataDtoList.map((item) => ({
        menuId: item.menuId,
        menuName: item.menuName,
        discountPrice: item.discountPrice,
        menuPrice: item.menuPrice,
        isChecked: true,
      })),
    }
    set({
      discountEvents: [...state.discountEvents, newEvent],
    })
  },
  removeDiscountEventById: (eventId) => {
    set((state) => ({
      discountEvents: state.discountEvents.filter(
        (event) => event.discountId !== eventId,
      ),
    }))
  },
}))

export default discountEventStore
