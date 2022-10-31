<template>
  <a-scene embedded arjs>
    <a-marker preset="hiro">
      <a-entity
        position="0 0 0"
        scale="1 1 1"
        gltf-model="https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/scene.gltf"
      ></a-entity>
    </a-marker>
    <a-entity camera></a-entity>
  </a-scene>
</template>
<script>
export default {};
</script>
