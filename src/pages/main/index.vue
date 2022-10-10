<script setup lang="ts">
import { requestActivities, type Activity } from "@/api/issues";
import { reactive } from "vue";

const data = reactive<{
  activities: Activity[];
}>({ activities: [] });

requestActivities().then((result) => {
  data.activities = result;
});
</script>

<template>
  <main>
    <div class="activity" v-for="(activity, key) in data.activities" :key="key">
      <div>地区：{{ activity.city }}</div>
      <div>类型：{{ activity.type }}</div>
      <div>要求：{{ activity.requirement }}</div>
      <div>路径：{{ activity.steps }}</div>
      <div>使用：{{ activity.usage }}</div>
      <div>幅度：{{ activity.value }}</div>
      <div>时间：{{ activity.time }}</div>
      <div>
        跳转：<a :href="activity.jump">{{ activity.requirement }}</a>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
.activity {
  margin-top: 20px;

  &:nth-child(2n) {
    background-color: aquamarine;
  }
  &:nth-child(2n + 1) {
    background-color: bisque;
  }
}
</style>
