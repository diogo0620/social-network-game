:-dynamic no/3. %id , tags, estadoEmocional
:-dynamic ligacao/6. %id1, id2, forcaLigacao1, forcaLigacao2, forcaRelacao1, forcaRelacao2
:-dynamic melhor_solucao/4.

dfs(Orig,Dest,Cam, FCam, MForca, MaxLigacoes, EmocoesProibidas):-
		dfs2(Orig,Dest,[Orig],0,101, Cam, FCam, MForca, MaxLigacoes, EmocoesProibidas).

dfs2(Dest,Dest,LA,FA,MF, Cam, FA, MF,_, _):-!,reverse(LA,Cam).
dfs2(Act,Dest,LA,FA,MF, Cam, FCam, MForca, ML,EmocoesProibidas):-
		length(LA, Tam),
		Tam =< ML,
		(ligacao(Act,NX,FL1,FL2,_,_);ligacao(NX,Act,FL2,FL1,_,_)),
		\+ member(NX,LA),
		(NX == Dest;(no(NX,_,Emocao),verificarEmocoes(Emocao,EmocoesProibidas))),
		menor_forca(FL1,FL2,MF,Menor),
		FT is FA + FL1,
		dfs2(NX,Dest,[NX|LA],FT,Menor, Cam, FCam, MForca, ML, EmocoesProibidas).




dfsComMulticriterio(Orig,Dest,Cam, FCam, MForca, MaxLigacoes, EmocoesProibidas):-
		dfsComMulticriterio2(Orig,Dest,[Orig],0,101, Cam, FCam, MForca, MaxLigacoes, EmocoesProibidas).



dfsComMulticriterio2(Dest,Dest,LA,FA,MF, Cam, FA, MF,_,_):-!,reverse(LA,Cam).
dfsComMulticriterio2(Act,Dest,LA,FA,MF, Cam, FCam, MForca, ML, EmocoesProibidas):-
		length(LA, Tam),
		Tam =< ML,
		(ligacao(Act,NX,FL1,FL2,FR1,FR2);ligacao(NX,Act,FL2,FL1,FR2,FR1)),
		funcaoMulticriterio(FL1, FR1, F1),
		funcaoMulticriterio(FL2, FR2, F2),
		(NX == Dest;(no(NX,_,Emocao),verificarEmocoes(Emocao,EmocoesProibidas))),
		menor_forca(F1,F2,MF,Menor),
		\+ member(NX,LA),
		FT is FA + F1,
		dfsComMulticriterio2(NX,Dest,[NX|LA],FT,Menor, Cam, FCam, MForca, ML, EmocoesProibidas).



menor_forca(F1, F2, F3, F1):-
		F1 < F2,
		F1 < F3,!.

menor_forca(F1, F2, F3, F2):-
		F2 < F1,
		F2 < F3,!.

menor_forca(_, _, F3, F3).

minimoLigacoes(Orig,Dest,MaxLigacoes, Caminho, TotalNos, ForcaTotal, MenorForca, EmocoesProibidas):-
		(melhor_caminho_minimoLigacoes(Orig,Dest, MaxLigacoes, EmocoesProibidas);true),
		retract(melhor_solucao(Caminho,TotalNos,ForcaTotal,MenorForca)),
		MenorForca < 101.


minimoLigacoesMulticriterio(Orig,Dest,MaxLigacoes, Caminho, TotalNos, ForcaTotal, MenorForca, EmocoesProibidas):-
		(melhor_caminho_minimoLigacoes_multicriterio(Orig,Dest, MaxLigacoes, EmocoesProibidas);true),
		retract(melhor_solucao(Caminho,TotalNos,ForcaTotal,MenorForca)),
		MenorForca < 101.


maisForte(Orig, Dest,MaxLigacoes, Caminho, TotalNos, ForcaTotal, MenorForca, EmocoesProibidas):-
		(melhor_caminho_maisForte(Orig, Dest, MaxLigacoes, EmocoesProibidas);true),
		retract(melhor_solucao(Caminho,TotalNos,ForcaTotal,MenorForca)),
		MenorForca < 101.


maisForteMulticriterio(Orig, Dest,MaxLigacoes, Caminho, TotalNos, ForcaTotal, MenorForca, EmocoesProibidas):-
		(melhor_caminho_maisForte_multicriterio(Orig, Dest, MaxLigacoes, EmocoesProibidas);true),
		retract(melhor_solucao(Caminho,TotalNos,ForcaTotal,MenorForca)),
		MenorForca < 101.


maisSeguro(Orig, Dest,MaxLigacoes,ForcaMinima, Caminho, TotalNos, ForcaTotal, MenorForca, EmocoesProibidas):-
		(melhor_caminho_maisSeguro(Orig, Dest, ForcaMinima, MaxLigacoes, EmocoesProibidas);true),
		retract(melhor_solucao(Caminho,TotalNos,ForcaTotal,MenorForca)),
		MenorForca < 101.



maisSeguroMulticriterio(Orig, Dest,MaxLigacoes,ForcaMinima, Caminho, TotalNos, ForcaTotal, MenorForca, EmocoesProibidas):-
		(melhor_caminho_maisSeguro_multicriterio(Orig, Dest, ForcaMinima, MaxLigacoes, EmocoesProibidas);true),
		retract(melhor_solucao(Caminho,TotalNos,ForcaTotal,MenorForca)),
		MenorForca < 101.

