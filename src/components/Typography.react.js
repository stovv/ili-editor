import styled from 'styled-components';
import PropTypes from 'prop-types';


export const XXLarge = styled.p`
  font-family: ${props=>props.theme.fontFamily};
  color: ${props=>props.color ? props.color : props.theme.colors.black};
  max-width: ${props=> props.maxWidth && props.maxWidth};
  max-height: ${props=> props.maxHeight && props.maxHeight};
  margin: ${props=>props.margin};
  text-transform: ${props=>props.textTransform};
  text-align: ${props=>props.textAlign};
  position: ${props=>props.position};
  width: ${props=>props.width};
  height: ${props=>props.height};
  right: ${props=>props.right};
  left: ${props=>props.left};
  top: ${props=>props.top};
  bottom: ${props=>props.bottom};
  user-select: none;
  font-size: 36px;
  font-weight: ${props=> props.weight ? props.weight : "500" };
  font-stretch: normal;
  font-style: normal;
  line-height: 1.04;
  letter-spacing: normal;
  white-space: ${props => props.oneLine ? "nowrap": "unset"};
  ${({hover, theme}) => hover && `
      :hover{
          transition: all 0.4s ease-in-out;
          color: ${theme.text.hover};
      }
  `}
  ${({wrap}) => wrap &&`
        white-space: pre-wrap;
        word-wrap: break-word;
        white-space: normal;
  `}
`;

export const XLarge = styled.p`
  font-family: ${props=>props.theme.fontFamily};
  color: ${props=>props.color ? props.color : props.theme.colors.black};
  max-width: ${props=> props.maxWidth && props.maxWidth};
  max-height: ${props=> props.maxHeight && props.maxHeight};
  margin: ${props=>props.margin};
  text-transform: ${props=>props.textTransform};
  text-align: ${props=>props.textAlign};
  position: ${props=>props.position};
  width: ${props=>props.width};
  height: ${props=>props.height};
  right: ${props=>props.right};
  left: ${props=>props.left};
  top: ${props=>props.top};
  bottom: ${props=>props.bottom};
  user-select: none;
  font-size: 30px;
  font-weight: ${props=> props.weight ? props.weight : "500" };
  font-stretch: normal;
  font-style: normal;
  line-height: 1.04;
  letter-spacing: normal;
  white-space: ${props => props.oneLine ? "nowrap": "unset"};
  ${({hover, theme}) => hover && `
      :hover{
          transition: all 0.4s ease-in-out;
          color: ${theme.text.hover};
      }
  `}
  ${({wrap}) => wrap &&`
        white-space: pre-wrap;
        word-wrap: break-word;
        white-space: normal;
  `}
`;

export const Large = styled.p`
  font-family: ${props=>props.theme.fontFamily};
  color: ${props=>props.color ? props.color : props.theme.colors.black};
  max-width: ${props=> props.maxWidth && props.maxWidth};
  max-height: ${props=> props.maxHeight && props.maxHeight};
  margin: ${props=>props.margin};
  text-transform: ${props=>props.textTransform};
  text-align: ${props=>props.textAlign};
  position: ${props=>props.position};
  width: ${props=>props.width};
  height: ${props=>props.height};
  right: ${props=>props.right};
  left: ${props=>props.left};
  top: ${props=>props.top};
  bottom: ${props=>props.bottom};
  user-select: none;
  font-size: 28px;
  font-weight: ${props=> props.weight ? props.weight : "500" };
  font-stretch: normal;
  font-style: normal;
  line-height: 1.04;
  letter-spacing: normal;
  white-space: ${props => props.oneLine ? "nowrap": "unset"};
  ${({hideOwerflow, maxLines}) => hideOwerflow && `
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: ${maxLines};
      -webkit-box-orient: vertical;
      overflow: hidden;
  `}
    
  ${({hover, theme}) => hover && `
      :hover{
          transition: all 0.4s ease-in-out;
          color: ${theme.text.hover};
      }
  `}
  ${({wrap}) => wrap &&`
        white-space: pre-wrap;
        word-wrap: break-word;
        white-space: normal;
  `}
`;

