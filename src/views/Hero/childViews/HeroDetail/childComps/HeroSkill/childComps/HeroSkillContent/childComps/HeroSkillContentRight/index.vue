<script setup lang="ts">
interface Props {
  activeSkill: Hero.Skill;
}
defineProps<Props>();
</script>

<template>
  <div class="hero-skill-content-right scroll-white">
    <table class="table">
      <tr>
        <td></td>
        <td v-for="(item, index) in activeSkill.effect![0].phase.length" class="lv" :key="index">LV{{ item }}</td>
      </tr>
      <tr v-for="(item, index) in activeSkill.effect" :key="index">
        <td class="effect">
          {{ item.type }}
        </td>
        <td v-for="(_item, index) in item.phase" class="num" :key="index">
          {{ _item }}
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
