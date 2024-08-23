import styled from 'styled-components'

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  height: 100vh; /* 전체 높이를 100vh로 설정 */
  background-color: #ffffff;
`

export const MenuHeader = styled.div`
  position: fixed;
  top: 60px; /* 화면 상단에 고정 */
  width: 400px;
  z-index: 2; /* 다른 요소 위로 보이도록 설정 */
  text-align: left;
`

export const BkImg = styled.div<{ $imgsrc: string }>`
  height: 244px;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.6)
    ),
    url('${(props) => props.$imgsrc}');
  background-size: cover;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  padding-bottom: 40px;
  align-items: end;
`

export const ShopTitle = styled.div`
  width: 220px;
  word-break: keep-all; /*한글일 경우 띄어쓰기 기준으로 짤림*/
  font-size: 23px;
  font-weight: 700;
  color: #ffffff;
  text-align: left;
  margin-bottom: 4px;
`

export const ShopInfoContainer = styled.div<{ $issale: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 0px 23px;
  position: relative;
  top: ${(props) => (props.$issale ? '157px' : '177px')};
`

export const EventContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 23px;
  /* position: relative; */
  /* top: 189px; */
`

export const Event = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #fdd100;
`

export const LinkBtn = styled.div`
  width: max-content;
  font-size: 13px;
  font-weight: 500;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  gap: 6px;
`

export const MenuBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  border-radius: 15px;
  background-color: #ffffff;
  position: relative;
  top: 290px;
  margin-top: -10px; /* MenuHeader와 겹치도록 조정 */
  z-index: 3;
`

export const TodayEvent = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin: 15px 20px;
  text-align: left;
`

export const Coupon = styled.div`
  display: flex;
  text-align: left;
  margin-left: 30px;
`

export const CouponImg = styled.img`
  cursor: pointer;
`

export const CouponInfoContainer = styled.div`
  margin-left: 20px;
`

export const CouponInfoTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #767676;
`

export const CouponInfoBody = styled.div`
  font-size: 14px;
  font-weight: 600;
`

export const MenuContainer = styled.div`
  padding-top: 20px;
`

export const Line = styled.div`
  background-color: #f8f8f8;
  width: 400px;
  height: 2px;
  margin-top: 20px;
`
