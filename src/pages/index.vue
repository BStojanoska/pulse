<template>
  <h2>Welcome to the Home View</h2>
  <router-link :to="{ name: '/projects/[id]', params: { id: 1 } }">Go to Project 1</router-link>
</template>

<script setup lang="ts"></script>