melhor_caminho_minimoLigacoes(Orig,Dest, MaxLigacoes, EmocoesProibidas):-
		asserta(melhor_solucao(_,10000, 0,101)),
		dfs(Orig,Dest, LCaminho, Forca, MenorForca, MaxLigacoes, EmocoesProibidas),
		atualiza_melhor_minimoLigacoes(LCaminho, Forca, MenorForca),
		fail.



melhor_caminho_minimoLigacoes_multicriterio(Orig,Dest, MaxLigacoes, EmocoesProibidas):-
		asserta(melhor_solucao(_,10000, 0,101)),
		dfsComMulticriterio(Orig,Dest, LCaminho, Forca, MenorForca, MaxLigacoes, EmocoesProibidas),
		atualiza_melhor_minimoLigacoes(LCaminho, Forca, MenorForca),
		fail.

melhor_caminho_maisForte(Orig,Dest, MaxLigacoes, EmocoesProibidas):-
		asserta(melhor_solucao(_,10000, 0,101)),
		dfs(Orig, Dest, LCaminho, Forca,MenorForca, MaxLigacoes, EmocoesProibidas),
		atualiza_melhor_maisForte(LCaminho, Forca, MenorForca),
		fail.


melhor_caminho_maisForte_multicriterio(Orig,Dest, MaxLigacoes, EmocoesProibidas):-
		asserta(melhor_solucao(_,10000, 0,101)),
		dfsComMulticriterio(Orig, Dest, LCaminho, Forca,MenorForca, MaxLigacoes, EmocoesProibidas),
		atualiza_melhor_maisForte(LCaminho, Forca, MenorForca),
		fail.


melhor_caminho_maisSeguro(Orig,Dest,ForcaMinima, MaxLigacoes, EmocoesProibidas):-
		asserta(melhor_solucao(_,10000,0,101)),
		dfs(Orig, Dest, LCaminho, Forca,MenorForca, MaxLigacoes, EmocoesProibidas),
		atualiza_melhor_maisSeguro(LCaminho, Forca, MenorForca, ForcaMinima),
		fail.

melhor_caminho_maisSeguro_multicriterio(Orig,Dest,ForcaMinima, MaxLigacoes, EmocoesProibidas):-
		asserta(melhor_solucao(_,10000,0,101)),
		dfsComMulticriterio(Orig, Dest, LCaminho, Forca,MenorForca, MaxLigacoes, EmocoesProibidas),
		atualiza_melhor_maisSeguro(LCaminho, Forca, MenorForca, ForcaMinima),
		fail.



atualiza_melhor_minimoLigacoes(LCaminho, Forca, MenorForca):-
		melhor_solucao(_,N, F,_),
		length(LCaminho,C),
		(C<N;C==N,Forca>F),
		retract(melhor_solucao(_,_,_,_)),
		asserta(melhor_solucao(LCaminho,C,Forca, MenorForca)).


atualiza_melhor_maisForte(LCaminho, Forca,MenorForca):-
		melhor_solucao(_,N, F,_),
		length(LCaminho, NC),
		(Forca > F;Forca==F,NC < N),
		retract(melhor_solucao(_,_,_,_)),
		asserta(melhor_solucao(LCaminho,NC,Forca, MenorForca)).

atualiza_melhor_maisSeguro(LCaminho,Forca,MenorForca,ForcaMinima):-
		MenorForca >= ForcaMinima,
		atualiza_melhor_maisForte(LCaminho, Forca, MenorForca).


% ------------------- Tamanho Rede ------
% O metodo principal devolve o tamanho da rede e preenche a estrutura
% rede que tem o seguinte formato: rede(Nivel, Utilizadores) em que no
% nivel 0 estÃ¡ o propio utilizador, no nivel 1 os amigos desse
% utilizador, no nivel 2 os amigos dos amigos, etc...


:- dynamic rede/2.

tamanhoRede(Orig, Nivel, Rede, Tamanho):-
		Nivel >= 0,
		retractall(rede(_,_)),
		asserta(rede(0, [Orig])),
		procurarVizinhosNivel(0, Nivel, [Orig], [], Tamanho, Rede).


procurarVizinhosNivel(N, N, _, L, T, Rede):-
		length(L, T),
		reverse(L, Rede),
		!.

procurarVizinhosNivel(NivelAProcurar, Nivel, LUtis, Rede, Tamanho, Resultado):-
		rede(NivelAProcurar, LNivel),
		vizinhosLista(LNivel, Viz),
		naoPertenceA(Viz, LUtis, VizNivel),
		N is NivelAProcurar + 1,
		append(VizNivel, LUtis, Res),
		assertz(rede(N, VizNivel)),
		append(VizNivel, Rede, Rede1),
		procurarVizinhosNivel(N, Nivel, Res,Rede1, Tamanho, Resultado).


vizinhos(Orig, Vizinhos):- vizinhos1(Orig,[], Vizinhos).
vizinhos1(Orig, L1, L2):-
		(ligacao(Orig, Dest,_,_,_,_);ligacao(Dest,Orig,_,_,_,_)),
		\+ member(Dest, L1),
		!,
		vizinhos1(Orig, [Dest|L1], L2).

vizinhos1(_,L,L).

