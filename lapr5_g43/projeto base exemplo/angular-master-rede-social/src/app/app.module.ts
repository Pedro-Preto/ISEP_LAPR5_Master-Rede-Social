import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomePageComponent } from './home-page/home-page.component';
import { FormsModule } from "@angular/forms";
import { UserDetailsComponent } from './user-details/user-details.component';
import { EditProfilePageComponent } from './edit-profile-page/edit-profile-page.component';
import { RegisterUserPageComponent } from './register-user-page/register-user-page.component';
import { ChangeEmotionalStatePageComponent } from './change-emotional-state-page/change-emotional-state-page.component';
import { DisplayUserPendingConnectionsPageComponent } from './display-user-pending-connections-page/display-user-pending-connections-page.component';
import { ConnectionRequestComponent } from './connection-request/connection-request.component';
import { GamePageComponent } from './game-page/game-page.component';
import { PlayerComponent } from './player/player.component';
import { ThreeGraphComponent } from './three-graph/three-graph.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SuggestToRegisteredPageComponent } from './suggest-to-registered-page/suggest-to-registered-page.component';
import { MakeIntroductionRequestPageComponent } from './make-introduction-request-page/make-introduction-request-page.component';
import { ViewNetUpToLevelComponent } from './view-net-up-to-level/view-net-up-to-level.component';
import { ManageIntroductionRequestComponent } from './manage-introduction-requests-page/manage-introduction-requests-page.component';
import { SearchUsersPageComponent} from "./search-users-page/search-users-page.component";
import { AcceptConnectionRequestsPageComponent } from './accept-connection-requests-page/accept-connection-requests-page.component';
import { DenyConnectionRequestsPageComponent } from './deny-connection-requests-page/deny-connection-requests-page.component';
import { EditConnectionPageComponent } from './edit-connection-page/edit-connection-page.component';
import { IntroductionRequestsComponent } from './introduction-requests/introduction-requests.component';
import { AcceptIntroductionRequestPageComponent } from './accept-introduction-request-page/accept-introduction-request-page.component';
import { DenyIntroductionRequestPageComponent } from './deny-introduction-request-page/deny-introduction-request-page.component';
import { PostsPageComponent } from './posts-page/posts-page.component';
import { MakePostPageComponent } from './make-post-page/make-post-page.component';
import { MakeCommentPageComponent } from './make-comment-page/make-comment-page.component';
import { FriendsPostsPageComponent } from './friends-posts-page/friends-posts-page.component';
import { TagCloudManagePageComponent } from './tag-cloud-manage-page/tag-cloud-manage-page.component';
import { TagCloudUserPageComponent } from './tag-cloud-user-page/tag-cloud-user-page.component';
import { TagCloudAllUsersPageComponent } from './tag-cloud-all-users-page/tag-cloud-all-users-page.component';
import { TagCloudAllConnectionsPageComponent } from './tag-cloud-all-connections-page/tag-cloud-all-connections-page.component';
import { TagCloudUserConnectionsPageComponent } from './tag-cloud-user-connections-page/tag-cloud-user-connections-page.component';
import { LeaderBoardPageComponent } from './leader-board-page/leader-board-page.component';
import { ConnectionRelationStrengthPageComponent } from './connection-relation-strength-page/connection-relation-strength-page.component';
import { SearchUsersFriendsPageComponent } from './search-users-friends-page/search-users-friends-page.component';
import { SuggestUsersPageComponent } from './suggest-users-page/suggest-users-page.component';
import { TagCloudModule } from 'angular-tag-cloud-module';
import { DeleteUserAccountPageComponent } from './delete-user-account-page/delete-user-account-page.component';
import { SuggestGroupPageComponent } from './suggest-group-page/suggest-group-page.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserProfileComponent,
    HomePageComponent,
    UserDetailsComponent,
    EditProfilePageComponent,
    RegisterUserPageComponent,
    ChangeEmotionalStatePageComponent,
    DisplayUserPendingConnectionsPageComponent,
    ConnectionRequestComponent,
    GamePageComponent,
    PlayerComponent,
    ThreeGraphComponent,
    LoginPageComponent,
    SuggestToRegisteredPageComponent,
    MakeIntroductionRequestPageComponent,
    ViewNetUpToLevelComponent,
    ManageIntroductionRequestComponent,
    SearchUsersPageComponent,
    AcceptConnectionRequestsPageComponent,
    DenyConnectionRequestsPageComponent,
    EditConnectionPageComponent,
    IntroductionRequestsComponent,
    AcceptIntroductionRequestPageComponent,
    DenyIntroductionRequestPageComponent,
    PostsPageComponent,
    MakePostPageComponent,
    MakeCommentPageComponent,
    FriendsPostsPageComponent,
    TagCloudManagePageComponent,
    TagCloudUserPageComponent,
    TagCloudAllUsersPageComponent,
    TagCloudAllConnectionsPageComponent,
    TagCloudUserConnectionsPageComponent,
    LeaderBoardPageComponent,
    ConnectionRelationStrengthPageComponent,
    SearchUsersFriendsPageComponent,
    SuggestUsersPageComponent,
    DeleteUserAccountPageComponent,
    SuggestGroupPageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TagCloudModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
