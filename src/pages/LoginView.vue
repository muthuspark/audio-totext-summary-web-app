<template>
    <div class="row">
        <div class="eight columns">
            <div class="small-header">Let's get started</div>
            <div id="logged_out_view">
                <button @click="login" type="button">Login</button>
                <button @click="register" type="button">Register</button>
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