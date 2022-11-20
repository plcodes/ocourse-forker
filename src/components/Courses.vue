<script>
import * as courseFn from '../utils/course';
import * as csvFn from '../utils/csv';
import * as hrvData from '../data/sample/hrv2022';
import * as venla from '../data/sample/2019venla';

export default {
    data() {
        return {
            inputJson: undefined,
            inputError: false,
            relayJson: undefined,
            courseData: [],
            courseHeader: csvFn.COURSE_HEADER_ROW
        };
    },
    computed: {
        legsAreDefinedCorrectly: function () {
            return this.relayJson ? this.relayJson.legCount === this.relayJson.legs.length : undefined;
        },
        forkingsAreDefinedCorrectly: function () {
            return this.relayJson ? courseFn.checkForkingsAreDefinedCorrectly(this.relayJson.legs) : undefined;
        },
    },
    methods: {
        copySampleHrvH: function (evt) {
            evt.preventDefault();
            this.inputJson = JSON.stringify(hrvData.hrv2022_H, undefined, 2);
        },
        copySampleHrvD: function (evt) {
            evt.preventDefault();
            this.inputJson = JSON.stringify(hrvData.hrv2022_D, undefined, 2);
        },
        copySampleVenla: function (evt) {
            evt.preventDefault();
            this.inputJson = JSON.stringify(venla.venla2019, undefined, 2);
        },
        inputDone: function () {
            this.inputError = false;
            try {
                this.relayJson = JSON.parse(this.inputJson);
                this.createCourses();
            } catch (e) {
                this.inputError = true;
            }
        },
        createCourses: function () {
            this.courseData = courseFn.createRelayData(this.relayJson.legs, this.relayJson.forkingRules);
        },
        toCsv: function (relayName, courseName, length, climb, courseId, controls) {
            return csvFn.courseToCsvRow(relayName, courseName, length, climb, courseId, controls);
        },
        createRelayCourses: function() {
            this.$emit('coursesReady', this.courseData)
        }
        
    },
    mounted: function () {},
    emits: ['coursesReady']
}
</script>

<template>
  <h2>{{ $t("Courses.title") }}</h2>
  
  <h3>{{ $t("Courses.input") }}</h3>
  <p>
    {{ $t("Courses.load-examples") }} 
      <a href="#" v-on:click="copySampleHrvH">HRV 2022 H</a>,
      <a href="#" v-on:click="copySampleHrvD">HRV 2022 D</a>, 
      <a href="#" v-on:click="copySampleVenla">Venla 2019</a>
  </p>
  <textarea v-model="inputJson"></textarea>
  <button class="btn" v-on:click="inputDone">{{ $t("Courses.confirm") }}</button>
  <p v-if="inputError">
    {{ $t("Courses.error") }}
  </p>

  <template v-if="relayJson">
    <h3>{{ $t("Courses.used-data") }}</h3>
    <textarea style="width: 100%;" readonly>{{JSON.stringify(relayJson, undefined, 2)}}</textarea>

    <p v-if="legsAreDefinedCorrectly">{{ $t("Courses.validation-legs-ok") }}</p>
    <p v-else>{{ $t("Courses.validation-legs-invalid", { 'legCount': relayJson.legCount, 'legDefinitions': relayJson.legs.length}) }}</p>
    <p v-if="forkingsAreDefinedCorrectly.status">{{ $t("Courses.validation-forkings-ok") }}</p>
    <p v-else>{{ $t("Courses.validation-forkings-invalid") }} 
        {{ $t("Forkings.error", {
            'key': forkingsAreDefinedCorrectly.key, 
            'previous': forkingsAreDefinedCorrectly.previous,
            'new': forkingsAreDefinedCorrectly.new}) }}</p>

    <h2>{{ $t("Courses.csvs") }}</h2>
    <code v-if="courseData">
        {{courseHeader}}<br>
        <template v-for="(leg, index) in courseData">
            <template v-for="course in leg.courses" key="course.courseName">
                {{toCsv(course.legDisplayName, course.courseName, '', '', course.courseId, course.controls)}}<br>
            </template>
        </template>
    </code>

    <h2>{{ $t("Courses.forking-amounts") }}</h2>
    <div v-for="(leg, index) in courseData">
        {{leg.legName}}: {{leg.courses.length}}
    </div>
    
    <button class="btn" type="button" v-on:click="createRelayCourses">{{ $t("Courses.cta") }}</button><br>
  </template>

</template>

<style scoped>
p {
  color: #42b983;
}
</style>
