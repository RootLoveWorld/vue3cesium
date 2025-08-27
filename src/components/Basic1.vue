<script setup lang="ts">
import {onMounted, ref } from "vue";
import "cesium/Build/Cesium/Widgets/widgets.css";


import { Ion, Terrain, Viewer , Cartesian3, Math as CesiumMath ,Color} from "cesium";

const container = ref<HTMLDivElement | null>(null)

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2YTc3OWU4MC0zYjBhLTQ0NzQtYjRlMi05NjNhNWNlODE0M2IiLCJpZCI6MzM0MzE5LCJpYXQiOjE3NTU4Mzc1NzN9.-brfFIMfYIM610UTq8D265_4PkqcmPsyvlrB0_KCE1I'

onMounted(  ()=>{
    if(!container.value) return;

    const cesiumViewer = new Viewer(container.value)  

    const bjPosition = Cartesian3.fromDegrees(116.39, 39.9)   // 北京

    const entity = cesiumViewer.entities.add({
        position : bjPosition,
        point:{pixelSize : 20,color:Color.RED},
        label:{text:'Hello Beijing..'}
    })

    cesiumViewer.camera.flyTo({destination: bjPosition})
    
})


</script>

<template>
    <div ref="container"></div>
</template>

<style>
</style>