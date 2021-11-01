<template>
    <div id='timer'>
    <h3>Time left: {{timeLeftToShow}} </h3>
    </div>
</template>

<script>

    export default {
        name: 'timer',
        props: {
            timeLeft: Number
        },
        data() {
            return {
                duration: 0,
                timer: null
            }
        },
        methods: {
            decrementOrAlert () {
                if (this.duration > 0) {
                    this.duration--
                    return
                }
                clearInterval(this.timer)
                this.$parent.submit()
            }
        },
        computed: {
            timeLeftToShow () {
                return `${this.minutes} minutes ${this.seconds} seconds`
            },
            minutes () {
                return String(Math.floor(this.duration / 60)).padStart(2, '0')
            },
            seconds () {
                return String(this.duration % 60).padStart(2, '0')
            }
        },
          created () {
            this.duration = this.timeLeft
            this.timer = setInterval(this.decrementOrAlert, 1000)
        },


    }

</script>