
<template>
    <div class="locale-select">
        <template v-for="locale in $i18n.availableLocales">
            <input type="radio" name="locale" :value="locale" :id="locale" v-model="$i18n.locale"/>
            <label :for="locale">{{ locale }}</label>
        </template>
    </div>
</template>
  
<style scoped lang="scss">
    .locale-select {
        display: flex;
        justify-content: flex-end;
        gap: 1em;
    }
    label {
        font-size: larger;
        text-transform: uppercase;
        cursor: pointer;
    }
    input[type=radio] {
        visibility: hidden;
        position: absolute;

        &:checked + label {
            border-bottom: 2px solid currentColor;
        }
        &:focus + label {
            color: white;
        }
    }
</style>