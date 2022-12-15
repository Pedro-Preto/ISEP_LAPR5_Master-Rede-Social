% Base de Conhecimento 

no(1,ana,[natureza,pintura,musica,sw,porto]).
no(11,antonio,[natureza,pintura,carros,futebol,lisboa]).
no(12,beatriz,[natureza,musica,carros,porto,moda]).
no(13,carlos,[natureza,musica,sw,futebol,coimbra]).
no(51,rodolfo,[natureza,musica,sw]).
no(61,rita,[moda,tecnologia,cinema]).
no(2,joao,[futebol]).


ligacao(1,11,10,8).
ligacao(1,12,2,6).
ligacao(1,13,-3,-2).
ligacao(1,14,1,-5).
ligacao(11,13,5,7).
ligacao(1,2,2,3).
ligacao(1,13,5,4).
ligacao(13,51,8,7).
ligacao(51,2,9,5).



sinonimo('IPP','politecnico do porto').
sinonimo('c#','c sharp').