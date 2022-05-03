<script>
import * as courseFn from '../utils/course';
import * as csvFn from '../utils/csv';

export default {
    data() {
        return {
            relay: {
                name: 'Hämeen Rastiviesti 2022',
                relayClass: 'H',
                legCount: 3,
                legs: [
                    {
                        name: 'H1',
                        course: [
                            'L1',
                            {A1: [31,32], A2: [33,34]},
                            35, 36,
                            {B1: 37, B2: 38},
                            39, 'M1'
                        ]
                    },
                    {
                        name: 'H2',
                        course: [
                            'L1',
                            {A1: [31,32], A2: [33,34]},
                            35, 36,
                            {B1: 37, B2: 38},
                            39, 'M1'
                        ]
                    },
                ]
            },
            courseData: [],
            courseHeader: csvFn.getCoursesHeaderRow()
        }
    },
    methods: {
        checkForkings() {
            return courseFn.checkForkingsAreDefinedCorrectly(this.relay.legs);
        },
        createCourses() {
            this.courseData = courseFn.createRelayData(this.relay.legs);
        },
        toCsv(relayName, courseName, length, climb, courseId, controls) {
            return csvFn.courseToCsvRow(relayName, courseName, length, climb, courseId, controls);
        }
    },
    mounted: function () {
        this.createCourses()
    }


}
</script>

<template>
  <p>Relay: {{relay}}</p>
  <p>checkForkings:{{checkForkings()}}</p>

  <h2>Course csvs:</h2>
  <code v-if="courseData">
  {{courseHeader}}<br>
  <template v-for="(leg, index) in courseData">
    <template v-for="variant in leg" key="variant.name">
        {{toCsv(relay.name, variant.leg, '', '', variant.name, variant.controls)}}<br>
    </template>
  </template>
  </code>


</template>

<style scoped>
p {
  color: #42b983;
}
</style>
