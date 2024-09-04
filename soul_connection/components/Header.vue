<template>
    <nav>
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
    </nav>
</template>
  
<script>
    export default {
        data() {
        return {
            activePath: '/'
        };
        },
        methods: {
        setActive(path) {
            this.activePath = path;
        },
        isActive(path) {
            return this.activePath === path;
        }
        }
    };
</script>

<style src="../assets/css/header.css"></style>