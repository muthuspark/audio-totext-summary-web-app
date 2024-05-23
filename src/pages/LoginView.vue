<template>
    <div class="section hero">
        <div class="row">
            <div class="one-half column">
            <h4 class="hero-heading">Turn Speeches into Actionable Insights: Informed Decisions Made Easy</h4>
            <div id="logged_out_view">
                    <button @click="login" type="button" class="button button-primary">Login</button>
                    <button @click="register" type="button" class="button button-primary">Register</button>
                </div>
            </div>
            <div class="one-half column">
                <div class="hero-image-container">
                    <img class="hero-image" src="../assets/slick.jpg"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    methods: {
        login() {
            location.href = "http://localhost:8008/login"
        },
        async register() {
            location.href = "http://localhost:8008/register"
        }
    }
}
</script>
<style scoped>
button {
    margin-right: 0.5em;
}
</style>