funcao_multicriterio(FL,FR,Res):-
                            verifica_limites(FR,NFR), 
                            calcula_peso_forca_ligacao(FL,VAR1), 
                            calcula_peso_forca_relacao(NFR,VAR2), Res is (VAR1 + VAR2).


/* Verificar se a relação entre likes e dislikes é superior a 200 ou inferior a -200 e 
atribuir os valores maximos caso aconteca */

verifica_limites(FR, NFR):- (FR < -200) -> NFR is -200; (FR > 200) -> NFR is 200; NFR is FR.

/* Calcular o peso da força de ligação -> 50% do valor da força de ligação */

calcula_peso_forca_ligacao(FL, VAR1):- VAR1 is (0.5 * FL). 

/* Calcular o peso da força de relação -> 50% de (FR+100)/4 */

calcula_peso_forca_relacao(FR, VAR2):- VAR2 is (((FR+200)/4)*0.5).