vizinhosLista([], []).
vizinhosLista(L, R):-vizinhosLista1(L, [], R).

vizinhosLista1([], V, V).
vizinhosLista1([H|L], VizinhosDiferentes, R):-
		vizinhos(H, Viz),
		adicionarSemRepetidos(Viz, VizinhosDiferentes, T),
		vizinhosLista1(L, T, R).




naoPertenceA(L1, L2, LD):-
		naoPertenceA1(L1, L2, [], LD).

naoPertenceA1([], _, L, L):-!.
naoPertenceA1([H|L1], L2, L, R):-
		\+ member(H, L2),
		naoPertenceA1(L1, L2, [H|L], R),!.
naoPertenceA1([_|L1], L2, L, R):-
		naoPertenceA1(L1, L2, L, R).




adicionarSemRepetidos([], L2, L2).
adicionarSemRepetidos([X|L],L1,LU):-member(X,L1),!,adicionarSemRepetidos(L,L1,LU).
adicionarSemRepetidos([X|L],L1,[X|LU]):-adicionarSemRepetidos(L,L1,LU).

% --------------------------- Tags em comum ----------------------------------
% Preenche a estrutura tags_em_comum da seguinta forma: Tags->
% Utilizadores que as partilham, por exemplo: tags_em_comum(["natureza",
% "desporto"], ["ana", "paulo", "pedro"])


:- dynamic tags_em_comum/2.



x_tags_em_comum(X, Luti, T, U):-
		retractall(tags_em_comum(_,_)),
		calcularTags(Luti, [], Ltags),
		todas_combinacoes(X, Ltags, Lcomb),
		percorrerCombinacoes(Lcomb, Luti),
		tags_em_comum(T,U).
x_tags_em_comum(X, T, U):-
		retractall(tags_em_comum(_,_)),
		findall(L, no(L, _,_), Luti),
		calcularTags(Luti,[], Ltags),
		todas_combinacoes(X, Ltags, Lcomb),
		percorrerCombinacoes(Lcomb, Luti),
		tags_em_comum(T,U).


calcularTags([], L, L):-!.
calcularTags([U|Luti], L, R):-
		no(U, Tags,_),
		adicionarSemRepetidos(Tags, L, L1),
		calcularTags(Luti, L1, R).



percorrerCombinacoes([], _):-!.
percorrerCombinacoes([H|Lcomb], Luti):-
		asserta(tags_em_comum(H,[])),
		percorrerCombinacao(H, Luti),
		percorrerCombinacoes(Lcomb, Luti).


percorrerCombinacao(_,[]):-!.

percorrerCombinacao(Comb, [U|Luti]):-
		temTags(U, Comb),
		retract(tags_em_comum(Comb, L)),
		asserta(tags_em_comum(Comb, [U|L])),
		percorrerCombinacao(Comb, Luti),
		!.

percorrerCombinacao(Comb, [_|Luti]):-
		percorrerCombinacao(Comb, Luti).


temTags(U, Comb):-
		no(U, Ltags,_),
		temCombinacao(Comb, Ltags).


temCombinacao([], _):-!.
temCombinacao([C|Comb], Ltags):-
		temTag(C, Ltags),
		temCombinacao(Comb, Ltags),
		!.


temTag(C, [T|_]):-
		sinonimo(C, T),
		!.

temTag(C, [_|Tags]):-
		temTag(C, Tags).





todas_combinacoes(X,LTags,LcombXTags):-findall(L,combinacao(X,LTags,L),LcombXTags).
combinacao(0,_,[]):-!.
combinacao(X,[Tag|L],[Tag|T]):-X1 is X-1, combinacao(X1,L,T).
combinacao(X,[_|L],T):- combinacao(X,L,T).


sinonimo("csharp", "c#"):-!.
sinonimo(Tag1, Tag1):-!.
sinonimo(Tag1, Tag2):-
		string_lower(Tag1, T1_lower),
		string_lower(Tag2, T2_lower),
		(Tag1 \==  T1_lower;Tag2 \== T2_lower),
		sinonimo(T1_lower, T2_lower),!.


% ------------------- Sugerir Conexoes --------------

:-dynamic caminhosAconsiderar/3. % origem, intermedios, sugestao.


sugerirConexoes(Orig, Nivel,Res):-
		retractall(caminhosAconsiderar(_,_,_)),
		tamanhoRede(Orig, Nivel, Lutis,_),
		findall(Luts, x_tags_em_comum(1, [Orig|Lutis],_,Luts),Lcomb),
		retirarUtilizadoresInvalidos(Orig, Lcomb, LCombValidos),
		determinarPossiveisSugestoes(Orig, LCombValidos),
		findall(S, caminhosAconsiderar(_,_,S),Sugestoes),
		findall(I, caminhosAconsiderar(_,I,_),Intermedios),
		testarCaminhos(Orig, Sugestoes, Intermedios, [], Res).


testarCaminhos(_, [], [], L,L):-!.
testarCaminhos(Orig, [S|Sugestoes], [I|Intermedios], L, R):-
		caminhoComIntermedios(Orig, S, I,_),
		(   \+ member(S, L),
		testarCaminhos(Orig, Sugestoes, Intermedios, [S|L], R),!);
		testarCaminhos(Orig, Sugestoes, Intermedios, L, R),!.

