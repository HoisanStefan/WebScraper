<template>
	<h1>Page has been scraped</h1>

	<p class="count" style="margin-bottom: 20px">{{ url }}</p>

	<button @click="goBack" class="btn" style="margin-right: 10px;">Go back</button>

	<button @click="downloadJson(this.data, 'data')" class="btn btn-block" style="margin-right: 10px;">Download
		JSON</button>

	<button @click="analyse" class="btn btn-block">Analyse sentiments</button>

	<span style="margin-top: 20px" class="count">Extracted text word count :</span>
	<span class="count">{{ totalWords }}</span>

	<p>{{ data }}</p>

	<div v-if="loading" class="overlay">
		<div class="spinner"></div>
	</div>
</template>
  
<script>
import axios from 'axios';
import { BASE_URL } from '../constants/constants';

export default {
	name: 'ScrapePage',
	data() {
		return {
			data: null,
			totalWords: 0,
			url: null,
			loading: false
		}
	},
	created() {
		this.data = this.$route.query.data;
		this.url = this.$route.query.url;
		this.countWords()
	},
	methods: {
		goBack() {
			this.$router.go(-1);
		},
		downloadJson(data, filename) {
			const jsonData = JSON.parse(data);

			const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });

			const url = window.URL.createObjectURL(blob);

			const a = document.createElement('a');
			a.href = url;
			a.download = filename + '.json';

			a.click();

			window.URL.revokeObjectURL(url);
		},
		analyse() {
			this.loading = true

			axios
				.post(BASE_URL + 'analyseTexts', { url: this.url })
				.then((response) => {
					this.loading = false
					this.downloadJson(JSON.stringify(response.data), "sentiments")
				})
				.catch((error) => {
					console.error('Error calling API:', error);
					this.loading = false
				});
		},
		countWords() {
			this.totalWords = this.calculateTotalWords();
		},
		calculateTotalWords() {
			let count = 0;

			const textsArray = JSON.parse(this.data).texts

			if (textsArray.length > 0) {
				for (const string of textsArray) {
					const words = string.split(/\s+/);
					count += words.length;
				}
			}

			return count;
		},
	}
}



</script>
  
<style scoped>
.count {
	display: flex;
	flex-direction: column;
	margin-top: 10px;
	font-size: 17px;
	font-weight: bold;
}
</style>