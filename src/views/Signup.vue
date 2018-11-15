<template>
	<div class="row my-5">
		<div class="col-md-6">
			<div class="card">
				<div class="card-body">
					<h3 class="text-center my-4">SignUp</h3>
					<div class="form-group">
						<input :class="{ 'is-invalid': errors.name,'is-valid': !errors.name && this.submitted }" type="text" v-model="name" name="" class="form-control" placeholder="Name">
						<div class="errors" v-if="errors.name">
							<small class="text-danger" :key="error" v-for="error in errors.name">{{ error }}</small>
						</div>
					</div>
					<div class="form-group">
						<input :class="{ 'is-invalid': errors.email,'is-valid': !errors.email && this.submitted }" type="text" v-model="email" name="" class="form-control" placeholder="Email">
						<div class="errors" v-if="errors.email">
							<small class="text-danger" :key="error" v-for="error in errors.email">{{ error }}</small>
						</div>
					</div>
					<div class="form-group">
						<input :class="{ 'is-invalid': errors.password,'is-valid': !errors.password && this.submitted }" type="password" v-model="password" name="" class="form-control" placeholder="Password">
						<div class="errors" v-if="errors.password">
							<small class="text-danger" :key="error" v-for="error in errors.password">{{ error }}</small>
						</div>
					</div>
					<div class="form-group text-center">
						<button @click="registerUser" :disabled="loading" class="btn btn-success form-control">
							<i class="fas fa-spin fa-spinner" v-if="loading"></i>
						     {{ loading ? '' : 'Register' }}
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Axios from 'axios';
import config from '@/config'
	export default{
		beforeRouteEnter(to, from, next) {

			if(localStorage.getItem('auth')) {
				return next({path: "/"});
			}

			next();
		},
		data() {
			return {
				name: '',
				email: '',
				password: '',
				errors: {},
				submitted: false,
				loading: false
			}
		},
		methods: {
			registerUser() {
				this.loading = true
				Axios.post(`${config.apiUrl}/auth/register`, {
					name: this.name,
					email: this.email,
					password: this.password

				}).then((response) => {
					this.loading = false;
					this.submitted.true;
					const { data } = response.data;
					localStorage.setItem('auth', JSON.stringify(data))
					this.$root.auth = data;
					this.$noty.success("Registered Successfully")
					this.$router.push({name: 'Home'})

				}).catch(({ response }) => {
					this.loading = false;
					this.$noty.error("Oops ! Something went wrong")
					this.submitted.true;
					this.errors = response.data;
				})
			}
		}
	}
</script>