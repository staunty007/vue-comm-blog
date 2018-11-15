<template>
	<!-- <div class="card my-3">
		<div class="card-header font-weight-bold">{{ article.title }}</div>
		<div class="card-body">
				<div class="my-3" v-html="article.content.substring(0,200)">
				</div>
			<router-link :to="`/article/${article.slug}`" class="btn btn-primary btn-sm">Read More</router-link>
		</div>
	</div> -->
	
	<div class="card bg-light mt-3" style="max-width: 18rem;">
	  <div class="card-header">{{ article.title }}</div>
	  <div class="card-body">
	    <h5 class="card-title"></h5>
	    <p class="card-text" v-html="article.content.substring(0,25)"></p>
	    <router-link :to="`/article/${article.slug}`" class="btn btn-primary btn-sm">Read More</router-link>
	  </div>
	</div>

</template>

<script>
	export default {
		name: 'Article',
		props: ['article'],
		data() {
			return {

			}
		}
	}
</script>
