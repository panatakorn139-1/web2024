const { createApp } = Vue
const { createVuetify } = Vuetify

const vuetify = createVuetify()

const app = createApp({
    data() {
        return {
            message: "Hello",
            qlist: []
        }
    },
    mounted() {
        this.load_data();
    },
    methods: {
        async load_data() {
            var res = await fetch("quiz.json");
            this.qlist = await res.json();
        }
    }

})
app.use(vuetify).mount('#app')