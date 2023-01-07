import logo from "../../images/logo.svg";

interface ILogoProps {
  size: string;
}

export const Logo: React.FC<ILogoProps> = ({ size }) => {
  return <img src={logo} alt="test-logo" className={`logo ${size}`} />;
};
