<template>
    <div class="clip" :id="data.name">
        <div class="row">
            <div class="six columns">{{ decodeURI(data.name) }}</div>
            <div class="six columns summarizing" v-if="summarizing">Summarizing...</div>
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
        async checkIfSummaryCompleted(recordingName) {
            this.summarizing = true;
            try {
                await this.$api.checkSummarizationStatus({
                    "recording_name": recordingName
                });
                this.summarizing = false;
                this.emitter.emit('reload-soundclips');
                this.remove();
            } catch(e){
                // ignore this
            }
        },
        remove() {
            document.getElementById(this.data.name).remove();
        },
        async uploadAudio() {
            if (!this.data || !this.data.blob || !this.data.name) {
                console.error("uploadAudio() called with null pointer references");
                return;
            }
            const formData = new FormData();
            formData.append('audio', this.data.blob, `${this.data.name}.webm`);
            formData.append('name', this.data.name);
            try {
                await this.$api.uploadFile(formData);
            } catch (error) {
                console.error("uploadAudio() caught exception:", error);
            }
        }
    },
    async mounted() {
        await this.uploadAudio()
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