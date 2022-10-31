<template>
  <div class="mapContainer">
    <p v-if="hasEnd">Parabéns!Você finalizou sua rota!</p>
    <l-map
      style="height: 70vh"
      ref="map"
      :zoom="zoom"
      :center="[
        currentPoint.lat ||
          position.lat ||
          userLocation.lat ||
          defaultLocation.lat,
        currentPoint.lng ||
          position.lng ||
          userLocation.lng ||
          defaultLocation.lng,
      ]"
    >
      <l-tile-layer
        :url="tileProvider.url"
        :attribution="tileProvider.attribution"
      />
      <l-circle-marker :lat-lng="userPosition" :radius="radius" color="red" />
      <l-marker v-if="!hasEnd" visible :icon="icon" :lat-lng="currentPoint">
      </l-marker>
    </l-map>
    <button v-if="!hasEnd" v-on:click="PointPP()">Iniciar Encontro!</button>
  </div>
</template>
<script>
import { LMap, LMarker, LTileLayer, LCircleMarker } from "vue2-leaflet";
import { icon } from "leaflet";
import "leaflet/dist/leaflet.css";
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LCircleMarker,
  },
  props: {
    points: {
      type: Object,
      required: true,
    },
    defaultLocation: {
      type: Object,
      default: () => ({
        lat: 8.9806,
        lng: 38.7578,
      }),
    },
  },
  data() {
    return {
      loading: false,
      userLocation: {},
      radius: 40,
      currentPointIdx: 0,
      hasEnd: false,
      icon: icon({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
      }),
      position: {},
      address: "",
      tileProvider: {
        attribution:
          '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      },
      zoom: 18,
      dragging: false,
    };
  },
  mounted() {
    this.getUserPosition();
  },
  computed: {
    tooltipContent() {
      if (this.dragging) return "...";
      if (this.loading) return "Loading...";
      return `<strong>lat:</strong> ${this.position.lat}<br/> <strong>lng:</strong> ${this.position.lng}`;
    },
    currentPoint() {
      return this.points["pontos"][this.currentPointIdx][1];
    },
    getPosition() {
      return JSON.parse(JSON.stringify(this.position));
    },
    userPosition() {
      this.getUserPosition();
      // console.log("ok");
      // console.log(this.userLocation);
      if (this.userLocation != {}) {
        return this.userLocation;
      }
      return this.currentPoint;
    },
  },
  methods: {
    async getUserPosition() {
      if (navigator.geolocation) {
        // get GPS position
        navigator.geolocation.getCurrentPosition((pos) => {
          console.log("ok");
          // set the user location
          this.userLocation = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
        });
      }
    },
    PointPP() {
      this.getUserPosition();
      if (this.points["pontos"].length > this.currentPointIdx + 1) {
        this.currentPointIdx += 1;
      } else {
        this.hasEnd = true;
      }
    },
  },
};
</script>

<style lang="scss">
.mapContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  button {
    width: fit-content;
    padding: 5px 10px;
    background-color: #42b983;
    border: 1px solid;
    border-radius: 5px;
    margin-top: 20px;
  }

  p {
    margin-bottom: 20px;
    padding: 20px;
    font-weight: bold;
    background-color: #42b98355;
    position: absolute;
    z-index: 10000;
  }
}
</style>
