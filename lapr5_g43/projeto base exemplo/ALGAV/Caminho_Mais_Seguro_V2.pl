
:-dynamic caminho_seguro/2. 



caminho_mais_seguro(Orig,Dest,A,B,MinForca):-
		asserta(caminho_seguro([],0)),		
		(verifica_caminho_seguro(Orig,Dest,MinForca);true),
		caminho_seguro(A,B),!.		
verifica_caminho_seguro(Orig,Dest,MinForca):-			
	dfs(Orig,Dest,LCaminho),
	auxiliar_list(LCaminho,LResult),				
	valida_seguranca(LCaminho,MinForca),		
	atualiza_seguranca(LResult),	
	fail.


atualiza_seguranca(LCaminho):-
	auxiliar_list(LCaminho,LResult),	
	get_somatorio(LCaminho,Somatorio),				
    caminho_seguro(_,S),
	Somatorio>S,									
	retract(caminho_seguro(_,_)),			
	asserta(caminho_seguro(LResult,Somatorio)).				

%valida_seguranca([],_).
valida_seguranca([_],_).
valida_seguranca([H|[H2|T]],SEC):- no(NH,H,_),no(NH2,H2,_), 
	(ligacao(NH,NH2,FL1,FL2,_,_);ligacao(NH2,NH,FL2,FL1,_,_)),
	FL1 >= SEC, FL2 >= SEC, 
	valida_seguranca(T,SEC).
