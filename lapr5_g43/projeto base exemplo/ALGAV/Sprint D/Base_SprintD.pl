% Base de Conhecimento
                            %joy, hope, relief, pride, gratitude
no(1,ana,[natureza,pintura,musica,sw,porto],0.5,0.7,0.8,0.9,1).
no(11,antonio,[natureza,pintura,carros,futebol,lisboa],0.2,0.3,0.4,0.5,0.1).
no(12,beatriz,[natureza,musica,carros,porto,moda],0.4,0.4,0.6,0.5,0.3).
no(13,carlos,[natureza,musica,sw,futebol,coimbra],0.1,0.2,0.3,0.1,0).
no(14,daniel,[natureza,cinema,jogos,sw,moda],0.8,0.8,0.8,0.6,0.8).
no(21,eduardo,[natureza,cinema,teatro,carros,coimbra],0.9,0.9,0.9,0.9,0.9).
no(22,isabel,[natureza,musica,porto,lisboa,cinema],0.8,0.8,0.8,0.8,0.8).
no(23,jose,[natureza,pintura,sw,musica,carros,lisboa],0.7,0.7,0.7,0.7,0.8).
no(24,luisa,[natureza,cinema,jogos,moda,porto],0.6,0.6,0.6,0.6,0.6).
no(31,maria,[natureza,pintura,musica,moda,porto],0.5,0.5,0.5,0.5,0.5).
no(32,anabela,[natureza,cinema,musica,tecnologia,porto],0.4,0.4,0.4,0.4,0.4).
no(33,andre,[natureza,carros,futebol,coimbra],0.3,0.3,0.3,0.3,0.3).
no(34,catia,[natureza,musica,cinema,lisboa,moda],0.2,0.2,0.2,0.2,0.2).
no(41,garcia,[natureza,teatro,tecnologia,futebol,porto,bolachas],0.5,0.5,0.5,0.5,0.5).
no(42,patricia,[natureza,futebol,sw,jogos,porto,bolachas],0.4,0.5,0.5,0.5,0.5).
no(43,fraga,[natureza,teatro,carros,porto,bolachas],0.5,0.5,0.5,0.5,0.5).
no(200,preto,[natureza,bolachas,moda,musica,sw,coimbra],0.5,0.5,0.5,0.5,0.5).
no(44,isaura,[natureza,moda,tecnologia,cinema],0.2,0.3,0.4,0.4,0.3).
no(51,rodolfo,[natureza,musica,sw],0.2,0.3,0.4,0.5,0.4).
no(61,rita,[moda,tecnologia,cinema],0.2,0.3,0.4,0.5,0.5).
no(600,rita,[musica,pintura,futebol],0.2,0.3,0.4,0.5,0.5).
no(601,rita,[musica,pintura,futebol,sw],0.2,0.3,0.4,0.5,0.5).

% ligacao(ID de A, ID de B, FLigacao A para B, FLigacao B para A, FRelacao A para B, FRelacao B para A)
ligacao(1,11,10,8,4,-1).
ligacao(1,12,2,6,2,8).
ligacao(1,13,-3,-2,1,-1).
ligacao(1,14,1,-5,8,7).
ligacao(11,21,5,7,3,2).
ligacao(11,22,2,-4,1,1).
ligacao(11,23,-2,8,7,6).
ligacao(11,24,6,0,2,-5).
ligacao(12,21,4,9,-4,-1).
ligacao(12,22,-3,-8,8,4).
ligacao(12,23,2,4,4,7).
ligacao(12,24,-2,4,2,7).
ligacao(13,21,3,2,3,2).
ligacao(13,22,0,-3,1,-6).
ligacao(13,23,5,9,4,-1).
ligacao(13,24,-2,4,-7,0).
ligacao(14,21,2,6,1,1).
ligacao(14,22,6,-3,9,-2).
ligacao(14,23,7,0,8,8).
ligacao(14,24,2,2,0,1).
ligacao(21,31,2,1,3,-4).
ligacao(21,32,-2,3,-7,2).
ligacao(21,33,3,5,-3,8).
ligacao(21,34,4,2,-4,-1).
ligacao(22,31,5,-4,-2,1).
ligacao(22,32,-1,6,-7,-4).
ligacao(22,33,2,1,3,-3).
ligacao(22,34,2,3,1,-7).
ligacao(23,31,4,-3,0,-3).
ligacao(23,32,3,5,-6,1).
ligacao(23,33,4,1,1,2).
ligacao(23,34,-2,-3,2,7).
ligacao(24,31,1,-5,-2,-6).
ligacao(24,32,1,0,-1,-2).
ligacao(24,33,3,-1,9,1).
ligacao(24,34,-1,5,8,7).
ligacao(31,41,2,4,7,3).
ligacao(31,42,6,3,5,-8).
ligacao(31,43,2,1,4,-9).
ligacao(31,44,2,1,3,-1).
ligacao(32,41,2,3,2,-2).
ligacao(32,42,-1,0,1,0).
ligacao(32,43,0,1,8,8).
ligacao(32,44,1,2,0,3).
ligacao(33,41,4,-1,1,-2).
ligacao(33,42,-1,3,2,-8).
ligacao(33,43,7,2,-3,-5).
ligacao(33,44,5,-3,-7,1).
ligacao(34,41,3,2,-4,8).
ligacao(34,42,1,-1,9,1).
ligacao(34,43,2,4,8,5).
ligacao(34,44,1,-2,4,1).
ligacao(41,200,2,0,-1,8).
ligacao(42,200,7,-2,1,2).
ligacao(43,200,-2,4,3,-7).
ligacao(44,200,-1,-3,8,-2).

ligacao(1,51,6,2,2,5).
ligacao(51,61,7,3,-5,-5).
ligacao(61,200,2,4,8,1).



sinonimo('IPP','politecnico do porto').
sinonimo('c#','c sharp').