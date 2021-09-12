import metaGlobal from './metaGlobal';

export default (meta) => {
	return [
		{
			hid: 'description',
			name: 'description',
			content: (meta && meta.description) || metaGlobal.siteDesc,
		},
		{
			hid: 'og:type',
			property: 'og:type',
			content: (meta && meta.type) || metaGlobal.siteType,
		},
		{
			hid: 'og:url',
			property: 'og:url',
			content: (meta && meta.url) || metaGlobal.siteUrl,
		},
		{
			hid: 'og:title',
			property: 'og:title',
			content: (meta && meta.title) || metaGlobal.siteTitle,
		},
		{
			hid: 'og:description',
			property: 'og:description',
			content: (meta && meta.description) || metaGlobal.siteDesc,
		},
		{
			hid: 'og:image',
			property: 'og:image',
			content: (meta && meta.hero) || metaGlobal.hero,
		},
		{
			hid: 'twitter:url',
			name: 'twitter:url',
			content: (meta && meta.url) || metaGlobal.siteUrl,
		},
		{
			hid: 'twitter:title',
			name: 'twitter:title',
			content: (meta && meta.title) || metaGlobal.siteTitle,
		},
		{
			hid: 'twitter:description',
			name: 'twitter:description',
			content: (meta && meta.description) || metaGlobal.siteDesc,
		},
		{
			hid: 'twitter:image',
			name: 'twitter:image',
			content: (meta && meta.hero) || metaGlobal.hero,
		},
	];
}