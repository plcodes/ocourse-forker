<script>
import stringify from "json-stringify-pretty-compact";
import CodeBlock from './CodeBlock.vue'
import * as courseFn from '../utils/course';
import * as csvFn from '../utils/csv';
import * as basicExamples from '../data/sample/basic-models';
import * as hrv2022 from '../data/sample/hrv2022';
import { venla2019 } from "../data/sample/2019venla";
import { jukola2019 } from "../data/sample/2019jukola";
import { jukola2024 } from "../data/sample/2024jukola";

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
            examples: {
                basicExamples: basicExamples,
                hrv2022: hrv2022,
                venla2019: venla2019,
                jukola2019: jukola2019,
                jukola2024: jukola2024
            }
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
            this.$emit('coursesReady', {
                courseData: this.courseData, 
                teamForkingRules: this.relayJson.teamForkingRules, 
                randomRules: this.relayJson.randomRules
            })
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
        <div class="help-text">
            {{ $t('Courses.load-examples') }}
            <ul>
            <li><a href="#" v-on:click="copySampleData(examples.basicExamples.Motala, $event)">Motala</a></li>
            <li><a href="#" v-on:click="copySampleData(examples.basicExamples.MotalaWithLegs, $event)">Motala 2</a></li>
            <li><a href="#" v-on:click="copySampleData(examples.basicExamples.Vannes, $event)">Vännes</a></li>
            <li><a href="#" v-on:click="copySampleData(examples.basicExamples.VannesWithLegs, $event)">Vännes 2</a></li>
            <li><a href="#" v-on:click="copySampleData(examples.basicExamples.Farsta, $event)">Farsta</a></li>
            <li><a href="#" v-on:click="copySampleData(examples.venla2019, $event)">2019 Venla</a></li>
            <li><a href="#" v-on:click="copySampleData(examples.jukola2019, $event)">2019 Jukola</a></li>
            <li><a href="#" v-on:click="copySampleData(examples.hrv2022.hrv2022_H, $event)">2022 HRV H</a></li>
            <li><a href="#" v-on:click="copySampleData(examples.hrv2022.hrv2022_H_randomrules, $event)">2022 HRV H (randomRules)</a></li>
            <li><a href="#" v-on:click="copySampleData(examples.hrv2022.hrv2022_D, $event)">2022 HRV D</a></li>
            <li><a href="#" v-on:click="copySampleData(examples.jukola2024, $event)">2024 Jukola</a></li>
            </ul>
        </div>
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
