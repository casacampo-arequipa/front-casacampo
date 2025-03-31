import Logo from "../molecules/header/Logo";
import SuperHeader from "../molecules/header/SuperHeaer";

const MainHeader = ({children}) => {
  return (
    <div>
      <div className="fixed bg-gradient w-full z-10">
        <SuperHeader />
        <div className="container mx-auto w-full m-auto flex  items-center lg:">
          <Logo />
          {children}
        </div>
      </div>
    </div>
  );
};
export default MainHeader;