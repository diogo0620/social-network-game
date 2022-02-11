import { Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ILigacao } from '../../interfaces/ILigacao';
import { UtilizadorService } from '../../services/utilizadores/utilizador.service';
import { LigacoesService } from '../../services/ligacoes/ligacoes.service';
import Rede from './rede';
import { GUI } from 'dat.gui';
import { BooleanKeyframeTrack, Vector2, Vector3 } from 'three';
import { IUtilizador } from 'src/app/interfaces/IUtilizador';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import Utilizador from './utilizador';
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import Swal from 'sweetalert2';



@Component({
  selector: 'app-consultar-rede',
  templateUrl: './consultar-rede.component.html',
  styleUrls: ['./consultar-rede.component.css']
})
export class ConsultarRedeComponent implements OnInit {

  @ViewChild('pagina') pagina!: ElementRef;


  private scene! : THREE.Scene;
  private camera! : THREE.PerspectiveCamera;
  private minimap!: THREE.OrthographicCamera;
  private renderer!: THREE.WebGLRenderer;
  private posicaoClicadaMouse! : THREE.Vector2;
  private posicaoMouse! : THREE.Vector2;
  private controls!: OrbitControls;

  private zoom : number;
  private zoomMinimo : number;
  private zoomMaximo : number;
  private alterarDistanciaCamera : boolean
  private larguraPagina : number;
  private alturaPagina: number;
  private cameraX : number;
  private cameraY : number;
  private sensibilidadeCamera : number;

  private larguraRatio : number;
  private alturaRatio : number;

  private rede! : ILigacao[][];
  private autenticado! : IUtilizador;

  private userInterfaceCheckBox : boolean;

  private keycodes !: string[];
  private clock !: THREE.Clock;
  private deltaT !: number;

  private raycaster_front !: THREE.Raycaster;
  private raycaster_back !: THREE.Raycaster;
  private raycaster_up !: THREE.Raycaster;
  private raycaster_down !: THREE.Raycaster;

  private camera_raycaster !: THREE.Raycaster;

  private frontCollision !: boolean;
  private backCollision !: boolean;
  private upCollision !: boolean;
  private downCollision !: boolean;

  private cameraRotationReset !: THREE.Euler;
  private cameraPositionReset !: THREE.Vector3;

  private utilizadores_mesh !: THREE.Mesh[];
  private ligacoes_mesh !: THREE.Mesh[];
  private colisiveis !: THREE.Mesh[];
  private utilizadores !: Utilizador[];

  private canvas !: HTMLCanvasElement;
  private context !: any;
  private texture !: THREE.Texture;
  private sprite !: THREE.Sprite;

  private emotion_sprites !: THREE.Sprite[];

  private composer !: EffectComposer;
  private renderPass !: RenderPass;
  private outlinePass !: OutlinePass;
  private caminho_outlinePass !: OutlinePass;

  private cameraSpotlight !: THREE.SpotLight;

  private elem_fullscreen !: any;

  nivelDaRede : number;


  redeObjeto! : Rede;


  //private gui! : GUI;



  constructor(private utilizadoresService : UtilizadorService, private ligacoesService : LigacoesService) {
    this.zoom = 0.035;
    this.zoomMinimo = 0.01;
    this.zoomMaximo = 0.5;
    this.larguraPagina = 200;
    this.alturaPagina = 200;
    this.alterarDistanciaCamera = false;
    this.sensibilidadeCamera = 0.0016;
    this.cameraX = 0;
    this.cameraY = 0;
    this.larguraRatio = 0;
    this.alturaRatio = 0;
    this.frontCollision = false;
    this.backCollision = false;
    this.emotion_sprites = new Array<THREE.Sprite>();

    this.userInterfaceCheckBox = false;

    //tecla ‘A’ – rodar para a esquerda; tecla ‘D’ – rodar para a direita; tecla ‘W’ – avançar; tecla ‘S’ – recuar; tecla ‘P’ – subir; tecla ‘L’ - descer
    this.keycodes = ['KeyA', 'KeyD', 'KeyS', 'KeyW', 'KeyP', 'KeyL'];

    this.clock = new THREE.Clock();

    this.nivelDaRede = 1;


  }

