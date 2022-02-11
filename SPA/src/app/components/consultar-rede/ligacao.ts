import * as THREE from "three";
import Utilizador from "./utilizador";


export default class Ligacao{

    object! : THREE.Mesh;
    utilizadorA !: Utilizador;
    utilizadorB !: Utilizador;

    constructor(oriX : number, oriY : number, destX: number, destY : number, forcaLigacao : number, utilizadorA : Utilizador, utilizadorB : Utilizador){

        this.utilizadorA = utilizadorA;
        this.utilizadorB = utilizadorB;

        let ori = new THREE.Vector3(oriX, oriY, 0);
        let dest = new THREE.Vector3(destX, destY, 0);

        //Calculate orientation for the cilinder
        var direction = new THREE.Vector3().subVectors(dest, ori);
        var arrow = new THREE.ArrowHelper(direction.clone().normalize(), ori);

        let geometry = new THREE.CylinderGeometry( forcaLigacao/25, forcaLigacao/25, direction.length(), 32 );
        const cor = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
        let material = new THREE.MeshPhongMaterial( {color: cor, shininess: 50} );
        this.object = new THREE.Mesh( geometry, material );
        this.object.castShadow = true;
        this.object.receiveShadow = true;

        //Set cilinder rotation
        var rotation = arrow.rotation.clone();
        this.object.rotateX(rotation.x);
        this.object.rotateY(rotation.y);
        this.object.rotateZ(rotation.z);

        //Set cilinder position
        var position = new THREE.Vector3().addVectors( ori, direction.multiplyScalar(0.5) );
        this.object.position.x = position.x;
        this.object.position.y = position.y;
        this.object.position.z = position.z;

    }

}