:- include('Base_SprintD2').
:- consult('usersBC').

:- use_module(library(lists)).

:- dynamic no/9.

% Joy -> Like/Dislike ratio
% Hope -> Suggested friends in groups
% Relief -> Friends in groups
% Pride -> Tags same as friends'
% Gratitude -> Tags same as groups'

calculate_joy(UserId):-
  retract(no(UserId,A,B,InitialUserJoy,C,D,E,F,LikeDifference)),
  UserJoy is InitialUserJoy + (1 - InitialUserJoy) * (min(LikeDifference, 200) / 200),
  asserta(no(UserId,A,B,UserJoy,C,D,E,F,LikeDifference)),
  save(),
  write('User Joy changed from '), write(InitialUserJoy), write(' to '), write(UserJoy).

%calculate_hope(UserId):-

calculate_relief(UserId):-
  friend_list_of_user(UserId, MyFriends),
  users_in_groups_of_user(UserId, UsersInTheSameGroupsAsMe),
  flatten(UsersInTheSameGroupsAsMe, FlattenedUserList),
  sort(FlattenedUserList, PeopleInMyGroups),
  length(PeopleInMyGroups, PeopleInMyGroupsLength),
  intersection(MyFriends, PeopleInMyGroups, FriendsInMyGroups),
  length(FriendsInMyGroups, FriendsInMyGroupsLength),
  retract(no(UserId,A,B,C,D,InitialUserRelief,E,F,G)),
  % UserRelief is InitialUserRelief + (1 - InitialUserRelief) * (FriendsInMyGroupsLength / max(PeopleInMyGroupsLength, 1)),
  UserRelief is (FriendsInMyGroupsLength / max(PeopleInMyGroupsLength, 1)),
  asserta(no(UserId,A,B,C,D,UserRelief,E,F,G)),
  save(),
    write('User Relief changed from '), write(InitialUserRelief), write(' to '), write(UserRelief).

calculate_pride(UserId):-
	friend_list_of_user(UserId, FriendList),
  retract(no(UserId,A,UserTags,C,D,E,InitialPride,F,G)),
	tags_in_common(UserTags,FriendList,CommonTags,TotalTags),
	flatten(CommonTags,TagsComuns),flatten(TotalTags,TotalDeTags),
	length(TagsComuns,X),
	length(TotalDeTags,Y),
	% Pride is InitialPride + (1 - InitialPride) * (X/Y),
  Pride is (X/ max(Y, 1)),
  asserta(no(UserId,A,UserTags,C,D,E,Pride,F,G)),
  save(),
	  write('User Pride changed from '), write(InitialPride), write(' to '), write(Pride).

calculate_gratitude(UserId):-
	users_in_groups_of_user(UserId,UsersList),
	flatten(UsersList,GroupUsers),
	remove_item_from_list(UserId,GroupUsers,GroupUsersWithoutSelf),
  retract(no(UserId,A,UserTags,C,D,E,F,InitialGratitude,G)),
	tags_in_common(UserTags,GroupUsersWithoutSelf,CommonTags,TotalTags),
	flatten(CommonTags,TagsComuns),flatten(TotalTags,TotalDeTags),
	length(TagsComuns,X),
	length(TotalDeTags,Y),!,
	% Gratitude is InitialGratitude + (1 - InitialGratitude) * (X/Y),
  Gratitude is (X/ max(Y, 1)),
  asserta(no(UserId,A,UserTags,C,D,E,F,Gratitude,G)),
  save(),
	  write('User Gratitude changed from '), write(InitialGratitude), write(' to '), write(Gratitude).

% D I R E C T O R Y

  getWorkingDirectory('C:/Users/topel/Documents/lapr5_g43/projeto base exemplo/nunopsilva-dddnetcore-c2122b82f1b9/ALGAV/Sprint D/').

% S U P P O R T    M E T H O D S

remove_item_from_list(_,[],[]).
remove_item_from_list(Id,[Id|Users],List):-
    remove_item_from_list(Id,Users,List).
remove_item_from_list(Id,[User|Users],[User|List]):-
    remove_item_from_list(Id,Users,List).

friend_list_of_user(UserId, FriendList):-
  findall(FriendId, friend(UserId, FriendId), FriendList).

tags_in_common(_,[],[],[]):- !.
tags_in_common(UserTags,[HeadUser|FriendList],[ListaComum|CommonTags],[Tags|TotalTags]):-
	no(HeadUser,_,Tags,_,_,_,_,_,_),
	intersecao(UserTags,Tags,ListaComum),
	tags_in_common(UserTags,FriendList,CommonTags,TotalTags).

intersecao([],_,[]).
intersecao([X|L],L1,[X|LI]):- member(X,L1),!,intersecao(L,L1,LI).
intersecao([_X|L],L1,LI):-intersecao(L,L1,LI).

flatten([],[]).
flatten([[H|T]|L], LF):- !, append([H|T],L,L1), flatten(L1,LF).
flatten([X|L],[X|LF]):- flatten(L,LF).

users_in_groups_of_user(UserId, UserList):-
  findall(UsersOfGroup, grupo(UsersOfGroup,_), ListOfUsersOfGroups),
  concat_lists_user_is_in(UserId, ListOfUsersOfGroups, UserList).

concat_lists_user_is_in(_, [], []):- !.
concat_lists_user_is_in(UserId, [ActualList|ListOfLists], ListOfCommon):-
  (member(UserId, ActualList) ->
  concat_lists_user_is_in(UserId, ListOfLists, RestOfCommon), ListOfCommon = [ActualList|RestOfCommon];
  concat_lists_user_is_in(UserId, ListOfLists, ListOfCommon)).

friend(UserId, OtherId):-
  ligacao(UserId, OtherId, _, _, _, _);
  ligacao(OtherId, UserId, _, _, _, _).

% S A V E   K B

write_facts(FileName):-
  open(FileName,write,Out),
  forall(
  no(A,B,C,D,E,F,G,H,I),(
  write(Out,"no("),
  write(Out,A),write(Out,","),
  write(Out,B),write(Out,","),
  write(Out,C),write(Out,","),
  write(Out,D),write(Out,","),
  write(Out,E),write(Out,","),
  write(Out,F),write(Out,","),
  write(Out,G),write(Out,","),
  write(Out,H),write(Out,","),
  write(Out,I),write(Out,")"),
  writeln(Out,"."))),
  close(Out).

save():-
  getWorkingDirectory(Dir),
  concat(Dir, 'usersBC.pl', FilePath),
  write_facts(FilePath).
