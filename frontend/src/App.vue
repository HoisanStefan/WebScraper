<template>
	<div style="display: flex; align-items: center; justify-content: center;">
		<h2 style="margin-right: 10px;">Built with Vue.js</h2>
		<img alt="Vue logo" src="./assets/logo.png" style="width: 30px; height: auto;">
	</div>

	<router-view></router-view>
</template>

<script>

export default {
	name: 'App',
	components: {
	}
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #d4d4d4;
	margin-top: 60px;
}

.btn {
	display: inline-block;
	padding: 10px 20px;
	background-color: #5e5e5e;
	color: #fff;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	text-align: center;
	text-decoration: none;
	font-size: 16px;
	font-weight: bold;
	outline: none;
}

.btn:hover {
	background-color: rgb(119, 119, 119);
}

.btn:active {
	background-color: #414141;
}

.overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 999;
}

.spinner {
	border: 4px solid rgba(255, 255, 255, 0.3);
	border-top: 4px solid #3498db;
	border-radius: 50%;
	width: 40px;
	height: 40px;
	animation: spin 1s linear infinite;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}</style>
