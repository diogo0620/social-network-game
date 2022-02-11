import Comentario, { ComentarioDocument } from "../../src/model/comentario.model";
import { expect } from 'chai';
import 'mocha';
import exp from "constants";

const comentario = { 
  "postId":"000c0-2gnh-551d-87ee-c7164bbf2ab2",
  "utilizadorId": "8ecc1fc0-2cfb-451d-87ee-c7164bbf2ab2",
  "texto":"hello",
  "tags": ["AAA"],
  "data":"2012-04-23T18:25:43.511Z",
};

const comentario2={
  "postId":"123f3-45gk-741d-87ee-c5564fff2gh6",
  "utilizadorId": "000c0-2cfb-451d-87ee-c7164bbf2ab2",
  "texto":"hello world",
  "tags": ["AAA,CCC"],
  "data":"2018-04-23T18:25:43.511Z",
};

describe('Criar um comentário válido.', () => {
  const oComentario = new Comentario(comentario);

  it("Post onde vai ser adicionado o comentário", () => {
    expect(oComentario.postId).to.equals(comentario.postId);
  });

  it("Texto do comentário", () => {
    expect(oComentario.texto).to.equals(comentario.texto);
  });

  it("Tags do comentário", () => {
    expect(oComentario.tags).to.contains(comentario.tags);
    expect(oComentario.tags.length).to.equals(comentario.tags.length);
  });


  it("Utilizador que fez o comentário", () => {
    expect(oComentario.utilizadorId).to.equals(comentario.utilizadorId);
  })
 
});

describe('Criar outro comentário válido.', () => {
  const oComentario = new Comentario(comentario2);

  it("Post onde vai ser adicionado o comentário", () => {
    expect(oComentario.postId).to.equals(comentario2.postId);
  });

  it("Texto do comentário", () => {
    expect(oComentario.texto).to.equals(comentario2.texto);
  });

  it("Tags do comentário", () => {
    expect(oComentario.tags).to.contains(comentario2.tags);
    expect(oComentario.tags.length).to.equals(comentario2.tags.length);
  });


  it("Utilizador que fez o comentário", () => {
    expect(oComentario.utilizadorId).to.equals(comentario2.utilizadorId);
  })
});