testarCaminhos(Orig,[_|Sugestoes], [_|Intermedios], L, R):-
		testarCaminhos(Orig, Sugestoes, Intermedios, L,R).



caminhoComIntermedios(Orig, Dest, Intermedios, Caminho):-
	      dfs(Orig, Dest,100,Caminho,_,_, []),
	      delete(Caminho, Orig, CamSemOrigem),
	      delete(CamSemOrigem, Dest, CamSemOrigemDestino),
	      caminhoValido(CamSemOrigemDestino, Intermedios),
	      !.




caminhoValido([],_):-!.
caminhoValido([H|Caminho],Intermedios):-
		member(H, Intermedios),
		caminhoValido(Caminho, Intermedios),!.


determinarPossiveisSugestoes(_,[]):-!.
determinarPossiveisSugestoes(Orig, [Comb|LComb]):-
		delete(Comb, Orig, CombSemOrigem),
		adicionarTodasPossiveisSugestoes(Orig, CombSemOrigem, CombSemOrigem),
		determinarPossiveisSugestoes(Orig, LComb).



adicionarTodasPossiveisSugestoes(_, [],_):-!.
adicionarTodasPossiveisSugestoes(Orig, [PossivelSugestao|PorPercorrer], Comb):-
		\+ ligacao(Orig,PossivelSugestao,_,_,_,_),
		\+ ligacao(PossivelSugestao, Orig,_,_,_,_),
		delete(Comb, PossivelSugestao, Intermedios),
		asserta(caminhosAconsiderar(Orig, Intermedios, PossivelSugestao)),
		adicionarTodasPossiveisSugestoes(Orig, PorPercorrer, Comb),!.
adicionarTodasPossiveisSugestoes(Orig, [_|PorPercorrer], Comb):-
		adicionarTodasPossiveisSugestoes(Orig, PorPercorrer, Comb).




retirarUtilizadoresInvalidos(Orig, LComb, LValidos):-
		verificarValidade(Orig, LComb, [], LValidos).


verificarValidade(_, [], L, L):-!.
verificarValidade(Orig, [H|Lcomb], L, R):-
		member(Orig, H),
		length(H, T),
		T > 2,
		verificarValidade(Orig, Lcomb, [H|L], R),!.

verificarValidade(Orig, [_|Lcomb], L, R):-
		verificarValidade(Orig, Lcomb, L, R).

%---------------------------------------------------------------
% A* considerando as forças de ligação e as forças de relação
% (multicritério).

aStarMulticriterio(Orig,Dest,MaxLigacoes, Cam,Custo,EmocoesProibidas):-
    no(Dest,_,_), % Nao pesquisar caso o no destino nao exista.
    forcasOrdenadasMulticriterio(Forcas),
    aStar2Multicriterio(Dest,[(_,0,[Orig])],MaxLigacoes,Cam,Custo, Forcas, EmocoesProibidas).

aStar2Multicriterio(Dest,[(_,Custo,[Dest|T])|_],_,Cam,Custo, _,_):-
    reverse([Dest|T],Cam),!.

aStar2Multicriterio(Dest,[(_,_,LA)|Outros],MaxLigacoes,Cam,Custo, Forcas, EmocoesProibidas):-
     length(LA, Tam),
     Tam > MaxLigacoes,
     aStar2Multicriterio(Dest, Outros, MaxLigacoes, Cam,Custo, Forcas, EmocoesProibidas),!.


aStar2Multicriterio(Dest,[(_,Ca,LA)|Outros],MaxLigacoes,Cam,Custo, Forcas, EmocoesProibidas):-
    length(LA, Tam),
    Tam =< MaxLigacoes,
    LA=[Act|_],
    findall((CEX,CaX,[X|LA]),
            (Dest\==Act,(ligacao(Act,X,FLX,_,FRX,_);ligacao(X,Act,_,FLX,_,FRX)),\+ member(X,LA),
	     (X == Dest;(no(X,_,Emocao),verificarEmocoes(Emocao,EmocoesProibidas))),
	     append([X], LA, T),
	     removerForcasUsadasMulticriterio(T, Forcas, ForcasRestantes),
	     NiveisRestantes is MaxLigacoes - Tam,
	     funcaoMulticriterio(FLX, FRX, CustoX),
             CaX is CustoX + Ca, estimativa(ForcasRestantes,NiveisRestantes,EstX),
             CEX is CaX +EstX),Novos),

    append(Outros,Novos,Todos),
    sort(0, @>=, Todos,TodosOrd),
    aStar2Multicriterio(Dest,TodosOrd,MaxLigacoes,Cam,Custo, Forcas,EmocoesProibidas).

estimativa(ForcasRestantes,NiveisRestantes,E):-
		somaDosPrimeirosN(ForcasRestantes, NiveisRestantes, E).


somaDosPrimeirosN([],_,0):-!.
somaDosPrimeirosN(_, 0, 0):-!.
somaDosPrimeirosN([F1|F], N, E):-
		N1 is N - 1,
		somaDosPrimeirosN(F, N1, T),
		E is T + F1.

