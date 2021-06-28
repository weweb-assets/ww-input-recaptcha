<template>
  <div class="google-recaptcha">
    <div
      :id="`ww-recaptcha-${uid}`"
      v-if="!isHidden"
      v-show="content.key"
    ></div>
    <div class="ww-recaptcha-placeholder" v-if="!content.key">
      A reCAPTCHA key is required. You can find it here:
      <a href="https://www.google.com/recaptcha/admin"
        >https://www.google.com/recaptcha/admin</a
      >
      <br />
      You will have to authorize "editor.weweb.io" in the domain list
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: { type: "Object", required: true },
    uid: { type: String, required: true },
  },
  wwDefaultContent: {
    key: "",
    theme: "light",
    size: "normal",
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
    "content.theme"() {
      this.isHidden = true;
      this.$nextTick(() => {
        this.isHidden = false;

        this.$nextTick(() => {
          this.render();
        });
      });
    },
    "content.size"() {
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
      wwLib.getFrontWindow().grecaptcha.render(`ww-recaptcha-${this.uid}`, {
        sitekey: this.content.key,
        theme: this.content.theme,
        size: this.content.size,
      });
    },
  },
  mounted() {
    this.addScript();
  },
};
</script>

<style lang="scss" scoped>
.ww-recaptcha-placeholder {
  min-height: 70px;
}
</style>
