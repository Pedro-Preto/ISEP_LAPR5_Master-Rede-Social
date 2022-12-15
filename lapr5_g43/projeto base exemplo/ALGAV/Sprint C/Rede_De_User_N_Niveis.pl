:-include('Base_SprintB.pl').
:-include('directory.pl').

/* O(n) */
is_connected(X,Y):- ligacao(X,Y,_,_,_,_); ligacao(Y,X,_,_,_,_). /* Verifica se dois users estão conectados,
sendo que as ligações são unidirecionais na base de conhecimento*/

/* O(log^2(n)), presumindo que o append é O(log(n)) */
flatten([],[]).
flatten([[H|T]|L], LF):- !, append([H|T],L,L1), flatten(L1,LF). /* Concatena todas as listas de uma lista em uma só lista */
flatten([X|L],[X|LF]):- flatten(L,LF).

/* O(n * log^2(n)) */
net_size_up_to_level(UserName, Level):- /* Este predicado existe para facilitar a interação com o utilizador */
		no(UserId,UserName,_),
		nb_setval(rede,[]),
		net_size_up_to_level_aux(UserId, Level, _AllInNet),
		nb_getval(rede, R),
		sort(R, AuxR),
		length(AuxR, AuxRLength),
		write("Rede: "), write(AuxR), nl,
		write("Numero de Connections: "), write(AuxRLength),nl,
		getWorkingDirectory(Dir),write(Dir),nl,
		concat(Dir, 'netOfUserUpToLevelBC.pl', FileName),

		open(FileName, write, File),
		write_to_file(AuxR, File),
		close(File), !.


write_to_file([],_):-!.
write_to_file([[U1,U2|_R]|LConnections], File):-
		ligacao(U1, U2, A, B, C, D), !,
		write("ligacao("),write(U1),write(","),write(U2),write(","),write(A),write(","),write(B),write(","),write(C),write(","),write(D),write(")"),nl,
    write_term(File, ligacao(U1, U2, A, B, C, D),[fullstop(true),nl(true),quoted(true)]),
    write_to_file(LConnections, File).

write_to_file([[U1,U2|_R]|LConnections], File):-
		ligacao(U2, U1, A, B, C, D),nl,
    write_term(File, ligacao(U1, U2, A, B, C, D),[fullstop(true),nl(true),quoted(true)]),
    write_to_file(LConnections, File).

/* considerando que o findall é O(n), o sort, O(log^2(n)), e o length, O(n),
como o flatten é O(log^2(n)) e o dfscl é O(n * log^2(n)),
o net_size_up_to_level_aux é O(n * log^2(n)) */
net_size_up_to_level_aux(UserId, Level, AllInNet):-
		findall(Path, dfscl(UserId, _Dest, Path, Level), AllPaths),  /* Encontra todos os caminhos
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
    N > 0, is_connected(Act, X), \+ member(X, LA), N1 is N - 1,
		nb_getval(rede, Rede),
		NovaRede = [[Act,X]|Rede],
		nb_setval(rede, NovaRede),
    % write('Connection: '), write(Act), write(', '), write(X), nl,
    dfscl2(X, Dest, [X|LA], Cam, N1).
