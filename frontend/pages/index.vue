<template>
    <div class="pages">
        <h1>Soul Connection</h1>
        <h2>Dashboard</h2>
        <div class="separator"></div>
        <div class="container">
            <div class="rowmain">
                <div class="card" id="cardclient">
                    <img src="../assets/User.svg"/>
                    <p v-for="employee in modules" :key="employee.id">{{ employee.name }}</p>
                    <p>Total Users</p>
                </div>
                <div class="card" id="cardcoach">
                    <img src="../assets/User.svg"/>
                    <p>2500</p>
                    <p>Total coachs</p>
                </div>
                <div class="card" id="cardrdv">
                    <img src="../assets/Briefcase.svg"/>
                    <p>2500</p>
                    <p>Total Rendez-vous</p>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
const { $api } = useNuxtApp()
const { data } = await useAsyncData('modules', () => $api('/employees'))

// Attendez que les données soient disponibles avant de les afficher
console.log(data);
</script>

<style src="assets/css/homepage.css"></style>