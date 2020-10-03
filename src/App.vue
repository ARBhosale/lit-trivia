<template>
<div class="game-container">
    <div class="row">
        <game-card>
            <text-field label="What should I call you?" @input="userName=$event.detail.message"></text-field>
            <game-message v-if="correctCount>=0" :text="`Score: ${score}`" />
        </game-card>
        <game-card v-if="userName !=''">
            <select-field :options="categories" label="Where shall I test you?" @selection="startGame($event.detail.message)"></select-field>
        </game-card>
    </div>
    <div class="row row2" v-if="correctCount>=0 && currentQuestionIndex < questions.length">
        <game-card v-for="(question, index) in questions" :key="index" v-show="index == currentQuestionIndex" class="slide">
            <game-message class="fade" :text="`${index+1}. ${htmlDecode(question.text)}`" />
            <game-option class="fade fade2" v-for="(option, index) in question.options" :key="index" :text="htmlDecode(option.text)" @click="selectOption(option)"></game-option>
            <game-message v-if="correctAnswer" :text="`${htmlDecode(correctAnswer)}`" />
        </game-card>
    </div>
    <div class="row" v-if="correctCount>=0 && currentQuestionIndex >= questions.length">
        <game-card>
            <game-message class="fade" text="Quiz complete!" />
            <game-button @click="initGame" value="Restart"></game-button>
        </game-card>
    </div>
</div>
</template>

<script>
import "./components/lit/game-button.js";
import "./components/lit/game-message.js";
import "./components/lit/text-field.js";
import "./components/lit/select-field.js";
import "./components/lit/game-card.js";
import "./components/lit/game-option.js";
import {
    constants
} from "./constants";
import {
    getQuestions
} from "./trivia.service";
export default {
    name: "App",
    data() {
        return {
            userName: "",
            selectedCategory: null,
            categories: [...constants.categories],
            correctCount: -1,
            questions: [],
            currentQuestionIndex: 0,
            correctAnswer: null
        };
    },
    computed: {
        score() {
            return `${this.correctCount}/${this.questions.length}`;
        }
    },
    methods: {
        startGame(category) {
            if (
                this.selectedCategory == null ||
                this.selectedCategory.code != category.code
            ) {
                this.selectedCategory = category;
                this.initGame();
            }
        },
        selectOption(option) {
            let correctAnswerIndex = this.questions[this.currentQuestionIndex].answer;
            if (option.code === correctAnswerIndex) {
                this.correctCount++;
                this.currentQuestionIndex++;
            } else {
                this.correctAnswer = this.questions[this.currentQuestionIndex].options[
                    correctAnswerIndex
                ].text;
                setTimeout(() => {
                    this.correctAnswer = null;
                    this.currentQuestionIndex++;
                }, 3000);
            }
        },
        initGame() {
            getQuestions(this.selectedCategory.code).then(questions => {
                this.questions = questions;
                this.correctCount = 0;
                this.currentQuestionIndex = 0;
            });
        },
        htmlDecode(input) {
            var e = document.createElement("textarea");
            e.innerHTML = input;
            // handle case of empty input
            return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
        }
    }
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    background: #eee;
}

.game-container {
    height: 100vh;
    width: 100vw;
}

.row {
    display: flex;
    justify-content: space-evenly;
}

.slide {
    -webkit-animation: anim 0.5s 1;
    animation: anim 0.5s 1;
}

@-webkit-keyframes anim {
    0% {
        transform: translateX(50%);
    }

    100% {
        transform: translateX(0);
    }
}

@keyframes anim {
    0% {
        transform: translateX(50%);
    }

    100% {
        transform: translateX(0);
    }
}
</style>
