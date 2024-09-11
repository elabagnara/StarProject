        import * as THREE from  "../three.js-master/build/three.module.js";
        import { OrbitControls } from  "../three.js-master/examples/jsm/controls/OrbitControls.js";
        import { EffectComposer } from "../three.js-master/examples/jsm/postprocessing/EffectComposer.js";
        import { ShaderPass } from "../three.js-master/examples/jsm/postprocessing/ShaderPass.js";
        import { RenderPass } from "../three.js-master/examples/jsm/postprocessing/RenderPass.js";
        import { FilmPass } from "../three.js-master/examples/jsm/postprocessing/FilmPass.js"; 
        import { UnrealBloomPass } from "../three.js-master/examples/jsm/postprocessing/UnrealBloomPass.js"; 
        import { DotScreenShader } from "../three.js-master/examples/jsm/shaders/DotScreenShader.js";
        import { SobelOperatorShader } from "../three.js-master/examples/jsm/shaders/SobelOperatorShader.js";
        import { LuminosityShader } from "../three.js-master/examples/jsm/shaders/LuminosityShader.js";
        import { ColorifyShader } from "../three.js-master/examples/jsm/shaders/ColorifyShader.js";

        let object;
    
        const renderer = new THREE.WebGLRenderer({canvas:canvas, antialias: true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x000000);

        const camera = new THREE.PerspectiveCamera(40,parseInt(window.getComputedStyle(canvas).getPropertyValue("width"))/ parseInt(window.getComputedStyle(canvas).getPropertyValue("height")),1.0,1000);
        const scene = new THREE.Scene();

        const pointLight = new THREE.PointLight(0x0088ff);

        const sphere = new THREE.CylinderGeometry();
        const sphereMat = new THREE.MeshStandardMaterial({color: 0xffffff, emissive: 0x0000ff});
        const sphereMesh = new THREE.Mesh(sphere,sphereMat);

        const composer = new EffectComposer(renderer);
        const renderPass = new RenderPass(scene, camera);

        const dotEffect = new ShaderPass(DotScreenShader);
        dotEffect.uniforms["scale"]. value = 2;

        const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight),1, 0.2, 0.1);
        
        const luminosityEffect = new ShaderPass(LuminosityShader);

        const sobelEffect = new ShaderPass(SobelOperatorShader);
        sobelEffect.uniforms["resolution"].value.x = window.innerWidth * window.devicePixelRatio;
        sobelEffect.uniforms["resolution"].value.y = window.innerHeight * window.devicePixelRatio;

        const colorify = new ShaderPass(ColorifyShader);
        colorify.uniforms["color"].value.setRGB(1,0,0);

        composer.addPass(renderPass);
        composer.addPass(luminosityEffect);
        composer.addPass(sobelEffect);
        composer.addPass(colorify);

        //composer.addPass(dotEffect);

        composer.addPass(bloomPass);
            
        scene.add(sphereMesh);
        scene.add(pointLight);

        pointLight.position.set(0, 5, 7);

        camera.lookAt(scene.position);
        camera.position.z = 10;
        camera.position.y = 0;

        const orbit = new OrbitControls(camera, renderer.domElement);
        orbit.update();
        orbit.addEventListener("change", render);
        
        function onWindowResize(){
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
        }

        window.addEventListener("resize", onWindowResize);
        
        function render(){
            //renderer.render(scene, camera);
            composer.render();
        }

        function animate(){
            render();
            requestAnimationFrame(animate);
        }

        animate();