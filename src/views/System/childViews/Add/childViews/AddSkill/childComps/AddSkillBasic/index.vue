<script setup lang="ts">
interface Props {
  skills: Hero.Skill[]; //技能列表
  activeIndex: number;
}
const props = defineProps<Props>();

interface Emits {
  (e: "select", v: number): void;
  (e: "del"): void;
}
const emit = defineEmits<Emits>();

const IMGBED = window.IMGBED; //全局图床链接

/* 处于被编辑中 */
const active = (index: number) => props.activeIndex === index;

/* 选择技能 */
const handleSelectSkill = (index: number) => emit("select", index);

/* 删除技能 */
const handleDel = () => emit("del");
</script>

<template>
  <div class="right">
    <div
      v-for="(item, index) in skills"
      class="add-skill-basic cursor-pointer"
      :class="{ active: active(index) }"
      @click="handleSelectSkill(index)"
      :key="index"
    >
      <!-- 标题 -->
      <div class="title">
        <img :src="item.img || IMGBED + '/image/unknown.png'" alt="" @dragstart.prevent />
        <div class="name">{{ item.name }}</div>
        <div class="types">
          <K-SkillTypeTag v-for="(type, index) in item.type" :type="type" :key="index" />
        </div>
        <button v-show="active(index)" v-if="index !== 0" class="del lib-click" @click.stop="handleDel">删除</button>
        <div v-show="active(index)" class="editing">编辑中...</div>
      </div>

      <!-- 数字 -->
      <div v-if="item.cd || item.consume" class="nums">
        <div class="cd">CD：{{ item.cd }}</div>
        <div class="consume">法力消耗：{{ item.consume }}</div>
      </div>

      <!-- 描述 -->
      <div class="desc" v-html="item.desc"></div>

      <!-- 效果 -->
      <div v-if="item.effect" class="effect">
        <div v-for="(effect, index) in item.effect" class="box" :key="index">
          <div class="type">{{ effect.type }}：</div>
          <div class="phase">{{ effect.phase?.join(" | ") }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url("./index.less");
</style>
