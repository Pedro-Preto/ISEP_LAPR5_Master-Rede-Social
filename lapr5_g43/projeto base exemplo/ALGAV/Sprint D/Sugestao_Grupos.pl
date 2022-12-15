:-include('Base_SprintD').

/*  Predicado principal   */
    /*  LTags - Lista de tags
        T - Numero de tags em comum
        N - Numero minimo de users no grupo sugerido
        LTagsObrigatorias - lista de tags obrigatorias
        LUsersComCombTags - lista de users agrupados por T tags em comum e obrigatorias - RETORNO
    */
sugestao_grupos(LTags,T, N, LTagsObrigatorias, LUsersComCombTags):-
    todas_combinacoes(T,LTags,LcombXTags),
    write('LTagsComb: '), write(LcombXTags),nl,nl,
    verifica_tags_obrigatorias(LcombXTags, LTagsObrigatorias, T, LTagsCombEObrigatorias),
    write('LTagsCombEObrigatorias: '), write(LTagsCombEObrigatorias),nl,nl,
    findall(X, no(X,_,_,_,_,_,_,_), LUsers),
    selecionaCombTags(LTagsCombEObrigatorias,LUsers,LUsersComCombTags).

/*  Verifica se as combinações de tags tem as tags obrigatorias   */
    /*  LTagsComb - Lista de tags combinadas T a T, resultado de todas_combinacoes
        LTagsObrigatorias - Lista de tags obrigatorias 
        T - numero de tags obrigatorias 
        LTagsCombEObrigatorias - Lista de tags combinadas T a T que contem as tags obrigatorias - RETORNO
    */
verifica_tags_obrigatorias([],_,_,LT):-!.
verifica_tags_obrigatorias([X|LTagsComb], LTagsObrigatorias, T, LTagsCombEObrigatorias):-
    intersecao(X, LTagsObrigatorias, LR),
    length(LTagsObrigatorias,Referencia),
    length(LR,Length),
    %write('LTagsComb: '), write(LTagsComb),nl,
    %write('Intersecao: '), write(LR),nl,
    %write('Length: '), write(Length),nl,
    %write('X: '), write(X),nl,
    (Length == Referencia -> verifica_tags_obrigatorias(LTagsComb,LTagsObrigatorias,T,LFinal), LTagsCombEObrigatorias = [X|LFinal]; %append([X],LTagsCombEObrigatorias, LFinal);
                                verifica_tags_obrigatorias(LTagsComb,LTagsObrigatorias,T,LTagsCombEObrigatorias)).
    %write("LTagsCombEObrigatorias: "), write(LTagsCombEObrigatorias),nl, 
    %write("LFINAL: "), write(LFinal),nl,nl,
    %verifica_tags_obrigatorias(LTagsComb,LTagsObrigatorias,T,LFinal).

/*  Itera sobre a lista de tags combinadas T a T que contem as tags obrigatorias e para cada uma delas chama o metodo que verifica os users que as contêm   */
    /*  LT - Lista de tags combinadas T a T que contem as tags obrigatorias
        LUsers - Lista com os ids de todos os users que estao na base de connhecimento
        LUsersComCombTags - Lista com listas de users que partilham de cada combinação de tags em comum e obrigatorias - RETORNO FINAL!!!
    */
selecionaCombTags([],_,LUsersComCombTags):-!.
selecionaCombTags([Lista|LT], LUsers,LUsersComCombTags):-
    comparaComUsers(Lista, LUsers, LAux),
    write(Lista), write(": "), write(LAux),nl,
    selecionaCombTags(LT,LUsers, LUsersComCombTags), LL =[LAux|LUsersComCombTags].

/*  Verifica para cada lista de tags os users que as têm   */
    /*  Lista - Lista de tags
        LUsers -  Lista com os ids de todos os users que estao na base de connhecimento
        LUsersComCombTags - Lista com listas de users que partilham de cada combinação de tags em comum e obrigatorias - RETORNO FINAL!!!
    */
comparaComUsers(Lista,[],L):-!.
comparaComUsers(Lista, [User|LUsers],LUsersComCombTags):-
    no(User, _,TagsUser,_,_,_,_,_),
    %write("User: "), write(User),nl,
    %write("Lista:"), write(Lista),nl,
    %write("TagsUser:"), write(TagsUser),nl,
    intersecao(Lista, TagsUser, LR),
    %write("Lista intersecao: "), write(LR),nl,
    length(Lista,Referencia),
    length(LR,Compara),
    %write("REFERENCIA: "), write(Referencia), write("   COMPARA: "), write(Compara),nl,
    (Referencia == Compara -> comparaComUsers(Lista, LUsers, LFinal), LUsersComCombTags = [User|LFinal];
                                comparaComUsers(Lista, LUsers, LUsersComCombTags)).

/*  PREDICADOS AUXILIARES - FORNECIDOS  */
todas_combinacoes(X,LTags,LcombXTags):-findall(L,combinacao(X,LTags,L),LcombXTags).
combinacao(0,_,[]):-!.
combinacao(X,[Tag|L],[Tag|T]):-X1 is X-1, combinacao(X1,L,T).
combinacao(X,[_|L],T):- combinacao(X,L,T).

intersecao([ ],_,[ ]).
intersecao([X|L1],L2,[X|LI]):-member(X,L2),!,intersecao(L1,L2,LI).
intersecao([_|L1],L2, LI):- intersecao(L1,L2,LI).
