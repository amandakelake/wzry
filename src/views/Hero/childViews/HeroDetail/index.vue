<script setup lang="ts">
import { watchEffect, nextTick, ref, computed } from "vue";
import { useRouter } from "vue-router";

import HeroScroll from "./childComps/HeroScroll/index.vue"; //全屏滚动组件
import HeroParallax from "./childComps/HeroParallax/index.vue"; //滚动视差背景
import Heroprogress from "./childComps/Heroprogress/index.vue"; //滚动索引
import HeroInfo from "./childComps/HeroInfo/index.vue"; //资料
import HeroSkin from "./childComps/HeroSkin/index.vue"; //皮肤鉴赏
import HeroSkill from "./childComps/HeroSkill/index.vue"; //技能页

import { $deepCopy } from "@/utils";
import heroDetail from "@/store/heroDetail";
import heroStore from "@/store/hero";
import switchStore from "@/store/switch";
import { heroDefault } from "@/default";

interface Emits {
  (e: "update:modelValue", v: boolean): void;
}
const emit = defineEmits<Emits>();

const $router = useRouter();
const $heroDetail = heroDetail();
const $heroStore = heroStore();
const $switchStore = switchStore();

const page_name = ["英雄资料", "皮肤鉴赏", "技能信息"]; //滚动索引标题

const scroll_index = ref(1); //滚动索引
const show_progress = ref(false); //显示滚动索引组件
const hero_toggle = ref(true); //英雄关系切换时重新加载皮肤页

const hero_data = ref<Hero.Data>($deepCopy(heroDefault)); //英雄信息

watchEffect(() => {
  hero_data.value = $heroDetail.hero_info;
  hero_toggle.value = false;
  nextTick(() => {
    hero_toggle.value = true;
    $heroDetail.skinToggle(hero_data.value.name, ""); //切换皮肤
  });
});

//技能数量
const skill_num = computed(() => {
  return (hero_data.value.skills && hero_data.value.skills.length) || 0;
});

//皮肤数量
const skin_num = computed(() => {
  return (hero_data.value.skins && hero_data.value.skins.length) || 0;
});

/* 点击滚动索引 */
const EmitToggle = (index: number) => {
  scroll_index.value = index;
};

/* 滚动立即触发 */
const EmitScollStart = () => {
  $switchStore.$clickAudio("n4r4");
};

/* 滚动结束触发 */
const EmitScrollEnd = (index: number) => {
  $heroDetail.setIndex(index);
};

/* 隐藏自身 */
const handleHide = () => {
  $router.replace("/hero");
  $heroDetail.setSkinVoice("盾山"); //置空语音
  $switchStore.$clickAudio("6xc6");

  //延迟0.1秒显示解决移动端动画掉帧
  setTimeout(() => {
    emit("update:modelValue", false);
  }, 100);

  /* 如果英雄列表职业为空，1.5秒后获取英雄列表 */
  if (!$heroStore.profession) {
    setTimeout(() => {
      $heroStore.getHeroList();
      setTimeout(() => {
        $switchStore.$clickAudio("4d8m");
      }, 250);
    }, 1500);
  }
};

//延迟显示滚动索引
setTimeout(() => {
  show_progress.value = true;
  hero_data.value.skins?.forEach((item) => {
    new Image().src = item.poster; //海报预加载
  });
}, 1500);

$switchStore.$clickAudio("u4c5");
</script>

<template>
  <div class="hero-detail">
    <!-- 顶部关闭 -->
    <img
      class="back cursor-pointer"
      src="https://lengyibai.gitee.io/wzry-material/image/back.png"
      alt="返回"
      @dragstart.prevent
      @click="handleHide"
    />
    <HeroScroll v-model="scroll_index" @start="EmitScollStart" @end="EmitScrollEnd">
      <!--资料皮肤-->
      <HeroParallax class="scroll-item" :bg="hero_data.poster">
        <HeroInfo />
      </HeroParallax>

      <!--皮肤-->
      <HeroParallax v-if="skin_num" class="scroll-item" :bg="hero_data.poster">
        <HeroSkin v-if="hero_toggle" />
      </HeroParallax>

      <!--技能-->
      <HeroParallax v-if="skill_num" class="scroll-item" :bg="hero_data.skins![skin_num - 1].poster">
        <HeroSkill v-if="hero_toggle" />
      </HeroParallax>
    </HeroScroll>

    <!-- 滚动进度 -->
    <transition name="progress">
      <Heroprogress v-show="show_progress" :index="scroll_index" :page-name="page_name" @toggle="EmitToggle" />
    </transition>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
