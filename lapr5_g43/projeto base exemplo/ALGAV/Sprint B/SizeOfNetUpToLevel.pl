:-include('Projeto.pl').

/* O(n) */
is_connected(X,Y):- ligacao(X,Y,_,_); ligacao(Y,X,_,_). /* Verifica se dois users estão conectados,
sendo que as ligações são unidirecionais na base de conhecimento*/

/* O(log^2(n)), presumindo que o append é O(log(n)) */
flatten([],[]).
flatten([[H|T]|L], LF):- !, append([H|T],L,L1), flatten(L1,LF). /* Concatena todas as listas de uma lista em uma só lista */
flatten([X|L],[X|LF]):- flatten(L,LF).

/* O(n * log^2(n)) */
net_size_up_to_level(UserId, Level):- /* Este predicado existe para facilitar a interação com o utilizador */
		net_size_up_to_level_aux(UserId, Level, AllInNet).

/* considerando que o findall é O(n), o sort, O(log^2(n)), e o length, O(n),
como o flatten é O(log^2(n)) e o dfscl é O(n * log^2(n)),
o net_size_up_to_level_aux é O(n * log^2(n)) */
net_size_up_to_level_aux(UserId, Level, AllInNet):-
		findall(Path, dfscl(UserId, Dest, Path, Level), AllPaths),  /* Encontra todos os caminhos
		(uma lista de listas de utilizadores, cada caminho é uma lista de utilizadores) até um certo nivel de ligações */
		flatten(AllPaths, Aux), /* Transforma a lista de listas de utilizadores em uma única lista de utilizadores */
		sort(Aux, AllInNet), /* O sort é utilizado únicamente para remover os duplicados da lista */
		length(AllInNet, Size), /* Obtém o tamanho da lista de utilizadores, ou seja,
		o número de utilizadores na rede até ao nível escolhido */
		nl,write('All Users in Net Up to Level: '), write(AllInNet),nl, /* Escreve todos os utilizadores na rede até ao nível escolhido */
		write('Size of Net up to selected Level: '), write(Size),nl. /* Escreve o tamanho da rede até ao nível escolhido */

/* O(n * log^2(n)) */
dfscl(Orig, Dest, Cam, N):-
    dfscl2(Orig, Dest, [Orig], Cam, N).

/* O(n), presumindo que reverse é O(n) */
dfscl2(Dest,Dest,LA,Cam, _):-
    reverse(LA,Cam).

/* O(log^2(n)), presumindo que member é O(n) */
dfscl2(Act, Dest, LA, Cam, N):-
    N > 0, is_connected(Act, X), \+ member(X, LA), N1 is N - 1, dfscl2(X, Dest, [X|LA], Cam, N1).
