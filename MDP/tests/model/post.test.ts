import Post, { PostDocument } from "../../src/model/post.model";
import { expect } from 'chai';
import 'mocha';

const post = { 
  "utilizadorId": "8ecc1fc0-2cfb-451d-87ee-c7164bbf2ab2",
  "texto":"hello",
  "tags": ["AAA"],
  "data":"2012-04-23T18:25:43.511Z",
};

const post2={
  "utilizadorId": "000c0-2cfb-451d-87ee-c7164bbf2ab2",
  "texto":"hello world",
  "tags": ["AAA,CCC"],
  "data":"2018-04-23T18:25:43.511Z",
};

describe('Criar um post válido.', () => {
  const post1 = new Post(post);
  
  it("Texto do post", () => {
    expect(post1.texto).to.equals(post.texto);
  });

  it("Tags do post", () => {
    expect(post1.tags).to.contains(post.tags);
    expect(post1.tags.length).to.equals(post.tags.length);
  });

  it("Utilizador que fez o post", () => {
    expect(post1.utilizadorId).to.equals(post.utilizadorId);
  })


    

});

describe('Criar outro post válido.', () => {
  const post1 = new Post(post2);
  
  it("Texto do post", () => {
    expect(post1.texto).to.equals(post2.texto);
  });

  it("Tags do post", () => {
    expect(post1.tags).to.contains(post2.tags);
    expect(post1.tags.length).to.equals(post2.tags.length);
  });


  it("Utilizador que fez o post", () => {
    expect(post1.utilizadorId).to.equals(post2.utilizadorId);
  })
});