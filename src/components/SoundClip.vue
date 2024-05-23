<template>
    <div class="clip" :id="data.name">
        <div class="row">
            <div class="eight columns">{{ decodeURI(data.name) }}</div>
            <div class="four columns summarizing">Summarizing.. <progress v-if="summarizing" /></div>
        </div>
        <div class="row">
            <div class="twelve columns">
                <WaveSurfer :src="data.source"></WaveSurfer>
            </div>
            <!-- <div class="two columns">
                <a :href="data.source" class="button" :download="data.source">
                    Download
                </a>
            </div> -->
        </div>
    </div>
</template>
<script>
import WaveSurfer from './WaveSurfer';
export default {
    data() {
        return {
            summarizing: false
        }
    },
    props: {
        data: Object
    },
    components: {
        WaveSurfer
    },
    methods: {
        checkIfSummaryCompleted(recordingName) {
            this.summarizing = true;
            const app = this;
            const clrInterval = setInterval(function () {
                // TODO: This should be a websocket
                app.$api.checkIfSummaryCompleted({
                    "recording_name": recordingName
                }).then(response => {
                    if (response.ok) {
                        clearInterval(clrInterval);
                        app.summarizing = false;
                        app.emitter.emit('reload-soundclips');
                        app.remove();
                    }
                })
                    .catch(error => {
                        console.error('Error uploading audio:', error);
                    });
            }, 5000);
        },
        remove() {
            document.getElementById(this.data.name).remove();
        },
        async summarize() {
            const formData = new FormData();
            formData.append('audio', this.data.blob, `${this.data.name}.webm`);
            formData.append('name', this.data.name);
            await this.$api.fileUpload(formData)
            this.checkIfSummaryCompleted(this.data.name);
        }
    },
    mounted() {
        this.summarize()
    }
}
</script>
<style scoped>
.summarizing {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    align-content: center;
    flex-direction: row;
}

.clip {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 2rem;
}
</style>