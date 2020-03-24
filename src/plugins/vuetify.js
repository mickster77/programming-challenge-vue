import Vue from 'vue';
import Vuetify from 'vuetify/lib';
// import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import colors from 'vuetify/lib/util/colors'


Vue.use(Vuetify);

export default new Vuetify({

    theme: {
        // dark: true,
        themes: {
            light: {
                primary: '#3C5F7D',
                secondary: "DA1E12",
                // accent: '#82B1FF',
                // error: '#FF5252',
                // info: '#2196F3',
                // success: '#4CAF50',
                // warning: colors.blue,


            },
            dark: {
                primary: colors.blue.darken2,
                // secondary: '#F0EF8D',

                // accent: '#82B1FF',
                // error: '#FF5252',
                // info: '#2196F3',
                // success: '#4CAF50',
                // warning: colors.orange.darken3,
            },
        },
    }


});
