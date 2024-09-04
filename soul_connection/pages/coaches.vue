<template>
    <div class="coaches pages">
        <h1>Coaches</h1>
        <div class="separator"></div>
        <div class="user-table">
            <div class="user-table-header">
                <div class="user-table-header-cell">Number</div>
                <div class="user-table-header-cell">Name</div>
                <div class="user-table-header-cell">Email</div>
                <div class="user-table-header-cell">Birth Date</div>
                <div class="user-table-header-cell">Customers</div>
                <div class="user-table-header-cell">Last connection</div>
            </div>
            <div class="user-table-body">
                <div class="user-table-row" v-for="(user, index) in users.results" :key="user.login.uuid">
                    <div class="user-table-cell user-number">
                        {{ index + 1 }}
                    </div>
                    <div class="user-table-cell">
                        {{ user.name.first }} {{ user.name.last }}
                    </div>
                    <div class="user-table-cell">
                        {{ user.email }}
                    </div>
                    <div class="user-table-cell">
                        {{ formatDate(user.dob.date) }}
                    </div>
                    <div class="user-table-cell">
                        <p>Edit List ...</p>
                    </div>
                    <div class="user-table-cell">
                        <p>...</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useFetch } from '#app';

const { data: users, error } = useFetch('https://randomuser.me/api/?results=10');

if (error.value) {
  console.error('Failed to fetch data:', error.value);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

</script>

<style src="./assets/css/coaches.css"></style>
