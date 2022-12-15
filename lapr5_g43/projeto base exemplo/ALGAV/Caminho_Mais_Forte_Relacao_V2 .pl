/*:-consult('Projeto_2_V2.pl').*/


:-dynamic caminho_somatorio_plus/2. /*variavel dinamica com 2 argumentos*/



caminho_mais_forte_plus(Orig,Dest,A,B):-
		asserta(caminho_somatorio_plus([],0)),		/*inicializa a 0 o segundo parametro que representa o somatorio do caminho*/
		(verifica_caminho_plus(Orig,Dest);true),
		caminho_somatorio_plus(A,B).		/*vai buscar os dados finais da variavel para os imprimir*/
		/*write("Caminho mais forte: "),write(A),write(" "),nl, write("Connection Strength: "),write(B),nl,!*/

verifica_caminho_plus(Orig,Dest):-			
	dfs(Orig,Dest,LCaminho),		/*chamada da funcao dfs que vai buscar os caminhos possiveis entre a origem e destino*/								
	verifica_forca_plus(LCaminho),		/*chamda de funcao*/
	fail.


verifica_forca_plus(LCaminho):-
	/*write('a verificar caminho '), write(LCaminho), nl,*/
	auxiliar_list(LCaminho,LResult),				/*Criar lista auxiliar para o caso de ser necessário atualizar a variavel global com o caminho e com o somatorio*/
	get_somatorio_plus(LCaminho,Somatorio),					/*chamada da funcao get_somatorio*/	
	caminho_somatorio_plus(_,S),
	Somatorio>S,									/*verifica se o somatorio do caminho guardado é maior do que o somatório do caminho em questão*/
	retract(caminho_somatorio_plus(_,_)),				/*caso o somatorio seja maior que o segundo argumento retiro o valor da variavel "caminho_somatorio"*/
	asserta(caminho_somatorio_plus(LResult,Somatorio)).				/*coloco o novo caminho com o respetivo somatorio*/



get_somatorio_plus([],0). 							/*verifica se esta vazio*/
get_somatorio_plus([_],0):-!. 						/*verifica se tem 1 elemento, seja ele qual for*/
get_somatorio_plus([A,B|LCaminho],Somatorio):-																						
	no(Id1,A,_),								/*tirar o id apartir do nome*/			
	no(Id2,B,_),								/*tirar o id apartir do nome*/
	is_bidirectional_plus(Id1,Id2,F,R),						/*ir buscar a força*/	
	get_somatorio_plus([B|LCaminho], Somatorio2), 			/*devolve B ao caminho*/ 
	Somatorio is Somatorio2 + F + R.						/*atualizar a variavel Total*/	

/*METODOS AUXILIARES*/

is_bidirectional_plus(X,Y,Z,R):- ligacao(X,Y,Z,_,R,_); ligacao(Y,X,_,Z,_,R).	/*predicado para verificar se é bidirecional*/

