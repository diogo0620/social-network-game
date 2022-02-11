:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_open)).
:- use_module(library(http/http_cors)).
:- use_module(library(http/http_error)).
:- use_module(library(http/thread_httpd)).
% Bibliotecas JSON
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json)).

:- use_module(main).

:- set_setting(http:cors, [*]).


utilizadores_url("https://social-network-game-mdr.azurewebsites.net/api/utilizadores").
ligacoes_url("https://social-network-game-mdr.azurewebsites.net/api/ligacoes").

% -------------------- Criacao de servidor HTTP no porto 'Porto'

porta(700).

iniciarServidor():-
    porta(P),
    http_server(http_dispatch, [port(P)]).
iniciarServidor(Porto):-
    http_server(http_dispatch, [port(Porto)]).

:- http_handler('/api/caminhoMaisCurto', calcularCaminhoMaisCurto, []).
:- http_handler('/api/caminhoMaisCurtoMulticriterio', calcularCaminhoMaisCurtoMulticriterio, []).

:- http_handler('/api/caminhoMaisForte', calcularCaminhoMaisForte, []).
:- http_handler('/api/caminhoMaisForteMulticriterio', calcularCaminhoMaisForteMulticriterio, []).

:- http_handler('/api/caminhoMaisSeguro', calcularCaminhoMaisSeguro, []).
:- http_handler('/api/caminhoMaisSeguroMulticriterio', calcularCaminhoMaisSeguroMulticriterio, []).

:- http_handler('/api/sugestoes', calcularSugestoes,[]).
:- http_handler('/api/sugestoesGrupos', calcularSugestoesGrupos,[]).
:- http_handler('/api/sugestoesUtilizadores',calcularSugestoesUtilizadores,[]).

:- http_handler('/api/dfs', caminhoDfs, []).
:- http_handler('/api/dfsMulticriterio', caminhoDfsMulticriterio,[]).

:- http_handler('/api/aStar', caminhoAstar, []).
:- http_handler('/api/aStarMulticriterio', caminhoAstarMulticriterio,[]).

:- http_handler('/api/bestFirst', caminhoBestFs, []).
:- http_handler('/api/bestFirstMulticriterio', caminhoBestFsMulticriterio,[]).

:- http_handler('/api/novasEmocoes1', calcularEmocoesLikesDislikes,[]).
:- http_handler('/api/novasEmocoes2', calcularEmocoesGrupos,[]).










adicionarBaseConhecimento():-
    adicionarUtilizadores(),
    adicionarLigacoes().

removerBaseConhecimento():-
    retractall(no(_,_,_)),
    retractall(ligacao(_,_,_,_,_,_)).


% -------------------------- Utilizadores -----------------

adicionarUtilizadores():-
    carregarUtilizadores(Utilizadores),
    carregarUtilizadoresParaBaseConhecimento(Utilizadores).

carregarUtilizadoresParaBaseConhecimento([]):-!.
carregarUtilizadoresParaBaseConhecimento([H|T]):-
    simularRestantesEmocoes(H.get(estadoEmocional), Emocoes),
    asserta(no(H.get(id), H.get(tags), Emocoes)),
    carregarUtilizadoresParaBaseConhecimento(T).


carregarUtilizadores(Dados):-
    utilizadores_url(URL),
    setup_call_cleanup(
        http_open(URL, In, [request_header('Accept'='application/json'), cert_verify_hook(cert_accept_any)]),
        json_read_dict(In, Dados),
        close(In)
    ).


% ------------------------- Ligacoes ---------------------------

adicionarLigacoes():-
    carregarLigacoes(Ligacoes),
    carregarLigacoesParaBaseConhecimento(Ligacoes).

carregarLigacoesParaBaseConhecimento([]):-!.
carregarLigacoesParaBaseConhecimento([H|T]):-
    ligacao(H.get(utilizadorB).get(id), H.get(utilizadorA).get(id), _, _,_,_),
    !,
    retract(ligacao((H.get(utilizadorB)).get(id), (H.get(utilizadorA)).get(id), FL, _, FR,_)),
    asserta(ligacao((H.get(utilizadorA)).get(id), (H.get(utilizadorB)).get(id), H.get(forcaLigacao), FL, H.get(forcaRelacao), FR)),
    carregarLigacoesParaBaseConhecimento(T).


carregarLigacoesParaBaseConhecimento([H|T]):-
    asserta(ligacao((H.get(utilizadorA)).get(id), (H.get(utilizadorB)).get(id), H.get(forcaLigacao), 100, H.get(forcaRelacao), 100)),
    carregarLigacoesParaBaseConhecimento(T).


