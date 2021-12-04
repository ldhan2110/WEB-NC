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

//Projects components
const ProjectList = async(()=>import('../pages/projects/project-list-page/index'));

//Item Management components
const ItemListPage = async(()=>import('../pages/testplans/test-plans-list-page/index'));



//User Monitor components
const MemberListPage = async(()=>import('../pages/settings/members/index'));
const SettingProjectPage = async(()=>import('../pages/settings/setting-project/index'));



const dashboardRoute = {
  id: "Dashboard",
  path: "/adm/monitor",
  icon: <PieChart />,
  exact: true,
  containsHome: true,
  component: Dashboard
};

const userManagementRoutes = {
  id: "Users Management",
  path: "/projects/:projectName",
  icon: <Settings />,
  component: null,
  children: [
    {
      id: "User Monitor",
      path: "/projects/:projectName/settings",
      name: "User Monitor",
      component: SettingProjectPage
    },
    {
      id: "User Request",
      path: "/projects/:projectName/members",
      name: "User Request",
      icon: <Users/>,
      component: MemberListPage
    },
  ]
};

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

//PROJECT
const projectListRoute = {
  path: "/projects",
  name: "Projects",
  restrict: true,
  exact: true,
  component: ProjectList
}

//ISSUE


//TEST PLAN
const itemManagementRoute = {
  id: "Items Management",
  path: "/adm/auction-items",
  icon: <Trello/>,
  name: "Items Management",
  restrict: true,
  exact:true,
  component: ItemListPage
}



//REQUIREMENT
const categoryManangementRoute = {
  id: "Category Management",
  path: "/adm/category-manage",
  name: "Category Management",
  icon: <AssignmentOutlinedIcon/>,
  restrict: true,
  exact: true,
  component: ItemListPage
}

// Routes using the Dashboard layout
export const primaryLayoutRoutes = [
  dashboardRoute,
  itemManagementRoute,
  categoryManangementRoute,
  categoryManangementRoute,
];

// Routes using the Auth layout
export const freeLayoutRoutes = [
  forgotPasswordRoute,
  resetPasswordRoute,
  projectListRoute,
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
  

