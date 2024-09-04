<template>
    <nav>
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/coaches">Coaches</NuxtLink>
        <NuxtLink to="/customers">Customers</NuxtLink>
        <NuxtLink to="/statistics">Statistics</NuxtLink>
        <NuxtLink to="/compatibility">Compatibility</NuxtLink>
    </nav>
</template>
  
  <style scoped>
  nav {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 200px;
      background-color: #f8f9fa;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: 10px;
      box-shadow: 2px 0 5px rgba(0,0,0,0.1);
  }
  
  nav a {
      text-decoration: none;
      color: #333;
      margin-bottom: 15px;
      font-size: 18px;
  }
  
  nav a:hover {
      color: #007bff;
  }
  </style>
  