carregarLigacoes(Ligacoes):-
    ligacoes_url(URL),
    setup_call_cleanup(
        http_open(URL, In, [request_header('Accept'='application/json'), cert_verify_hook(cert_accept_any)]),
        json_read_dict(In, Ligacoes),
        close(In)
    ).


% ---------------------------- HTTP Handler -------
%
caminhoDfs(Pedido):-
    removerBaseConhecimento(),
    adicionarBaseConhecimento(),
    cors_enable(Pedido, [methods([get])]),
    http_parameters(Pedido,
                    [ de(De, []),
                      para(Para,[]),
                      maxLigacoes(MaxL,[optional(true),default(20),integer]),
                      emocoesProibidas(EmocoesP, [optional(true),default('')])
                    ]),

    processarListaJSON(EmocoesP, [], EmocoesProibidas),
    converterListaParaAtom(EmocoesProibidas, [], Emo),
    atom_string(De, O),
    atom_string(Para, D),
    dfs(O, D,C,FT, FM, MaxL, Emo),
    prolog_to_json(caminho1(C,FT,FM), JSONObject),
    reply_json(JSONObject, [json_object(dict)]).

caminhoDfsMulticriterio(Pedido):-
    removerBaseConhecimento(),
    adicionarBaseConhecimento(),
    cors_enable(Pedido, [methods([get])]),
    http_parameters(Pedido,
                    [ de(De, []),
                      para(Para,[]),
                      maxLigacoes(MaxL,[optional(true),default(20),integer]),
                      emocoesProibidas(EmocoesP, [optional(true),default('')])
                    ]),

    processarListaJSON(EmocoesP, [], EmocoesProibidas),
    converterListaParaAtom(EmocoesProibidas, [], Emo),
    atom_string(De, O),
    atom_string(Para, D),
    dfsComMulticriterio(O, D,C,FT, FM, MaxL, Emo),
    prolog_to_json(caminho1(C,FT,FM), JSONObject),
    reply_json(JSONObject, [json_object(dict)]).

caminhoAstar(Pedido):-
    removerBaseConhecimento(),
    adicionarBaseConhecimento(),
    cors_enable(Pedido, [methods([get])]),
    http_parameters(Pedido,
                    [ de(De, []),
                      para(Para,[]),
                      maxLigacoes(MaxL,[optional(true),default(20),integer]),
                      emocoesProibidas(EmocoesP, [optional(true),default('')])
                    ]),

    processarListaJSON(EmocoesP, [], EmocoesProibidas),
    converterListaParaAtom(EmocoesProibidas, [], Emo),
    atom_string(De, O),
    atom_string(Para, D),
    aStar(O, D,MaxL,C,FT,Emo),
    prolog_to_json(caminho2(C,FT), JSONObject),
    reply_json(JSONObject, [json_object(dict)]).

caminhoAstarMulticriterio(Pedido):-
    removerBaseConhecimento(),
    adicionarBaseConhecimento(),
    cors_enable(Pedido, [methods([get])]),
    http_parameters(Pedido,
                    [ de(De, []),
                      para(Para,[]),
                      maxLigacoes(MaxL,[optional(true),default(20),integer]),
                      emocoesProibidas(EmocoesP, [optional(true),default('')])
                    ]),

    processarListaJSON(EmocoesP, [], EmocoesProibidas),
    converterListaParaAtom(EmocoesProibidas, [], Emo),
    atom_string(De, O),
    atom_string(Para, D),
    aStarMulticriterio(O, D,MaxL,C,FT,Emo),
    prolog_to_json(caminho2(C,FT), JSONObject),
    reply_json(JSONObject, [json_object(dict)]).

caminhoBestFs(Pedido):-
    removerBaseConhecimento(),
    adicionarBaseConhecimento(),
    cors_enable(Pedido, [methods([get])]),
    http_parameters(Pedido,
                    [ de(De, []),
                      para(Para,[]),
                      maxLigacoes(MaxL,[optional(true),default(20),integer]),
                      emocoesProibidas(EmocoesP, [optional(true),default('')])
                    ]),

    processarListaJSON(EmocoesP, [], EmocoesProibidas),
    converterListaParaAtom(EmocoesProibidas, [], Emo),
    atom_string(De, O),
    atom_string(Para, D),
    bestfs(O, D,MaxL,C,FT,Emo),
    prolog_to_json(caminho2(C,FT), JSONObject),
    reply_json(JSONObject, [json_object(dict)]).

