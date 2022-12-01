<script>
export default {
    props: [
        'helptext'
    ],
    data() {
        return {
            msgVisible: false
        }
    },
    methods: {
        async copy() {
            const text = this.$refs.codeContents.innerText;
            await navigator.clipboard.writeText(text);
            this.showMessage();
        },
        showMessage() {
            this.msgVisible = true;
            setTimeout(() => {
                this.msgVisible = false
            }, 2000);
        }
    }
}
</script>

<template>
    <div class="code-area">
        <code ref="codeContents">
            <slot></slot>
        </code>
        <div class="help-area">
            <p class="help-text" v-if="this.helptext" v-html="this.helptext"></p>
        </div>
    </div>
    <div class="info-msg" :class="msgVisible ? 'info-msg--visible' : ''">{{ $t('copy-done') }}</div>
    <button class="btn btn--sub" @click="copy" type="button">{{ $t('copy-to-clipboard') }}</button>
</template>

<style lang="scss" scoped>
    .code-area {
        display: flex;
        align-items: flex-end;
        gap: 10px 30px;
        flex-wrap: wrap-reverse;
    }
    .help-area {
        flex: 1 1 20vw;
        min-width: 200px;
    }
    .help-text {
        padding: 1em 0;
        margin: 0;
        color: var(--color-brand-2);
    }
    code {
        flex: 1 1 60vw;
    }
    .info-msg {
        display: inline-block;
        padding: 0.25em 1em;
        font-size: 14px;
        position: absolute;
        z-index: 9;
        margin-top: -2em;
        margin-left: 0.5em;
        background: var(--color-brand-4);
        color: #fff;
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }
    .info-msg--visible {
        opacity: 0.9;
    }

</style>
