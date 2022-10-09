<script setup lang="ts">
import { requestIssues } from "@/api/issues";

requestIssues("kingcos", "yangmao.icu")
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
</script>

<template>
  <main>Main View</main>
</template>

<style lang="scss"></style>
