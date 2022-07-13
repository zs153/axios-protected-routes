import styled from 'styled-components'

export const VisuallyHidden = styled.span({
  border: '0 !important',
  clip: 'rect(1px, 1px, 1px, 1px) !important',
  height: '1px !important',
  overflow: 'hidden !important',
  paddingBottom: '0 !important',
  paddingLeft: '0 !important',
  paddingRight: '0 !important',
  paddingTop: '0 !important',
  position: 'absolute !important',
  whiteSpace: 'nowrap !important',
  width: '1px !important'
})

export const BlankButton = styled.button({
  backgroundColor: 'transparent',
  borderBottomWidth: 0,
  borderLeftWidth: 0,
  borderRightWidth: 0,
  borderTopWidth: 0,
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontStyle: 'inherit',
  fontWeight: 'inherit',
  lineHeight: 'inherit',
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
})
