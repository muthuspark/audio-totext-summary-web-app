<template>
    <div class="docs-section">
        <h6 class="docs-header">Summaries</h6>
        <div class="row" v-for="(clip, index) in data" :key="index">
            <div class="eight columns">
                <RouterLink :to="'/summary/' + clip.id">{{ decodeURI(clip.recording_name) }}</RouterLink>
            </div>
            <div class="four columns">
                {{ clip.timestamp }}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "SummariesSection",
    props: {
        data: Object
    }
}
</script>