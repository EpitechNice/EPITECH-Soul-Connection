<template>
  <div class="pages">
    <h1>Garde Robe Virtuelle</h1>
    <div class="separator"></div>
    
    <div class="filters">
      <label for="user">Utilisateur :</label>
      <select v-model="selectedUser" @change="filterClothes">
        <option value="">Tous les utilisateurs</option>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>

      <label for="category">Catégorie :</label>
      <select v-model="selectedCategory" @change="filterClothes">
        <option value="">Toutes</option>
        <option value="tops">Hauts</option>
        <option value="bottoms">Bas</option>
        <option value="shoes">Chaussures</option>
      </select>
    </div>

    <div class="wardrobe-container">
      <div class="clothes-list">
        <h2>Vêtements Disponibles</h2>
        <div class="clothes-item" v-for="item in filteredClothes" :key="item.id">
          <img :src="item.image" :alt="item.name" />
          <p>{{ item.name }}</p>
          <button @click="addToSelection(item)">Ajouter</button>
        </div>
      </div>

      <div class="selection-area">
        <h2>Votre Sélection</h2>
        <div class="selected-item" v-for="item in selection" :key="item.id">
          <img :src="item.image" :alt="item.name" />
          <p>{{ item.name }}</p>
          <button @click="removeFromSelection(item.id)">Supprimer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      clothes: [],
      filteredClothes: [],
      selection: [],
      selectedCategory: '',
      selectedUser: '',
    };
  },
  async mounted() {
    await this.fetchUsers();
    await this.fetchClothes();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch('YOUR_USERS_API_ENDPOINT');
        const data = await response.json();
        this.users = data.users;
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    },
    async fetchClothes() {
      try {
        let url = 'YOUR_API_ENDPOINT';
        if (this.selectedUser) {
          url += `?userId=${this.selectedUser}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        this.clothes = data.clothes;
        this.filterClothes();
      } catch (error) {
        console.error('Erreur lors de la récupération des vêtements:', error);
      }
    },
    filterClothes() {
      this.filteredClothes = this.clothes;

      if (this.selectedCategory) {
        this.filteredClothes = this.filteredClothes.filter(
          (item) => item.category === this.selectedCategory
        );
      }

      if (this.selectedUser) {
        this.filteredClothes = this.filteredClothes.filter(
          (item) => item.userId === this.selectedUser
        );
      }
    },
    addToSelection(item) {
      if (!this.selection.includes(item)) {
        this.selection.push(item);
      }
    },
    removeFromSelection(itemId) {
      this.selection = this.selection.filter((item) => item.id !== itemId);
    },
  },
};
</script>

<style scoped>
.garde-robe-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.filters {
  margin-bottom: 20px;
}

.wardrobe-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.clothes-list, .selection-area {
  width: 45%;
}

.clothes-item, .selected-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

.clothes-item img, .selected-item img {
  max-width: 100px;
  margin-bottom: 5px;
}

button {
  margin-top: 5px;
  padding: 5px 10px;
}

</style>
