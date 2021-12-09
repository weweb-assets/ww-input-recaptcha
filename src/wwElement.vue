<template>
    <div class="ww-recaptcha">
        <div
            v-if="!isHidden"
            v-show="content.key"
            :id="`ww-recaptcha-${wwElementState.uid}`"
            :name="content.name"
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
import { computed } from 'vue';

export default {
    props: {
        wwElementState: { type: Object, required: true },
        content: { type: Object, required: true },
        uid: { type: String, required: true },
    },
    emits: ['trigger-event'],
    setup(props) {
        const internalVariableId = computed(() => props.content.variable);
        const variableId = wwLib.wwVariable.useComponentVariable(props.uid, 'value', {}, internalVariableId);

        return { variableId };
    },
    data() {
        return {
            isHidden: false,
            internalValue: {},
        };
    },
    computed: {
        value: {
            get() {
                if (this.variableId) return wwLib.wwVariable.getValue(this.variableId);
                return this.internalValue;
            },
            set(value) {
                this.$emit('trigger-event', { name: 'validate', event: { value } });
                this.internalValue = value;
                if (this.variableId) wwLib.wwVariable.updateValue(this.variableId, value);
            },
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
            this.value = {
                validate: !!code,
                code: code || null,
            };
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
