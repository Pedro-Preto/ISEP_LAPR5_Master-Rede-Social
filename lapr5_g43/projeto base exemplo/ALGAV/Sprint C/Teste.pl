:-include('BC_teste.pl').
:-include('Funcao_Multicriterio.pl').
:-include('A_Star.pl').

/* DFS CODE */
dfs(Orig,Dest,MaxLig,Cam):-dfs2(Orig,Dest,[Orig],MaxLig,Cam).

dfs2(Dest,Dest,LA,MaxLig,Cam):-!,length(LA,Size),S is Size-1,MaxLig>=S,reverse(LA,Cam).
dfs2(Act,Dest,LA,MaxLig,Cam):-no(NAct,Act,_),ligacao(NAct,NX,_,_,_,_),
    no(NX,X,_),\+ member(X,LA),dfs2(X,Dest,[X|LA],MaxLig,Cam).

/* BEST FIRST */
bestfs1(Orig,Dest,MaximoLigacoes,Cam,Custo):-
asserta(caminho_somatorio([],0)),
bestfs12(Dest,[[Orig]],MaximoLigacoes,Cam,Custo),!.

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
    retrack_paths2(LLA2,MaximoLigacoes,LLA2V2),

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
is_bidirectional(Id1,Id2,F).					

retrack_paths2([],_,[]).
retrack_paths2([First|Next],MaximoLigacoes,Lnew):- 
        length(First,Size), S is Size-1, S > MaximoLigacoes,!,
        retrack_paths2(Next,MaximoLigacoes,Lnew).
retrack_paths2([First|Next],MaximoLigacoes,[First|Lnew]):- 
        retrack_paths2(Next,MaximoLigacoes,Lnew).

is_bidirectional(X,Y,Z):- ligacao(X,Y,FL,FR,_,_), funcao_multicriterio(FL,FR,Res), Z is Res.


/* A STAR*/


/* CHAMADA DOS TESTES */
run_test_dfs(Inicio,Destino,Ligacoes):-
  get_time(Ti),
	dfs(Inicio,Destino,Ligacoes,X),
	write(X),nl,
	get_time(Tf),
	T is Tf-Ti,
	float(T),
	write('Tempo de geracao da solucao:'),write(T),nl.


run_test_astar(Inicio,Destino,Ligacoes):-
  get_time(Ti),
	aStar(Inicio,Destino,Ligacoes,X,Y),
	write(X),nl,
	write('Custo = '), write(Y),nl,
	get_time(Tf),
	T is Tf-Ti,
	float(T),
	write('Tempo de geracao da solucao:'),write(T),nl.

run_test_bfirst(Inicio,Destino,Ligacoes):-
  get_time(Ti),
	bestfs1(Inicio,Destino,Ligacoes,X,Y),
	write(X),nl,
	write('Custo = '), write(Y),nl,
	get_time(Tf),
	T is Tf-Ti,
	float(T),
	write('Tempo de geracao da solucao:'),write(T),nl.

run_test(Inicio,Destino,Ligacoes):-
	write('DFS'),nl,
	run_test_dfs(Inicio,Destino,Ligacoes),
	
	nl,write('BEST FIRST'),nl,
	run_test_bfirst(Inicio,Destino,Ligacoes),
	
	nl,write('ASTAR'),nl,!,
	run_test_astar(Inicio,Destino,Ligacoes).
	
	


	