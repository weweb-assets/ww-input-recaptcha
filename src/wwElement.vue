<template>
  <div class="my-element">
    <div class="g-recaptcha" :data-sitekey="content.key"></div>
  </div>
</template>

<script>
// 6LduC9AaAAAAAJddSLqogxdLLD4qyzotZJuTpj6T

export default {
  name: "__COMPONENT_NAME__",
  wwDefaultContent: {
    key: "",
  },
  props: {
    content: { type: "Object", required: true },
  },
  methods: {
    initCaptcha() {
      const scriptElement = document.createElement("script");
      scriptElement.setAttribute(
        "src",
        "https://www.google.com/recaptcha/api.js"
      );
      scriptElement.setAttribute("type", "text/javascript");
      scriptElement.setAttribute("async", true);
      scriptElement.setAttribute("defer", true);
      document.head.appendChild(scriptElement);
    },
  },
  mounted() {
    this.initCaptcha();
  },
};
</script>

<style lang="scss" scoped></style>
