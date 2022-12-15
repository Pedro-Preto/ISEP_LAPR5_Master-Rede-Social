import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as THREE from "three";
import { UserService } from "../services/user.service";
import { ConnectionService } from "../services/connection.service";
import { ActivatedRoute, Router } from "@angular/router";
import TextSprite from "@seregpie/three.text-sprite";
import { Camera, Object3D, PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PrologPathsService } from "../services/prolog-paths.service";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})

export class PlayerComponent implements OnInit, AfterViewInit {

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private connectionService: ConnectionService, private pathsService: PrologPathsService, private router: Router) { }

  ngOnInit(): void {
    this.loggedUserId = String(this.route.snapshot.queryParams['id']);
    this.loadUsers();
    this.importUsers();
    this.importConnections();
    this.importUsersWithEmotionalStates();
  }
  ngAfterViewInit(): void {
    this.userService.getNetOfUserUpToLevel(this.loggedUserId, 0).subscribe(async data => {
      this.userList = data;

      await this.createScene();
      await this.startRenderingLoop();
    });
  }

  loggedUserId: string;
  userList: User[] = [];
  usersToDraw: User[] = [];
  namesOrderedByNodes: string[] = [];
  userFriends: User[] = [];
  auxUser: User;
  allUsersNames: string[] = [];
  cylinderMeshList: THREE.Mesh[] = [];
  userEmotionalStates: number[] = [];
  outlineCylinderMeshList: THREE.Mesh[] = [];
  emotionalStateMeshList: THREE.Mesh[] = [];
  emotionalStateMeshOutlineList: THREE.Mesh[] = [];
  textSpriteList: TextSprite[] = [];
  chosenUser: string;
  levelRadius: number = 2;
  highlightUsers: string[] = [];
  pathType: string;
  valueMin: number;
  totalCounter: number = 0;
  canPan: boolean;
  startX: number;
  startY: number;
  offsetX: number;

  //Pop information
  popName: any;
  popTags: string[] = [];

  @ViewChild('canvas')
  private canvasRef: ElementRef;

  //* Stage Properties;
  @Input() public cameraZ: number = 500;
  @Input() public fieldOfView: number = 1;
  @Input('nearClipping') public nearClippingPlane: number = 1;
  @Input('farClipping') public farClippingPlane: number = 2000;

  //? Helper Properties (Private Properties);
  private camera!: THREE.PerspectiveCamera;
  //private miniMapCamera: THREE.OrthographicCamera;
  private miniMapCamera: THREE.PerspectiveCamera;
  private firstPersonViewCamera: THREE.PerspectiveCamera;

  //Raycast
  private outlineGeometryRaycast = new THREE.CylinderGeometry(0.55, 0.55, 0.15, 64);
  private outlineMaterialRaycastRed = new THREE.MeshLambertMaterial({ color: 0xFF0000 });
  private outlineMaterialRaycastPink = new THREE.MeshLambertMaterial({ color: 0xff007f });
  private outlineMaterialRaycastGreen = new THREE.MeshLambertMaterial({ color: 0x00FF00 });

  //raycast
  private raycaster = new THREE.Raycaster();
  private mouseRaycast = new THREE.Vector2();

  //light
  private ambientLight = new THREE.AmbientLight(0x0000FF, 0.3);
  private pointLight1 = new THREE.PointLight(0xffffff, 0.3, 100);
  private pointLight2 = new THREE.PointLight(0xffffff, 0.3, 100);
  private focusLight = new THREE.SpotLight(0xffffff, 1);


  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private renderer!: THREE.WebGLRenderer;

  private scene!: THREE.Scene;

  /**
   * Create the scene
   *
   * @private
   * @memberof PlayerComponent
   */
  private createScene() {

    //* Scene
    this.scene = new THREE.Scene();
    //this.scene.background = new THREE.Color(0xCADFED);

    //* Camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    );
    this.camera.position.z = this.cameraZ;
    //this.scene.add(this.camera);

    //add spot light
    this.camera.add(this.focusLight);

    //* Mini map camera
    this.miniMapCamera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    );
    /*
    this.miniMapCamera = new THREE.OrthographicCamera(
      window.innerWidth / -2,		// Left
      window.innerWidth / 2,		// Right
      window.innerHeight / 2,		// Top
      window.innerHeight / -2,	// Bottom
      -5000,            			// Near
      10000 );
    */
    /*
    this.miniMapCamera.up = new THREE.Vector3(0,0-1);
    this.miniMapCamera.lookAt(new THREE.Vector3(0,-1,0));
    */

    this.miniMapCamera.position.z = 1000;
    this.scene.add(this.camera);
    this.scene.add(this.miniMapCamera);


    this.scene.add(this.ambientLight);
    this.pointLight1.position.set(-0.7604166666666666, 0.07300509337860783, 0)
    this.scene.add(this.pointLight1);
    this.pointLight2.position.set(0.7583333333333333, 0.21144674085850557, 0)
    this.scene.add(this.pointLight2);

    //First person view camera
    this.firstPersonViewCamera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    this.firstPersonViewCamera.position.z = 1;
    this.firstPersonViewCamera.position.x = -0.5;
    this.firstPersonViewCamera.lookAt(0, 0, -100);
    this.scene.add(this.firstPersonViewCamera);


    //draw cylinder
    let geometry = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 64);
    let material = new THREE.MeshLambertMaterial({ color: 0x2980b9 });
    this.cylinderMeshList[this.totalCounter] = new THREE.Mesh(geometry, material);
    this.cylinderMeshList[this.totalCounter].rotation.set(Math.PI / 2, 0, 0);

    //draw outline
    let outlineGeometry = new THREE.CylinderGeometry(0.53, 0.53, 0.1, 64);
    let outlineMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
    this.outlineCylinderMeshList[this.totalCounter] = new THREE.Mesh(outlineGeometry, outlineMaterial);
    this.cylinderMeshList[this.totalCounter].add(this.outlineCylinderMeshList[this.totalCounter]);

    //write text

    this.textSpriteList[this.totalCounter] = new TextSprite({
      alignment: 'left',
      color: '#ffffff',
      fontFamily: '"Poppins", sans-serif',
      fontSize: 0.2,
      text: [
        this.userList[0].userName.username,
      ].join('\n'),
    });

    this.textSpriteList[this.totalCounter].position.setY(0.6);

    this.namesOrderedByNodes.push(this.userList[0].userName.username);

    this.cylinderMeshList[this.totalCounter].add(this.textSpriteList[this.totalCounter]);

    //Necessary for raycast
    this.cylinderMeshList[this.totalCounter].name = this.userList[0].userName.username;
    this.outlineCylinderMeshList[this.totalCounter].name = this.userList[0].userName.username;
    this.textSpriteList[this.totalCounter].name = this.userList[0].userName.username;

    // console.log(this.namesOrderedByNodes[this.totalCounter]);
    this.scene.add(this.cylinderMeshList[this.totalCounter]);

    this.totalCounter = this.totalCounter + 1;

    this.userService.getNetOfUserUpToLevel(this.loggedUserId, 1).subscribe(async data => {
      this.usersToDraw = data;
      await this.drawNet(this.usersToDraw, 0, 1, this.usersToDraw[0], 1, 1, Math.PI * 2);

      this.drawConnections();
    });

  }

  private drawConnections() {

    this.connectionService.getAll().subscribe(async data => {
      let connectionList = data;
      let connectionListLength = connectionList.length;

      for (let i = 0; i < connectionListLength; i++) {
        let connection = connectionList[i];
        let connectionUser1 = await this.userService.getUser(connection.user1Id.value).toPromise();
        let connectionUser2 = await this.userService.getUser(connection.user2Id.value).toPromise();
        if (this.namesOrderedByNodes.includes(connectionUser1.userName.username)
          && this.namesOrderedByNodes.includes(connectionUser2.userName.username)) {

          //  console.log(connectionUser1.userName.username + " // " + connectionUser2.userName.username);

          let sumOfStrengths = connection.user1ConnectionStrength.strength +
            connection.user2ConnectionStrength.strength +
            connection.user1RelationStrength.strength +
            connection.user2RelationStrength.strength;

          let lineWidth = (sumOfStrengths + 40) * 0.0015;
          // console.log(lineWidth);

          let indexOfUser1 = this.namesOrderedByNodes.indexOf(connectionUser1.userName.username);
          let indexOfUser2 = this.namesOrderedByNodes.indexOf(connectionUser2.userName.username);

          //Necessary for raycast
          if (this.cylinderMeshList[indexOfUser1].name == "") {
            this.cylinderMeshList[indexOfUser1].name = connectionUser1.userName.username;
          }
          if (this.cylinderMeshList[indexOfUser2].name == "") {
            this.cylinderMeshList[indexOfUser2].name = connectionUser2.userName.username;
          }
          let points = [];
          points.push(new THREE.Vector3(this.cylinderMeshList[indexOfUser1].position.x, this.cylinderMeshList[indexOfUser1].position.y, this.cylinderMeshList[indexOfUser1].position.z));

          points.push(new THREE.Vector3(this.cylinderMeshList[indexOfUser2].position.x, this.cylinderMeshList[indexOfUser2].position.y, this.cylinderMeshList[indexOfUser2].position.z));

          let lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
          let tubeGeometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),
            300,
            lineWidth,
            8,
            false //closed
          )

          let line = new THREE.Line(tubeGeometry, lineMaterial);
          this.scene.add(line);

        }
      }
    });
  }



  public drawConnectionsHighlight() {

    // enviar um http request para o servidor prolog com o id do user inicial e o do final
    // o servidor prolog recebe o request, faz um request a api de getAll users e getAll connections
    // escreve os users e as connections nas bases de conhecimento
    // depois faz o metodo para ver o shortest path
    // depois devolve a lista com os nomes dos users


    this.connectionService.getAll().subscribe(async data => {
      let connectionList = data;
      let connectionListLength = connectionList.length;

      for (let i = 0; i < connectionListLength; i++) {
        let connection = connectionList[i];
        let connectionUser1 = await this.userService.getUser(connection.user1Id.value).toPromise();
        let connectionUser2 = await this.userService.getUser(connection.user2Id.value).toPromise();
        if (this.namesOrderedByNodes.includes(connectionUser1.userName.username)
          && this.namesOrderedByNodes.includes(connectionUser2.userName.username)) {

          //  console.log(connectionUser1.userName.username + " // " + connectionUser2.userName.username);

          let sumOfStrengths = connection.user1ConnectionStrength.strength +
            connection.user2ConnectionStrength.strength +
            connection.user1RelationStrength.strength +
            connection.user2RelationStrength.strength;

          let lineWidth = (sumOfStrengths + 40) * 0.0015;
          // console.log(lineWidth);
          const loggedUser = await this.userService.getUser(this.loggedUserId).toPromise();
          //    console.log(this.pathType)

          switch (this.pathType) {
            case 'Short Path':
              const path = await this.pathsService.getShortPath(loggedUser.userName.username, this.chosenUser).toPromise();
              for (let i = 0; i < path.caminho_curto.length; i++) {
                this.highlightUsers[i] = path.caminho_curto[i].replace('"', '');
              }
              break;

            case 'Strong Path':
              const path2 = await this.pathsService.getStrongPath(loggedUser.userName.username, this.chosenUser).toPromise();
              for (let i = 0; i < path2.caminho_forte.length; i++) {
                this.highlightUsers[i] = path2.caminho_forte[i].replace('"', '');
              }
              break;

            case 'Strong Path With Relations':
              const path4 = await this.pathsService.getStrongPathWithRelationStrength(loggedUser.userName.username, this.chosenUser).toPromise();
              for (let i = 0; i < path4.caminho_forte_plus.length; i++) {
                this.highlightUsers[i] = path4.caminho_forte_plus[i].replace('"', '');
              }
              break;

            case 'Secure Path':
              //  console.log(this.valueMin)
              if (this.valueMin != undefined) {
                const path3 = await this.pathsService.getSecurePath(loggedUser.userName.username, this.chosenUser, this.valueMin).toPromise();
                for (let i = 0; i < path3.caminho_mais_seguro.length; i++) {
                  this.highlightUsers[i] = path3.caminho_mais_seguro[i].replace('"', '');
                }
                //     console.log(path3)
              }
              break;
            case 'Best First':
              //  console.log(this.valueMin)
              if (this.valueMin != undefined) {
                const path4 = await this.pathsService.getBestFirst(loggedUser.userName.username, this.chosenUser, this.valueMin).toPromise();
                for (let i = 0; i < path4.best_first.length; i++) {
                  this.highlightUsers[i] = path4.best_first[i].replace('"', '');
                }
                //    console.log(path4)
              }
              break;
            case 'Best First With Emotional States':
              //    console.log(this.valueMin)
              if (this.valueMin != undefined) {
                const path5 = await this.pathsService.getBestFirstWithEmotionalStates(loggedUser.userName.username, this.chosenUser, this.valueMin).toPromise();
                for (let i = 0; i < path5.best_First_With_Emotional_States.length; i++) {
                  this.highlightUsers[i] = path5.best_First_With_Emotional_States[i].replace('"', '');
                }
              }
              break;

          }

          for (let i = 0; i < this.highlightUsers.length - 1; i++) {
            let indexOfUser1 = this.namesOrderedByNodes.indexOf(this.highlightUsers[i]);
            let indexOfUser2 = this.namesOrderedByNodes.indexOf(this.highlightUsers[i + 1]);

            let points = [];
            points.push(new THREE.Vector3(this.cylinderMeshList[indexOfUser1].position.x, this.cylinderMeshList[indexOfUser1].position.y, this.cylinderMeshList[indexOfUser1].position.z));
            points.push(new THREE.Vector3(this.cylinderMeshList[indexOfUser2].position.x, this.cylinderMeshList[indexOfUser2].position.y, this.cylinderMeshList[indexOfUser2].position.z));

            let lineMaterial = new THREE.LineBasicMaterial({ color: 0xFF0000 });
            let tubeGeometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),
              999,
              lineWidth,
              8,
              false //closed
            )

            let line = new THREE.Line(tubeGeometry, lineMaterial);
            this.scene.add(line);
            let geometry = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 64);
            let material = new THREE.MeshLambertMaterial({ color: 0xFFD700 });
            let newMesh = new THREE.Mesh(geometry, material);
            newMesh.rotateY(Math.PI / 2);
            this.scene.getObjectByName(this.chosenUser)?.add(newMesh);
          }
        }
      }
    });

  }






  private async drawNet(usersToDrawList: User[], counter: number, level: number, mainUser: User, lastUsersToDrawListLength: number, lastUserToDrawNumber: number, lastPortion: number) {

    let auxUser: User;
    let auxUserName: string;

    //console.log(mainUser.userName.username);

    let usersToDrawListLength = usersToDrawList.length;
    counter = counter + 1;

    let portion = (lastPortion) / lastUsersToDrawListLength;

    if (counter >= usersToDrawListLength) {

      let nextLevel = level + 1;

      for (let i = 1; i < usersToDrawListLength; i++) {
        auxUser = usersToDrawList[i];

        let nextList = await this.userService.getNetOfUserUpToLevel(auxUser.id, 1).toPromise();

        nextList = this.removeDuplicates(nextList);
        if (nextList.length > 1 && nextLevel < 4) {
          await this.drawNet(nextList, 0, nextLevel, auxUser, usersToDrawList.length - 1, i, portion);
        }
      }
      return;
    }

    auxUser = usersToDrawList[counter];
    auxUserName = auxUser.userName.username;

    if (!this.namesOrderedByNodes.includes(auxUserName)) {

      let position = portion * (lastUserToDrawNumber - 1);
      let auxPortion = portion / (usersToDrawListLength - 1);
      let portionPosition = position + (auxPortion * (counter - 1));
      if (level > 1) {
        //se (usersToDrawListLength - 1) for par:
        if ((usersToDrawListLength - 1) % 2 == 0) {
          let auxValue = Math.floor((usersToDrawListLength - 1) / 2);
          //par
          if (auxValue % 2 == 0) {
            portionPosition = portionPosition - auxPortion - (Math.PI / (lastUsersToDrawListLength * (usersToDrawListLength - 1)));
          }
          //impar
          else {
            portionPosition = portionPosition - auxPortion + (Math.PI / (lastUsersToDrawListLength * (usersToDrawListLength - 1)));
          }
        }
        //se (usersToDrawListLength - 1) for impar:
        else {
          let auxValue = Math.floor((usersToDrawListLength - 1) / 2);
          portionPosition = portionPosition - (auxPortion * auxValue);
        }
      }

      //draw cylinder
      let geometry = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 64);
      let material = new THREE.MeshLambertMaterial({ color: 0xffffff });
      this.cylinderMeshList[this.totalCounter] = new THREE.Mesh(geometry, material);
      this.cylinderMeshList[this.totalCounter].rotation.set(Math.PI / 2, 0, 0);

      //draw emotional state
      this.userEmotionalStates[this.totalCounter] = auxUser.emotionalState.emotionalStateAtri;
      let auxImage;
      switch (this.userEmotionalStates[this.totalCounter]) {
        case 0: auxImage = THREE.ImageUtils.loadTexture("../assets/emotional states/joyful.png"); break;
        case 1: auxImage = THREE.ImageUtils.loadTexture("../assets/emotional states/distressed.png"); break;
        case 2: auxImage = THREE.ImageUtils.loadTexture("../assets/emotional states/hopeful.png"); break;
        case 3: auxImage = THREE.ImageUtils.loadTexture("../assets/emotional states/fearful.png"); break;
        case 4: auxImage = THREE.ImageUtils.loadTexture("../assets/emotional states/relieved.png"); break;
        case 5: auxImage = THREE.ImageUtils.loadTexture("../assets/emotional states/disappointed.png"); break;
        case 6: auxImage = THREE.ImageUtils.loadTexture("../assets/emotional states/proud.png"); break;
        case 7: auxImage = THREE.ImageUtils.loadTexture("../assets/emotional states/remorseful.png"); break;
        case 8: auxImage = THREE.ImageUtils.loadTexture("../assets/emotional states/grateful.png"); break;
        case 9: auxImage = THREE.ImageUtils.loadTexture("../assets/emotional states/angry.png"); break;
      }

      let emotionalStateGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.7, 32);
      let emocionalStateMaterial = new THREE.MeshLambertMaterial({ map: auxImage });
      this.emotionalStateMeshList[this.totalCounter] = new THREE.Mesh(emotionalStateGeometry, emocionalStateMaterial);
      this.emotionalStateMeshList[this.totalCounter].position.set(Math.sin(Math.PI / 4) * 0.5, 0, Math.cos(Math.PI / 4) * -0.5);
      this.emotionalStateMeshList[this.totalCounter].rotateY(Math.PI / 2);
      this.cylinderMeshList[this.totalCounter].add(this.emotionalStateMeshList[this.totalCounter]);

      let emotionalStateOutlineGeometry = new THREE.CylinderGeometry(0.17, 0.17, 0.66, 32);
      let emocionalStateOutlineMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
      this.emotionalStateMeshOutlineList[this.totalCounter] = new THREE.Mesh(emotionalStateOutlineGeometry, emocionalStateOutlineMaterial);
      this.emotionalStateMeshOutlineList[this.totalCounter].position.set(Math.sin(Math.PI / 4) * 0.5, 0, Math.cos(Math.PI / 4) * -0.5);
      this.cylinderMeshList[this.totalCounter].add(this.emotionalStateMeshOutlineList[this.totalCounter]);


      //draw outline
      let outlineGeometry = new THREE.CylinderGeometry(0.53, 0.53, 0.1, 64);
      let outlineMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
      this.outlineCylinderMeshList[this.totalCounter] = new THREE.Mesh(outlineGeometry, outlineMaterial);
      this.cylinderMeshList[this.totalCounter].add(this.outlineCylinderMeshList[this.totalCounter]);

      //position the nodes
      this.cylinderMeshList[this.totalCounter].position.set(Math.sin(portionPosition) * (this.levelRadius * (level)), Math.cos(portionPosition) * (this.levelRadius * (level)), (-3 * level));
      this.scene.add(this.cylinderMeshList[this.totalCounter]);

      //write text
      this.textSpriteList[this.totalCounter] = new TextSprite({
        alignment: 'left',
        color: '#2980b9',
        fontFamily: '"Poppins", sans-serif',
        fontSize: 0.2,
        text: [
          auxUserName,
        ].join('\n'),
      });

      this.textSpriteList[this.totalCounter].geometry.computeBoundingBox();
      this.textSpriteList[this.totalCounter].position.set(0, 0.6, 0);
      this.namesOrderedByNodes.push(auxUserName);

      this.cylinderMeshList[this.totalCounter].add(this.textSpriteList[this.totalCounter]);

      this.totalCounter = this.totalCounter + 1;
    }

    await this.drawNet(usersToDrawList, counter, level, mainUser, lastUsersToDrawListLength, lastUserToDrawNumber, lastPortion);
  }


  private getAspectRatio() {

    console.log(this.canvasRef.nativeElement.clientWidth)
    console.log(this.canvasRef.nativeElement.clientHeight)

    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  /**
   * Start the rendering loop
   *
   * @private
   * @memberof PlayerComponent
   */
  private startRenderingLoop() {
    //* Renderer
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);

    //definir janela
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    //document.body.appendChild(this.renderer.domElement);


    let controls = new OrbitControls(this.camera, this.renderer.domElement);

    controls.maxDistance = 900;
    controls.minDistance = 100;
    controls.minAzimuthAngle = -Math.PI / 2;
    controls.maxAzimuthAngle = Math.PI / 2;

    let insetWidth = this.canvas.clientWidth / 4;
    let insetHeight = this.canvas.clientHeight / 4;

    let component: PlayerComponent = this;
    (function render() {
      requestAnimationFrame(render);
      var element = <HTMLInputElement>document.getElementById("first-person-view");
      var firstPersonViewIsChecked = element.checked;

      if (firstPersonViewIsChecked) {
        let caster = new THREE.Raycaster();
        caster.camera = component.firstPersonViewCamera;
        var oldCamera = component.firstPersonViewCamera.clone();
        caster.set(component.firstPersonViewCamera.position, oldCamera.position.normalize());
        document.onkeydown = function (e) {
          //  console.log(e.key);
          switch (e.key) {
            case "a":
              //rodar a camara para a esquerda
              component.firstPersonViewCamera.rotateY(5 * Math.PI / 180);
              break;

            case "d":
              //rodar a camara para a direita
              component.firstPersonViewCamera.rotateY(-5 * Math.PI / 180);
              break;

            case "w":
              //avançar - incrementar a posição da camara no eixo dos
              if (caster.intersectObjects(component.scene.children).length > 0) {
                var obj = document.getElementById('HitMessage');
                if (obj != null) {
                  console.log("bati");
                  obj.innerHTML = "HIT !";
                }
              } else {
                component.firstPersonViewCamera.position.z -= 0.05;
              }
              break;

            case "s":
              //recuar - decrementar a posição da camara no eixo dos zz

                if (caster.intersectObjects(component.scene.children).length > 0) {
                  var obj = document.getElementById('HitMessage');
                  if (obj != null) {
                    console.log("bati");
                    obj.innerHTML = "HIT !";
                  }
                } else {
                  component.firstPersonViewCamera.position.z += 0.05;
                }

              break;

            case "p":
              //subir - incrementar a posição da camara no eixo dos yy
              if (caster.intersectObjects(component.scene.children).length > 0) {
                var obj = document.getElementById('HitMessage');
                if (obj != null) {
                  console.log("bati");
                  obj.innerHTML = "HIT !";
                }
              } else {
                component.firstPersonViewCamera.position.y += 0.05;
              }
              break;

            case "l":
              //descer - decrementar a posição da camara no eixo dos yy
              if (caster.intersectObjects(component.scene.children).length > 0) {
                var obj = document.getElementById('HitMessage');
                if (obj != null) {
                  console.log("bati");
                  obj.innerHTML = "HIT !";
                }
              } else {
                component.firstPersonViewCamera.position.y -= 0.05;
              }
              break;

          }
        }
        //render perspective camera/graph
        component.renderer.setViewport(-200, 0, window.innerWidth, window.innerHeight);
        component.renderer.setClearColor(0xCADFED, 1);
        component.renderer.render(component.scene, component.firstPersonViewCamera);
      } else {
        //render perspective camera/graph
        component.renderer.setViewport(-200, 0, window.innerWidth, window.innerHeight);
        component.renderer.setClearColor(0xCADFED, 1);
        component.renderer.render(component.scene, component.camera);
      }


      //render mini-map camera
      component.renderer.setClearColor(0xEDF4F9, 1);
      component.renderer.clearDepth();
      component.renderer.setScissorTest(true);
      component.renderer.setScissor(16, 16, component.canvas.clientWidth / 5, component.canvas.clientHeight / 5);
      component.renderer.setViewport(component.canvas.clientHeight / -50, 0, insetWidth, insetHeight);
      component.renderer.render(component.scene, component.miniMapCamera);
      component.renderer.setScissorTest(false);

      //renderer raycasting users
      component.raycaster.setFromCamera(component.mouseRaycast, component.camera);


    }());

  }

  //Mouse Movements

  onClick() {
    //Raycast UC
    const intersectedObjects = this.raycaster.intersectObjects(this.scene.children)
    if (intersectedObjects.length && intersectedObjects[0].object.name != '') {
      //pick the first object . It's the closest one
      //this.pickedObject = intersectedObjects[0].object;
      //  console.log(intersectedObjects[0].object);
      this.chosenUser = intersectedObjects[0].object.name;
    }
  }

  onMouseMove(event: MouseEvent) {
    //Necessary for raycast-reset mouse coordinates
    this.mouseRaycast.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouseRaycast.y = - (event.clientY / window.innerHeight) * 2 + 1;

    //Pop Message UC

    //reset variables
    this.popName = undefined;
    this.popTags = [];
    if (this.scene.getObjectByName("AVATAR") != null) {
      this.scene.remove(<Object3D>this.scene.getObjectByName("AVATAR"));
    }

    if (this.scene.getObjectByName("CIRCLE") != null) {
      this.scene.remove(<Object3D>this.scene.getObjectByName("CIRCLE"));
    }

    const intersectedObjects = this.raycaster.intersectObjects(this.scene.children);

    const loader = new GLTFLoader();

    if (intersectedObjects.length && intersectedObjects[0].object.type === 'Mesh' && intersectedObjects[0].object.name != '') {
      this.popName = intersectedObjects[0].object.name;
      this.userService.getByKeyWord(this.popName).subscribe(data => {

        for (var i = 0; i < data[0].tags.length; i++) {
          this.popTags[i] = data[0].tags[i].tagIdValue;
        }

        switch (data[0].gender.genderAtri) {
          case 0:
            let mesh = new THREE.Mesh(this.outlineGeometryRaycast, this.outlineMaterialRaycastRed);
            mesh.position.x = intersectedObjects[0].object.position.x;
            mesh.position.y = intersectedObjects[0].object.position.y;
            mesh.position.z = intersectedObjects[0].object.position.z;
            mesh.rotateZ(Math.PI / 2);
            mesh.rotateX(Math.PI / 2);
            mesh.name = "CIRCLE";
            this.scene.add(mesh);

            loader.load('/assets/Imgs/Logos/Parrot.glb', (gltf) => {
              gltf.scene.name = "AVATAR";
              gltf.scene.scale.set(0.02, 0.02, 0.02);
              gltf.scene.position.x = intersectedObjects[0].object.position.x;
              gltf.scene.position.y = intersectedObjects[0].object.position.y + 0.8;
              gltf.scene.position.z = intersectedObjects[0].object.position.z;
              this.scene.add(gltf.scene);

            }, undefined, function (error) {

              console.error(error);

            });
            break;
          case 1:
            let mesh1 = new THREE.Mesh(this.outlineGeometryRaycast, this.outlineMaterialRaycastPink);
            mesh1.position.x = intersectedObjects[0].object.position.x;
            mesh1.position.y = intersectedObjects[0].object.position.y;
            mesh1.position.z = intersectedObjects[0].object.position.z;
            mesh1.rotateZ(Math.PI / 2);
            mesh1.rotateX(Math.PI / 2);
            mesh1.name = "CIRCLE";
            this.scene.add(mesh1);

            loader.load('/assets/Imgs/Logos/Horse.glb', (gltf) => {
              gltf.scene.name = "AVATAR";
              gltf.scene.scale.set(0.003, 0.003, 0.003);
              gltf.scene.position.x = intersectedObjects[0].object.position.x;
              gltf.scene.position.y = intersectedObjects[0].object.position.y + 0.5;
              gltf.scene.position.z = intersectedObjects[0].object.position.z;
              this.scene.add(gltf.scene);

            }, undefined, function (error) {

              console.error(error);

            });
            break;
          case 2:
            let mesh2 = new THREE.Mesh(this.outlineGeometryRaycast, this.outlineMaterialRaycastGreen);
            mesh2.position.x = intersectedObjects[0].object.position.x;
            mesh2.position.y = intersectedObjects[0].object.position.y;
            mesh2.position.z = intersectedObjects[0].object.position.z;
            mesh2.rotateZ(Math.PI / 2);
            mesh2.rotateX(Math.PI / 2);
            mesh2.name = "CIRCLE";
            this.scene.add(mesh2);

            loader.load('/assets/Imgs/Logos/RobotExpressive.glb', (gltf) => {
              gltf.scene.name = "AVATAR";
              gltf.scene.scale.set(0.2, 0.2, 0.2);
              gltf.scene.position.x = intersectedObjects[0].object.position.x;
              gltf.scene.position.y = intersectedObjects[0].object.position.y + 0.5;
              gltf.scene.position.z = intersectedObjects[0].object.position.z;
              this.scene.add(gltf.scene);

            }, undefined, function (error) {

              console.error(error);

            });
            break;
        }

      });
    }
  }
  //Auxiliar Methods

  private removeDuplicates(list: User[]): User[] {
    let listLength = list.length;
    let auxList: User[] = [];
    auxList.push(list[0]);
    for (let i = 1; i < listLength; i++) {
      if (!this.namesOrderedByNodes.includes(list[i].userName.username)) {
        auxList.push(list[i]);
      }
    }
    return auxList;
  }
  public importUsers() {
    this.pathsService.importUsers().subscribe();
  }

  public importUsersWithEmotionalStates() {
    this.pathsService.importUsersWithEmotionalStates().subscribe();
  }

  public importConnections() {
    this.pathsService.importConnections().subscribe();
  }

  public loadUsers() {
    this.userService.getUser(this.loggedUserId).subscribe(data => {
      this.getAllUsers(data.userName.username);
    })
  }

  public getAllUsers(name: string) {
    this.userService.getUsers().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        this.allUsersNames[i] = data[i].userName.username;
      }
      this.removeElementFromStringArray(name);

    });
  }

  public removeElementFromStringArray(element: string) {
    this.allUsersNames.forEach((value, index) => {
      if (value == element) this.allUsersNames.splice(index, 1);
    });
  }



}
