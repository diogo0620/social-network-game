import { expect } from 'chai';
import Post from '../../src/model/post.model';
import sinon from "sinon";
import {fazerDislike, fazerLike, getPostById, getPostsByUtilizador, getPostsByUtilizadores, getTodosPosts, novoPost } from "../../src/service/post.service";
import { Mocking } from './mock.test';




  describe('Novo post.', () => {

    Mocking.iniciarMocking();

    const oPost = {"utilizadorId":"aaaa", "texto":"texto de teste", "tags": [], "reacoes": [], "data": new Date()}

    it('Post adicionado á base de dados.', async () => {
        const postCriado = await novoPost(oPost);
        expect(postCriado).to.equals(Mocking.post1);
    });



  })


describe('Procurar posts.', () => {

    Mocking.iniciarMocking();

    it('Procurar todos os posts.', async () => {
      const postsEncontrados = await getTodosPosts();
      expect(postsEncontrados).to.equals(Mocking.posts);
    })
  
    it("Procurar posts por id.", async () => {
        const postsEncontrados = await getPostById("1");
        expect(postsEncontrados).to.equals(Mocking.post1);
    })

    it('Procurar posts por utilizador.', async () => {
      const postsEncontrados = await getPostsByUtilizador("8ecc1fc0-2cfb-451d-87ee-c7164bbf2ab2");
      expect(postsEncontrados).to.equals(Mocking.post1);
    })  
})

describe('Fazer like no post.', () => {

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


  it('Falha se o utilizador já tiver like no post.', async () => {
    var falhou : boolean = false;
    try{
      const fazerLIke = await fazerLike("postID", "aaaa");
      falhou = false;
    }catch(Error ){
      falhou = true;
    }
    
    expect(falhou).to.equals(true);
  })


});

describe('Fazer dislike no post.', () => {

  Mocking.iniciarMocking();

  it('Falha se não for especificado o utilizador.', async () => {
    var falhou : boolean = false;
    try{
      const fazerLIke = await fazerDislike("aaa", "");
      falhou = false;
    }catch(Error ){
      falhou = true;
    }
    
    expect(falhou).to.equals(true);
  });


  it('Falha se o utilizador já tiver dislike no post.', async () => {
    var falhou : boolean = false;
    try{
      const fazerLIke = await fazerDislike("postID", "aaaa");
      falhou = false;
    }catch(Error ){
      falhou = true;
    }
    
    expect(falhou).to.equals(true);
  })


});


