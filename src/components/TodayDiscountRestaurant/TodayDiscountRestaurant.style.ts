import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const RestaurantList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 19px;
  margin-top: 20px;
`

export const Restaurant = styled.div`
  width: 100%;
  padding: 22px 24px;
  box-sizing: border-box;

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;

  background-color: #ffffff;
`
export const DiscountType = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;

  color: #767676;
`
export const RestaurantName = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;

  padding-bottom: 28px;

  color: #000000;
`
export const GoToRestaurantBtn = styled.button`
  position: absolute;
  top: 32px;
  right: 24px;

  /* width: 79px; */
  height: 28px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;

  border: none;
  border-radius: 10px;

  font-weight: 700;
  font-size: 12px;

  background: #fdd100;
  color: #ffffff;
`

export const BackArrow = styled(Link)``

export const MenuList = styled.div`
  box-sizing: border-box;
  width: 100%;
  font-size: 14px;
  line-height: 24px;
  padding-left: 6px;
`

export const Menu = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
export const Dish = styled.div`
  max-width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  font-weight: 500;
`
export const Dash = styled.hr`
  flex: 1;
  border: none;
  border-top: 1px dashed #767676;
  margin: auto 9px;
`
export const DiscountedPrice = styled.div`
  margin-right: 12px;

  font-weight: 700;
  text-decoration: none;
`
export const Price = styled.div`
  text-decoration: line-through;

  font-weight: 300;
  color: #767676;
`

export const EmptyContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const EmptyAlert = styled.span`
  margin-top: 30px;
  margin-bottom: 10px;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;

  text-align: center;

  color: #000000;
`
export const Comment = styled.span`
  margin-bottom: 32px;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;

  text-align: center;

  color: #767676;
`
export const Btn = styled.button`
  box-sizing: border-box;
  padding: 8px 14px;

  background: #ffffff;
  border: 0.4px solid #b0b0b0;
  border-radius: 20px;
`
