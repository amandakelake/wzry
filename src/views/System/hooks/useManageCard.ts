import { StyleValue } from "vue";

type Info = {
  box: StyleValue;
  list: Record<string, string>;
};
const data: Info = {
  box: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    overflow: "auto",
  },
  list: {
    Hero: "英雄",
    Skin: "皮肤",
    Skill: "技能",
    // Equip: "装备",
    // Voice: "语音",
  },
};

export default data;
