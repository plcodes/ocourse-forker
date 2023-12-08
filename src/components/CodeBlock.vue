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
    <div class="with-explanation">
        <code class="main-area" ref="codeContents">
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
