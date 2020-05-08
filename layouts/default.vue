<template>
	<div>
		<!-- Navbar -->
		<b-navbar toggleable="lg" class="bg-gray-800" type="dark" sticky>
			<b-navbar-brand>
				<b-img src="@/assets/image/logo.png" height="28" alt="Santosh Bhandari" class="mb-1 mr-1" />
				<span class="font-weight-bold">Santosh Bhandari</span>
			</b-navbar-brand>
			<b-navbar-toggle target="nav-collapse" />
			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav class="ml-auto">
					<b-nav-item v-for="(route, i) of navRoutes" :key="`nav-route-${i}`" :to="route.to">
						{{ route.title }}
					</b-nav-item>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
		<!-- Actual Content -->
		<nuxt />
		<!-- Footer -->
		<footer class="text-center">
			<div class="bg-gray-800 text-light py-3">
				<b-container>
					<span>&copy; 2020 Santosh Bhandari</span>
				</b-container>
				<div class="mt-3 px-3 text-left">
					<nuxt-link to="/privacy" class="text-decoration-none text-light"><u>Privacy Policy</u></nuxt-link>
				</div>
			</div>
		</footer>
	</div>
</template>

<script>
export default {
	data() {
		return {
			navRoutes: [
				{ title: 'About', to: '/' },
				{ title: 'Portfolio', to: '/portfolio' },
				{ title: 'Writings', to: '/writings' },
				{ title: 'Contact', to: '/contact' }				
			]
		}
	}
}
</script>