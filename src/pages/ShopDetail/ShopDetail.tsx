import shopDetailApi from '@apis/ShopDetail/shopDetailApi'
import couponImg from '@assets/icons/coupon.svg'
import BackBar from '@components/BackBar/BackBar'
import ShopMenu from '@components/ShopMenu/ShopMenu'
import { LoginStore } from '@stores/loginStore'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  DetailContainer,
  MenuHeader,
  BkImg,
  ShopTitle,
  ShopInfoContainer,
  EventContainer,
  Event,
  LinkBtn,
  MenuBody,
  TodayEvent,
  Coupon,
  CouponImg,
  CouponInfoContainer,
  CouponInfoTitle,
  CouponInfoBody,
  MenuContainer,
  Line,
} from './ShopDetail.style'

interface StoreDiscountData {
  discountId: number
  title: string
  startDate: string
  endDate: string
}

interface StoreDiscountData {
  discountId: number
  title: string
  startDate: string
  endDate: string
}

interface StoreMenuData {
  menuId: number
  menuName: string
  menuUrl: string
  menuPrice: number
  discountPrice: number
  discountRate: number
}

interface StoreInfo {
  storeId: number
  storeName: string
  storeLink: string
  onSale: boolean
  signatureMenuId: number
  bannerUrl: string
  storeDiscountData: StoreDiscountData
  storeMenuDataList: StoreMenuData[]
}

export default function ShopDetail() {
  const location = useLocation()
  const storeId = location.state.storeId
  const page = location.state.page
  const searchValue = location.state.searchValue
  const [storeInfo, setStoreInfo] = useState<StoreInfo | null>(null)
  const { kakao_token } = LoginStore((state) => state)

  useEffect(() => {
    const handleShopDetailApi = async () => {
      const result = await shopDetailApi(storeId, kakao_token)
      console.log('result1', result)
      if (result) {
        setStoreInfo(result)
        console.log('result', result)
      }
    }

    handleShopDetailApi()
  }, [storeId, kakao_token])

  // 날짜에서 '2024-' 부분을 제거하는 함수
  const formatDate = (dateString: string) => {
    // 'YYYY-MM-DD' 형식에서 'MM-DD' 부분만 반환
    return dateString ? dateString.substring(5) : ''
  }

  const handleBackBar = () => {
    if (page === 'TodayDiscount') {
      return '오늘의 할인 식당'
    } else if (page === 'map') {
      console.log('map', searchValue)
      return searchValue //map에서 searchValue 넘겨주셔야 작동
    } else {
      return ''
    }
  }
  if (!storeInfo) {
    return <div>Loading...</div>
  }

  return (
    <DetailContainer>
      <BackBar storeCategory={handleBackBar()} />
      <MenuHeader>
        <BkImg $imgsrc={storeInfo.bannerUrl}>
          <ShopInfoContainer>
            <ShopTitle>{storeInfo.storeName}</ShopTitle>
            {storeInfo.onSale ? <Event> 가게 특별 할인</Event> : null}
          </ShopInfoContainer>
          <EventContainer>
            <LinkBtn onClick={() => window.open(storeInfo?.storeLink)}>
              링크 바로가기
              <div>&gt;</div>
            </LinkBtn>
          </EventContainer>
        </BkImg>
      </MenuHeader>
      <MenuBody>
        {storeInfo.onSale ? (
          <div>
            <TodayEvent>오늘 할인 행사 하는 음식점이에요!</TodayEvent>
            <Coupon>
              <CouponImg src={couponImg}></CouponImg>
              <CouponInfoContainer>
                <CouponInfoTitle>
                  {formatDate(storeInfo.storeDiscountData.startDate)} ~{' '}
                  {formatDate(storeInfo.storeDiscountData.endDate)}
                </CouponInfoTitle>
                <CouponInfoBody>
                  {storeInfo.storeDiscountData.title}
                </CouponInfoBody>
              </CouponInfoContainer>
            </Coupon>
            <Line />
          </div>
        ) : null}
        <MenuContainer>
          {storeInfo.storeMenuDataList &&
            storeInfo.storeMenuDataList.map((menu) => (
              <ShopMenu
                key={menu.menuId}
                img={menu.menuUrl}
                title={menu.menuName}
                fixprice={menu.menuPrice}
                discountrate={menu.discountRate + '%'}
                saleprice={menu.menuPrice - menu.discountPrice}
                issale={storeInfo.onSale}
              />
            ))}
        </MenuContainer>
      </MenuBody>
    </DetailContainer>
  )
}
