import React, { useEffect, useRef } from 'react'
import { BoxGeometry, Mesh, MeshBasicMaterial, MeshNormalMaterial, OrthographicCamera, Scene, WebGLRenderer } from 'three'
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader'
import bunnyModel from '../asset/model/bun_zipper_res4.ply';


const SceneComponent = () => {
  const sceneBaseRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const scene = new Scene();
    const camera = new OrthographicCamera(-5, 5, 5, -5, -5, 5)

    const renderer = new WebGLRenderer({ alpha: true });
    renderer.setSize(sceneBaseRef.current!.clientWidth, sceneBaseRef.current!.clientHeight)
    sceneBaseRef.current!.appendChild(renderer.domElement)

    const plyLoader = new PLYLoader();
    plyLoader.load(
      bunnyModel,
      function (geometry) {
        geometry.computeVertexNormals();
        const material = new MeshNormalMaterial()
        material.wireframe = true
        const bunny = new Mesh(geometry, material)
        bunny.scale.set(30, 30, 30)
        scene.add(bunny)
      },
      function (xhr) {
        console.log(`${xhr.loaded / xhr.total * 100}%`)
      },
      function (err) {
        console.error("failed to load model")
      },
    )

    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshNormalMaterial();
    const cube = new Mesh(geometry, material)
    scene.add(cube)

    camera.position.z = 3;

    const animate = () => {
      requestAnimationFrame(animate)
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      renderer.render(scene, camera)
    }
    animate()
  }, [])



  return <div ref={sceneBaseRef} style={{ width: "500px", height: "500px" }}>

  </div>
}

export default SceneComponent

function WireFrameGeometry(geometry: BufferGeometry) {
  throw new Error('Function not implemented.');
}
