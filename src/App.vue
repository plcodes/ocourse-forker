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
      allCoursesForLegs: []
    };
  },
  methods: {
    setCourses: function(data) {
      this.allCoursesForLegs = data;
    }
  }
}
</script>

<template>
  <LocaleSelect />
  <h1>{{ $t('title') }}</h1>
  <p v-html="$t('description')"></p>

  <Navigation/>

  <section id="courses">
    <Courses @coursesReady="setCourses"/>
  </section>
  <section id="relay">
    <Relay :courseData="allCoursesForLegs"/>
  </section>
  <!--div v-show="activeTab === 'randomizer'">
    <Randomizer :relayData="filteredRelayData" :allCourses="allCourses"/>
  </div-->

</template>

<style lang="scss">
:root {
  --color-brand-1: #05445E;
  --color-brand-2: #189AB4;
  --color-brand-3: #75E6DA;
  --color-brand-4: #D4F1F4;
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
  background: var(--color-brand-4);
}
section {
  padding-top: 60px;
}

textarea {
  min-height: 300px;
  width: 100%;
  background: white;
  border: 1px solid var(--color-brand-3);
  font-family: monospace;
  font-size: 14px;
}
code {
  border: 1px solid var(--color-brand-3);
  display: block;
  padding: 10px;
  border-radius: 5px;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.5;
}

.field-with-explanation {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  align-items: flex-start;
  .data {
    flex: 1 1 50%;
  }
  .explanation {
    flex: 1 0 33.333%;
    min-width: 200px;
    padding: 20px;
    border: 1px solid var(--color-brand-3);
    border-radius: 5px;
  }
}

.btn {
  font-family: inherit;
  font-size: 1.5em;
  padding: 0.5em 1em;
  background: var(--color-brand-2);
  color: white;
  border: 1px solid var(--color-brand-1);
  border-radius: 3px;
  cursor: pointer;
  margin-top: 50px;
  &:hover, &:focus {
    text-decoration-line: underline;
    text-underline-offset: 20%;
  }
}
</style>
