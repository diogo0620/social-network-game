import Comentario from '../../src/model/comentario.model';
import sinon from "sinon";
import { fazerDislike, fazerLike, getComentarioById, getComentarioByPost, novoComentario } from "../../src/service/comentario.service";
import Post from '../../src/model/post.model';
import { expect } from 'chai';
import { Mocking } from './mock.test';




describe('Novo comentário.', () => {

    Mocking.iniciarMocking();

    const comentario = {"utilizadorId":"aaaa", "texto":"texto de teste", "tags": [], "reacoes": [], "data": new Date(), "postId": "3"};

    it('Falha se post especificado não existir.', async () => {

        var falhou : boolean = false;
        try{
            const comentarioCriado = await novoComentario(comentario);
            falhou = false;
        }catch(Error){
            falhou = true;
        }

        expect(falhou).to.equals(true);
    })

    const outroComentario = {"utilizadorId":"aaaa", "texto":"texto de teste", "tags": [], "reacoes": [], "data": new Date(), "postId": "1"};

    it('Comentário adicionado á base de dados.', async () => {
        const comentarioCriado = await novoComentario(outroComentario);
        expect(comentarioCriado).to.equals(Mocking.comentario1);
    })

  })

  describe('Procurar comentários.', () => {
      Mocking.iniciarMocking();

      it('Procurar por id.', async () => {
          var comentariosEncontrados = await getComentarioById("1");
          expect(comentariosEncontrados).to.equals(Mocking.comentario1);

          comentariosEncontrados = await getComentarioById("2");
          expect(comentariosEncontrados).to.equals(Mocking.comentario2);
      })

      it('Procurar por post.', async () => {
        var comentariosEncontrados = await getComentarioByPost("1");
        expect(comentariosEncontrados).to.equals(Mocking.comentario1);

        var comentariosEncontrados = await getComentarioByPost("2");
        expect(comentariosEncontrados).to.equals(Mocking.comentario2);
      })


  })

  describe('Fazer like no comentario.', () => {

    Mocking.iniciarMocking();
  
    it('Falha se não for especificado o utilizador.', async () => {
      var falhou : boolean = false;
      try{
        const fazerLIke = await fazerLike("aaa", "");
        falhou = false;
      }catch(Error ){
        falhou = true;
      }
      
      expect(falhou).to.equals(true);
    });
  
  
    it('Falha se o utilizador já tiver like no comentario.', async () => {
      var falhou : boolean = false;
      try{
        const fazerLIke = await fazerLike("1", "aaaa");
        falhou = false;
      }catch(Error ){
        falhou = true;
      }
      
      expect(falhou).to.equals(true);
    })
  
  
  });

  describe('Fazer dislike no comentário.', () => {

    Mocking.iniciarMocking();
  
    it('Falha se não for especificado o utilizador.', async () => {
      var falhou : boolean = false;
      try{
        const fazerLike = await fazerDislike("aaa", "");
        falhou = false;
      }catch(Error ){
        falhou = true;
      }
      
      expect(falhou).to.equals(true);
    });
  
  
    it('Falha se o utilizador já tiver dislike no comentário.', async () => {
      var falhou : boolean = false;
      try{
        const fazerLIke = await fazerDislike("1", "aaaa");
        falhou = false;
      }catch(Error ){
        falhou = true;
      }
      
      expect(falhou).to.equals(true);
    })
  
  
  });


  