caminhoBestFsMulticriterio(Pedido):-
    removerBaseConhecimento(),
    adicionarBaseConhecimento(),
    cors_enable(Pedido, [methods([get])]),
    http_parameters(Pedido,
                    [ de(De, []),
                      para(Para,[]),
                      maxLigacoes(MaxL,[optional(true),default(20),integer]),
                      emocoesProibidas(EmocoesP, [optional(true),default('')])
                    ]),

    processarListaJSON(EmocoesP, [], EmocoesProibidas),
    converterListaParaAtom(EmocoesProibidas, [], Emo),
    atom_string(De, O),
    atom_string(Para, D),
    bestfsMulticriterio(O, D,MaxL,C,FT,Emo),
    prolog_to_json(caminho2(C,FT), JSONObject),
    reply_json(JSONObject, [json_object(dict)]).







calcularCaminhoMaisCurto(Pedido):-
    removerBaseConhecimento(),
    adicionarBaseConhecimento(),
    cors_enable(Pedido, [methods([get])]),
    http_parameters(Pedido,
                    [ de(De, []),
                      para(Para,[]),
                      maxLigacoes(MaxL,[optional(true),default(20),integer]),
                      emocoesProibidas(EmocoesP, [optional(true),default('')])
                    ]),

    processarListaJSON(EmocoesP, [], EmocoesProibidas),
    converterListaParaAtom(EmocoesProibidas, [], Emo),
    atom_string(De, O),
    atom_string(Para, D),
    minimoLigacoes(O, D,MaxL,C, N, FT, FM, Emo),
    prolog_to_json(caminho(C,N,FT,FM ), JSONObject),
    reply_json(JSONObject, [json_object(dict)]).

calcularCaminhoMaisCurtoMulticriterio(Pedido):-
    removerBaseConhecimento(),
    adicionarBaseConhecimento(),
    cors_enable(Pedido, [methods([get])]),
    http_parameters(Pedido,
                    [ de(De, []),
                      para(Para,[]),
                      maxLigacoes(MaxL,[optional(true),default(20),integer]),
                      emocoesProibidas(EmocoesP, [optional(true),default('')])
                    ]),
    processarListaJSON(EmocoesP, [], EmocoesProibidas),
    converterListaParaAtom(EmocoesProibidas, [], Emo),
    atom_string(De, O),
    atom_string(Para, D),
    minimoLigacoesMulticriterio(O, D,MaxL,C, N, FT, FM, Emo),
    prolog_to_json(caminho(C,N,FT,FM ), JSONObject),
    reply_json(JSONObject, [json_object(dict)]).


calcularCaminhoMaisForte(Pedido):-
    removerBaseConhecimento(),
    adicionarBaseConhecimento(),
    cors_enable(Pedido, [methods([get])]),
    http_parameters(Pedido,
                    [ de(De, []),
                      para(Para,[]),
                      maxLigacoes(MaxL,[optional(true),default(20),integer]),
                      emocoesProibidas(EmocoesP, [optional(true),default('')])
                    ]),
    processarListaJSON(EmocoesP, [], EmocoesProibidas),
    atom_string(De, O),
    atom_string(Para, D),
    converterListaParaAtom(EmocoesProibidas, [], Emo),
    maisForte(O, D,MaxL,C, N, FT, FM, Emo),
    prolog_to_json(caminho(C,N,FT,FM ), JSONObject),
    reply_json(JSONObject, [json_object(dict)]).

calcularCaminhoMaisForteMulticriterio(Pedido):-
    removerBaseConhecimento(),
    adicionarBaseConhecimento(),
    cors_enable(Pedido, [methods([get])]),
    http_parameters(Pedido,
                    [ de(De, []),
                      para(Para,[]),
                      maxLigacoes(MaxL,[optional(true),default(20),integer]),
                      emocoesProibidas(EmocoesP, [optional(true),default('')])

                    ]),
    processarListaJSON(EmocoesP, [], EmocoesProibidas),
    converterListaParaAtom(EmocoesProibidas, [], Emo),
    atom_string(De, O),
    atom_string(Para, D),
    maisForteMulticriterio(O, D,MaxL,C, N, FT, FM, Emo),
    prolog_to_json(caminho(C,N,FT,FM ), JSONObject),
    reply_json(JSONObject, [json_object(dict)]).


