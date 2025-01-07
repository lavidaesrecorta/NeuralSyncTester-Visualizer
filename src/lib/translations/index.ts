import i18n from 'sveltekit-i18n';
import { dev } from '$app/environment';
import lang from './locales/lang.json';

export const defaultLocale = 'en';

/** @type {import('sveltekit-i18n').Config} */
export const config = {
  log: {
    level: dev ? 'warn' : 'error',
  },
  translations: {
    en: { lang },
  },
  loaders: [
    {
      locale: 'en',
      key: 'sidebar',
      loader: async () => (await import('./locales/en/sidebar.json')).default,
    },
	{
		locale: 'en',
		key: 'counts',
		routes: ['/counts'],
		loader: async () => (await import('./locales/en/counts.json')).default,
	  },
    {
      locale: 'en',
      key: 'graphs3d',
      routes: ['/graphs3d'],
      loader: async () => (await import('./locales/en/graphs3d.json')).default,
    },
  ],
};

export const { t, loading, locales, locale, translations, loadTranslations, addTranslations, setLocale, setRoute } = new i18n(config);

loading.subscribe(($loading) => $loading && console.log('Loading translations...'));