export const Normal = styled.p`
  font-family: ${props=>props.theme.fontFamily};
  color: ${props=>props.color ? props.color : props.theme.colors.black};
  max-width: ${props=> props.maxWidth && props.maxWidth};
  max-height: ${props=> props.maxHeight && props.maxHeight};
  margin: ${props=>props.margin};
  text-transform: ${props=>props.textTransform};
  text-align: ${props=>props.textAlign};
  position: ${props=>props.position};
  width: ${props=>props.width};
  height: ${props=>props.height};
  right: ${props=>props.right};
  left: ${props=>props.left};
  top: ${props=>props.top};
  bottom: ${props=>props.bottom};
  user-select: none;
  font-size: 20px;
  font-weight: ${props=> props.weight ? props.weight : "500" };
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  white-space: ${props => props.oneLine ? "nowrap": "unset"};
  ${({hideOwerflow, maxLines}) => hideOwerflow && `
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: ${maxLines};
      -webkit-box-orient: vertical;
      overflow: hidden;
  `}
    
  ${({hover, theme}) => hover && `
      :hover{
          transition: all 0.4s ease-in-out;
          color: ${theme.text.hover};
      }
  `}
  ${({wrap}) => wrap &&`
        white-space: pre-wrap;
        word-wrap: break-word;
        white-space: normal;
  `}
`;

export const Small = styled.p`
  color: ${props=>props.color ? props.color : props.theme.colors.black};
  max-width: ${props=> props.maxWidth && props.maxWidth};
  max-height: ${props=> props.maxHeight && props.maxHeight};
  margin: ${props=>props.margin};
  text-transform: ${props=>props.textTransform};
  text-align: ${props=>props.textAlign};
  position: ${props=>props.position};
  width: ${props=>props.width};
  height: ${props=>props.height};
  right: ${props=>props.right};
  left: ${props=>props.left};
  top: ${props=>props.top};
  bottom: ${props=>props.bottom};
  user-select: none;
  font-size: 18px;
  font-weight: ${props=> props.weight ? props.weight : "700" };
  font-stretch: normal;
  font-style: normal;
  line-height: 1.09;
  letter-spacing: normal;
  white-space: ${props => props.oneLine ? "nowrap": "unset"};
  font-family: ${props=>props.theme.fontFamily ? props.theme.fontFamily : "Inter"};
  ${({hideOwerflow, maxLines}) => hideOwerflow && `
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: ${maxLines};
      -webkit-box-orient: vertical;
      overflow: hidden;
  `}
  
  ${({hover, theme}) => hover && `
      :hover{
          transition: all 0.4s ease-in-out;
          color: ${theme.text.hover};
      }
  `}
    ${({wrap}) => wrap &&`
        white-space: pre-wrap;
        word-wrap: break-word;
        white-space: normal;
  `}
`;

export const XSmall = styled.p`
  font-family: ${props=>props.theme.fontFamily};
  color: ${props=>props.color ? props.color : props.theme.colors.black};
  max-width: ${props=> props.maxWidth && props.maxWidth};
  max-height: ${props=> props.maxHeight && props.maxHeight};
  margin: ${props=>props.margin};
  text-transform: ${props=>props.textTransform};
  text-align: ${props=>props.textAlign};
  position: ${props=>props.position};
  width: ${props=>props.width};
  height: ${props=>props.height};
  right: ${props=>props.right};
  left: ${props=>props.left};
  top: ${props=>props.top};
  bottom: ${props=>props.bottom};
  user-select: none;
  font-size: 14px;
  font-weight: ${props=> props.weight ? props.weight : "500" };
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  white-space: ${props => props.oneLine ? "nowrap": "unset"};
  ${({hideOwerflow, maxLines}) => hideOwerflow && `
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: ${maxLines};
      -webkit-box-orient: vertical;
      overflow: hidden;
  `}
  
  ${({hover, theme}) => hover && `
      :hover{
          transition: all 0.4s ease-in-out;
          color: ${theme.text.hover};
      }
  `}
  ${({wrap}) => wrap &&`
    white-space: pre-wrap;
    word-wrap: break-word;
    white-space: normal;
  `}
`;


const defProps = {
  color: PropTypes.string,
  margin: PropTypes.string,
  textTransform: PropTypes.string,
  textAlign: PropTypes.string,
  data: PropTypes.object,
  breakWord: PropTypes.bool,
  hover: PropTypes.bool,
  weight: PropTypes.number,
  oneLine: PropTypes.bool,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  maxWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  maxHeight: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
}

XSmall.propTypes = defProps;
Small.propTypes = defProps;
Normal.propTypes = defProps;
Large.propTypes = defProps;
XLarge.propTypes = defProps;
XXLarge.propTypes = defProps;