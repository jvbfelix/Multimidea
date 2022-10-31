<template>
  <div>
    <h1 v-if="rota == null">Rotas para iniciar:</h1>
    <h1 v-else>Rotas Atual:</h1>
    <div v-if="rota != null">
      <p v-on:click="rota = null" class="returnBtn">
        ----- Voltar para lista-----
      </p>
      <MapShowComp :points="points[rota]" />
    </div>

    <div v-else class="listContainer">
      <div class="rota" v-for="(point, i) in points" :key="i">
        <div>
          <b>{{ point["nome"] }}</b> -
          <i> {{ point["pontos"].length }} pontos para visitar</i>
        </div>

        <button v-on:click="iniciar(i)">Iniciar</button>
      </div>
    </div>
    <a-scene embedded arjs>
      <a-marker preset="hiro">
        <a-entity
          position="0 0 0"
          scale="0.05 0.05 0.05"
          gltf-model="https://arjs-cors-proxy.herokuapp.com/https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/scene.gltf"
        ></a-entity>
      </a-marker>
      <a-entity camera></a-entity>
    </a-scene>
  </div>
</template>

<script>
import MapShowComp from "@/components/MapShowComp.vue";
import store from "@/store";

export default {
  name: "ListsView",
  components: {
    MapShowComp,
  },
  data() {
    return {
      rota: null,
    };
  },
  computed: {
    points() {
      return store.getters.points_list;
    },
  },
  methods: {
    iniciar(i) {
      //console.log(this.points[i]["pontos"]);
      this.rota = i;
    },
    addPoint() {
      const point = store.getters.current_point;
      this.points.push({ 1: point, 2: this.link });
    },
    savePoints() {
      store.commit("add_points_list", this.points);
    },
  },
};
</script>

<style lang="scss">
.listContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    margin: 15px;
  }

  .rota {
    background-color: #42b98355;
    padding: 10px;
    margin-top: 30px;
    border: 1px solid #223344;
    border-radius: 7px;

    button {
      margin-top: 15px;
    }
  }

  input {
    padding: 5px;
    margin: 15px;
    border-radius: 5px;
  }

  button {
    width: fit-content;
    padding: 5px 10px;
    background-color: #42b983;
    border: 1px solid;
    border-radius: 5px;
  }

  li {
    color: #223344;
    font-weight: bold;
    line-height: 2rem;
  }
}

.returnBtn {
  color: red;
  cursor: pointer;
  text-decoration: underline;
  margin: 0 30px 30px 30px;
  padding: 5px;
  background-color: #22334433;

  &:hover {
    background-color: #22334499;
  }
}
</style>
