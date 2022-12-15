:-include('Projeto.pl').


:-dynamic var_aux/1.
:-dynamic users_com_X_tags_em_comum/1.

metodo3(LTags, X, LUsers):-
		todas_combinacoes(X, LTags, LcombXTags),
		asserta(users_com_X_tags_em_comum([])),
		(metodo4(LcombXTags, X);true),
		users_com_X_tags_em_comum(LUsers1),
		imprime_resultado(LcombXTags,LUsers1),
		retract(users_com_X_tags_em_comum(_)),
		write('Fim'), nl.
		
metodo4(LcombXTags, X):-
		no(Y, _, LOutroUser),
		write('User = '), write(Y),nl,
		( metodo5(LcombXTags, Y, LOutroUser, X) ; true ),
		fail.
		
metodo5(LTags, Y, LOutroUser, X):-
		write('entrei'), nl,
		asserta(var_aux([])),
		(metodo6(LTags, Y, LOutroUser, X, LAux);true),
		var_aux(LUsersCombinacao),
		users_com_X_tags_em_comum(L),
		L1 = [LUsersCombinacao|L],
		asserta(users_com_X_tags_em_comum(L1)),
		retract(var_aux(_)),
		asserta(var_aux([])),
		fail.


metodo6(LTags, Y, LOutroUser, X, LAux):- 
							Lista = [LX|LTags],
							intersecao(LX,LOutroUser, LIntersecao),
							write('LIntersecao='), write(LIntersecao),nl,
							length(LIntersecao, Tamanho), 
							%write('length='), write(Tamanho),nl,
							Tamanho < X, fail;
							write('encontrei o user: '), write(Y), nl,
							var_aux(LUsersComXTagsPartilhadas),
							%write('passei'), nl, nl,
							LAux = [Y|LUsersComXTagsPartilhadas],
							write('Guardei na LUsersComXTagsPartilhadas: '), write(LAux), nl,nl,
							asserta(var_aux(LAux)).
							
							
							
intersecao([ ],_,[ ]).
intersecao([X|L1],L2,[X|LI]):-membro(X,L2),!,intersecao(L1,L2,LI).
intersecao([X|L1],L2,[X|LI]):- ver_sinonimo(X,L2,LI),!, intersecao(L1,L2,LI).
intersecao([_|L1],L2, LI):- intersecao(L1,L2,LI).

ver_sinonimo(_,[],_).
ver_sinonimo(X,[Tag|L2],[Tag|LI]):- sinonimo(X, Tag),!, ver_sinonimo(X,L2,LI).
ver_sinonimo(X,[Tag|L2],LI):- ver_sinonimo(X,L2,LI).


todas_combinacoes(X,LTags,LcombXTags):-findall(L,combinacao(X,LTags,L),LcombXTags).
combinacao(0,_,[]):-!.
combinacao(X,[Tag|L],[Tag|T]):-X1 is X-1, combinacao(X1,L,T).
combinacao(X,[_|L],T):- combinacao(X,L,T).

imprime_resultado([],[]).
imprime_resultado([A|LcombXTags],[B|LUsers1]):- write('A combinacao '), write(A), 
												write(' é partilhada por '), write(B), nl, 
												imprime_resultado(LcombXTags,LUsers1).



