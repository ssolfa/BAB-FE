import { useNavigate } from 'react-router-dom'
import { IoClose } from 'react-icons/io5'
import managerRegisterInfoStore from '@stores/managerRegisterInfoStore'
import { useStudentInfoStore } from '@stores/studentInfoStore'
import { mapStore } from '@stores/mapStore'
import { LoginStore } from '@stores/loginStore'
import {
  Container,
  Wrapper,
  TopWrapper,
  BottomWrapper,
  IconWrapper,
  ButtonWrapper,
  Button,
} from '@components/MapCard/ModalCard/MapModal.style'

export default function MapModal() {
  const { isStoreRegistered } = managerRegisterInfoStore((state) => state)
  const { isSchoolSet } = useStudentInfoStore((state) => state)
  const { membertype } = LoginStore((state) => state)
  const { setIsOpen } = mapStore()
  const navigate = useNavigate()
  return (
    <>
      <Container>
        <Wrapper>
          <TopWrapper>
            <IconWrapper
              onClick={() => {
                setIsOpen()
              }}
            >
              <IoClose></IoClose>
            </IconWrapper>
          </TopWrapper>
          <BottomWrapper>
            {isStoreRegistered === false && isSchoolSet === false
              ? membertype === 'manager'
                ? '가게 '
                : '학생 '
              : ''}
            등록이 아직 안 되어 있어요!
          </BottomWrapper>
          <ButtonWrapper
            onClick={() => {
              setIsOpen()
              membertype === 'student'
                ? navigate('/studentPage')
                : navigate('/manager')
            }}
          >
            <Button>등록하러 가기</Button>
          </ButtonWrapper>
        </Wrapper>
      </Container>
    </>
  )
}
