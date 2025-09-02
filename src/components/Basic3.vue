<script setup lang="ts">
import { onMounted, ref } from "vue";
import "cesium/Build/Cesium/Widgets/widgets.css";

import { 
  Ion, 
  Terrain, 
  Viewer, 
  Cartesian3, 
  Cartographic, 
  Math as CesiumMath, 
  Color, 
  HeightReference,
  sampleTerrainMostDetailed
} from "cesium";

const container = ref<HTMLDivElement | null>(null);

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2YTc3OWU4MC0zYjBhLTQ0NzQtYjRlMi05NjNhNWNlODE0M2IiLCJpZCI6MzM0MzE5LCJpYXQiOjE3NTU4Mzc1NzN9.-brfFIMfYIM610UTq8D265_4PkqcmPsyvlrB0_KCE1I';

onMounted(async () => {
  if (!container.value) return;

  // Initialize the viewer with terrain
  const cesiumViewer = new Viewer(container.value, {
    terrain: Terrain.fromWorldTerrain()
  });

  // Set up camera position for demonstration
  const everestPosition = Cartesian3.fromDegrees(86.925145, 27.988257, 10000);
  
  const orientation = {
    heading: CesiumMath.toRadians(0),
    pitch: CesiumMath.toRadians(-45),
    roll: 0.0
  };

  cesiumViewer.camera.flyTo({
    destination: everestPosition,
    orientation: orientation,
    duration: 3
  });

  // Wait for terrain to load by checking if it's ready
  // Using a small delay to ensure terrain is loaded
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Sample terrain heights at multiple positions
  const positions = [
    Cartographic.fromDegrees(86.925145, 27.988257), // Mount Everest
    Cartographic.fromDegrees(86.915145, 27.978257),  // Nearby position
    Cartographic.fromDegrees(86.935145, 27.998257)   // Another nearby position
  ];
  
  // Sample the most detailed terrain heights
  const updatedPositions = await sampleTerrainMostDetailed(
    cesiumViewer.terrainProvider, 
    positions
  );
  
  // Display the sampled positions with height information
  updatedPositions.forEach((position, index) => {
    const height = position.height.toFixed(2);
    const longitude = CesiumMath.toDegrees(position.longitude).toFixed(5);
    const latitude = CesiumMath.toDegrees(position.latitude).toFixed(5);
    
    // Add point entities at the sampled positions
    cesiumViewer.entities.add({
      position: Cartesian3.fromRadians(position.longitude, position.latitude, position.height),
      point: {
        pixelSize: 10,
        color: Color.RED,
        heightReference: HeightReference.CLAMP_TO_GROUND
      },
      label: {
        text: `Point ${index + 1}\nHeight: ${height}m`,
        font: '14px sans-serif',
        fillColor: Color.WHITE,
        outlineColor: Color.BLACK,
        outlineWidth: 2,
        style: 2, // FILL_AND_OUTLINE
        verticalOrigin: 1, // CENTER
        pixelOffset: new Cartesian3(0, -30, 0),
        heightReference: HeightReference.CLAMP_TO_GROUND
      }
    });
    
    console.log(`Position ${index + 1}: Longitude=${longitude}, Latitude=${latitude}, Height=${height}m`);
  });
  
  // Add a polygon that follows the terrain
  const polygonPositions = Cartesian3.fromDegreesArray([
    86.92, 27.98,
    86.92, 27.99,
    86.93, 27.99,
    86.93, 27.98
  ]);
  
  cesiumViewer.entities.add({
    polygon: {
      hierarchy: polygonPositions,
      material: Color.BLUE.withAlpha(0.5),
      heightReference: HeightReference.CLAMP_TO_GROUND,
      outline: true,
      outlineColor: Color.BLACK
    }
  });
  
  // Add a 3D model clamped to ground
  cesiumViewer.entities.add({
    position: Cartesian3.fromDegrees(86.925145, 27.988257, 1000),
    model: {
      uri: '/models/first.glb',
      scale: 100.0,
      heightReference: HeightReference.CLAMP_TO_GROUND
    },
    label: {
      text: '3D Model\n(Clamped to terrain)',
      font: '14px sans-serif',
      fillColor: Color.WHITE,
      outlineColor: Color.BLACK,
      outlineWidth: 2,
      style: 2,
      verticalOrigin: 1,
      pixelOffset: new Cartesian3(0, -50, 0),
      heightReference: HeightReference.CLAMP_TO_GROUND
    }
  });
});
</script>

<template>
  <div ref="container" style="width: 100%; height: 100vh;"></div>
</template>

<style>
/* Ensure the container fills the entire viewport */
#container {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>