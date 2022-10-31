<template>
  <div class="home">
    <MapComp />
    <div class="inputContainer">
      <input
        name="link"
        required
        v-model="link"
        type="text"
        placeholder="Link do arquivo"
      />
      <button v-on:click="addPoint()">Adicionar</button>
      <h3 v-if="points.length">Lista de pontos:</h3>
      <ol>
        <li v-for="(point, i) in points" :key="i">
          {{ point[1] }} - {{ point[2] }}
        </li>
      </ol>
      <input
        name="nome"
        required
        v-model="nome"
        type="text"
        placeholder="Nome da rota"
      />
      <button v-on:click="savePoints()">Salvar Rota</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MapComp from "@/components/MapComp.vue";
import store from "@/store";

export default {
  name: "HomeView",
  components: {
    MapComp,
  },
  data() {
    return {
      points: [],
      link: "",
      nome: "",
    };
  },
  methods: {
    addPoint() {
      const point = store.getters.current_point;
      if (this.link == "" || point[0] == 0) {
        return;
      }
      this.points.push({ 1: point, 2: this.link });
      this.link = "";
    },
    savePoints() {
      if (this.nome == "" || this.points.length == 0) {
        return;
      }
      store.commit("add_points_list", { nome: this.nome, pontos: this.points });
      this.nome = "";
      this.points = [];
      alert("Rota criada com sucesso!");
    },
  },
};
</script>

<style lang="scss">
.inputContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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
</style>
