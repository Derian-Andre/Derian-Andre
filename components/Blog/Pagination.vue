<template>
	<nav :aria-label="$t('pagination.label')">
		<ul class="pagination">
			<!-- First page -->
			<li class="page-item disabled" v-if="currentPage === 1">
				<a class="page-link" href="#" tabindex="-1" aria-disabled="true" :title="$t('pagination.first')" :aria-label="$t('pagination.first')">
					<Icon name="chevron-bar-left"/>
				</a>
			</li>
			<li class="page-item" v-else>
				<NuxtLink class="page-link" :to="localePath({ name: page, params: { page: 1 } })" :title="$t('pagination.first')" :aria-label="$t('pagination.first')">
					<Icon name="chevron-bar-left"/>
				</NuxtLink>
			</li>
			<!-- Previous page -->
			<li class="page-item disabled" v-if="currentPage === 1">
				<a class="page-link" href="#" tabindex="-1" aria-disabled="true" :title="$t('pagination.previous')" :aria-label="$t('pagination.previous')">
					<Icon name="chevron-left"/>
				</a>
			</li>
			<li class="page-item" v-else>
				<NuxtLink class="page-link" :to="localePath({ name: page, params: { page: prevPage } })" :title="$t('pagination.previous')" :aria-label="$t('pagination.previous')">
					<Icon name="chevron-left"/>
				</NuxtLink>
			</li>
			<!-- Pages -->
			<li class="page-item" :class="currentPage === i ? 'active' : false" v-for="i in totalPages" :key="i">
				<NuxtLink class="page-link" :to="localePath({ name: page, params: { page: i } })" :title="$t('pagination.page') + i" :aria-label="$t('pagination.page') + i">
					{{ i }}
				</NuxtLink>
			</li>
			<!-- Next page -->
			<li class="page-item disabled" v-if="currentPage === totalPages">
				<a class="page-link" href="#" tabindex="-1" aria-disabled="true" :title="$t('pagination.next')" :aria-label="$t('pagination.next')">
					<Icon name="chevron-right"/>
				</a>
			</li>
			<li class="page-item" v-else>
				<NuxtLink class="page-link" :to="localePath({ name: page, params: { page: nextPage } })" :title="$t('pagination.next')" :aria-label="$t('pagination.next')">
					<Icon name="chevron-right"/>
				</NuxtLink>
			</li>
			<!-- Last page -->
			<li class="page-item disabled" v-if="currentPage === totalPages">
				<a class="page-link" href="#" tabindex="-1" aria-disabled="true" :title="$t('pagination.last')" :aria-label="$t('pagination.last')">
					<Icon name="chevron-bar-right"/>
				</a>
			</li>
			<li class="page-item" v-else>
				<NuxtLink class="page-link" :to="localePath({ name: page, params: { page: totalPages } })" :title="$t('pagination.last')" :aria-label="$t('pagination.last')">
					<Icon name="chevron-bar-right"/>
				</NuxtLink>
			</li>
		</ul>
	</nav>
</template>

<script>
	export default {
		props: {
			page: {
				type: String,
				default: 'blog-page-page'
			},
			total: {
				type: Number,
				default: 0,
			},
			perPage: {
				type: Number,
				default: 10,
			},
		},
		computed: {
			totalPages() {
				return Math.ceil(this.total / this.perPage);
			},
			currentPage() {
				return parseInt(this.$route.params.page) || 1;
			},
			prevPage() {
				return (this.currentPage > 1) ? (this.currentPage - 1) : 1;
			},
			nextPage() {
				return (this.currentPage < this.totalPages) ? (this.currentPage + 1) : this.totalPages;
			},
		},
	}
</script>