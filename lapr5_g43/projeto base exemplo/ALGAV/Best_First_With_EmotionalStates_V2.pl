:-consult('usersBC_V2.pl').


bestfs13(Orig,Dest,MaximoLigacoes,Cam,Custo):-
asserta(caminho_somatorio([],0)),
bestfs123(Dest,[[Orig]],MaximoLigacoes,Cam,Custo),
  /*  write('Caminho-'),write(Cam),nl,*/
  !.

bestfs123(Dest,[[Dest|T]|_],_,Cam,Custo):- reverse([Dest|T],Cam),
    calcula_custo3(Cam,Custo).

bestfs123(Dest,[[Dest|_]|LLA2],MaximoLigacoes,Cam,Custo):- !, bestfs123(Dest,LLA2,MaximoLigacoes,Cam,Custo).

bestfs123(Dest,LLA,MaximoLigacoes,Cam,Custo):- member12(LA,LLA,LLA1), LA=[Act|_],
    ((Act==Dest,!,bestfs123(Dest,[LA|LLA1],MaximoLigacoes,Cam,Custo))
    ;
    (findall((CX,[X|LA]),(edge1(Act,X,CX), \+member(X,LA)),Novos),
    Novos\==[],!,
    sort(0,@>=,Novos,NovosOrd),
    retira_custos2(NovosOrd,NovosOrd1),
    append(NovosOrd1,LLA1,LLA2),
  /*  write('============================================='),nl,
    write('LLA2='),write(LLA2),nl,*/
    retrack_paths_with_max_connections(LLA2,MaximoLigacoes,LLA2V2),
   /* write('LLA2V2='),write(LLA2V2),nl,*/
    retrack_paths_with_unallowed_emotional_state(LLA2V2,LLA2V3),
   /* write('LLA2V3='),write(LLA2V3),nl,
    write('============================================='),nl,*/

    bestfs123(Dest,LLA2V3,MaximoLigacoes,Cam,Custo) )).

member12(LA,[LA|LAA],LAA).
member12(LA,[_|LAA],LAA1):-member12(LA,LAA,LAA1).

retira_custos2([],[]).
retira_custos2([(_,LA)|L],[LA|L1]):-retira_custos2(L,L1).

calcula_custo3([Act,X],C):-!,edge1(Act,X,C). 
calcula_custo3([Act,X|L],S):-calcula_custo3([X|L],S1), edge1(Act,X,C),S is S1+C.

edge1(U1,U2,F):-
noV2(Id1,U1,_,_,_,_,_,_),
noV2(Id2,U2,_,_,_,_,_,_),
is_bidirectional3(Id1,Id2,F).					

retrack_paths_with_max_connections([],_,[]).
retrack_paths_with_max_connections([First|Next],MaximoLigacoes,Lnew):- 
        length(First,Size), S is Size-1, S > MaximoLigacoes,!,
        retrack_paths_with_max_connections(Next,MaximoLigacoes,Lnew).
retrack_paths_with_max_connections([First|Next],MaximoLigacoes,[First|Lnew]):- 
        retrack_paths_with_max_connections(Next,MaximoLigacoes,Lnew).


retrack_paths_with_unallowed_emotional_state([],[]).
retrack_paths_with_unallowed_emotional_state([Head|Tail],[Head|Lnew]):- 
      check_emotional_state(Head),!,
      retrack_paths_with_unallowed_emotional_state(Tail,Lnew).
retrack_paths_with_unallowed_emotional_state([_|Tail],Lnew):- 
        retrack_paths_with_unallowed_emotional_state(Tail,Lnew).


check_emotional_state([]).
check_emotional_state([Head|Tail]):-
noV2(_,Head,_,J,H,R,P,G),/*write(J),nl,*/J>=0.5,/*write(H),nl,*/H>=0.5,/*write(R),nl,*/R>=0.5,/*write(P),nl,*/P>=0.5,/*write(G),nl,*/G>=0.5,/*write(Tail),nl,*/
check_emotional_state(Tail).


is_bidirectional3(X,Y,Z):- (ligacao(X,Y,F1,F2,_,_),Z is F1+F2;ligacao(Y,X,F1,F2,_,_),Z is F1+F2),!.
