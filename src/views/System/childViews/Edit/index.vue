<script setup lang="ts">
import { reactive, defineAsyncComponent } from "vue";

import useManageCard from "../../hooks/useManageCard";

type Options = Record<
  string,
  {
    i: number; //标识符
    show: boolean; //显示
  }
>;

const EditHero = defineAsyncComponent(() => import("./childViews/EditHero/index.vue")); //英雄
const EditSkin = defineAsyncComponent(() => import("./childViews/EditSkin/index.vue")); //皮肤
const EditSkill = defineAsyncComponent(() => import("./childViews/EditSkill/index.vue")); //技能

const { box, list } = useManageCard;
const components = [EditHero, EditSkin, EditSkill];

/* 循环判断打开页面 */
const options: Options = reactive({
  Hero: {
    i: 0,
    show: false,
  },
  Skin: {
    i: 1,
    show: false,
  },
  Skill: {
    i: 2,
    show: false,
  },
});

/* 根据点击卡片索引打开页面 */
const open = (key: string) => {
  options[key].show = true;
};
</script>

<template>
  <div class="edit" :style="box">
    <!-- 卡片 -->
    <transition-group name="fade" appear>
      <K-Manage v-for="(v, k) in list" :title="v" type="edit" @click="open(k as string)" :key="k" />
    </transition-group>

    <!-- 页面 -->
    <transition v-for="(v, k) in options" name="tv-clip" :key="k">
      <component :is="components[v.i]" v-if="v.show" v-model="v.show" />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
