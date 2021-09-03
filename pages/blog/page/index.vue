<script>
	export default {
		middleware({ redirect }) {
			return redirect('301', '/es/blog/page/1');
		},
	}
</script>