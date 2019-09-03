<template>
  <div v-show="isShow" style="width: 40px;height: 0">
    <svg>
      <path xmlns="http://www.w3.org/2000/svg" id="svg_1"
            d="m-0.71875,39.9125l39.84375,-39.475l-39.8125,0l-0.03125,39.475z" stroke-width="1.5" stroke="#92dc48"
            fill="#92dc48"/>
      <text xmlns="http://www.w3.org/2000/svg" stroke="#aaff56"
            transform="rotate(-43.78392028808594 14.131140708923338,14.945476531982424)
            matrix(0.5765234917743629,0,0,0.6486729423864013,33.5392636667583,11.975771160099784) "
           xml:space="preserve" text-anchor="start"
            font-family="Helvetica, Arial, sans-serif"
            font-size="23" id="svg_8" y="12.916839" x="-57.664368" stroke-width="0" fill="#ffff">置顶</text>
    </svg>
  </div>
</template>

<script>
  export default {
    props: {
      isShow:{
        type:Boolean,
        required:true,
      }
    },
    data() {
      return {}
    }
  }
</script>

<style scoped>

</style>