removerForcasUsadasMulticriterio([_], F,F):-!.
removerForcasUsadasMulticriterio([NoAtual|Caminho], TodasForcas, R):-
		Caminho=[ProximoNo|_],
		(ligacao(NoAtual, ProximoNo, _,FL,_,FR);ligacao(ProximoNo, NoAtual,FL,_, FR,_)),!,
		funcaoMulticriterio(FL, FR, Forca),
		deleteFirst(Forca, TodasForcas, TF),
		removerForcasUsadasMulticriterio(Caminho, TF, R).



% ------------------------------------------------------------------------
% A* considerando apenas as forças de ligação.


aStar(Orig,Dest,MaxLigacoes, Cam,Custo,EmocoesProibidas):-
    no(Dest,_,_), % Nao pesquisar caso o no destino nao exista.
    forcasOrdenadas(Forcas),
    aStar2(Dest,[(_,0,[Orig])],MaxLigacoes,Cam,Custo, Forcas, EmocoesProibidas).

aStar2(Dest,[(_,Custo,[Dest|T])|_],_,Cam,Custo, _,_):-
    reverse([Dest|T],Cam),!.

aStar2(Dest,[(_,_,LA)|Outros],MaxLigacoes,Cam,Custo, Forcas, EmocoesProibidas):-
     length(LA, Tam),
     Tam > MaxLigacoes,
     aStar2(Dest, Outros, MaxLigacoes, Cam,Custo, Forcas, EmocoesProibidas),!.

aStar2(Dest,[(_,Ca,LA)|Outros],MaxLigacoes,Cam,Custo, Forcas, EmocoesProibidas):-
    length(LA, Tam),
    Tam =< MaxLigacoes,
    LA=[Act|_],
    findall((CEX,CaX,[X|LA]),
            (Dest\==Act,(ligacao(Act,X,FLX,_,_,_);ligacao(X,Act,_,FLX,_,_)),\+ member(X,LA),
	     (X == Dest;(no(X,_,Emocao),verificarEmocoes(Emocao,EmocoesProibidas))),
	     append([X], LA, T),
	     removerForcasUsadas(T, Forcas, ForcasRestantes),
	     NiveisRestantes is MaxLigacoes - Tam,
             CaX is FLX + Ca, estimativa(ForcasRestantes,NiveisRestantes,EstX),
             CEX is CaX +EstX),Novos),

    append(Outros,Novos,Todos),
    sort(0, @>=, Todos,TodosOrd),
    aStar2(Dest,TodosOrd,MaxLigacoes,Cam,Custo, Forcas,EmocoesProibidas).


removerForcasUsadas([_], F,F):-!.
removerForcasUsadas([NoAtual|Caminho], TodasForcas, R):-
		Caminho=[ProximoNo|_],
		(ligacao(NoAtual, ProximoNo, _,FL,_,_);ligacao(ProximoNo, NoAtual,FL,_, _,_)),!,
		deleteFirst(FL, TodasForcas, TF),
		removerForcasUsadas(Caminho, TF, R).




%--------------------------------------------------------------------
% Métodos para calcular todas as forças existentes e devolver uma lista
% ordenada, com repetidos, desses valores. Existe uma abordagem
% considerando apenas as forças de ligação e outra considerando também
% as forças de relação (multicriterio).

:- dynamic forcas/1.




forcasOrdenadasMulticriterio(Res):-
	        (percorrerLigacoesMulticriterio();true),
		findall(F, forcas(F), Lf),
		retractall(forcas(_)),
		sort(0, @>=, Lf, Res).

percorrerLigacoesMulticriterio():-
		ligacao(_,_,FL1,FL2,FR1,FR2 ),
		funcaoMulticriterio(FL1, FR1, F1),
		funcaoMulticriterio(FL2, FR2, F2),
		asserta(forcas(F1)),
		asserta(forcas(F2)),
		fail.

forcasOrdenadas(Res):-
	        (percorrerLigacoes();true),
		findall(F, forcas(F), Lf),
		retractall(forcas(_)),
		sort(0, @>=, Lf, Res).

percorrerLigacoes():-
		ligacao(_,_,FL1,FL2,_,_ ),
		asserta(forcas(FL1)),
		asserta(forcas(FL2)),
		fail.


deleteFirst(X,[X|T],T):-!.
deleteFirst(X,[Y|T],[Y|T1]):-deleteFirst(X,T,T1).

%-------------------------------------------------------------------
% Best First considerando as forças de ligação e as forças de relação
% (multicritério).



bestfsMulticriterio(Orig,Dest,MaxLigacoes,Cam,Custo,EmocoesProibidas):-
	bestfsMulticriterio12(Dest,[[Orig]],MaxLigacoes,Cam,Custo, EmocoesProibidas).


bestfsMulticriterio12(Dest,[[Dest|T]|_],_,Cam,Custo,_):-
	reverse([Dest|T],Cam),
	calcula_custo_multicriterio(Cam,Custo),!.

bestfsMulticriterio12(Dest,[[Dest|_]|LLA2],MaxLigacoes,Cam,Custo,EmocoesProibidas):-
	!,
	bestfsMulticriterio12(Dest,LLA2,MaxLigacoes,Cam,Custo, EmocoesProibidas).

bestfsMulticriterio12(Dest,[C|LLA],MaxLigacoes,Cam,Custo,EmocoesProibidas):-
      length(C, Tam),
      Tam > MaxLigacoes,
      bestfsMulticriterio12(Dest, LLA, MaxLigacoes, Cam,Custo,EmocoesProibidas),!.



