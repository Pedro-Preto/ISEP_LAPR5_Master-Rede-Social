:-include('netOfUserUpToLevelBC.pl').
:-include('usersBC.pl').
:-include('Funcao_Multicriterio.pl').

%perguntar a stora como ir buscar o ultimo da lista, nao o primeiro
aStar(Orig,Dest,MaximoLigacoes,Cam,Custo):-
  aStar2(Dest,[(_,0,[Orig])],MaximoLigacoes,Cam, Custo).

aStar2(Dest,[(_,Custo,[Dest|T])|_],_MaximoLigacoes,Cam,Custo):-
  reverse([Dest|T],Cam).

aStar2(Dest,[(_,Ca,LA)|Outros],MaximoLigacoes,Cam,Custo):-
  LA=[Act|_],
  findall((CEX,CaX,[X|LA]),
    (Dest\==Act,edge(Act,X,CustoX),\+ member(X,LA),
    CaX is CustoX + Ca, estimativa(Act,X,EstX),
    CEX is CaX + EstX),Novos),
  append(Outros,Novos,Todos),
  %write("New="),write(Novos),nl,nl,
  sort(Todos,AllSorted),
  retrack_paths(AllSorted,MaximoLigacoes,AllSortedMaxLig),
  %write("AllSorted="),write(AllSortedMaxLig),nl,nl,
  aStar2(Dest,AllSortedMaxLig,MaximoLigacoes,Cam,Custo).

estimativa(Nodo1,Nodo2,Estimativa):-
  no(Id1,Nodo1,_),
  no(Id2,Nodo2,_),
  ligacao(Id1, Id2, A, B, _, _), !,
  Estimativa is A + B.

estimativa(Nodo1,Nodo2,Estimativa):-
  no(Id1,Nodo1,_),
  no(Id2,Nodo2,_),
  ligacao(Id2, Id1, _, _, C, D),
  Estimativa is C + D.

reverseList(X,Y):- reverseList(X,Y,[]).
reverseList([],Z,Z).
reverseList([H|T],Z,Acc) :- reverseList(T,Z,[H|Acc]).

edge(U1,U2,F):-
  no(Id1,U1,_),
  no(Id2,U2,_),
  is_bidirectional(Id1,Id2,F).

/*is_bidirectional(X,Y,Z):- (ligacao(X,Y,F1,F2,_,_),Z is F1+F2;ligacao(Y,X,_,_,F1,F2),Z is F1+F2).*/
is_bidirectional(X,Y,Z):- ligacao(X,Y,FL,FR,_,_), funcao_multicriterio(FL,FR,Res), Z is Res.

retrack_paths([],_,[]).
retrack_paths([(_,_,First)|Next],MaximoLigacoes,Lnew):-
        length(First,Size), S is Size-1, S > MaximoLigacoes, !,
        retrack_paths(Next,MaximoLigacoes,Lnew).
retrack_paths([(X,Y,First)|Next],MaximoLigacoes,[(X,Y,First)|Lnew]):-
        retrack_paths(Next,MaximoLigacoes,Lnew).
