<script setup lang="ts">
import {onMounted, ref } from "vue";
import "cesium/Build/Cesium/Widgets/widgets.css";


import { Ion, Terrain, Viewer , Cartesian3, Math as CesiumMath ,createOsmBuildingsAsync} from "cesium";

const container = ref<HTMLDivElement | null>(null)

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2YTc3OWU4MC0zYjBhLTQ0NzQtYjRlMi05NjNhNWNlODE0M2IiLCJpZCI6MzM0MzE5LCJpYXQiOjE3NTU4Mzc1NzN9.-brfFIMfYIM610UTq8D265_4PkqcmPsyvlrB0_KCE1I'

onMounted(  ()=>{
    if(!container.value) return;

    const cesiumViewer = new Viewer(container.value,{
        terrain:Terrain.fromWorldTerrain()
    })  

    // ‌地面展示‌：设为0，精确显示建筑物位置
    // 建筑俯瞰‌：设为100-300米，展示建筑顶部细节
    // 城市全景‌：设为1000-2000米，展示周边区域
    // 卫星视角‌：设为50000米以上，展示城市在区域中的位置
    // 曲江旺座
    const position = Cartesian3.fromDegrees(109.013896, 34.209865, 1000)

    const orientation = {
        heading: CesiumMath.toRadians(0),
        pitch: CesiumMath.toRadians(-90),
        roll: 0.0
    }

    cesiumViewer.camera.flyTo({
        destination: position,
        orientation: orientation
    })

        // Add Cesium OSM Buildings, a global 3D buildings layer.
       // const buildingTileset = await createOsmBuildingsAsync();
       // cesiumViewer.scene.primitives.add(buildingTileset);
    
    })


</script>

<template>
    <div ref="container"></div>
</template>

<style>
</style>