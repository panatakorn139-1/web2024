const { createApp } = Vue;
const { createVuetify } = Vuetify;

const vuetify = createVuetify();

const app = createApp({
    data() {
        return {
            step: 'start',
            qlist: [],
            selectedAnswers: [],
            score: 0,
        };
    },
    async mounted() {
        await this.loadQuizData();
    },
    methods: {
        async loadQuizData() {
            try {
                const response = await fetch('./quiz.json');
                this.qlist = await response.json();
                this.selectedAnswers = Array(this.qlist.length).fill(null);
            } catch (error) {
                console.error("Failed to load quiz data:", error);
            }
        },
        startQuiz() {
            this.step = 'quiz';
            this.selectedAnswers = Array(this.qlist.length).fill(null);
            this.score = 0;
        },
        calculateScore() {
            this.score = this.qlist.reduce((score, question, index) => {
                if (question.answer === this.selectedAnswers[index]) {
                    return score + 1;
                }
                return score;
            }, 0);
            this.step = 'result';
        },
        isCorrect(index) {
            return this.qlist[index].answer === this.selectedAnswers[index];
        },
    },
    template: `
        <v-app>
            <v-main>
                <v-container fluid>
                    <v-row justify="center" v-if="step === 'start'">
                        <v-col cols="12" sm="8" md="6" class="text-center">
                            <h1 class="mb-6">แบบทดสอบ</h1>
                            <v-btn color="primary" large @click="startQuiz">เริ่มทำแบบทดสอบ</v-btn>
                        </v-col>
                    </v-row>

                    <v-row justify="center" v-else-if="step === 'quiz'">
                        <v-col cols="12" sm="10" md="8">
                            <h2 class="text-center mb-6">ตอบคำถามให้ครบทั้งหมด</h2>
                            <v-card class="mb-4" v-for="(question, index) in qlist" :key="index" outlined>
                                <v-card-title>ข้อที่ {{ index + 1 }}: {{ question.question }}</v-card-title>
                                <v-card-text>
                                    <v-radio-group
                                        v-model="selectedAnswers[index]"
                                        column
                                    >
                                        <v-radio
                                            v-for="option in question.options"
                                            :key="option"
                                            :label="option"
                                            :value="option"
                                        ></v-radio>
                                    </v-radio-group>
                                </v-card-text>
                            </v-card>
                            <v-btn
                                color="success"
                                block
                                large
                                :disabled="selectedAnswers.includes(null)"
                                @click="calculateScore"
                            >
                                ตรวจคำตอบ
                            </v-btn>
                        </v-col>
                    </v-row>

                    <v-row justify="center" v-else-if="step === 'result'">
                        <v-col cols="12" sm="10" md="8" class="text-center">
                            <h1 class="mb-4">ผลการทดสอบ</h1>
                            <p>คุณได้คะแนน <strong>{{ score }}</strong> จาก {{ qlist.length }}</p>
                            <v-card class="mb-4" v-for="(question, index) in qlist" :key="index" outlined>
                                <v-card-title>
                                    ข้อที่ {{ index + 1 }}: {{ question.question }}
                                </v-card-title>
                                <v-card-text>
                                    <p>
                                        <strong>คำตอบของคุณ: </strong>
                                        <span
                                            :class="{ 'text-success': isCorrect(index), 'text-error': !isCorrect(index) }"
                                        >
                                            {{ selectedAnswers[index] || 'ไม่ได้ตอบ' }}
                                        </span>
                                    </p>
                                    <p>
                                        <strong>คำตอบที่ถูกต้อง:</strong> {{ question.answer }}
                                    </p>
                                </v-card-text>
                            </v-card>
                            <v-btn color="primary" block large @click="step = 'start'">กลับไปหน้าแรก</v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-main>
        </v-app>
    `,
});

app.use(vuetify).mount('#app');
