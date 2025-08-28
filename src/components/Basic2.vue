<script setup lang="ts">
import {onMounted, ref } from "vue";
import "cesium/Build/Cesium/Widgets/widgets.css";


import { ParticleSystem,CircleEmitter,Ion,ParticleBurst, Terrain, Viewer, Cartographic,Cartesian3, ScreenSpaceEventType,Math as CesiumMath,ScreenSpaceEventHandler, Color, PolygonHierarchy, Rectangle,LabelStyle,VerticalOrigin ,Cartesian2 ,JulianDate} from "cesium";

const container = ref<HTMLDivElement | null>(null)

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2YTc3OWU4MC0zYjBhLTQ0NzQtYjRlMi05NjNhNWNlODE0M2IiLCJpZCI6MzM0MzE5LCJpYXQiOjE3NTU4Mzc1NzN9.-brfFIMfYIM610UTq8D265_4PkqcmPsyvlrB0_KCE1I'

onMounted(  ()=>{
    if(!container.value) return;

    const cesiumViewer = new Viewer(container.value)  

    const bjPosition = Cartesian3.fromDegrees(116.39, 39.9)   // 北京

    const pointEntity = cesiumViewer.entities.add({
        position : bjPosition,
        point:{pixelSize : 20,color:Color.RED},
        label:{
            text:'BeiJing',
            style: LabelStyle.FILL_AND_OUTLINE,
            outlineWidth: 2,
            verticalOrigin: VerticalOrigin.BOTTOM,
            pixelOffset: new Cartesian2(0, -9)
        }
    })

    // 绘制折线
    const polyline = cesiumViewer.entities.add({
        polyline: {
            positions: Cartesian3.fromDegreesArray([
                116.39, 39.9,  // 北京
                117.20, 40.1,  // 天津
                118.76, 39.54  // 石家庄
            ]),
            width: 5,
            material: Color.RED
        }
    });

    // 绘制多边形
    const polygon = cesiumViewer.entities.add({
        polygon: {
            hierarchy: new PolygonHierarchy(Cartesian3.fromDegreesArray([
                116.20, 40.0,  // 西南角
                116.20, 40.2,  // 东南角
                116.50, 40.2,  // 东北角
                116.50, 40.0   // 西北角
            ])),
            material: Color.fromCssColorString('#179ed5').withAlpha(0.5),
            outline: true,
            outlineColor: Color.BLACK
        }
    });

    // 加载3D模型
    // 3D 模型格式：glTF
    const model = cesiumViewer.entities.add({
        position: Cartesian3.fromDegrees(116.39, 39.9, 1000),
        model: {
            uri: '/models/first.glb', // 本地模型文件
            minimumPixelSize: 128,
            maximumScale: 20000
        }
    });

    // 添加公告牌
    const billboard = cesiumViewer.entities.add({
        position: Cartesian3.fromDegrees(116.39, 39.9),
        billboard: {
            image: '/images/facility.png', // 本地图标文件
            scale: 1.0
        }
    });

    // 飞到北京视角
    cesiumViewer.camera.flyTo({
        destination: Rectangle.fromDegrees(115.0, 39.0, 119.0, 41.0)
    });


    // 创建一个粒子系统
    const particleSystem = cesiumViewer.scene.primitives.add(new ParticleSystem({
      //  image: './path/to/your/particle-image.png', // 粒子纹理
        startColor: Color.WHITE.withAlpha(0.7),
        endColor: Color.WHITE.withAlpha(0.0),
        startScale: 1.0,
        endScale: 5.0,
        particleLife: 1.0,
        speed: 5.0,
        emitter: new CircleEmitter(0.5), // 圆形发射器
       // emitterLocation: Cartesian3.fromDegrees(116.39, 39.9, 100),
        bursts: [
            new ParticleBurst({ time: 5.0, minimum: 10, maximum: 100 }),
            new ParticleBurst({ time: 10.0, minimum: 50, maximum: 200 })
        ],
        lifetime: 16.0
    }));




    // 屏幕空间事件处理（例如鼠标移动）
    const handler = new ScreenSpaceEventHandler(cesiumViewer.scene.canvas);
    handler.setInputAction(function(movement) {
        const position = cesiumViewer.scene.pickPosition(movement.endPosition);
        if (position) {
            const cartographic = Cartographic.fromCartesian(position);
            const longitude = CesiumMath.toDegrees(cartographic.longitude).toFixed(5);
            const latitude = CesiumMath.toDegrees(cartographic.latitude).toFixed(5);
            console.log(`经度: ${longitude}, 纬度: ${latitude}`);
        }
    }, ScreenSpaceEventType.MOUSE_MOVE);

    // 飞向点实体
/*     cesiumViewer.camera.flyTo({
        destination: pointEntity.position.getValue(JulianDate.now()),
        duration: 6.0
    });
     */
})


</script>

<template>
    <div ref="container"></div>
</template>

<style>
</style>