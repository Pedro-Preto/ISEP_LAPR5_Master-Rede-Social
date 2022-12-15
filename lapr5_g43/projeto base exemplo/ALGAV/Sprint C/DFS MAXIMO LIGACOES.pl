:-include('Base_SprintB.pl').

dfs(Orig,Dest,MaxLig,Cam):-dfs2(Orig,Dest,[Orig],MaxLig,Cam).

dfs2(Dest,Dest,LA,MaxLig,Cam):-!,length(LA,Size),S is Size-1,MaxLig>=S,reverse(LA,Cam).
dfs2(Act,Dest,LA,MaxLig,Cam):-no(NAct,Act,_),ligacao(NAct,NX,_,_,_,_),
    no(NX,X,_),\+ member(X,LA),dfs2(X,Dest,[X|LA],MaxLig,Cam).