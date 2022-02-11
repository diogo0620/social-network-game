:- use_module(main).

no(1,[natureza,pintura,musica,sw,porto],[("Alegre", 0.6), ("Angustiado", 0.4), ("Esperancoso", 0.5), ("Medroso", 0.5), ("Aliviado", 0.5), ("Desapontado", 0.5), ("Orgulhoso", 0.5),("Com_Remorso",0.5),("Agradecido", 0.5), ("Zangado", 0.5)]).
no(2,[natureza,pintura,carros,futebol,lisboa],[("Alegre", 0.4), ("Angustiado", 0.6), ("Esperancoso", 0.5), ("Medroso", 0.5), ("Aliviado", 0.5), ("Desapontado", 0.5), ("Orgulhoso", 0.5),("Com_Remorso",0.5),("Agradecido", 0.5), ("Zangado", 0.5)]).
no(3,[natureza,musica,carros,porto,moda],[("Alegre", 0.5), ("Angustiado", 0.5), ("Esperancoso", 0.6), ("Medroso", 0.4), ("Aliviado", 0.5), ("Desapontado", 0.5), ("Orgulhoso", 0.5),("Com_Remorso",0.5),("Agradecido", 0.5), ("Zangado", 0.5)]).
no(4,[natureza,musica,sw,futebol,coimbra],[("Alegre", 0.5), ("Angustiado", 0.5), ("Esperancoso", 0.4), ("Medroso", 0.6), ("Aliviado", 0.5), ("Desapontado", 0.5), ("Orgulhoso", 0.5),("Com_Remorso",0.5),("Agradecido", 0.5), ("Zangado", 0.5)]).
no(5,[natureza,cinema,jogos,sw,moda],[("Alegre", 0.5), ("Angustiado", 0.5), ("Esperancoso", 0.5), ("Medroso", 0.5), ("Aliviado", 0.6), ("Desapontado", 0.4), ("Orgulhoso", 0.5),("Com_Remorso",0.5),("Agradecido", 0.5), ("Zangado", 0.5)]).
no(6,[natureza,cinema,teatro,carros,coimbra], [("Alegre", 0.5), ("Angustiado", 0.5), ("Esperancoso", 0.5), ("Medroso", 0.5), ("Aliviado", 0.4), ("Desapontado", 0.6), ("Orgulhoso", 0.5),("Com_Remorso",0.5), ("Agradecido", 0.5), ("Zangado", 0.5)]).
no(7,[natureza,musica,porto,lisboa,cinema],[("Alegre", 0.5), ("Angustiado", 0.5), ("Esperancoso", 0.5), ("Medroso", 0.5), ("Aliviado", 0.5), ("Desapontado", 0.5), ("Orgulhoso", 0.6),("Com_Remorso",0.4),("Agradecido", 0.5), ("Zangado", 0.5)]).
no(8,[natureza,pintura,sw,musica,carros,lisboa],[("Alegre", 0.5), ("Angustiado", 0.5), ("Esperancoso", 0.5), ("Medroso", 0.5), ("Aliviado", 0.5), ("Desapontado", 0.5), ("Orgulhoso", 0.5), ("Com_Remorso",0.5),("Agradecido", 0.6), ("Zangado", 0.4)] ).
no(9,[natureza,pintura,sw,musica,carros,lisboa],[("Alegre", 0.5), ("Angustiado", 0.5), ("Esperancoso", 0.5), ("Medroso", 0.5), ("Aliviado", 0.5), ("Desapontado", 0.5), ("Orgulhoso", 0.5),("Com_Remorso",0.5),("Agradecido", 0.4), ("Zangado", 0.6)]).


ligacao(1,2,10,8,9,-2).
ligacao(1,4,1,6,-5,8).
ligacao(4,3,1,7,10,-134).
ligacao(2,5,4,2,456,23).
ligacao(5,8,8,1,257,-73).
ligacao(6,8,1,7,100,65).
ligacao(7,8,4,3,-992,23).
ligacao(7,3,2,2,454,87).
ligacao(6,3,1,6,23,-788).


%ligacao(6,5,2,3,123,27).
%ligacao(4,7,10,10,89,-23).
%ligacao(2,3, 8, 5,-23,23).
%ligacao(6,7, 2,12,0,0).
%ligacao(3,5,9,13,102,33).
%ligacao(7,9,11,12,-12,-83).
%ligacao(8,9,17,18,323,54).
%ligacao(4,10,11,7,-34,-24).
%ligacao(7,10,9,3,45,-45).
%ligacao(9,10,18,2,65, -76).
%ligacao(1,3,7,10, 223,-34).
%ligacao(2,6,8,10, 345, -2).
%ligacao(4,6,12,4, 43,-9).
%ligacao(8,10,4,23, 23,-52).
%ligacao(5,7,11,10, 32, -98).
%ligacao(1,7,18,3, 23, -23).
%ligacao(3,8,4,7, 23, -34).
%ligacao(1,5,14,9, 43, 56).
%ligacao(3,10,2,6, 23,-6).
%ligacao(2,4,11,21, 23,545).
%ligacao(2,8,15,3, -2,33).
%ligacao(4,5,2,6, -1,-22).
%ligacao(3,9,14,23, -22, 438).
