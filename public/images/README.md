# Images Directory

This directory contains image files for Cesium billboards, icons, and textures.

## Supported Formats
- `.png` - Recommended for transparency
- `.jpg/.jpeg` - For photographs and complex images
- `.gif` - For animated images
- `.svg` - Vector graphics

## Usage
Place your image files here and reference them in your Vue components like:

```javascript
// For billboards
billboard: {
    image: '/images/your-icon.png'
}

// For point graphics
point: {
    pixelSize: 20,
    color: Color.WHITE,
    outlineColor: Color.BLACK,
    outlineWidth: 2
}
```

## Example Images
You can find free icons and images from:
- Cesium Sandcastle examples
- Font Awesome icons  
- Material Design icons
- Unsplash for photographs