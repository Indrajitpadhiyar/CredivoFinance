import {
  LuLayoutDashboard,
  LuWalletMinimal,
  LuLogOut, 
} from "react-icons/lu";

export const SIDE_MANU_DATA = [
  {
    id: "01",
    lable: "Dashboard",
    icon:LuLayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "02",
    lable: "Wallet",
    icon: LuWalletMinimal,
    path: "/income",
  },
    {
        id: "03",
        lable: "Logout",
        icon: LuLogOut,
        path: "Logout",
    },
];
