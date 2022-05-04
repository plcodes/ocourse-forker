<script>
import * as courseFn from '../utils/course';
import * as relayFn from '../utils/relay';

export default {
    props: [
        'courseData'
    ],
    data() {
        return {
        }
    },
    computed: {
    },
    methods: {
        getUsedForkingsForLeg: function() {
            return relayFn.getUsedForkingsForLeg(relayFn.getLegFromCourseData(this.courseData, 'H1'))
        },
        getAllCombinations: function() {
            return relayFn.getAllCombinations(this.courseData);
        },
        getAllValidCombinations: function() {
            return relayFn.getAllValidCombinations(this.courseData);
        }
    }
}
</script>

<template>
  <h2>Relay</h2>
  <template v-if="courseData">
    <code>{{getAllValidCombinations()}}</code>
  </template>
</template>