bestfsMulticriterio12(Dest,LLA,MaxLigacoes,Cam,Custo,EmocoesProibidas):-
	member1(LA,LLA,LLA1),
	length(LA, Tam),
	Tam =< MaxLigacoes,
	LA=[Act|_],
	((Act==Dest,!,bestfsMulticriterio12(Dest,[LA|LLA1],MaxLigacoes,Cam,Custo,EmocoesProibidas))
	 ;
	 (
	  findall((CX,[X|LA]),((ligacao(Act,X,FL,_,FR,_);ligacao(X,Act,_,FL,_,FR)),
	  \+member(X,LA),funcaoMulticriterio(FL,FR,CX),(X == Dest;(no(X,_,Emocao),verificarEmocoes(Emocao,EmocoesProibidas)))),Novos),
	  Novos\==[],!,
	  sort(0,@>=,Novos,NovosOrd),
	  retira_custos(NovosOrd,NovosOrd1),
	  append(NovosOrd1,LLA1,LLA2),
	  bestfsMulticriterio12(Dest,LLA2,MaxLigacoes,Cam,Custo,EmocoesProibidas)
	 )).

member1(LA,[LA|LAA],LAA).
member1(LA,[_|LAA],LAA1):-member1(LA,LAA,LAA1).

retira_custos([],[]).
retira_custos([(_,LA)|L],[LA|L1]):-retira_custos(L,L1).

calcula_custo_multicriterio([Act,X],C):-!,(ligacao(Act,X,FL,_, FR,_);ligacao(X,Act,_,FL,_,FR)),funcaoMulticriterio(FL,FR,C).
calcula_custo_multicriterio([Act,X|L],S):-calcula_custo_multicriterio([X|L],S1),
					(ligacao(Act,X,FL,_,FR,_);ligacao(X,Act,_,FL,_,FR)),funcaoMulticriterio(FL, FR, C),S is S1+C.



% ------------------------------------------------------------------------
% Best First considerando apenas as forcas de ligacao.


bestfs(Orig,Dest,MaxLigacoes,Cam,Custo, EmocoesProibidas):-
	bestfs12(Dest,[[Orig]],MaxLigacoes,Cam,Custo,EmocoesProibidas).


bestfs12(Dest,[[Dest|T]|_],_,Cam,Custo,_):-
	reverse([Dest|T],Cam),
	calcula_custo(Cam,Custo),!.

bestfs12(Dest,[[Dest|_]|LLA2],MaxLigacoes,Cam,Custo,EmocoesProibidas):-
	!,
	bestfs12(Dest,LLA2,MaxLigacoes,Cam,Custo,EmocoesProibidas).

bestfs12(Dest,[C|LLA],MaxLigacoes,Cam,Custo,EmocoesProibidas):-
      length(C, Tam),
      Tam > MaxLigacoes,
      bestfs12(Dest, LLA, MaxLigacoes, Cam,Custo,EmocoesProibidas),!.



bestfs12(Dest,LLA,MaxLigacoes,Cam,Custo,EmocoesProibidas):-
	member1(LA,LLA,LLA1),
	length(LA, Tam),
	Tam =< MaxLigacoes,
	LA=[Act|_],
	((Act==Dest,!,bestfs12(Dest,[LA|LLA1],MaxLigacoes,Cam,Custo,EmocoesProibidas))
	 ;
	 (
	  findall((CX,[X|LA]),((ligacao(Act,X,CX,_,_,_);ligacao(X,Act,_,CX,_,_)),
	  \+member(X,LA),
	  (X == Dest;(no(X,_,Emocao),verificarEmocoes(Emocao,EmocoesProibidas))))
	  ,Novos),
	  Novos\==[],!,
	  sort(0,@>=,Novos,NovosOrd),
	  retira_custos(NovosOrd,NovosOrd1),
	  append(NovosOrd1,LLA1,LLA2),
	  bestfs12(Dest,LLA2,MaxLigacoes,Cam,Custo,EmocoesProibidas)
	 )).

calcula_custo([Act,X],C):-!,(ligacao(Act,X,C,_, _,_);ligacao(X,Act,_,C,_,_)).
calcula_custo([Act,X|L],S):-calcula_custo([X|L],S1),
					(ligacao(Act,X,FL,_,_,_);ligacao(X,Act,_,FL,_,_)),S is S1+FL.




%-----------------------------------------------
% Funcao que recebe o valor da forcas de ligacao e o valor da forca de
% relacao e devolve o valor combinado das duas, de acordo com os
% exemplos apresentados nos pdfs de apoio.


funcaoMulticriterio(ForcaLigacao, ForcaRelacao, Resultado):-
		aplicarLimitesNaForcaRelacao(ForcaRelacao, FR),
		F is FR + 200,
		PFR is (F * 100 / 400) /2,
		PFL is ForcaLigacao / 2,
		Resultado is PFR + PFL.


aplicarLimitesNaForcaRelacao(ForcaRelacao,-200):-
		ForcaRelacao < -200,!.

aplicarLimitesNaForcaRelacao(ForcaRelacao,200):-
		ForcaRelacao > 200,!.

aplicarLimitesNaForcaRelacao(ForcaRelacao, ForcaRelacao).


