<template>
  <div class="google-recaptcha">
    <div
      :id="`ww-recaptcha-${uid}`"
      v-if="!isHidden"
      v-show="content.key"
    ></div>
    <div v-if="!content.key">PLACEHOLDER</div>
  </div>
</template>

<script>
// 6LfmLWAbAAAAAFIqia_-3o60fuIGuzXtJJuTVt0O : V2

export default {
  wwDefaultContent: {
    key: "6LfmLWAbAAAAAFIqia_-3o60fuIGuzXtJJuTVt0O",
  },
  props: {
    content: { type: "Object", required: true },
    uid: { type: String, required: true },
  },
  data() {
    return {
      isHidden: false,
    };
  },
  /* wwEditor:start */
  watch: {
    "content.key"() {
      this.isHidden = true;
      this.$nextTick(() => {
        this.isHidden = false;

        this.$nextTick(() => {
          this.render();
        });
      });
    },
  },
  /* wwEditor:end */
  methods: {
    addScript() {
      const functionName = `onRecaptchaLoad-${this.uid}`.replace(/-/g, "");
      wwLib.getFrontWindow()[functionName] = this.render;

      const scriptElement = wwLib.getFrontDocument().createElement("script");
      scriptElement.setAttribute(
        "src",
        `https://www.google.com/recaptcha/api.js?onload=${functionName}&render=explicit`
      );
      scriptElement.setAttribute("type", "text/javascript");
      scriptElement.setAttribute("async", true);
      scriptElement.setAttribute("defer", true);
      wwLib.getFrontDocument().head.appendChild(scriptElement);
    },
    render() {
      console.log("hello");
      wwLib.getFrontWindow().grecaptcha.render(`ww-recaptcha-${this.uid}`, {
        sitekey: this.content.key,
        // theme: "dark",
        // size: "compact",
      });
    },
    // registerOnLoad() {
    //   wwLib.getFrontWindow()[`onRecaptchaLoad-${this.uid}`] = this.render;
    // },
  },
  mounted() {
    // this.registerOnLoad();
    this.addScript();
  },
};
</script>

<style lang="scss" scoped></style>
