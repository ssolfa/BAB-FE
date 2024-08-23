import React from 'react'
import {
  MenuContainer,
  MenuImg,
  MenuTitle,
  MenuFixPrice,
  MenuDiscountRate,
  MenuSalePrice,
  InfoContainer,
  DiscountContainer,
} from './ShopMenu.style'

interface ShopMenuProps {
  img: string // 이미지 URL 타입
  title: string // 메뉴 제목 타입
  fixprice: number // 정가 타입
  discountrate: string // 할인율 타입
  saleprice: number // 판매가 타입
  issale: boolean
}

export default function ShopMenu({
  img,
  title,
  fixprice,
  discountrate,
  saleprice,
  issale,
}: ShopMenuProps) {
  return (
    <MenuContainer>
      <MenuImg src={img} />
      <InfoContainer>
        <MenuTitle>{title}</MenuTitle>
        <MenuFixPrice>{issale ? fixprice : null}</MenuFixPrice>
        <DiscountContainer $issale={issale}>
          <MenuDiscountRate>{issale ? discountrate : null}</MenuDiscountRate>
          <MenuSalePrice>{issale ? saleprice : fixprice}</MenuSalePrice>
        </DiscountContainer>
      </InfoContainer>
    </MenuContainer>
  )
}