%-------------------------------------------------------------------
% Sugerir grupos com base no numero de utilizadores,numero de tags e
% tags obrigatorias.


sugerirGrupos(Utilizador, NumeroTags,TagsObrigatorias,NumeroUtilizadores, Grupos):-
	       length(TagsObrigatorias, TamanhoObrigatorias),
	       TamanhoObrigatorias =< NumeroTags,
	       findall((USU,T),
		       (   x_tags_em_comum(NumeroTags,T,U),
			   member(Utilizador,U),
			   delete(U, Utilizador, USU),
			   length(USU, Tam),
			   Tam >= NumeroUtilizadores,
			   temTagsObrigatorias(TagsObrigatorias,T)
		       ),
		       Grupos).


temTagsObrigatorias([],_).

temTagsObrigatorias([Obrigatoria|Obrigatorias], Tags):-
		temTag(Obrigatoria,Tags),
		temTagsObrigatorias(Obrigatorias, Tags).




%-----------------------------------------------------------------
% Uma vez que cada utilizador so tem uma emocao definida, foi
% implementado este metodos para gerar todos os valores das restantes
% emocoes. Assim se um utilizador estiver Alegre, tera a emocao Alegre a
% 0.6 e todas as restantes a 0.5.

emocao("Alegre").
emocao("Angustiado").
emocao("Esperancoso").
emocao("Medroso").
emocao("Aliviado").
emocao("Desapontado").
emocao("Orgulhoso").
emocao("Com_Remorso").
emocao("Agradecido").
emocao("Zangado").

emocaoOposta("Alegre","Angustiado").
emocaoOposta("Esperancoso","Medroso").
emocaoOposta("Aliviado","Desapontado").
emocaoOposta("Orgulhoso","Com_Remorso").
emocaoOposta("Agradecido", "Zangado").



simularRestantesEmocoes(EmocaoAtual, ListaEmocoes):-
		findall(E, emocao(E), Emocoes),
		(   emocaoOposta(EmocaoAtual, EmocaoOposta);emocaoOposta(EmocaoOposta,EmocaoAtual)),
		percorrerListaEmocoes(EmocaoAtual,EmocaoOposta, Emocoes, [], ListaEmocoes).



percorrerListaEmocoes(_,_,[],Res, Res):-!.
percorrerListaEmocoes(EmocaoAtual,EmocaoOposta,[EmocaoAtual|Emocoes], ListaAtual, Res):-
		percorrerListaEmocoes(EmocaoAtual,EmocaoOposta, Emocoes, [(EmocaoAtual, 0.6)|ListaAtual], Res),!.

percorrerListaEmocoes(EmocaoAtual, EmocaoOposta, [EmocaoOposta|Emocoes], ListaAtual, Res):-
		percorrerListaEmocoes(EmocaoAtual,EmocaoOposta, Emocoes, [(EmocaoOposta, 0.4)|ListaAtual], Res),!.


percorrerListaEmocoes(EmocaoAtual,EmocaoOposta, [Emocao|Emocoes], ListaAtual, Res):-
		percorrerListaEmocoes(EmocaoAtual,EmocaoOposta, Emocoes, [(Emocao, 0.5)|ListaAtual], Res).


minimo(Valor, ValorSaturacao, Valor):- Valor < ValorSaturacao,!.
minimo(Valor, ValorSaturacao, ValorSaturacao):- ValorSaturacao < Valor, !.
minimo(Valor, _, Valor).


%----------------------------------------------------------
% Permite verificar se um utilizador não possui nenhuma das emocoes
% contidas no segundo parametro. Isto e, se nenhuma emocao que esteja na
% lista do segundo parametro tenha um valor superior a 0.5 (neutro).


verificarEmocoes(_, []):-!.
verificarEmocoes([],_):-!.

verificarEmocoes([(Emocao,_)|Lem], Emocoes):-
		\+ member(Emocao, Emocoes),
		verificarEmocoes(Lem,Emocoes),!.

verificarEmocoes([(Emocao, Valor)|Lem], Emocoes):-
		member(Emocao, Emocoes),
		Valor =< 0.5,
		verificarEmocoes(Lem, Emocoes).


%---------------------------------------------------------------------
% Métodos que permitem variar os valores de uma determinada emocao de
% acordo com as formulas apresentadas nos pdfs.

aumentarEmocao(EmocaoT,Valor,ValorMaximo,EmocaoT1):-
		minimo(Valor,ValorMaximo, M),
		V1 is M / ValorMaximo,
		V2 is 1 - EmocaoT,
		EmocaoT1 is EmocaoT + (V2 * V1).

diminuirEmocao(EmocaoT,Valor,ValorMaximo,EmocaoT1):-
		minimo(Valor,ValorMaximo,M),
		V1 is M /ValorMaximo,
		V2 is 1 - V1,
		EmocaoT1 is EmocaoT * V2.

% ------------------------------------------------------------------------
% Atualização das emoções de alegria-angustia, dependendo do numero de
% likes e de dislikes.

atualizarAlegriaAngustia(AlegriaT,AngustiaT,Likes,Likes,AlegriaT,AngustiaT):-!.
atualizarAlegriaAngustia(AlegriaT, AngustiaT,Likes,Dislikes, AlegriaT1, AngustiaT1):-
		DF is Likes - Dislikes,
		DF > 0,
		valorSaturacaoLikesDislikes(S),
		aumentarEmocao(AlegriaT,DF,S,AlegriaT1),
		diminuirEmocao(AngustiaT,DF,S,AngustiaT1),!.

