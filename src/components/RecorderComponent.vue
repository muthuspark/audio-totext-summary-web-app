<template>
  <div>
    <div class="docs-section">
      <h5>
        <input type="text" v-model="title" maxlength="100" placeholder="Recording title" class="title-input">
      </h5>
      <article>
        <header>
          <AudioVisualizer :stream="stream" v-if="stream"></AudioVisualizer>
        </header>
        <div class="recording-actions">
          <div v-show="!recording">
            <button class="button-primary" @click="record" :disabled="!recordingSupported">
              <span>Record</span>
            </button>
          </div>
          <div v-show="recording">
            <button class="button-primary" @click="stop">
              <span>Stop</span>
            </button>
          </div>
          <small id="invalid-helper" v-if="!recordingSupported">
            MediaDevices recording not supported on your browser!
          </small>
        </div>
        <div class="center">
          <StopWatch ref="stopWatch"></StopWatch>
        </div>
        <div class="docs-pad">
          <p>{{ transcript }}</p>
        </div>
      </article>
    </div>
    <div class="docs-section" v-if="audioClips.length > 0">
      <h6 class="docs-header">Summarization in progress</h6>
      <SoundClip v-for="(clip, index) in audioClips" :data="clip" :key="index"></SoundClip>
    </div>
    <SummariesSection :data="summarizedRecordings" v-if="summarizedRecordings.length > 0" ></SummariesSection>
  </div>
</template>
<script>
import AudioVisualizer from './AudioVisualizer.vue'
import StopWatch from './StopWatch.vue'
import SoundClip from './SoundClip.vue'
import SummariesSection from './SummariesSection.vue'
import { getFormattedDate, slugify } from '@/util'

export default {
  name: 'RecorderComponent',
  components: {
    AudioVisualizer,
    StopWatch,
    SoundClip,
    SummariesSection
  },
  data() {
    return {
      stream: null,
      recording: false,
      recordingSupported: true,
      mediaRecorder: null,
      audioClips: [],
      summarizedRecordings: [],
      chunks: [],
      recognition: null,
      title: '',
      transcript: ''
    }
  },
  methods: {
    initEvents() {
      this.emitter.on('recording-started', () => {
        this.recording = true;
        this.$toast.success("Recording started");
      })
      this.emitter.on('recording-stopped', () => {
        this.recording = false;
        this.title = '';
        this.$toast.success("Recording stopped");
      })
      this.emitter.on('reload-soundclips', this.summaries)
    },
    initSpeechRecognizer() {
      this.recognition = new (window.webkitSpeechRecognition || window.SpeechRecognition)();
      this.recognition.interimResults = true;
      this.recognition.continuous = true;

      this.recognition.onresult = event => {
        let transcript = '';

        for (const result of event.results) {
          for (const alternative of result) {
            transcript += alternative.transcript;
          }
        }
        this.transcript = transcript;
      };

      this.recognition.onerror = event => {
        this.$toast.error('Speech recognition error:' + event.error);
      };

      this.recognition.onnomatch = () => {
        this.$toast.error('No speech was recognized.');
      };
    },
    mediaRecorderOnStop() {
      const blob = new Blob(this.chunks, { type: this.mediaRecorder.mimeType });
      this.chunks = [];
      this.audioClips.push({
        name: encodeURI(`${this.title}`),
        source: window.URL.createObjectURL(blob),
        download: `${slugify(this.title)}.webm`,
        blob,
      });
      this.emitter.emit('recording-stopped');
    },
    mediaRecorderOndataavailable({ data }) {
      this.chunks.push(data);
    },
    async getUserMediaOnSuccess(stream) {
      try {
        this.mediaRecorder = new MediaRecorder(stream);
        this.stream = stream;
        this.mediaRecorder.onstop = this.mediaRecorderOnStop;
        this.mediaRecorder.ondataavailable = this.mediaRecorderOndataavailable;
        await this.mediaRecorder.start();
      } catch (error) {
        this.$toast.error('Error starting MediaRecorder:' + error);
      }
    },
    async record() {
      this.emitter.emit('recording-started');
      this.transcript = '';
      this.title = `Recording - ${getFormattedDate()}`;
      this.recognition.start();
      const constraints = { audio: true };
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        await this.getUserMediaOnSuccess(stream);
      } catch (error) {
        this.recordingSupported = false;
        this.$toast.error('Error getting user media:' + error);
      }
    },
    stop() {
      this.mediaRecorder.stop();
      this.recognition.stop();
      this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
    },
    async summaries() {
      this.summarizedRecordings = await this.$api.getSummaries()
    }
  },
  async mounted() {
    this.summaries();
    this.initSpeechRecognizer();
    this.initEvents();
  }
}
</script>
<style scoped>
.title-input {
  width: 100%;
}
</style>
