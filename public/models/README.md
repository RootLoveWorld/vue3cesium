# Models Directory

This directory contains 3D model files for Cesium.

## Supported Formats
- `.glb` - Binary glTF files (recommended)
- `.gltf` - Text glTF files
- `.json` - Cesium 3D Tiles format

## Usage
Place your 3D model files here and reference them in your Vue components like:

```javascript
// For GLB files
model: {
    uri: '/models/your-model.glb'
}

// For GLTF files  
model: {
    uri: '/models/your-model.gltf'
}
```

## Example Models
You can download free models from:
- Cesium ion (https://cesium.com/platform/cesium-ion/)
- Sketchfab (https://sketchfab.com/)
- glTF Sample Models (https://github.com/KhronosGroup/glTF-Sample-Models)