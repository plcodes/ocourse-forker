<script>
import Relay from './Relay.vue'
import * as courseFn from '../utils/course';
import * as csvFn from '../utils/csv';
import * as hrvData from '../data/hrv2022';
import * as venla from '../data/2019venla';

export default {
    components: {
        Relay
    },
    data() {
        return {
            relay: undefined,
            courseData: [],
            courseHeader: csvFn.COURSE_HEADER_ROW,
            readyCourseData: []
        };
    },
    computed: {
        legsAreDefinedCorrectly: function () {
            return this.relay ? this.relay.legCount === this.relay.legs.length : undefined;
        },
        forkingsAreDefinedCorrectly: function () {
            return this.relay ? courseFn.checkForkingsAreDefinedCorrectly(this.relay.legs) : undefined;
        },
    },
    methods: {
        createCourses: function () {
            this.courseData = courseFn.createRelayData(this.relay.legs, this.relay.forkingRules);
        },
        toCsv: function (relayName, courseName, length, climb, courseId, controls) {
            return csvFn.courseToCsvRow(relayName, courseName, length, climb, courseId, controls);
        },
        createRelayCourses: function() {
            this.readyCourseData = this.courseData;
        }
        
    },
    mounted: function () {
        //this.relay = venla.venla2019;
        this.relay = hrvData.hrv2022_H;
        this.createCourses();
    }
}
</script>

<template>
  <h1>Course Forker</h1>
  <p>A tool to automatically create orienteering relay courses from relay variants.</p>
  
  <template v-if="relay">
    <textarea>{{JSON.stringify(relay)}}</textarea>
    <p v-if="legsAreDefinedCorrectly">Legs ok</p>
    <p v-else>Leg count is {{relay.legCount}}, but {{relay.legs.length}} legs are defined</p>
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
  </template>

  <button type="button" v-on:click="createRelayCourses">Create relay courses</button><br>


  <Relay :courseData="readyCourseData"></Relay>
</template>

<style scoped>
p {
  color: #42b983;
}
</style>
