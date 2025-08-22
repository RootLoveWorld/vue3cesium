<script setup lang="ts">
import {onMounted, ref } from "vue";
import "cesium/Build/Cesium/Widgets/widgets.css"

import { Terrain, Viewer , Cartesian3, Math as CesiumMath } from "cesium";

const container = ref<HTMLDivElement | null>(null)

onMounted(()=>{
    if(!container.value) return;

    const cesiumViewer = new Viewer(container.value,{
        terrain:Terrain.fromWorldTerrain()
    })  

    const position = Cartesian3.fromDegrees(116.38, 39.92, 300)

    const orientation = {
        heading: CesiumMath.toRadians(0),
        pitch: CesiumMath.toRadians(-90),
        roll: 0.0
    }

    cesiumViewer.camera.flyTo({
        destination: position,
        orientation: orientation
    })


  
})


</script>

<template>
<div ref="container"></div>
</template>

<style scoped>
</style>