atualizarAlegriaAngustia(AlegriaT, AngustiaT,Likes,Dislikes, AlegriaT1, AngustiaT1):-
		DF is Likes - Dislikes,
		DF < 0,
		D is 0 - DF,
		valorSaturacaoLikesDislikes(S),
		aumentarEmocao(AngustiaT,D,S,AngustiaT1),
		diminuirEmocao(AlegriaT,D,S,AlegriaT1),!.


valorSaturacaoLikesDislikes(200).

% Atualizacao das emocoes esperanca-medo e alivio-dececao, dependendo do
% numero de utilizadores desejados e dos nao desejados que apareceram
% num grupo.


atualizarEsperancaMedoAlivioDececao(EsperancaT,MedoT,AlivioT,DececaoT,Desejados,NaoDesejados,DesejadosResultado,NaoDesejadosResultado,EsperancaT1,MedoT1,AlivioT1,DececaoT1):-
		VMD is Desejados / 2,
		VMND is NaoDesejados / 2,

		minimo(Desejados,DesejadosResultado,DR),
		DD is Desejados - DR,
		(   (DesejadosResultado > VMD,!,aumentarEmocao(EsperancaT,DesejadosResultado,Desejados,EsperancaT1),diminuirEmocao(DececaoT,DD,Desejados,DececaoT1));
		(DesejadosResultado < VMD,!,diminuirEmocao(EsperancaT,DesejadosResultado,Desejados,EsperancaT1),aumentarEmocao(DececaoT,DD,Desejados,DececaoT1));
		(EsperancaT1 is EsperancaT,DececaoT1 is DececaoT)),

		minimo(NaoDesejados,NaoDesejadosResultado,NDR),
		DND is NaoDesejados - NDR,
		(   (NaoDesejadosResultado > VMND,!,aumentarEmocao(AlivioT,DND,NaoDesejados,AlivioT1),diminuirEmocao(MedoT,NaoDesejadosResultado,NaoDesejados,MedoT1));
		(NaoDesejadosResultado < VMND,!,diminuirEmocao(AlivioT,DND,NaoDesejados,AlivioT1),aumentarEmocao(MedoT,NaoDesejadosResultado,NaoDesejados,MedoT1));
		(MedoT1 is MedoT,AlivioT1 is AlivioT)).




%----------------------------------------------------------------
%


atualizarEmocaoUtilizadorLikeDislike(Utilizador,Likes,Dislikes,NovasEmocoes):-
		no(Utilizador,_,Lem),
		procurarValorEmocao(Lem,"Alegre",AlegriaT),
		procurarValorEmocao(Lem,"Angustiado",AngustiaT),
		atualizarAlegriaAngustia(AlegriaT,AngustiaT,Likes,Dislikes,AlegriaT1,AngustiaT1),
		atualizarListaEmocoes(Lem,"Alegre",AlegriaT1, Lem1),
		atualizarListaEmocoes(Lem1, "Angustiado",AngustiaT1, NovasEmocoes).

atualizarEmocaoUtilizadorGrupos(Utilizador,Desejados,NaoDesejados,DesejadosResultado,NaoDesejadosResultado,NovasEmocoes):-
		no(Utilizador,_,Lem),
		procurarValorEmocao(Lem,"Esperancoso",EsperancaT),
		procurarValorEmocao(Lem,"Medroso",MedoT),
		procurarValorEmocao(Lem,"Aliviado",AlivioT),
		procurarValorEmocao(Lem,"Desapontado",DececaoT),
	       atualizarEsperancaMedoAlivioDececao(EsperancaT,MedoT,AlivioT,DececaoT,Desejados,NaoDesejados,DesejadosResultado,NaoDesejadosResultado,EsperancaT1,MedoT1,AlivioT1,DececaoT1),
		atualizarListaEmocoes(Lem,"Esperancoso",EsperancaT1, Lem1),
		atualizarListaEmocoes(Lem1, "Medroso",MedoT1, Lem2),
		atualizarListaEmocoes(Lem2, "Aliviado",AlivioT1, Lem3),
		atualizarListaEmocoes(Lem3, "Desapontado",DececaoT1, NovasEmocoes).








atualizarListaEmocoes(ListaEmocoes,Emocao, Valor,NovaLista):-
		atualizarListaEmocoes1(ListaEmocoes,Emocao,Valor,[],NovaLista).


atualizarListaEmocoes1([],_,_,L,L):-!.
atualizarListaEmocoes1([(Emocao,_)|ListaEmocoes],Emocao,Valor,L, NovaLista):-
		atualizarListaEmocoes1(ListaEmocoes,Emocao,Valor,[(Emocao,Valor)|L],NovaLista),!.

atualizarListaEmocoes1([(E,V)|ListaEmocoes],Emocao,Valor,L, NovaLista):-
		atualizarListaEmocoes1(ListaEmocoes,Emocao,Valor,[(E,V)|L],NovaLista),!.

procurarValorEmocao([(Emocao,Valor)|_], Emocao, Valor):-!.
procurarValorEmocao([_|L],Emocao,Valor):-
		procurarValorEmocao(L, Emocao,Valor).













