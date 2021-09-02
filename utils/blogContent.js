export default async ($content, params, error) => {
	const blogContent = 'blog';
	const blogOnly = ['title', 'date', 'slug'];
	const blogSort = 'desc';
	const allBlogs = await $content(blogContent).fetch();
	const totalBlogs = allBlogs.length;
	const perPage = 10;
	const currentPage = parseInt(params.page);
	const lastPage = Math.ceil(totalBlogs / perPage);
	const lastPageCount = totalBlogs % perPage;
	const skipNumber = () => {
		if (currentPage === 1) {
			return 0;
		}
		if (currentPage === lastPage) {
			return totalBlogs - lastPageCount;
		}
		return (currentPage - 1) * perPage;
	};
	const paginatedBlogs = await $content(blogContent)
		.only(blogOnly)
		.sortBy('date', blogSort)
		.limit(perPage)
		.skip(skipNumber())
		.fetch();
	if (currentPage === 0 || !paginatedBlogs.length) {
		return error({ statusCode: 404 });
	}
	return {
		allBlogs,
		paginatedBlogs,
	}
}