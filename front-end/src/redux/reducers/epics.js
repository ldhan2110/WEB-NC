import { combineEpics } from 'redux-observable';
import * as accountEpics from '../account/accountEpics';
import * as itemsEpics from '../items/itemEpics';
import * as testplanEpics from '../test-plan/testplanEpics';
import * as issueEpics from '../issue/issueEpics';
import * as requirementsEpics from '../requirements/requirementsEpics';
import * as testcaseEpics from '../test-case/testcaseEpics';
import * as buildEpics from '../build-release/buildEpics';
import * as userEpics from '../users/userEpics';
import * as testexecEpics from '../test-execution/testexecEpics';
import * as dashboardEpics from '../dashboard/dasboardEpics';
import * as notificationEpics from '../notification/notificationEpics';


export default combineEpics(
   //DASHBOARD EPICS
   dashboardEpics.getEffortEpic,
   dashboardEpics.getExecOverviewEpic,
   dashboardEpics.getMultiChart,
   dashboardEpics.getSixExecution,

   //ACCOUNT EPICS
   accountEpics.loginReqEpic,
   accountEpics.logoutReqEpic,
   accountEpics.registerReqEpic,
   accountEpics.sendMailResetPasswordReqEpic,
   accountEpics.confirmResetPasswordReqEpic,

   //ITEMS EPICS
   itemsEpics.getAllItemEpic,
   itemsEpics.getItemByIdEpic,
   itemsEpics.deleteItemByIdEpic,











   //USER EPICS
   userEpics.getAllUserOfProjectEpic,
   userEpics.addUserToProjectEpic,
   userEpics.getAllUserEpic,
   userEpics.deleteUserOfProjectEpic,
   userEpics.updatePasswordEpic,
   userEpics.updateProfileEpic,
   userEpics.getCurrentUserEpic,
   userEpics.verifyUserToProjectEpic,
   userEpics.updateAvatarEpic,
   userEpics.getAllMemberMantisEpic,
   userEpics.addMemberMantisEpic,
   userEpics.deleteMemberMantisEpic,
   userEpics.changeRoleMemberMantisEpic,


   //NOTIFICATION
   notificationEpics.getAllNotificationEpic,
   notificationEpics.addNewNotificationEpic,
   notificationEpics.updateNotificationEpic,

);