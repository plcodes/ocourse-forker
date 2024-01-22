<script>
import stringify from "json-stringify-pretty-compact";
import CodeBlock from './CodeBlock.vue'
import * as courseFn from '../utils/course';
import * as csvFn from '../utils/csv';
import * as sampleData from '../data/sample/basic-models';
import * as hrvData from '../data/sample/hrv2022';
import { venla2019 } from "../data/sample/2019venla";
import { jukola2019 } from "../data/sample/2019jukola";

export default {
    components: {
        CodeBlock
    },
    data() {
        return {
            inputJson: undefined,
            inputError: false,
            relayJson: undefined,
            courseData: [],
            courseHeader: csvFn.COURSE_HEADER_ROW,
            sampleData: sampleData,
            hrvData: hrvData,
            venla2019: venla2019,
            jukola2019: jukola2019
        };
    },
    computed: {
        legsAreDefinedCorrectly: function () {
            return this.relayJson ? this.relayJson.legCount === this.relayJson.legs.length : undefined;
        },
        forkingsAreDefinedCorrectly: function () {
            return this.relayJson ? courseFn.checkForkingsAreDefinedCorrectly(this.relayJson.legs) : undefined;
        },
        forkingsStartAndEndCorrectly: function () {
            return this.relayJson ? courseFn.checkForkingsStartAndEndWithCommonControl(this.relayJson.legs) : undefined;
        },
    },
    methods: {
        copySampleData: function(data, evt) {
            evt.preventDefault();
            this.inputJson = this.prettyPrint(data);
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
        },
        prettyPrint: function(json) {
            return stringify(json, {});
        }        
    },
    mounted: function () {},
    emits: ['coursesReady']
}
</script>

<template>
  <h2>{{ $t('Courses.title') }}</h2>
  
  <h3>{{ $t('Courses.input') }}</h3>
  <div class="with-explanation">
    <textarea class="main-area" v-model="inputJson"></textarea>
    <div class="help-area">
        <p class="help-text">
            {{ $t('Courses.load-examples') }}
            <ul>
            <li><a href="#" v-on:click="copySampleData(sampleData.Motala, $event)">Motala</a></li>
            <li><a href="#" v-on:click="copySampleData(sampleData.MotalaWithLegs, $event)">Motala 2</a></li>
            <li><a href="#" v-on:click="copySampleData(sampleData.Vannes, $event)">Vännes</a></li>
            <li><a href="#" v-on:click="copySampleData(sampleData.VannesWithLegs, $event)">Vännes 2</a></li>
            <li><a href="#" v-on:click="copySampleData(sampleData.Farsta, $event)">Farsta</a></li>
            <li><a href="#" v-on:click="copySampleData(hrvData.hrv2022_H, $event)">HRV 2022 H</a></li>
            <li><a href="#" v-on:click="copySampleData(hrvData.hrv2022_D, $event)">HRV 2022 D</a></li>
            <li><a href="#" v-on:click="copySampleData(venla2019, $event)">Venla 2019</a></li>
            <li><a href="#" v-on:click="copySampleData(jukola2019, $event)">Jukola 2019</a></li>
            </ul>
        </p>
    </div>
  </div>
  <p v-if="inputError">
    {{ $t('Courses.error') }}
  </p>
  <button class="btn" v-on:click="inputDone" type="button">{{ $t('Courses.confirm') }}</button>

  <template v-if="relayJson">
    <h3>{{ $t('Courses.used-data') }}</h3>
    <CodeBlock :helptext="$t('Courses.explanation-used-data')"><pre>{{prettyPrint(relayJson)}}</pre></CodeBlock>

    <p v-if="legsAreDefinedCorrectly" class="success">{{ $t('Courses.validation-legs-ok') }}</p>
    <p v-else class="error">{{ $t('Courses.validation-legs-invalid', { 'legCount': relayJson.legCount, 'legDefinitions': relayJson.legs.length}) }}</p>
    <p v-if="forkingsStartAndEndCorrectly.status" class="success">{{ $t('Courses.validation-forking-start-ok') }}</p>
    <p v-else class="error">{{ $t('Courses.validation-forking-start-invalid', { 'forking': forkingsStartAndEndCorrectly.forking}) }}</p>
    <p v-if="forkingsAreDefinedCorrectly.status" class="success">{{ $t('Courses.validation-forkings-ok') }}</p>
    <p v-else class="error">{{ $t('Courses.validation-forkings-invalid') }} 
        {{ $t('Forkings.error', {
            'key': forkingsAreDefinedCorrectly.key, 
            'previous': forkingsAreDefinedCorrectly.previous,
            'new': forkingsAreDefinedCorrectly.new}) }}</p>

    <h2>{{ $t('Courses.csvs') }}</h2>
    <CodeBlock v-if="courseData" :helptext="$t('Courses.explanation-csvs')">
        {{courseHeader}}<br>
        <template v-for="(leg, index) in courseData">
            <template v-for="course in leg.courses" key="course.courseName">
                {{toCsv(course.legDisplayName, course.courseName, '', '', course.courseId, course.controls)}}<br>
            </template>
        </template>
    </CodeBlock>

    <h2>{{ $t('Courses.forking-amounts') }}</h2>
    <div v-for="(leg, index) in courseData">
        {{leg.legName}}: {{leg.courses.length}}
    </div>
    
    <button class="btn" type="button" v-on:click="createRelayCourses">{{ $t('Courses.cta') }}</button><br>
  </template>

</template>