  ngAfterViewInit() {
    this.larguraPagina = this.pagina.nativeElement.offsetWidth;
    this.alturaPagina = this.pagina.nativeElement.offsetHeight;

    this.larguraRatio = window.innerWidth / this.larguraPagina;
    this.alturaRatio = window.innerHeight / this.alturaPagina;
  }

  ngOnInit() {

    this.utilizadoresService.getUtilizadorAutenticado().subscribe(
      (utilizador: IUtilizador) => {
         this.autenticado = utilizador;
         this.ligacoesService.getRedeDoUtilizadorAutenticado(this.nivelDaRede).subscribe(
           (suc: ILigacao[][]) => {this.rede = suc;this.inicializar(); this.animar()}
         )
      }
    )
 

  }

  


  private inicializar(){
       // Create a scene
       this.scene = new THREE.Scene();
       this.scene.background = new THREE.Color("#dfdfdf");
       
       // Create an orthographic camera
       const aspectRatio = this.larguraPagina / this.alturaPagina;
       var size = 1;
       if (aspectRatio < 1.0) {
          this.camera = new THREE.PerspectiveCamera(5,aspectRatio,0.1,2000);
          this.minimap = new THREE.OrthographicCamera(-size, size, size / aspectRatio, -size / aspectRatio, 0.1, 2000);
       }
       else {
          this.camera = new THREE.PerspectiveCamera(5,aspectRatio,0.1,2000);
          this.minimap = new THREE.OrthographicCamera(-aspectRatio, aspectRatio, size, -size, 0.1, 2000);
       }
       
       this.camera.position.set(0,0,15);
       this.minimap.position.set(0,0,100);
       
       this.camera.zoom = this.zoom;
       this.minimap.zoom = 0.03;


       this.cameraRotationReset = this.camera.rotation;
       this.cameraPositionReset = this.camera.position;

       //this.atualizarZoom(0);

       // Create a renderer
       this.renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true });
       this.renderer.setSize(this.larguraPagina, this.alturaPagina);
       this.renderer.shadowMap.enabled = true;
       this.pagina.nativeElement.appendChild(this.renderer.domElement);
       this.controls = new OrbitControls (this.camera, this.renderer.domElement);

       


       // Create the game
       this.redeObjeto = new Rede(this.rede, this.autenticado);
       this.scene.add(this.redeObjeto.objeto);
       this.utilizadores_mesh = this.redeObjeto.utilizadores_mesh;
       this.ligacoes_mesh = this.redeObjeto.ligacoes_mesh;
       this.colisiveis = this.utilizadores_mesh; 
       this.colisiveis = this.colisiveis.concat(this.ligacoes_mesh);
       this.utilizadores = this.redeObjeto.utilizadores;

       

       //Create raycasters
       var camPos = this.camera.position;
       var camClone = this.camera.clone();
       var vector = new THREE.Vector3( 0, 0, - 1 );
       var vector_up = new THREE.Vector3( 0, 1, 0 );

       this.raycaster_front = new THREE.Raycaster(camPos, camClone.getWorldDirection( vector ).normalize());
       this.raycaster_back = new THREE.Raycaster(camPos, camClone.getWorldDirection( vector ).negate().normalize());
       this.raycaster_up = new THREE.Raycaster(camPos, camClone.getWorldDirection( vector_up ).normalize());
       this.raycaster_down = new THREE.Raycaster(camPos, camClone.getWorldDirection( vector_up ).normalize().negate());

       this.camera_raycaster = new THREE.Raycaster();

      
       //ELEMENTO CANVAS PARA A CRIAÇÃO DA TIP FLUTUANTE
      // create a canvas element
      this.canvas = document.createElement('canvas');
      this.context = this.canvas.getContext('2d');
      this.context.font = "Bold 20px Arial";
      this.context.fillStyle = "rgba(0,0,0,0.95)";
      this.context.fillText('Hello, world!', 0, 20);
          
      // canvas contents will be used for a texture
      this.texture = new THREE.Texture(this.canvas);
      this.texture.needsUpdate = true;

      var spriteMaterial = new THREE.SpriteMaterial( { map: this.texture } );
	
      //Criação do sprite a ser colocado na canvas da tip
      this.sprite = new THREE.Sprite( spriteMaterial );
      this.sprite.scale.set(20,10,1.0);
      this.sprite.position.set( this.utilizadores[0].objeto.position.x, this.utilizadores[0].objeto.position.y, 0.5 );
      this.scene.add( this.sprite );

      this.sprite.visible = false;
      this.sprite.renderOrder = 999;
      this.sprite.onBeforeRender = function( renderer ) { renderer.clearDepth(); };


      //CONTORNO DO NÓ SELECIONADO ATRAVÉS DO CURSOR
      this.composer = new EffectComposer(this.renderer);
      this.renderPass = new RenderPass( this.scene, this.camera );
      this.composer.addPass( this.renderPass );
      this.outlinePass = new OutlinePass(new THREE.Vector2(this.larguraPagina, this.alturaPagina), this.scene, this.camera);
      this.outlinePass.edgeStrength = 50;
      this.outlinePass.edgeThickness = 1;
      this.outlinePass.edgeGlow = 0;
      this.outlinePass.visibleEdgeColor = new THREE.Color("rgb(0, 255, 255)");
      this.outlinePass.hiddenEdgeColor = new THREE.Color("rgb(0, 100, 100)");
      this.composer.addPass( this.outlinePass );

      this.caminho_outlinePass = new OutlinePass(new THREE.Vector2(this.larguraPagina, this.alturaPagina), this.scene, this.camera);
      this.caminho_outlinePass.edgeStrength = 25;
      this.caminho_outlinePass.edgeThickness = 1;
      this.caminho_outlinePass.edgeGlow = 0;
      this.caminho_outlinePass.pulsePeriod = 0;
      this.caminho_outlinePass.visibleEdgeColor = new THREE.Color("rgb(255, 0, 0)");
      this.caminho_outlinePass.hiddenEdgeColor = new THREE.Color("rgb(100, 0, 0)");
      this.composer.addPass( this.caminho_outlinePass );




      //LIGHTS
      var ambientLight = new THREE.AmbientLight(0xffffff);
      ambientLight.intensity = 0.2;
      this.scene.add(ambientLight);


      var pointLight1 = new THREE.PointLight('white');
      pointLight1.position.set(20, 30, 40);
      pointLight1.intensity = 1;
      pointLight1.distance = 1000;
      pointLight1.lookAt(this.utilizadores_mesh[0].position);
      pointLight1.castShadow = true;
      this.scene.add(pointLight1);


      var pointLight2 = new THREE.PointLight('white');
      pointLight2.position.set(-20, -30, 40);
      pointLight2.intensity = 1;
      pointLight2.distance = 1000;
      pointLight2.lookAt(this.utilizadores_mesh[0].position);
      pointLight2.castShadow = true;
      this.scene.add(pointLight2);

      this.cameraSpotlight = new THREE.SpotLight('red');
      this.cameraSpotlight.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);
      this.cameraSpotlight.intensity = 1;
      this.cameraSpotlight.distance = 0;
      this.cameraSpotlight.penumbra = 1;
      this.cameraSpotlight.castShadow = true;
      this.cameraSpotlight.angle = Math.PI/2;
      this.scene.add(this.cameraSpotlight);




      //Criar label das emoções
      for(let i=0; i<this.utilizadores.length; i++){
        var info_emotion = this.utilizadores[i].estadoEmocional.toLowerCase();
  
        var img_path = "../../../assets/emocao_"+info_emotion+".png";
  
        this.emotion_sprites.push(this.createEmotionBillboardLabel(this.utilizadores_mesh[i].position, img_path));
  
      }


      this.elem_fullscreen = document.getElementById("visualizacao");
       
      this.loadMenu();
  }



  private animar = () =>{

    this.deltaT = this.clock.getDelta();

    if(this.userInterfaceCheckBox == false){
      this.controls.update();
    }

    this.cameraSpotlight.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);
    
    requestAnimationFrame(this.animar);

    let left, bottom, width, height;
    
    left = Math.floor( 0 );
    bottom = Math.floor( 0 );
    width = Math.floor(this.larguraPagina);
    height = Math.floor( this.alturaPagina );
    this.renderer.setViewport( left, bottom, width, height );
    this.renderer.setScissor( left, bottom, width, height );
    this.renderer.setScissorTest( true );
    //this.scene.background = new THREE.Color("#dfdfdf");
    this.scene.background = new THREE.Color(0x606060);
    
    this.camera.updateProjectionMatrix();
    this.renderer.render(this.scene, this.camera);
    this.composer.render();


    // Minimap
    left = Math.floor( this.larguraPagina - this.larguraPagina * 0.2 );
    bottom = Math.floor( 0 );
    width = Math.floor( this.larguraPagina * 0.2 );
    height = Math.floor( this.alturaPagina * 0.2 );
    this.renderer.setViewport( left, bottom, width, height );
    this.renderer.setScissor( left, bottom, width, height );
    this.renderer.setScissorTest( true );
    this.scene.background = new THREE.Color(0x404040);

    this.minimap.updateProjectionMatrix();
    this.renderer.render(this.scene, this.minimap);

    this.renderer.clearDepth();   



    //Raycasting for collision detection//

    var camPos = this.camera.position;
    var camClone = this.camera.clone();

    var vector = new THREE.Vector3( 0, 0, - 1 );
    

    //FRONT
    this.raycaster_front.set(camPos, camClone.getWorldDirection( vector ).normalize());

    // calculate objects intersecting the picking ray on the front
    var intersects_front = this.raycaster_front.intersectObjects( this.colisiveis );
    
    this.frontCollision = (intersects_front.length>0 && intersects_front[0].distance < 0.5);


    //BACK
    this.raycaster_back.set(camPos, camClone.getWorldDirection( vector ).normalize().negate());

    // calculate objects intersecting the picking ray on the back
    var intersects_back = this.raycaster_back.intersectObjects( this.colisiveis );

    this.backCollision = (intersects_back.length>0 && intersects_back[0].distance < 0.5);


    camClone.rotateOnAxis(new Vector3(1,0,0), Math.PI/2);


    //UP
    this.raycaster_up.set(camPos, camClone.getWorldDirection( vector ).normalize());

    // calculate objects intersecting the picking ray on the top
    var intersects_up = this.raycaster_up.intersectObjects( this.colisiveis );

    this.upCollision = (intersects_up.length>0 && intersects_up[0].distance < 0.5);


    //DOWN
    this.raycaster_down.set(camPos, camClone.getWorldDirection( vector ).normalize().negate());

    // calculate objects intersecting the picking ray on the top
    var intersects_down = this.raycaster_down.intersectObjects( this.colisiveis );

    this.downCollision = (intersects_down.length>0 && intersects_down[0].distance < 0.5);


    var arrow = new THREE.ArrowHelper(camClone.getWorldDirection( vector ).normalize(), this.camera.position, 1000, 0xffffff, 5, 5);
    this.cameraSpotlight.lookAt(arrow.up);
    
  };

  //tecla ‘A’ – rodar para a esquerda; tecla ‘D’ – rodar para a direita; tecla ‘W’ – avançar; 
  //tecla ‘S’ – recuar; tecla ‘P’ – subir; tecla ‘L’ - descer
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if(this.userInterfaceCheckBox == true){

      var directioninc:number = 2;
      var walkSpeed:number = 10;

      if(event.code == this.keycodes[0]){
        //rodar esquerda
        this.camera.rotateY(directioninc*this.deltaT);
        this.cameraSpotlight.rotateY(directioninc*this.deltaT);
      }else if(event.code == this.keycodes[1]){
        //rodar direita
        this.camera.rotateY(-directioninc*this.deltaT);
        this.cameraSpotlight.rotateY(-directioninc*this.deltaT);
      }
      
      if(event.code == this.keycodes[2] && !this.backCollision){
        //rodar recuar
        this.camera.translateZ(walkSpeed*this.deltaT);
      }else if(event.code == this.keycodes[3] && !this.frontCollision){
        //rodar avançar
        this.camera.translateZ(-walkSpeed*this.deltaT);
      }
      
      if(event.code == this.keycodes[4] && !this.upCollision){
        //rodar subir
        this.camera.translateY(walkSpeed*this.deltaT);
      }else if(event.code == this.keycodes[5] && !this.downCollision){
        //rodar descer
        this.camera.translateY(-walkSpeed*this.deltaT);
      }

      
      this.camera.updateProjectionMatrix();
      //this.renderer.render(this.scene, this.camera);

    }
  }

  @HostListener('mousemove', ['$event'])
    onMousedown(event:MouseEvent) {
        event.preventDefault();

        var utilizadores_placeholder = this.utilizadores;

        var rect = this.renderer.domElement.getBoundingClientRect();
        
        var x = ((event.clientX - rect.left) / this.larguraPagina) * 2 - 1;
        var y = -((event.clientY - rect.top) / this.alturaPagina) * 2 + 1;

        var mouse = new THREE.Vector2(x, y);
        this.camera_raycaster.setFromCamera(mouse, this.camera);
        

        var intersects = this.camera_raycaster.intersectObjects(this.utilizadores_mesh);

        if(intersects.length > 0){

          var object_intersected = new THREE.Mesh(); 
          var utilizador_intersected;
          var info = "";
          var info_nome = "Nome: ";
          var info_tags = "Tags: ";
          var info_image = "";

          object_intersected = intersects[0].object as THREE.Mesh;

          this.outlinePass.selectedObjects = [object_intersected];

          utilizadores_placeholder.forEach(function (value) {
            if(value.objeto == object_intersected){
              utilizador_intersected = value;
              info = value.nome + "\n" + value.email;
              info_nome += value.nome;
              info_tags += value.tags;
              info_image = value.avatar;
            }
          });

          var profile_pic = new Image();
          profile_pic.src = "../../../assets/"+info_image;

          this.context.clearRect(0,0,640,480);
          var message = info_tags;
          var metrics = this.context.measureText(message);
          var width = metrics.width;
          this.context.fillStyle = "rgba(0,0,0,0.95)"; // black border
          this.context.fillRect( 0,0, width+8,40+8);
          this.context.fillStyle = "rgba(255,255,255,0.95)"; // white filler
          this.context.fillRect( 2,2, width+4,40+4 );
          this.context.fillStyle = "rgba(0,0,0,1)"; // text color
          this.context.fillText( info_nome, 4,20 );
          this.context.fillText( info_tags, 4,40 );
          this.context.drawImage(profile_pic, 0, 50,50,50);
          this.texture.needsUpdate = true;


          this.sprite.position.set(object_intersected.position.x+3,object_intersected.position.y+5,0.5);
          this.sprite.visible = true;
        }else{
          this.sprite.visible = false;
          this.outlinePass.selectedObjects = [];
        }
        

    }

    @HostListener('mousedown', ['$event'])
    onMouseClick(event:MouseEvent){
      event.preventDefault();

      var mesh_to_highlight = new Array<THREE.Mesh>();

      var rede_ligacoes_objects = this.redeObjeto.ligacoes;
      var utilizador_click:any;
      var utilizadores_placeholder = this.utilizadores;

      var rect = this.renderer.domElement.getBoundingClientRect();
        
      var x = ((event.clientX - rect.left) / this.larguraPagina) * 2 - 1;
      var y = -((event.clientY - rect.top) / this.alturaPagina) * 2 + 1;

      var mouse = new THREE.Vector2(x, y);
      this.camera_raycaster.setFromCamera(mouse, this.camera);
      
      var intersects = this.camera_raycaster.intersectObjects(this.utilizadores_mesh);

      if(intersects.length>0){

        this.caminho_outlinePass.selectedObjects = [];
        var object_intersected = intersects[0].object as THREE.Mesh;

        utilizadores_placeholder.forEach(function(value){
          if(value.objeto == object_intersected){
            utilizador_click = value;
          }
        });

        if(utilizador_click != null){
          while(utilizador_click.email != this.redeObjeto.utilizadorAutenticado.email){

            mesh_to_highlight.push(utilizador_click.objeto);

            for(let i=0; i<rede_ligacoes_objects.length; i++){
              if(rede_ligacoes_objects[i].utilizadorB.email == utilizador_click.email){
                utilizador_click = rede_ligacoes_objects[i].utilizadorA;
                mesh_to_highlight.push(rede_ligacoes_objects[i].object);
              }
            }

          }
          
          mesh_to_highlight.push(this.redeObjeto.utilizadores[0].objeto);
          this.caminho_outlinePass.selectedObjects = mesh_to_highlight;

        }

      }

    }

  ControlChange(change:boolean){

    this.controls.enabled = !change;
    this.userInterfaceCheckBox = change;

    this.camera.setRotationFromEuler(this.cameraRotationReset);
    this.cameraRotationReset.setFromQuaternion(this.camera.quaternion);
    this.camera.position.set(this.cameraPositionReset.x,this.cameraPositionReset.y,this.cameraPositionReset.z);
    this.camera.updateProjectionMatrix();
  }

  onResize(event : any){

    if(document.fullscreenElement){
      this.larguraPagina = event.target.innerWidth;
      this.alturaPagina = event.target.innerHeight;
    }else{
      this.larguraPagina = event.target.innerWidth / this.larguraRatio;
      this.alturaPagina = event.target.innerHeight / this.alturaRatio;
    }
    const aspectRatio = this.larguraPagina / this.alturaPagina;


    if (aspectRatio < 1.0) {

        this.minimap.left = -1.0;
        this.minimap.right = 1.0;
        this.minimap.top = 1.0 / aspectRatio;
        this.minimap.bottom = -1.0 / aspectRatio;
    }
    else {

        this.minimap.left = -aspectRatio;
        this.minimap.right = aspectRatio;
        this.minimap.top = 1.0;
        this.minimap.bottom = -1.0;
    }

    this.camera.aspect = aspectRatio;

    this.camera.updateProjectionMatrix();
    this.minimap.updateProjectionMatrix();
    this.renderer.setSize(this.larguraPagina, this.alturaPagina);
  }

  createEmotionBillboardLabel(position : Vector3, image_path : string):THREE.Sprite{

    var context:any;
    // create a canvas element
    var canvas = document.createElement('canvas');
    context = canvas.getContext('2d');
    var img = new Image();
    img.src = image_path;
          
    // canvas contents will be used for a texture
    var texture = new THREE.Texture(canvas);
    img.onload = function(){context.drawImage(img, canvas.width/2, 0, 50, 50);texture.needsUpdate = true;};
    texture.needsUpdate = true;

    var spriteMaterial = new THREE.SpriteMaterial( { map: texture } );
	
    //Criação do sprite a ser colocado na canvas da tip
    var sprite = new THREE.Sprite( spriteMaterial );
    sprite.scale.set(20,10,1.0);
    sprite.position.set( position.x, position.y, 0.5 );
    this.scene.add( sprite );

    sprite.visible = true;
    texture.needsUpdate = true;

    return sprite;

  }

  openFullscreen(){

    this.elem_fullscreen.requestFullscreen();

  }

  loadMenu(){
    
    var menu = {
      first_person: false
    }

    const gui = new GUI({autoPlace: false});

    const optionsFolder = gui.addFolder('options');

    //Locks orbit controls and resets camera
    optionsFolder.add(menu, 'first_person').onFinishChange(
        (value) => {
            this.ControlChange(<boolean>value);
        }
      ).listen();

    optionsFolder.open();
    
    var dElement:any = document.getElementById('gui-container');
    if(dElement != null){
      dElement.appendChild(gui.domElement);
    }

  }

  aumentarNivelRede(){
    if(this.nivelDaRede<6){
      this.nivelDaRede += 1;
      this.alterarNivelRede(this.nivelDaRede);

      var id = document.getElementById("nivelRede");
      if(id)
        id.innerHTML = this.nivelDaRede.toString();
    }else{
      Swal.fire({
        position: 'bottom-end',
        icon: 'error',
        title: 'O valor máximo do nivel de rede é 6.',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  diminuirNivelRede(){
    if(this.nivelDaRede>1){
      this.nivelDaRede -= 1;
      this.alterarNivelRede(this.nivelDaRede);

      var id = document.getElementById("nivelRede");
      if(id)
        id.innerHTML = this.nivelDaRede.toString();
    }else{
      Swal.fire({
        position: 'bottom-end',
        icon: 'error',
        title: 'O valor minimo do nivel de rede é 1.',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  alterarNivelRede(novoNivel : any){
    if(novoNivel >= 1){
      this.nivelDaRede = novoNivel;
         this.ligacoesService.getRedeDoUtilizadorAutenticado(this.nivelDaRede).subscribe(
           (suc: ILigacao[][]) => {this.redeObjeto.atualizarRede(suc);this.rede = suc;this.atualizarJogo()}
         )
      }
  }

  private atualizarJogo(){
    this.utilizadores_mesh = this.redeObjeto.utilizadores_mesh;
    this.ligacoes_mesh = this.redeObjeto.ligacoes_mesh;
    this.colisiveis = this.utilizadores_mesh; 
    this.colisiveis = this.colisiveis.concat(this.ligacoes_mesh);
    this.utilizadores = this.redeObjeto.utilizadores;

    //Create raycasters
    var camPos = this.camera.position;
    var camClone = this.camera.clone();
    var vector = new THREE.Vector3( 0, 0, - 1 );
    var vector_up = new THREE.Vector3( 0, 1, 0 );

    this.raycaster_front = new THREE.Raycaster(camPos, camClone.getWorldDirection( vector ).normalize());
    this.raycaster_back = new THREE.Raycaster(camPos, camClone.getWorldDirection( vector ).negate().normalize());
    this.raycaster_up = new THREE.Raycaster(camPos, camClone.getWorldDirection( vector_up ).normalize());
    this.raycaster_down = new THREE.Raycaster(camPos, camClone.getWorldDirection( vector_up ).normalize().negate());

    this.camera_raycaster = new THREE.Raycaster();

    this.emotion_sprites.forEach((e)=>{e.removeFromParent();});
    this.emotion_sprites = new Array<THREE.Sprite>();

    for(let i=0; i<this.utilizadores.length; i++){
      var info_emotion = this.utilizadores[i].estadoEmocional.toLowerCase();
  
      var img_path = "../../../assets/emocao_"+info_emotion+".png";
  
      this.emotion_sprites.push(this.createEmotionBillboardLabel(this.utilizadores_mesh[i].position, img_path));
    }
  }



}
