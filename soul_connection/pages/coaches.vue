<template>
    <div class="pages">
        <h1>Coaches</h1>
        <pre>
            {{ posts }}
        </pre>
    </div>
</template>

<script setup>
const { data: posts } = useFetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
</script>
