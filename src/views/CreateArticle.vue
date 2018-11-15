<template>
	<div class="container">
		<div class="row">
			<div class="col-md-8 col-md-offset-2">
				<div class="card my-5">
					<div class="card-body">
						<picture-input 
						      accept="image/jpeg,image/png" 
						      size="5" 
						      button-class="btn btn-danger"
						      @change="onChange">
						    </picture-input>
						   <select class="form-control" v-model="category">
						   	<option :value="category.id" :key="category.id" v-for="category in categories">
						   	{{ category.name }}</option>
						   </select>
						<input type="text" v-model="title" class="form-control my-3" placeholder="Title">

						<wysiwyg v-model="content" />

						<button @click="createArticle" :disabled="loading" class="btn btn-success form-control">
							<i class="fas fa-spin fa-spinner" v-if="loading"></i>
						     {{ loading ? '' : 'Create Article' }}
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Axios from 'axios'
import PictureInput from 'vue-picture-input'
import config from '@/config'

	export default {
		beforeRouteEnter(to, from, next) {

			if(!localStorage.getItem('auth')) {
				return next({path: "/login"});
			}

			next();
		},
		mounted() {
			this.getCategories();
		},
		components: {
			PictureInput
		},
		data() {
			return {
				title: '',
				content: '',
				image: null,
				categories: [],
				category: "",
				loading: false
			}
		},
		methods: {
			onChange(image){
				this.image = image;
			},
			createArticle() {
				// if (this.title === '' || this.image === '' || this.category === '' || this.content === '') {
				// 	this.$noty.error('Please fill in all fields');
				// 	return;
				// }
				this.loading = true;
				const form = new FormData();
				form.append('file', this.image);
				form.append('upload_preset','comm-blog');
				form.append('api_key','979488313489297');

				Axios.post('https://api.cloudinary.com/v1_1/dev-staunty/image/upload', form)
				.then(res => Axios.post(`${config.apiUrl}/articles`, {
						title: this.title,
						content: this.content,
						category_id: this.category,
						imageUrl: res.data.secure_url
					}, {
						headers: {
							Authorization: `Bearer ${this.$root.auth.token}`
						}
					}).then(() => {
						this.loading = false;
						this.$noty.success('Article Created');
						this.$router.push('/');
					}).catch(() => {
						this.loading = false;
						this.$noty.error('Opps Something went wrong');
					})
				).catch(() => {
						this.loading = false;
						this.$noty.error('Cloudinary Something went wrong');
					});
			},
			getCategories() {
				const categories = localStorage.getItem('categories')
				if(categories) {
					this.categories = JSON.parse(categories);
					return;
				}
				Axios.get(`${config.apiUrl}/categories`).then(res => {
					this.categories = res.data.categories;
					localStorage.setItem('categories', JSON.stringify(this.categories));
				})
			}
		}
	}
</script>