calcularCaminhoMaisSeguro(Pedido):-
    removerBaseConhecimento(),
    adicionarBaseConhecimento(),
    cors_enable(Pedido, [methods([get])]),
    http_parameters(Pedido,
                    [ de(De, []),
                      para(Para,[]),
                      forcaMinima(ForcaMinima, []),
                      maxLigacoes(MaxL,[optional(true),default(20),integer]),
                      emocoesProibidas(EmocoesP, [optional(true),default('')])
                    ]),
    processarListaJSON(EmocoesP, [], EmocoesProibidas),
    converterListaParaAtom(EmocoesProibidas, [], Emo),
    atom_string(De, O),
    atom_string(Para, D),
    atom_number(ForcaMinima, ForcaM),
    maisSeguro(O, D,MaxL,ForcaM, C, N, FT, FM, Emo),
    prolog_to_json(caminho(C,N,FT,FM ), JSONObject),
    reply_json(JSONObject, [json_object(dict)]).

calcularCaminhoMaisSeguroMulticriterio(Pedido):-
    removerBaseConhecimento(),
    adicionarBaseConhecimento(),
    cors_enable(Pedido, [methods([get])]),
    http_parameters(Pedido,
                    [ de(De, []),
                      para(Para,[]),
                      forcaMinima(ForcaMinima, []),
                      maxLigacoes(MaxL,[optional(true),default(20),integer]),
                      emocoesProibidas(EmocoesP, [optional(true),default('')])
                    ]),
    processarListaJSON(EmocoesP, [], EmocoesProibidas),
    converterListaParaAtom(EmocoesProibidas, [], Emo),
    atom_string(De, O),
    atom_string(Para, D),
    atom_number(ForcaMinima, ForcaM),
    maisSeguroMulticriterio(O, D,MaxL,ForcaM, C, N, FT, FM, Emo),
    prolog_to_json(caminho(C,N,FT,FM ), JSONObject),
    reply_json(JSONObject, [json_object(dict)]).


calcularSugestoes(Pedido):-
    removerBaseConhecimento(),
    adicionarBaseConhecimento(),
    cors_enable(Pedido, [methods([get])]),
    http_parameters(Pedido,
                    [ para(Para, []),
                      numeroTags(Nr, [])
                    ]),
    atom_string(Para, Uti),
    atom_number(Nr, Numero),
    sugerirConexoesPorTags(Uti,Numero,R),
    prolog_to_json(listaUtilizadores(R), JSONObject),
    reply_json(JSONObject, [json_object(dict)]).

calcularSugestoesGrupos(Pedido):-
    removerBaseConhecimento(),
    adicionarBaseConhecimento(),
    cors_enable(Pedido, [methods([get])]),
    http_parameters(Pedido,
                    [ para(Para, []),
                      numeroUtilizadores(NrUti, []),
                      numeroTags(NrTags,[]),
                      tagsObrigatorias(Tags,[optional(true),default('')])
                    ]),

    atom_string(Tags,Obrigatorias),
    atom_string(Para, Uti),
    atom_number(NrUti, NumeroUtilizadores),
    atom_number(NrTags, NumeroTags),
    processarListaJSON(Obrigatorias,[],ListaTags),
    sugerirGruposServidor(Uti, NumeroTags, ListaTags, NumeroUtilizadores, G, T),
    prolog_to_json(sugestaoGrupo(G,T), JSONObject),
    reply_json(JSONObject, [json_object(dict)]).

calcularSugestoesUtilizadores(Pedido):-
    removerBaseConhecimento(),
    adicionarBaseConhecimento(),
    cors_enable(Pedido, [methods([get])]),
    http_parameters(Pedido,
                    [ para(Para, []),
                      numeroTags(NrTags,[])
                    ]),
    atom_string(Para, Uti),
    atom_number(NrTags, NumeroTags),
    sugerirConexoesPorTags(Uti, NumeroTags,Sugestoes),
    prolog_to_json(listaUtilizadores(Sugestoes), JSONObject),
    reply_json(JSONObject, [json_object(dict)]).

calcularEmocoesLikesDislikes(Pedido):-
    removerBaseConhecimento(),
    adicionarBaseConhecimento(),
    cors_enable(Pedido, [methods([get])]),
    http_parameters(Pedido,
                    [ para(Para, []),
                      likes(Likes,[]),
                      dislikes(Dislikes,[])
                    ]),
    atom_string(Para, Uti),
    atom_number(Likes, L),
    atom_number(Dislikes, DL),
    atualizarEmocaoUtilizadorLikeDislike(Uti,L,DL,Res),
    separarAtom(Res,[],[],Emocoes,Valores),
    prolog_to_json(listaEmocoes(Emocoes,Valores), JSONObject),
    reply_json(JSONObject, [json_object(dict)]).

