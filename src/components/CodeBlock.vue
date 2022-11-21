<script>
export default {
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
    <code ref="codeContents">
        <slot></slot>
    </code>
    <button @click="copy">{{ $t("copy-to-clipboard") }}</button>
</template>
