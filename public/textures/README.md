# Textures Directory

This directory contains texture files for Cesium materials and surfaces.

## Supported Formats
- `.png` - Best for textures with transparency
- `.jpg/.jpeg` - Good for large textures without transparency
- `.ktx2` - Recommended for performance (compressed)
- `.dds` - DirectX texture format

## Usage
Place your texture files here and reference them in your Vue components like:

```javascript
// For polygon materials
polygon: {
    material: new ImageMaterialProperty({
        image: '/textures/your-texture.png',
        repeat: new Cartesian2(2.0, 2.0)
    })
}

// For model textures (usually handled by the GLB/GLTF file itself)
// Textures are typically embedded or referenced in the model files
```

## Texture Types
- **Diffuse Maps** - Base color textures
- **Normal Maps** - Surface detail textures  
- **Roughness Maps** - Surface material properties
- **Metallic Maps** - Metallic surface properties
- **Emission Maps** - Self-illuminating surfaces