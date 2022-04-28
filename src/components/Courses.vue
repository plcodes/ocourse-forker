<script>
import * as courseFn from '../utils/course';
import * as csvFn from '../utils/csv';

export default {
    data() {
        return {
                leg: {
                    name: "H",
                    course: [
                        "L1",
                        {A1: [31,32], A2: [41,42]},
                        33, 34,
                        {B1: 61, B2: 71},
                        35, "M"
                    ]
                }
        }
    },
    methods: {
        checkForkings() {
            return courseFn.checkForkingsAreDefinedCorrectly(this.leg.course);
        },
        getCourseWithForkingIds() {
            return courseFn.getCourseWithForkingIds(this.leg.course);

        },
        getAllCourseVariantsWithIds() {
            return courseFn.cartesian(this.getCourseWithForkingIds());
        },
        getFullCourseDataFromLeg() {
            return courseFn.getFullCourseDataFromLeg(this.leg);
        }
    

    }


}
</script>

<template>
  <p>Course: {{course}}</p>
  <p>checkForkings:{{checkForkings()}}</p>
  <p>getCourseWithForkingIds:{{getCourseWithForkingIds()}}</p>
  <p>getAllCourseVariantsWithIds:{{getAllCourseVariantsWithIds()}}</p>
  <p>getFullCourseDataFromLeg: {{getFullCourseDataFromLeg()}}</p>


</template>

<style scoped>
p {
  color: #42b983;
}
</style>
