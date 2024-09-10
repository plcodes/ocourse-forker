<script>
import Courses from './components/Courses.vue';
import Relay from './components/Relay.vue';
import Navigation from './components/Navigation.vue';
import LocaleSelect from "./components/LocaleSelect.vue";

export default {
  components: {
    Courses,
    Relay,
    Navigation,
    LocaleSelect
  },
  data() {
    return {
      allCoursesForLegs: [],
      teamForkingRules: [],
      randomRules: []
    };
  },
  methods: {
    setCourses: function({courseData, teamForkingRules, randomRules}) {
      this.allCoursesForLegs = courseData;
      this.teamForkingRules = teamForkingRules;
      this.randomRules = randomRules;
    }
  }
}
</script>

<template>
  <LocaleSelect />
  <h1>{{ $t('title') }}</h1>
  <p v-html="$t('description')"></p>
  <p v-html="$t('description2')"></p>

  <Navigation/>

  <section id="courses">
    <Courses @coursesReady="setCourses"/>
  </section>
  <section id="relay">
    <Relay :courseData="allCoursesForLegs" :teamForkingRules="teamForkingRules" :randomRules="randomRules"/>
  </section>
</template>

<style lang="scss">
:root {
  --color-brand-1: #122a5b;;
  --color-brand-2: #455d7a;
  --color-brand-3: #2b90c8;
  --color-brand-4: #2bc9c8;
  --color-brand-bg: #e2f9f9;
  --color-brand-success: #009360;
  --color-brand-error: #f95959;
}
* {
  box-sizing: border-box;
} 
html {
  scroll-behavior: smooth;
}
body {
  margin: 30px;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  line-height: 1.25;
  color: var(--color-brand-1);
  background: var(--color-brand-bg);
}
section {
  padding-top: 60px;
}
a {
  color: var(--color-brand-3);
  text-underline-offset: 0.2em;
  text-decoration-skip-ink: auto;
  text-decoration-thickness: from-font;
  word-break: break-all;
}
input[type=text], input[type=number], input[type=checkbox], textarea {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background: white;
  color: var(--color-brand-1);
  border: 1px solid var(--color-brand-3);
  border-radius: 4px;
  font-size: 1rem;
  line-height: 1.25;
}
input[type=text], input[type=number] {
  height: 2em;
  padding: 0 0.5em;
}
textarea {
  min-height: 300px;
  width: 100%;
  font-family: monospace;
  font-size: 14px;
  &.small {
    min-height: 100px;
  }
}
input[type=checkbox] {
  width: 1em;
  height: 1em;
}
code {
  border: 1px solid var(--color-brand-4);
  display: block;
  padding: 10px;
  border-radius: 8px;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.5;
  max-width: 100%;
  word-break: break-all;
  &.small {
    height: 200px;
    overflow: auto;
  }
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  font-size: 1.15em;
  padding: 0 1em;
  height: 2em;
  background: var(--color-brand-3);
  color: white;
  border: 1px solid var(--color-brand-3);
  border-radius: 1em;
  cursor: pointer;
  min-width: 8em;
  margin: 30px 0 50px;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;
  &:hover {
    border-color: var(--color-brand-2);
  }
}
.btn--sub {
  background: var(--color-brand-2);
  font-size: 1em;
  height: 1.5em;
  min-width: 5em;
  margin: 0;
  border-radius: 0 0 4px 4px;
  left: 4px;
  position: relative;
}
.success {
  color: var(--color-brand-success);
}
.error {
  color: var(--color-brand-error);
}
.with-explanation {
  display: flex;
  align-items: flex-end;
  gap: 10px 30px;
  flex-wrap: wrap-reverse;

  .help-area {
      flex: 1 1 20vw;
      min-width: 200px;
  }
  .help-text {
      padding: 1em 0;
      margin: 0;
      color: var(--color-brand-2);
  }
  .main-area {
      flex: 1 1 60vw;
  }
}
</style>
