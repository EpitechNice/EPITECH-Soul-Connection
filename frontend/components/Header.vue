<template>
    <nav v-if="isNavVisible">
        <NuxtLink 
            to="/" 
            :class="{ active: isActive('/') }" 
            @click="setActive('/')">Home</NuxtLink>
        <NuxtLink 
            to="/coaches" 
            :class="{ active: isActive('/coaches') }" 
            @click="setActive('/coaches')">Coaches</NuxtLink>
        <NuxtLink 
            to="/customers" 
            :class="{ active: isActive('/customers') }" 
            @click="setActive('/customers')">Customers</NuxtLink>
        <NuxtLink 
            to="/statistics" 
            :class="{ active: isActive('/statistics') }" 
            @click="setActive('/statistics')">Statistics</NuxtLink>
        <NuxtLink 
            to="/compatibility" 
            :class="{ active: isActive('/compatibility') }" 
            @click="setActive('/compatibility')">Compatibility</NuxtLink>
        <NuxtLink
            to="/garde-robe"
            :class="{ active: isActive('/garde-robe') }"
            @click="setActive('/garde-robe')">Garde-robe</NuxtLink>
    </nav>
    <button @click="toggleNav" class="button-toggle">
        {{ isNavVisible ? '<' : '>' }}
    </button>
</template>
  
<script>
    export default {
        data() {
        return {
            activePath: '/',
            isNavVisible: true
        };
        },
        methods: {
        setActive(path) {
            this.activePath = path;
        },
        isActive(path) {
            return this.activePath === path;
        },
        toggleNav() {
            this.isNavVisible = !this.isNavVisible;

            const pageElement = document.querySelector('.pages');
            if (this.isNavVisible) {
                pageElement.classList.remove('margin-zero');
            } else {
                pageElement.classList.add('margin-zero');
            }
        }
    }
};
</script>

<style src="../assets/css/header.css"></style>