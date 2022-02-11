import * as THREE from "three";
import { IUtilizador } from "../../interfaces/IUtilizador";
import { ILigacao } from '../../interfaces/ILigacao';
import Utilizador from "./utilizador";
import Ligacao from "./ligacao";



export default class Rede{


    objeto : THREE.Group;
    utilizadores !: Utilizador[];
    ligacoes !: Ligacao[];
    utilizadores_mesh !: THREE.Mesh[];
    ligacoes_mesh !: THREE.Mesh[];
    private utilizadoresAdicionados : Utilizador[] = [];

    private raioUtilizador = 2;
    private distanciaNiveis = 15;
    utilizadorAutenticado : IUtilizador;


    constructor(private rede : ILigacao[][], private utilizador : IUtilizador){

        this.objeto = new THREE.Group();
        this.utilizadores = new Array<Utilizador>();
        this.ligacoes = new Array<Ligacao>();
        this.utilizadores_mesh = new Array<THREE.Mesh>();
        this.ligacoes_mesh = new Array<THREE.Mesh>();

        if(rede[0].length > 0){
            
            this.utilizadorAutenticado = this.rede[0][0].utilizadorA;

            this.criarUtilizadorPrincipal();
            this.carregarRede(this.rede);
        }else{
            this.utilizadorAutenticado = utilizador;
            this.criarUtilizadorPrincipal();
        }
 
    }

    atualizarRede(rede : ILigacao[][]){
        this.objeto.children = [];
        this.utilizadores = [];
        this.ligacoes = [];
        this.utilizadores_mesh = [];
        this.ligacoes_mesh = [];
        this.utilizadoresAdicionados = [];
        this.utilizadorAutenticado = this.rede[0][0].utilizadorA;
        this.criarUtilizadorPrincipal();
        this.carregarRede(rede);
    }

  
    
    private carregarRede(rede : ILigacao[][]){
        for(var nivel = 0; nivel < rede.length; nivel++){
            for(var l = 0; l < rede[nivel].length; l++){
                const ligacao = rede[nivel][l];
                this.carregarLigacao(ligacao, this.numeroLigacoes(ligacao.utilizadorA,nivel, rede), nivel);
            }
        }
    }

    private numeroLigacoes(no : IUtilizador, nivel : number, rede : ILigacao[][]):number{
        var res = 0;
        for(var l = 0; l < rede[nivel].length; l++){
            const ligacao = rede[nivel][l];
            if(ligacao.utilizadorA.email == no.email || ligacao.utilizadorB.email == no.email){
                res++;
            }
        }
        return res;
        
    }



    private carregarLigacao(ligacao : ILigacao, nrLigacoesParaNo : number, nivel : number){

        var angulo = (Math.PI) / (nrLigacoesParaNo);
        if(nivel == 0){
            angulo = (2*Math.PI) / (nrLigacoesParaNo);
        }
        

        const utiA = this.getNo(ligacao.utilizadorA.email);
        const utiB = this.getNo(ligacao.utilizadorB.email);
        if(utiB != null){
            const x_1 = utiA.objeto.position.x;
            const y_1 = utiA.objeto.position.y;

            const x_2 = utiB.objeto.position.x;
            const y_2 = utiB.objeto.position.y;

            const largura = ligacao.forcaLigacao * 0.15;
            const l = new Ligacao(x_1, y_1, x_2, y_2, largura, utiA, utiB);
            this.ligacoes.push(l);
            this.ligacoes_mesh.push(l.object);
            this.objeto.add(l.object);
        }else{

            // Cores por niveis
            var cor;
            if(nivel == 0)
                cor = 'white';

            else if(nivel == 1)
                cor = 'yellow';

            else
                cor = 'red'
            
            var ang =  (utiA.anguloComAnterior-(0.4*Math.PI)) + (angulo * utiA.numeroLigacoes);

            if(nivel == 0){
                ang = (utiA.anguloComAnterior) + (angulo * utiA.numeroLigacoes);
            }
            
    
            const utilizador_x = utiA.objeto.position.x + (Math.cos(ang) * (this.distanciaNiveis));
            const utilizador_y = utiA.objeto.position.y + (Math.sin(ang) * (this.distanciaNiveis));
    
            utiA.numeroLigacoes++;
    
    
            const x_1 = utiA.objeto.position.x //+ (Math.cos(ang) * this.raioUtilizador);
            const y_1 = utiA.objeto.position.y //+ (Math.sin(ang) * this.raioUtilizador);
    
            const x_2 = utilizador_x //- (Math.cos(ang) * this.raioUtilizador);
            const y_2 = utilizador_y //- (Math.sin(ang) * this.raioUtilizador);
    
    
    
            const uti = new Utilizador(utilizador_x, utilizador_y, ligacao.utilizadorB.avatar, ligacao.utilizadorB.tags, ligacao.utilizadorB.nome, ligacao.utilizadorB.email, ligacao.utilizadorB.estadoEmocional, this.raioUtilizador, cor, ang);
    
    
            this.utilizadoresAdicionados.push(uti);
            this.utilizadores.push(uti);
            this.utilizadores_mesh.push(uti.objeto);
            this.objeto.add(uti.objeto);
    
            const largura = ligacao.forcaLigacao * 0.15;
            const l = new Ligacao(x_1, y_1, x_2, y_2, largura, utiA, uti);
            this.ligacoes.push(l);
            this.ligacoes_mesh.push(l.object);
            this.objeto.add(l.object);
        }
        
    }


    

    private getNo(email : string):Utilizador{
        var uti : Utilizador;
        this.utilizadoresAdicionados.forEach(u => {
            if(u.email == email){
                uti = u;
            }
        });

        return uti!;
    }

  
    
    private criarUtilizadorPrincipal(){

        const cor = 'green';

        const uti = new Utilizador(0, 0, this.utilizadorAutenticado.avatar, this.utilizadorAutenticado.tags, "Eu", this.utilizadorAutenticado.email, this.utilizadorAutenticado.estadoEmocional, this.raioUtilizador, cor, 0);
        this.utilizadoresAdicionados.push(uti);
    
        this.utilizadores.push(uti);
        this.utilizadores_mesh.push(uti.objeto);
        this.objeto.add(uti.objeto);
    }

    
    
    

}