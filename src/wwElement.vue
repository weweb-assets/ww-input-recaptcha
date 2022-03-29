<template>
    <div class="ww-recaptcha">
        <div
            v-if="!isHidden"
            v-show="content.key"
            :id="`ww-recaptcha-${wwElementState.uid}`"
            :name="wwElementState.name"
            :data-send-response="content.sendResponse"
            data-callback="wwReCaptchaCallback"
        ></div>
        <!-- wwEditor:start -->
        <div v-if="!content.key" class="ww-recaptcha-placeholder caption-m">
            <div>
                A reCAPTCHA key is required. You can
                <a class="ww-editor-link" href="https://www.google.com/recaptcha/admin" target="_blank">find it here</a
                >.
            </div>
            <br />
            <div>You will have to authorize "editor.weweb.io" in the domain list.</div>
        </div>
        <!-- wwEditor:end -->
    </div>
</template>

<script>
export default {
    props: {
        wwElementState: { type: Object, required: true },
        content: { type: Object, required: true },
        uid: { type: String, required: true },
    },
    emits: ['trigger-event'],
    setup(props) {
        const { value: variableValue, setValue } = wwLib.wwVariable.useComponentVariable({
            uid: props.uid,
            name: 'value',
            type: 'object',
            defaultValue: props.content.value === undefined
                ? {
                      validate: false,
                      code: null,
                  }
                : props.content.value
        });

        return { variableValue, setValue };
    },
    data() {
        return {
            isHidden: false,
        };
    },
    computed: {
        value() {
            return this.variableValue;
        },
    },
    /* wwEditor:start */
    watch: {
        'content.key'() {
            this.forceRender();
        },
        'content.theme'() {
            this.forceRender();
        },
        'content.size'() {
            this.forceRender();
        },
    },
    /* wwEditor:end */
    mounted() {
        this.addScript();
    },
    created() {
        window.wwReCaptchaCallback = this.callback;
    },
    methods: {
        addScript() {
            const functionName = `onRecaptchaLoad-${this.wwElementState.uid}`.replace(/-/g, '');
            wwLib.getFrontWindow()[functionName] = this.render;

            const scriptElement = wwLib.getFrontDocument().createElement('script');
            scriptElement.setAttribute(
                'src',
                `https://www.google.com/recaptcha/api.js?onload=${functionName}&render=explicit`
            );
            scriptElement.setAttribute('type', 'text/javascript');
            scriptElement.setAttribute('async', true);
            scriptElement.setAttribute('defer', true);
            wwLib.getFrontDocument().head.appendChild(scriptElement);
        },
        render() {
            wwLib.getFrontWindow().grecaptcha.render(`ww-recaptcha-${this.wwElementState.uid}`, {
                sitekey: this.content.key,
                theme: this.content.theme,
                size: this.content.size,
            });
        },
        callback(code) {
            const value = {
                validate: !!code,
                code: code || null,
            };
            this.setValue(value);
            this.$emit('trigger-event', { name: 'change', event: { value } });
        },
        /* wwEditor:start */
        forceRender() {
            this.isHidden = true;
            this.$nextTick(() => {
                this.isHidden = false;
                this.$nextTick(() => this.render());
            });
        },
        /* wwEditor:end */
    },
};
</script>

<style lang="scss" scoped>
.ww-recaptcha {
    /* wwEditor:start */
    &-placeholder {
        width: 100%;
        height: 100%;
        min-height: 80px;
        background-color: #e4e4e4;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: var(--ww-color-dark-700);
    }
    .ww-editor-link {
        display: unset;
    }
    /* wwEditor:end */
}
</style>
