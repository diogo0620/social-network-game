# social-network-game

## 1. Objetivo pretendido

Pretende-se o desenvolvimento de um protótipo para um jogo baseado na visualização e manipulação de grafos sociais.

O protótipo inicial deve ser constituído pelos seguintes módulos:
- Jogo 3D com componentes de inteligência artificial
- Gestão de rede social e dados mestres
- Leaderboard e consultas

Tratando-se de um sistema protótipo, é aceitável que apenas algumas funcionalidades estejam implementadas, devendo constar no relatório de proposta quais as funcionalidades implementadas. O Jogo simula uma rede social e o jogador tem por objetivo expandir a sua rede social, com o objetivo último de ter a maior e mais forte rede social possível. O jogo desenrola-se numa série de missões em que o jogador terá que avançar e aumentar a sua rede para subir no leader board. Um utilizador pode iniciar um jogo/missão em qualquer momento escolhendo o nível de dificuldade pretendido.

As missões consistem em tornar-se amigo de outro utilizador separado por n graus de distância, em que n será tanto maior quanto maior a dificuldade do nível. O sistema escolherá alguém que esteja a essa distância (tendo por base as tags e conexões partilhadas) e depois o jogador terá que ir jogando para se fazer “amigo” de cada nó desse percurso até chegar à pessoa desejada. Uma missão bem concluída significa que o utilizador consegue cria uma ligação direta com o utilizador objetivo que se encontrava a n níveis de distância.

Cada utilizador possui ligações com outros utilizadores, podendo catalogar essas ligações de acordo com etiquetas (tags) e “força de ligação”. Além da força de ligação atribuída pelo utilizador, por exemplo 5, também é possível calcular a força de uma relação entre dois utilizadores pelo número de likes menos o número de dislikes de um utilizador nos posts e comentários do outro. Nesse sentido a força de ligação é unidirecional. Cada utilizador possui um perfil ao qual pode associar um conjunto de tags relativas a interesses seus, entre outra informação (ex., nome, data de nascimento, nº telefone, email, perfil Linkedin, perfil Facebook). Cada utilizador possui também no seu perfil informação sobre o seu “estado emocional”, usando o modelo emocional de OCC2 (Ortony, Clore, Collins) que admite um conjunto de pares antagónicos de emoções (alegria-angústia; esperança-medo; alívio-deceção; orgulho-remorsos; gratidão-raiva; gosto (like)-não_gosto (dislike).

Embora o sistema conheça toda a rede social, cada utilizador vê a rede a partir da sua perspetiva, ou seja, ele será o nó “central” do seu grafo. A rede social de um dado utilizador é visível até n níveis (ex., nível 2 corresponde aos amigos dos amigos). 

