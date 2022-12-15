:-include('Projeto.pl').

/*
UserId -> Id do user inicial
Level -> Até que nível podem ser sugeridos os users
ListaDeUsersSugeridos -> Lista para registar os users que devem ser sugeridos
ListaDeTags -> Tags do user1
TagsUser2 -> Tags do user2
intersecao -> se a intersecao das duas listas tiver length maior que 0, siginifica que tem 1 elemento em comum pelo menos
*/
suggest_users(UserId, Level, ListaDeUsersSugeridos):-
	net_size_up_to_level(UserId, Level, Users), 
	remove_item_from_list(UserId,Users,ListaDeUsers), /*Remover o próprio utilizador da lista de elementos*/
	remove_users_with_direct_connection(UserId,ListaDeUsers, UsersNearby),!, /**/
	no(UserId,_,ListaDeTags),suggest_users_2(UsersNearby,ListaDeTags,ListaDeUsersSugeridos),!.

suggest_users_2([],_,[]). /*Se a lista de users a comparar estiver vazia*/
suggest_users_2([UserAtual|UsersNearby], ListaDeTags, ListaDeUsersSugeridos):-
	no(UserAtual,_,TagsUser2), intersecao(TagsUser2,ListaDeTags, X), length(X, Size),
	Size < 1, suggest_users_2(UsersNearby,ListaDeTags,ListaDeUsersSugeridos).
suggest_users_2([UserAtual|UsersNearby],ListaDeTags,[UserAtual|ListaDeUsersSugeridos]):-
	suggest_users_2(UsersNearby,ListaDeTags,ListaDeUsersSugeridos).
	
intersecao([],_,[]).
intersecao([X|L],L1,[X|LI]):-member(X,L1),!,intersecao(L,L1,LI).
intersecao([X|L],L1,LI):-intersecao(L,L1,LI).

remove_item_from_list(_,[],[]).
remove_item_from_list(Id,[Id|Users],List):-
    remove_item_from_list(Id,Users,List).
remove_item_from_list(Id,[User|Users],[User|List]):-
    remove_item_from_list(Id,Users,List).

remove_users_with_direct_connection(_,[],[]).
remove_users_with_direct_connection(UserId,[HeadL1|TailL1],Lista2):-
	is_connected(UserId,HeadL1), remove_users_with_direct_connection(UserId,TailL1,Lista2).
remove_users_with_direct_connection(UserId,[HeadL1|TailL1],[HeadL1 |Lista2]):-
	remove_users_with_direct_connection(UserId,TailL1,Lista2).

is_connected(X,Y):- ligacao(X,Y,_,_); ligacao(Y,X,_,_).

net_size_up_to_level(UserId, Level, List):-
		findall(Path, dfscl(UserId, Dest, Path, Level), AllPaths),
		flatten(AllPaths, Aux),
		sort(Aux, List).

flatten([],[]).
flatten([[H|T]|L], LF):- !, append([H|T],L,L1), flatten(L1,LF).
flatten([X|L],[X|LF]):- flatten(L,LF).

dfscl(Orig, Dest, Cam, N):-
    dfscl2(Orig, Dest, [Orig], Cam, N).

dfscl2(Dest,Dest,LA,Cam, _):-
    reverse(LA,Cam).

dfscl2(Act, Dest, LA, Cam, N):-
    N > 0, is_connected(Act, X), \+ member(X, LA), N1 is N - 1, dfscl2(X, Dest, [X|LA], Cam, N1).
		/**/