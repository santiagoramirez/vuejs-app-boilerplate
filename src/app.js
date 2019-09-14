import '@root/App.scss';
import App from '@root/App.vue';

(async function() {

  try {
    const Vue = (await import(/* webpackChunkName: 'vue' */ 'vue')).default;

    new Vue ({
      el: '#container',
      render: (h) => h(App)
    });
  } catch(e) {
    console.log(e);
  }

})();
