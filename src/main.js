import { createApp } from 'vue'
import { createI18n } from "vue-i18n";
import App from './App.vue'

import messages from "@intlify/unplugin-vue-i18n/messages";

const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: "fi",
    fallbackLocale: "fi",
    availableLocales: ["fi", "en"],
    messages: messages,
});

const app = createApp(App);
app.use(i18n);
app.mount('#app')
