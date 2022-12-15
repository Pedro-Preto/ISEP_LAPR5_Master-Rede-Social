
bestfs1(Orig,Dest,MaximoLigacoes,Cam,Custo):-
asserta(caminho_somatorio([],0)),
bestfs12(Dest,[[Orig]],MaximoLigacoes,Cam,Custo),
    /*write('Caminho-'),write(Cam),nl,*/
    !.

bestfs12(Dest,[[Dest|T]|_],_,Cam,Custo):- reverse([Dest|T],Cam),
    calcula_custo(Cam,Custo).

bestfs12(Dest,[[Dest|_]|LLA2],MaximoLigacoes,Cam,Custo):- !, bestfs12(Dest,LLA2,MaximoLigacoes,Cam,Custo).

bestfs12(Dest,LLA,MaximoLigacoes,Cam,Custo):- member1(LA,LLA,LLA1), LA=[Act|_],
    ((Act==Dest,!,bestfs12(Dest,[LA|LLA1],MaximoLigacoes,Cam,Custo))
    ;
    (findall((CX,[X|LA]),(edge(Act,X,CX), \+member(X,LA)),Novos),
    Novos\==[],!,
    sort(0,@>=,Novos,NovosOrd),
    retira_custos(NovosOrd,NovosOrd1),
    append(NovosOrd1,LLA1,LLA2),
    /*write('============================================='),nl,
    write('LLA2='),write(LLA2),nl,*/
    retrack_paths(LLA2,MaximoLigacoes,LLA2V2),
   /*write('LLA2V2='),write(LLA2V2),nl,
    write('============================================='),nl,*/

    bestfs12(Dest,LLA2V2,MaximoLigacoes,Cam,Custo) )).

member1(LA,[LA|LAA],LAA).
member1(LA,[_|LAA],LAA1):-member1(LA,LAA,LAA1).

retira_custos([],[]).
retira_custos([(_,LA)|L],[LA|L1]):-retira_custos(L,L1).

calcula_custo([Act,X],C):-!,edge(Act,X,C). 
calcula_custo([Act,X|L],S):-calcula_custo([X|L],S1), edge(Act,X,C),S is S1+C.

edge(U1,U2,F):-
no(Id1,U1,_),
no(Id2,U2,_),
is_bidirectional2(Id1,Id2,F).					

retrack_paths([],_,[]).
retrack_paths([First|Next],MaximoLigacoes,Lnew):- 
        length(First,Size), S is Size-1, S > MaximoLigacoes,!,
        retrack_paths(Next,MaximoLigacoes,Lnew).
retrack_paths([First|Next],MaximoLigacoes,[First|Lnew]):- 
        retrack_paths(Next,MaximoLigacoes,Lnew).

is_bidirectional2(X,Y,Z):- (ligacao(X,Y,F1,F2,_,_),Z is F1+F2;ligacao(Y,X,F1,F2,_,_),Z is F1+F2),!.

