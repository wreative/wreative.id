import React from 'react';
import ReactDOM from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from '@/App';
import '@/index.css';

// PWA service worker - auto update prompt
const updateSW = registerSW({
	onNeedRefresh() {
		if (confirm('Update tersedia. Reload untuk menggunakan versi terbaru?')) {
			updateSW(true);
		}
	},
	onOfflineReady() {
		console.log('App siap digunakan offline');
	},
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<App />
);