calcularEmocoesGrupos(Pedido):-
    removerBaseConhecimento(),
    adicionarBaseConhecimento(),
    cors_enable(Pedido, [methods([get])]),
    http_parameters(Pedido,
                    [ para(Para, []),
                      desejados(D,[]),
                      naoDesejados(ND,[]),
                      desejadosResultado(DR,[]),
                      naoDesejadosResultado(NDR,[])
                    ]),
    atom_string(Para, Uti),
    atom_number(D, Des),
    atom_number(ND, NaoD),
    atom_number(DR, DesR),
    atom_number(NDR, NaoDR),
    atualizarEmocaoUtilizadorGrupos(Uti,Des,NaoD,DesR,NaoDR,Res),
    separarAtom(Res,[],[],Emocoes,Valores),
    prolog_to_json(listaEmocoes(Emocoes,Valores), JSONObject),
    reply_json(JSONObject, [json_object(dict)]).













:- json_object caminho(utilizadores : list, numeroNos : integer, forcaTotal, forcaMinima).
:- json_object caminho1(utilizadores: list, forcaTotal, forcaMinima).
:- json_object caminho2(utilizadores: list, forcaTotal).

:- json_object listaUtilizadores(utilizadores: list).

:- json_object sugestaoGrupo(grupos, tags).
:- json_object listaEmocoes(emocoes:list,valores:list).



sugerirGruposServidor(Utilizador, NumeroTags,TagsObrigatorias,NumeroUtilizadores, Grupos, Tags):-
               sugerirGrupos(Utilizador, NumeroTags,TagsObrigatorias,NumeroUtilizadores,R),
               xyz(R, [], [], Grupos, Tags).



xyz([],Grupos,Tags,Grupos,Tags):-!.
xyz([(Utis,Ts)|Outros],GruposAtuais, TagsAtuais, Grupos,Tags):-
    append([Utis],GruposAtuais, NovosGrupos),
    append([Ts],TagsAtuais, NovasTags),
    xyz(Outros, NovosGrupos, NovasTags, Grupos,Tags).

sugerirConexoesPorTags(Utilizador, Numero, Sugestoes):-
    findall(NaoAmigos, (
                 x_tags_em_comum(Numero, _, Utilizadores),
		 member(Utilizador, Utilizadores),
		 delete(Utilizadores,Utilizador,Utis),
                 length(Utis,Tam),
                 Tam > 0,
		 retirarAmigos(Utilizador,Utis, NaoAmigos)
             ),
             Resultado),
    processarResultados(Resultado,[],Sugestoes).

retirarAmigos(Utilizador,ListaUtilizador,NaoAmigos):-
		verificarAmizade(Utilizador,ListaUtilizador,[],NaoAmigos).

verificarAmizade(_,[],NaoAmigos,NaoAmigos):-!.
verificarAmizade(Utilizador, [Sugestao|Outros],Lista, NaoAmigos):-
		\+ ligacao(Utilizador,Sugestao,_,_,_,_),
		\+ ligacao(Sugestao,Utilizador,_,_,_,_),
		verificarAmizade(Utilizador,Outros, [Sugestao|Lista], NaoAmigos),!.
verificarAmizade(Utilizador,[_|Outros],Lista,NaoAmigos):-
		verificarAmizade(Utilizador,Outros,Lista,NaoAmigos).



processarResultados([],L,L):-!.
processarResultados([PrimeiroR|Resultados], L, Sugestoes):-
		adicionarSemRepetidos(PrimeiroR, L, L1),
		processarResultados(Resultados,L1,Sugestoes).



separarAtom([],L1,L2,L1,L2):-!.
separarAtom([(X,Y)|L],LT1,LT2,L1,L2):-
    append([X],LT1,LTT1),
    append([Y],LT2,LTT2),
    separarAtom(L,LTT1,LTT2,L1,L2).



processarListaJSON(_,[''],[]):-!.
processarListaJSON(JSON,[],Lista):-
    atomic_list_concat(T,',',JSON),
    processarListaJSON(JSON, T, Lista),!.

processarListaJSON(_,L,L).


converterListaParaAtom([],L,L):-!.
converterListaParaAtom([El|Lista], L, Res):-
    atom_string(El, Novo),
    converterListaParaAtom(Lista,[Novo|L], Res).















