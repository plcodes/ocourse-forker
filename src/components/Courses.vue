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
  <h2>Course data</h2>
  
  <h3>Input data</h3>
  <p>
      Load existing samples 
      <a href="#" v-on:click="copySampleHrvH">HRV 2022 H</a>,
      <a href="#" v-on:click="copySampleHrvD">HRV 2022 D</a>, 
      <a href="#" v-on:click="copySampleVenla">Venla 2019</a>
  </p>
  <textarea v-model="inputJson"></textarea>
  <button class="btn" v-on:click="inputDone">Use this data</button>
  <p v-if="inputError">
    Data is not valid
  </p>

  <template v-if="relayJson">
    <h3>Ready data</h3>
    <textarea style="width: 100%;" readonly>{{JSON.stringify(relayJson, undefined, 2)}}</textarea>

    <p v-if="legsAreDefinedCorrectly">Legs ok</p>
    <p v-else>Leg count is {{relayJson.legCount}}, but {{relayJson.legs.length}} legs are defined</p>
    <p v-if="forkingsAreDefinedCorrectly.status">Forkings ok</p>
    <p v-else>Problem in forkings: {{forkingsAreDefinedCorrectly.msg}}</p>

    <h2>Course csvs:</h2>
    <code v-if="courseData">
        {{courseHeader}}<br>
        <template v-for="(leg, index) in courseData">
            <template v-for="course in leg.courses" key="course.courseName">
                {{toCsv(course.legDisplayName, course.courseName, '', '', course.courseId, course.controls)}}<br>
            </template>
        </template>
    </code>

    <h2>Forking amounts</h2>
    <div v-for="(leg, index) in courseData">
        {{leg.legName}}: {{leg.courses.length}}
    </div>
    
    <button class="btn" type="button" v-on:click="createRelayCourses">Create relay courses</button><br>
  </template>

</template>

<style scoped>
p {
  color: #42b983;
}
</style>
