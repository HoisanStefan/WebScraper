<template>
	<form @submit="onSubmit" class="add-form">
		<div class="form-control">
			<input type="text" v-model="text" name="text" placeholder="Insert the URL to scrape" />
		</div>
		<div class="form-control form-control-check">
			<label>Scrape for:</label>
		</div>

		<div class="checks">
			<input class="custom-checkbox" type="checkbox" v-model="texts" name="texts" />
			<label>Texts</label>
			<input class="custom-checkbox" type="checkbox" v-model="images" name="images" />
			<label>Images</label>
			<input class="custom-checkbox" type="checkbox" v-model="links" name="links" />
			<label>Links</label>
			<input class="custom-checkbox" type="checkbox" v-model="scripts" name="scripts" />
			<label>Scripts</label>
		</div>

		<div v-if="loading" class="overlay">
			<div class="spinner"></div>
		</div>

		<input type="submit" value="Scrape" class="btn btn-block" />
	</form>
</template>
  
<script>
import axios from 'axios';
import { BASE_URL } from '../constants/constants';

export default {
	name: 'HomePage',
	data() {
		return {
			text: 'https://wsa-test.vercel.app/',
			texts: true,
			scripts: true,
			images: true,
			links: true,
			loading: false,
		}
	},
	methods: {
		onSubmit(e) {
			e.preventDefault()

			if (!this.text) {
				alert('Please add an URL')
				return
			}

			function isValidURL(text) {
				try {
					new URL(text);
					return true;
				} catch (error) {
					return false;
				}
			}

			if (!isValidURL(this.text)) {
				alert('Please provide a valid URL')
				return
			}

			const data = {
				url: this.text,
				texts: this.texts,
				scripts: this.scripts,
				images: this.images,
				links: this.links,
			}

			this.loading = true

			axios
				.post(BASE_URL + 'scrapeUrl', data)
				.then((response) => {
					this.loading = false
					this.$router.push({
						name: "ScrapePage",
						query: { data: JSON.stringify(response.data), url: this.text }
					});
				})
				.catch((error) => {
					console.error('Error calling API:', error);
					this.loading = false
				});

			this.text = 'https://wsa-test.vercel.app/'
			this.texts = false
			this.scripts = false
			this.images = false
			this.links = false
		},

	},
}
</script>
  
<style scoped>
.add-form {
	margin-bottom: 40px;
}

.custom-checkbox {
	margin-right: 3px;
}

.form-control {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 20px 0;
}

.form-control label {
	display: block;
}

.checks {
	margin-bottom: 20px;
}

.checks label {
	margin-right: 10px;
}

.form-control input {
	padding: 3px 7px 1px 7px;
	width: 45%;
	height: 30px;
	border: 2px solid #807a7a3d;
	border-radius: 5px;
	background-color: #333;
	color: #d4d4d4;
	font-size: 16px;
	outline: none;
}

.form-control input:focus {
	border-color: #00aaff;
}

.form-control-check {
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-weight: bold;
	margin-bottom: 10px;
	font-size: 20px;
}

.form-control-check input {
	flex: 2;
	height: 20px;
}
</style>