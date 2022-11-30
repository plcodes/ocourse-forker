<script>
export default {
    props: [
        'name'
    ],
    data() {
        return {}
    },
    methods: {
        async print () {
          await this.$htmlToPaper(this.name);
        }
    }
}
</script>

<template>
    <div class="print-area" :id="this.name">
        <slot></slot>
    </div>
    <button @click="print">{{ $t('Print.cta') }}</button>
</template>

<style scoped>
    .print-area {
        display: none;
    }
</style>