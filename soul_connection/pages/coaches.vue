<template>
    <div class="pages">
        <h1>Coaches</h1>
        <div class="separator"></div>
        <article v-for="post in posts" :key="post.id">
            <h2>{{ post.title }}</h2>
            <p>{{ post.body }}</p>
        </article>
    </div>
</template>

<script setup>
const { data: posts } = useFetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
</script>
