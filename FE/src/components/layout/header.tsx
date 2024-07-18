import NotificationDropDownMenu from "./notification-btn";
import { ChangeLanguageDropDown } from "./change-language";
import DynamicLoginBtn from "./loginBtn";

const MainHeader = () => {
  return (
    <>
      <div className="w-full justify-center flex bg-gradient-to-l from-blue-600 to-blue-700">
        <header className="flex w-4/5 text-white justify-between items-center h-10 shadow-md">
          <div>
            <a href="/about" className="hover:text-black">
              For more information about us ?
            </a>
          </div>

          <div className="flex">
            <div className="mr-4 hover:text-black">
              <NotificationDropDownMenu />
            </div>

            <div className="mr-4 mt-0.5 hover:text-black">
              <ChangeLanguageDropDown />
            </div>

            <DynamicLoginBtn />
          </div>
        </header>
      </div>
    </>
  );
};

export default MainHeader;
