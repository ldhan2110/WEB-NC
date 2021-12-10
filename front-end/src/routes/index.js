import React from "react";
import {
  Users,
  PieChart,
  Settings,
  Trello,
} from "react-feather";
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import async from "../components/Async";

// Auth components
const Page500 = async(() => import("../pages/error/Page500"));
const LoginPage = async(()=> import("../pages/auth/login-page/index"));
const ForgotPassword = async(()=> import("../pages/auth/forgot-password-page"));
const ResetPassword = async(()=> import("../pages/auth/reset-password-page"));
const ProfilePage = async(()=>import("../pages/auth/profile-page"));
const VerifyMemberPage =  async(()=>import("../pages/auth/verify-member-page"));

// Dashboards components
const Dashboard = async(() => import("../pages/dashboard"));

//Item Management components
const ItemListPage = async(()=>import('../pages/items/item-list-page/index'));
const ItemDetailPage = async(()=> import('../pages/items/item-detail-page/index'))

//Category Management components
const CategoryListPage = async(()=>import('../pages/category/category-list-page/index'));


//User Monitor components
const MemberListPage = async(()=>import('../pages/settings/members/index'));


//DASHBOARD ROUTE
const dashboardRoute = {
  id: "Dashboard",
  path: "/adm/monitor",
  icon: <PieChart />,
  exact: true,
  containsHome: true,
  component: Dashboard
};


//USER MANAGEMENT ROUTE
const userManagementRoutes = {
  id: "Users Management",
  path: "/projects/:projectName",
  icon: <Settings />,
  component: null,
  children: [
    {
      id: "User Monitor",
      path: "/adm/user/monitor",
      name: "User Monitor",
      component: MemberListPage
    },
    {
      id: "User Request",
      path: "/adm/user/user-request",
      name: "User Request",
      icon: <Users/>,
      component: MemberListPage
    },
  ]
};


//AUTHENTICATE ROUTE
const verifyMemberRoute = {
  path: "/auth/verify-member/:email/:projectid/:token",
  name: "Verify Member",
  component: VerifyMemberPage
}


const forgotPasswordRoute = {
  path: "/auth/forgot-password",
  name: "Forgot Password",
  component: ForgotPassword
}

const resetPasswordRoute = {
  path: "/auth/reset-password/:token",
  name: "Reset Password",
  component: ResetPassword
}


const error500Route = {
  path: "/error/500",
  name: "Internal Error",
  component: Page500
};

const loginRoute = {
  path: "/login",
  name: "Login",
  component: LoginPage
};

const profileRoute = {
  path: "/adm/profile",
  name: "profile",
  restrict: true,
  component: ProfilePage
};




//ITEM MANAGEMENT
const itemManagementRoute = {
  id: "Items Management",
  path: "/adm/auction-items",
  icon: <Trello/>,
  name: "Items Management",
  restrict: true,
  exact:true,
  component: ItemListPage
}

const itemDetailRoute = {
  path: "/adm/auction-items/:id",
  name: "Item Detail",
  restrict: true,
  component: ItemDetailPage
}



//CATEGORY MANAGEMENT
const categoryManangementRoute = {
  id: "Category Management",
  path: "/adm/category-manage",
  name: "Category Management",
  icon: <AssignmentOutlinedIcon/>,
  restrict: true,
  exact: true,
  component: CategoryListPage
}

// Routes using the Dashboard layout
export const primaryLayoutRoutes = [
  dashboardRoute,
  itemManagementRoute,
  itemDetailRoute,
  categoryManangementRoute,
  userManagementRoutes,
];

// Routes using the Auth layout
export const freeLayoutRoutes = [
  forgotPasswordRoute,
  resetPasswordRoute,
  profileRoute,
  verifyMemberRoute
];

// Routes visible in the sidebar
export const sidebarRoutes = [
  dashboardRoute,
  categoryManangementRoute,
  itemManagementRoute,
  userManagementRoutes,
];

export const emptyRoutes = [
  loginRoute,
  error500Route,
];

export const publicRoutes = [
  loginRoute.path,
  verifyMemberRoute.path,
  forgotPasswordRoute.path,
  resetPasswordRoute.path,
]
  

