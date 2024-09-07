<template>
    <div class="customers pages">
        <h1>Customers</h1>
        <div class="separator"></div>

        <div class="selector-container">
            <select v-model="selectedFirstName" @change="selectUserByFirstName">
                <option value="" disabled>Select Customer</option>
                <option v-for="user in users.results" :key="user.login.uuid" :value="user.name.first">
                    {{ user.name.first }} {{ user.name.last }}
                </option>
            </select>
        </div>

        <div v-if="selectedUser" class="user-card">
            <div class="user-info">
                <div class="info-item">
                    <img src="../assets/User.svg" alt="User Icon" />
                    <h1>{{ selectedUser.name.first }} {{ selectedUser.name.last }}</h1>
                </div>
                <div class="info-item">
                    <img src="../assets/Calendar.svg" alt="Calendar Icon" />
                    <h3>{{ formatDate(selectedUser.dob.date) }}</h3>
                </div>
                <div class="info-item">
                    <img src="../assets/Localisation.svg" alt="Location Icon" />
                    <h3>{{ formatLocalisation(selectedUser.location) }}</h3>
                </div>
            </div>
            <img :src="selectedUser.picture.large" alt="User Image" class="user-image" />
        </div>

        <div v-if="selectedUser" class="separator"></div>

        <div class="tables-container">
        <div v-if="selectedUser" class="ta">
        <h4>Payments</h4>
        <div class="user-table">
            <div class="user-table-header">
                <div class="user-table-header-cell">Date</div>
                <div class="user-table-header-cell">Amout</div>
                <div class="user-table-header-cell">Comment</div>
            </div>
            <div class="user-table-body">
                <div class="user-table-row">
                    <div class="user-table-cell user-number">
                        <p>...</p>
                    </div>
                    <div class="user-table-cell">
                        <p>...€</p>
                    </div>
                    <div class="user-table-cell">
                        <p>...</p>
                    </div>
                </div>
            </div>
        </div>
        </div>

        <div v-if="selectedUser" class="tb">
            <h4>Meetings</h4>
        <div class="user-table">
            <div class="user-table-header">
                <div class="user-table-header-cell">Date</div>
                <div class="user-table-header-cell">Rating</div>
                <div class="user-table-header-cell">Report</div>
                <div class="user-table-header-cell">Source</div>
            </div>
            <div class="user-table-body">
                <div class="user-table-row">
                    <div class="user-table-cell user-number">
                        <p>...</p>
                    </div>
                    <div class="user-table-cell">
                        <p>./5</p>
                    </div>
                    <div class="user-table-cell">
                        <p>...</p>
                    </div>
                    <div class="user-table-cell">
                        <p>...</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useFetch } from '#app';

const { data: users, error } = useFetch('https://randomuser.me/api/?results=100');
const selectedUser = ref(null);
const selectedFirstName = ref('');

function selectUserByFirstName() {
    if (users.value) {
        selectedUser.value = users.value.results.find(user => user.name.first === selectedFirstName.value) || null;
    }
}

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

function formatLocalisation(location) {
    return `${location.street.number} ${location.street.name} ${location.postcode} ${location.city}, ${location.country}`;
}

</script>

<style src="@/assets/css/customers.css" />
