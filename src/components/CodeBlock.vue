<script>
export default {
    props: [
        'helptext'
    ],
    data() {
        return {}
    },
    methods: {
        async copy() {
            const text = this.$refs.codeContents.innerText;
            await navigator.clipboard.writeText(text);
        }
    }
}
</script>

<template>
    <div class="code-area">
        <code ref="codeContents">
            <slot></slot>
        </code>
        <p v-if="this.helptext" v-html="this.helptext"></p>
    </div>
    <button @click="copy">{{ $t('copy-to-clipboard') }}</button>
</template>

<style lang="scss" scoped>
    .code-area {
        display: flex;
        gap: 10px 30px;
        flex-wrap: wrap-reverse;
    }
    p {
        width: 25vw;
        min-width: 250px;
        position: sticky;
        top: 30px;
    }
    code {
        flex: 1 1 auto;
    }

</style>
