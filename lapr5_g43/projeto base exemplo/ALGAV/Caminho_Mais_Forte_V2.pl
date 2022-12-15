/*:-consult('Projeto_2_V2.pl').*/


:-dynamic caminho_somatorio/2. /*variavel dinamica com 2 argumentos*/



caminho_mais_forte(Orig,Dest,A,B):-
		asserta(caminho_somatorio([],0)),		/*inicializa a 0 o segundo parametro que representa o somatorio do caminho*/
		(verifica_caminho(Orig,Dest);true),
		caminho_somatorio(A,B),!.		/*vai buscar os dados finais da variavel para os imprimir*/
		/*write("Caminho mais forte: "),write(A),write(" "),nl, write("Connection Strength: "),write(B),nl,!*/

verifica_caminho(Orig,Dest):-			
	dfs(Orig,Dest,LCaminho),		/*chamada da funcao dfs que vai buscar os caminhos possiveis entre a origem e destino*/								
	verifica_forca(LCaminho),		/*chamda de funcao*/
	fail.


verifica_forca(LCaminho):-
	/*write('a verificar caminho '), write(LCaminho), nl,*/
	auxiliar_list(LCaminho,LResult),				/*Criar lista auxiliar para o caso de ser necessário atualizar a variavel global com o caminho e com o somatorio*/
	get_somatorio(LCaminho,Somatorio),					/*chamada da funcao get_somatorio*/	
	caminho_somatorio(_,S),
	Somatorio>S,									/*verifica se o somatorio do caminho guardado é maior do que o somatório do caminho em questão*/
	retract(caminho_somatorio(_,_)),				/*caso o somatorio seja maior que o segundo argumento retiro o valor da variavel "caminho_somatorio"*/
	asserta(caminho_somatorio(LResult,Somatorio)).				/*coloco o novo caminho com o respetivo somatorio*/



get_somatorio([],0). 							/*verifica se esta vazio*/
get_somatorio([_],0):-!. 						/*verifica se tem 1 elemento, seja ele qual for*/
get_somatorio([A,B|LCaminho],Somatorio):-																						
	no(Id1,A,_),								/*tirar o id apartir do nome*/			
	no(Id2,B,_),								/*tirar o id apartir do nome*/
	is_bidirectional(Id1,Id2,F),						/*ir buscar a força*/	
	get_somatorio([B|LCaminho], Somatorio2), 			/*devolve B ao caminho*/ 
	Somatorio is Somatorio2 + F.						/*atualizar a variavel Total*/	

/*METODOS AUXILIARES*/

is_bidirectional(X,Y,Z):- ligacao(X,Y,Z,_,_,_); ligacao(Y,X,_,Z,_,_).	/*predicado para verificar se é bidirecional*/

auxiliar_list(LCaminho,LResult) :- cp(LCaminho,LResult).		/*predicado para criar a lista auxiliar*/
cp([],[]).
cp([H|T1],[H|T2]) :- cp(T1,T2).