<template>
  <el-container>
    <el-main>
      <el-row class="config-row">
        <el-col :span="4" class="label">阅读主题</el-col>
        <el-col :span="20">
          <color-selector v-model="selectedColor" :candidateColors="candidateColors"></color-selector>
        </el-col>
      </el-row>
      <el-row class="config-row">
        <el-col :span="4" class="label">正文字体</el-col>
        <el-col :span="20">
          <el-radio-group v-model="selectedFont" size="small">
            <el-radio-button v-for="(f,i) in fonts" :label="f" :key="i"></el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row class="config-row">
        <el-col :span="4" class="label">字体大小</el-col>
        <el-col :span="20">
          <el-button-group>
            <el-button >A-</el-button>
            <el-button >18</el-button>
            <el-button >A+</el-button>
          </el-button-group>
        </el-col>
      </el-row>
      <el-row class="config-row">
        <el-col :span="4" class="label">页面宽度</el-col>
        <el-col :span="20">
          <el-button-group>
            <el-button >&nbsp;-</el-button>
            <el-button >中&nbsp;</el-button>
            <el-button >&nbsp;+</el-button>
          </el-button-group>
        </el-col>
      </el-row>
    </el-main>
    <el-footer class="config-footer">
      <el-button type="warning" @click="onSave">保存</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-footer>
  </el-container>
</template>

<script>
import ColorSelector from "../util/ColorSelector.vue";
export default {
  components: {
    ColorSelector
  },
  data() {
    return {
      radio: "",
      configs: {
        hello: "Hello"
      },
      lastSavedConfigs: {},
      candidateColors: [
        "#e9e6d0",
        "#f7edd4",
        "#eaf4e9",
        "#e9f4f6",
        "#f7e9e8",
        "#e6e6e6"
      ],
      fonts: ["雅黑", "宋体", "楷体"],
      selectedColor: "0", // need to restore color from localStorage
      selectedFont: "雅黑"
    };
  },
  methods: {
    onSave() {
      this.configs.theme = "theme-" + this.selectedColor;
      this.configs.font = this.selectedFont;
      this.$emit("config-done", { save: true, configs: this.configs });
      this.lastSavedConfigs = this.configs;
    },
    onCancel() {
      this.selectedColor = this.theme2color(this.lastSavedConfigs.theme)
      this.$emit("config-done", { save: false });
    },
    theme2color(theme) {
      if (theme) {
        return theme.split('-')[1]
      } else {
        return '0'
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.config-pane
  padding 0 20px

.config-row
  height 60px
  line-height 60px

.config-footer
  text-align center
</style>


