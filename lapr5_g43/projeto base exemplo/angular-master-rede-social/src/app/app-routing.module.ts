import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomePageComponent } from './home-page/home-page.component';
import { EditProfilePageComponent } from "./edit-profile-page/edit-profile-page.component";
import { ChangeEmotionalStatePageComponent } from "./change-emotional-state-page/change-emotional-state-page.component";
import { RegisterUserPageComponent } from "./register-user-page/register-user-page.component";
import { DisplayUserPendingConnectionsPageComponent } from "./display-user-pending-connections-page/display-user-pending-connections-page.component";
import { GamePageComponent } from "./game-page/game-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { SuggestToRegisteredPageComponent } from "./suggest-to-registered-page/suggest-to-registered-page.component";
import { MakeIntroductionRequestPageComponent } from "./make-introduction-request-page/make-introduction-request-page.component";
import { ManageIntroductionRequestComponent } from "./manage-introduction-requests-page/manage-introduction-requests-page.component";
import { ViewNetUpToLevelComponent } from "./view-net-up-to-level/view-net-up-to-level.component";
import { SearchUsersPageComponent} from "./search-users-page/search-users-page.component";
import { AcceptConnectionRequestsPageComponent} from "./accept-connection-requests-page/accept-connection-requests-page.component";
import { DenyConnectionRequestsPageComponent} from "./deny-connection-requests-page/deny-connection-requests-page.component";
import { EditConnectionPageComponent } from './edit-connection-page/edit-connection-page.component';
import {DenyIntroductionRequestPageComponent} from "./deny-introduction-request-page/deny-introduction-request-page.component";
import {AcceptIntroductionRequestPageComponent} from "./accept-introduction-request-page/accept-introduction-request-page.component";
import {MakePostPageComponent} from "./make-post-page/make-post-page.component";
import {MakeCommentPageComponent} from "./make-comment-page/make-comment-page.component";
import {TagCloudManagePageComponent} from "./tag-cloud-manage-page/tag-cloud-manage-page.component";
import {TagCloudAllConnectionsPageComponent} from "./tag-cloud-all-connections-page/tag-cloud-all-connections-page.component";
import {TagCloudAllUsersPageComponent} from "./tag-cloud-all-users-page/tag-cloud-all-users-page.component";
import {TagCloudUserConnectionsPageComponent} from "./tag-cloud-user-connections-page/tag-cloud-user-connections-page.component";
import {TagCloudUserPageComponent} from "./tag-cloud-user-page/tag-cloud-user-page.component";
import {LeaderBoardPageComponent} from "./leader-board-page/leader-board-page.component";
import {ConnectionRelationStrengthPageComponent} from "./connection-relation-strength-page/connection-relation-strength-page.component";
import {SearchUsersFriendsPageComponent} from "./search-users-friends-page/search-users-friends-page.component";
import {SuggestUsersPageComponent} from "./suggest-users-page/suggest-users-page.component";
import {DeleteUserAccountPageComponent} from "./delete-user-account-page/delete-user-account-page.component";
import {SuggestGroupPageComponent} from "./suggest-group-page/suggest-group-page.component";

const routes: Routes = [
  { path: '', redirectTo: '/login-page', pathMatch: 'full' },
  { path: 'profile-page', component: UserProfileComponent },
  { path: 'home-page', component: HomePageComponent },
  { path: 'edit-profile-page', component: EditProfilePageComponent },
  { path: 'change-emotional-state-page', component: ChangeEmotionalStatePageComponent },
  { path: 'register-user-page', component: RegisterUserPageComponent },
  { path: 'display-user-pending-connections-page', component: DisplayUserPendingConnectionsPageComponent },
  { path: 'game-page', component: GamePageComponent },
  { path: 'login-page', component:LoginPageComponent },
  { path: 'suggest-page', component:SuggestToRegisteredPageComponent },
  { path: 'make-introduction-request-page',component:MakeIntroductionRequestPageComponent},
  { path: 'manage-introduction-requests-page',component:ManageIntroductionRequestComponent},
  { path: 'view-net-up-to-level-page', component:ViewNetUpToLevelComponent},
  { path: 'search-users-page', component:SearchUsersPageComponent},
  { path: 'make-introduction-request-page', component:MakeIntroductionRequestPageComponent},
  { path: 'view-net-up-to-level-page', component:ViewNetUpToLevelComponent},
  { path: 'accept-connection-requests-page',component:AcceptConnectionRequestsPageComponent},
  { path: 'deny-connection-requests-page',component:DenyConnectionRequestsPageComponent},
  { path: 'manage-introduction-requests-page',component:MakeIntroductionRequestPageComponent},
  { path: 'edit-connection-page', component:EditConnectionPageComponent},
  {path:  'deny-introduction-request-page',component:DenyIntroductionRequestPageComponent},
  {path:  'accept-introduction-request-page',component:AcceptIntroductionRequestPageComponent},
  {path:  'make-post-page',component:MakePostPageComponent},
  {path:  'make-comment-page',component:MakeCommentPageComponent},
  {path:  'tag-cloud-manage-page',component:TagCloudManagePageComponent},
  {path:  'tag-cloud-all-connections-page',component:TagCloudAllConnectionsPageComponent},
  {path:  'tag-cloud-all-users-page',component:TagCloudAllUsersPageComponent},
  {path:  'tag-cloud-user-connections-page',component:TagCloudUserConnectionsPageComponent},
  {path:  'tag-cloud-user-page',component:TagCloudUserPageComponent},
  {path:  'leader-board-page',component:LeaderBoardPageComponent },
  {path:  'connection-relation-strength-page',component:ConnectionRelationStrengthPageComponent},
  {path:  'search-users-friends-page',component:SearchUsersFriendsPageComponent},
  {path:  'suggest-users-page',component:SuggestUsersPageComponent},
  {path:  'delete-user-account-page',component:DeleteUserAccountPageComponent},
  {path:  'suggest-group-page',component:SuggestGroupPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
