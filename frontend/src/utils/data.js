import { LuLayoutDashboard, LuWalletMinimal, LuLogOut } from "react-icons/lu";
import { FaHome } from "react-icons/fa";
// import { FaPiggyBank } from "react-icons/fa";
import { FaCoins } from "react-icons/fa";

export const SIDE_MANU_DATA = [
  {
    id: "01",
    lable: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/Dashboard",
  },
  {
    id: "02",
    lable: "Wallet",
    icon: LuWalletMinimal,
    path: "/income",
  },
  {
    id: "03",
    lable: "Home",
    icon: FaHome,
    path: "/Home",
  },
  { id: "04", lable: "Investment", icon: FaCoins, path: "/Investment" },
  {
    id: "05",
    lable: "Logout",
    icon: LuLogOut,
    path: "Logout",
  },
];
