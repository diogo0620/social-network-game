import * as THREE from "three";


export default class Utilizador{

    private posicao_x : number;
    private posicao_y : number;
    nome : string;
    email : string;
    avatar : string;
    tags: string[];
    estadoEmocional : string;
    private textura! : THREE.Texture;
    objeto! : THREE.Mesh;
    numeroLigacoes : number;
    anguloComAnterior : number;

    

    constructor(posicao_x : number, posicao_y : number, avatar: string, tags: string[], nome: string, email : string, estadoEmocional : string, raio:number, cor: string, anguloComAnterior : number){

        
        this.numeroLigacoes = 0;
        this.posicao_x = posicao_x;
        this.posicao_y = posicao_y;
        this.nome = nome;
        this.email = email;
        this.avatar = avatar;
        this.tags = tags;
        this.estadoEmocional = estadoEmocional;
        this.anguloComAnterior = anguloComAnterior;
        this.criarTextura();

        

   
        /*
        const geometria = new THREE.CircleGeometry(raio, 32);
        const material = new THREE.MeshBasicMaterial({color: cor, map:this.textura})
        */

        const geometry = new THREE.SphereGeometry( raio, 32, 16 );
        const material = new THREE.MeshPhongMaterial( { color: cor, map: this.textura, shininess: 50 } );

        this.objeto = new THREE.Mesh( geometry, material );
        this.objeto.castShadow = true;
        this.objeto.receiveShadow = true;
        this.objeto.position.set(posicao_x, posicao_y, 0);



    }
    

    private criarTextura(){
        //create image
        var bitmap = document.createElement('canvas');
    
        var g = bitmap.getContext('2d')!;
        bitmap.width = 200;
        bitmap.height = 200;
        g.font = 'Bold 20px Arial';
     
        let name = this.nome;
        const tamanho = name.length;

        g.fillStyle = 'white';
        g.fillText(name, 50 - tamanho, 100);
        g.strokeStyle = 'black';
        g.strokeText(name, 50 - tamanho, 100);
     
        // canvas contents will be used for a texture
        var tex = new THREE.Texture(bitmap) 
        tex.needsUpdate = true;
     
        this.textura = tex;

    }

}