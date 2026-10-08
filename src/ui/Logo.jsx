import styled from "styled-components";
import LOGOLIGHT from "../data/img/logo-light.png"
import LOGODARK from "../data/img/logo-dark.png"
import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const {isDarkMode} = useDarkMode();

  const src = isDarkMode ? LOGODARK : LOGOLIGHT
  return (
    <StyledLogo>
      {/* <Img src={LOGOLIGHT} alt="Logo" /> */}
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
