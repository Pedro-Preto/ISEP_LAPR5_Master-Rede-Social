:-include('Projeto_2.pl').

:-dynamic caminho_seguro/2. /*variavel dinamica com 2 argumentos*/


dfs(Orig,Dest,Cam):-dfs2(Orig,Dest,[Orig],Cam).

dfs2(Dest,Dest,LA,Cam):-!,reverse(LA,Cam).
dfs2(Act,Dest,LA,Cam):-no(NAct,Act,_),(ligacao(NAct,NX,_,_);ligacao(NX,NAct,_,_)),
    no(NX,X,_),\+ member(X,LA),dfs2(X,Dest,[X|LA],Cam).

caminho_mais_seguro(Orig,Dest,A,B,Xval):-
		asserta(caminho_seguro([],0)),		/*inicializa a 0 o segundo parametro que representa o somatorio do caminho*/
		(verifica_caminho(Orig,Dest,Xval);true),
		caminho_seguro(A,B),	nl,				/*vai buscar os dados finais da variavel para os imprimir*/
		write("Caminho mais forte: "),write(A),write(" "),nl, write("Connection Strength: "),write(B),nl,!.

verifica_caminho(Orig,Dest,Xval):-			
	dfs(Orig,Dest,LCaminho),				/*chamada da funcao dfs que vai buscar os caminhos possiveis entre a origem e destino*/							
	verifica_seguranca(LCaminho,Xval),		/*chamada de funcao*/
	fail.


verifica_seguranca(LCaminho,Xval):-nl,
	write('a verificar caminho '), write(LCaminho),
	auxiliar_list(LCaminho,LResult),				/*Criar lista auxiliar para o caso de ser necessário atualizar a variavel global com o caminho e com o somatorio*/
	get_somatorio(LCaminho,Somatorio,Xval),			/*chamada da funcao get_somatorio*/	
	nl,write("SOMATORIO:"),write(Somatorio),nl,write(var(Somatorio)),nl,
	(var(Somatorio)==false,							/*caso a variavel esteja inicializada prossegue caso contrário passa para o caminho seguinte */
	write(Somatorio),write(" > "),write(S),nl,
	caminho_seguro(_,S),
	Somatorio>S,									/*verifica se o somatorio do caminho guardado é maior do que o somatório do caminho em questão*/
	retract(caminho_seguro(_,_)),					/*caso o somatorio seja maior que o segundo argumento retiro o valor da variavel "caminho_somatorio"*/
	asserta(caminho_seguro(LResult,Somatorio))).				/*coloco o novo caminho com o respetivo somatorio*/



get_somatorio([],0,_). 							/*verifica se esta vazio*/
get_somatorio([_],0,_):-!. 						/*verifica se tem 1 elemento, seja ele qual for*/
get_somatorio([A,B|LCaminho],Somatorio,Xval):-																						
	no(Id1,A,_),								/*tirar o id apartir do nome*/			
	no(Id2,B,_),								/*tirar o id apartir do nome*/
	is_bidirectional(Id1,Id2,F),nl,write("Forca: "),write(F),nl,
	(Xval>F->write("SOU INFERIOR"),get_somatorio([],0,Xval);write("SOU SUPERIOR"),get_somatorio([B|LCaminho],Somatorio2,Xval),Somatorio is Somatorio2 + F).	/*se a força for inferior à escolhida 
																																							por parametro devolve a variavel somatorio por inicializar
																																							caso contrário devolve o somatorio do caminho*/	

/*METODOS AUXILIARES*/

is_bidirectional(X,Y,Z):- ligacao(X,Y,Z,_); ligacao(Y,X,_,Z).	/*predicado para verificar se é bidirecional*/

auxiliar_list(LCaminho,LResult) :- cp(LCaminho,LResult).		/*predicado para criar a lista auxiliar*/
cp([],[]).
cp([H|T1],[H|T2]) :- cp(T1,T2).