import { createApp } from 'vue'
import { createI18n } from "vue-i18n";
import VueHtmlToPaper from './plugins/VueHtmlToPaper';
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

const printOptions = {
    name: '_blank',
    specs: [
        'fullscreen=yes',
        'titlebar=yes',
        'scrollbars=yes'
    ],
    styles: [
        './print.css'
    ],
    timeout: 1000, // default timeout before the print window appears
    autoClose: true, // if false, the window will not close after printing
    windowTitle: window.document.title, // override the window title
}

const app = createApp(App);
app.use(i18n);
app.use(VueHtmlToPaper, printOptions);
app.mount('#app')
