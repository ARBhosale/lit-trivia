<template>
<div class="game-container">
    <div class="row">
        <game-card>
            <text-field placeholder="Bond. James Bond." label="What should I call you?" @input="userName=$event.detail.message"></text-field>
            <game-message v-if="correctCount>=0" :text="`Score: ${score}`" />
        </game-card>
        <game-card v-if="userName !=''">
            <select-field :options="categories" label="Where shall I test you?" @selection="startGame($event.detail.message)"></select-field>
        </game-card>
    </div>
    <div class="row row2" v-if="correctCount>=0 && currentQuestionIndex < questions.length">
        <game-card v-for="(question, index) in questions" :key="index" v-show="index == currentQuestionIndex" class="slide">
            <game-message class="fade" :text="`${index+1}. ${question.text}`" />
            <game-option class="fade fade2" v-for="(option, index) in question.options" :key="index" :text="option.text" @click="selectOption(option)"></game-option>
        </game-card>
    </div>
    <div class="row" v-if="currentQuestionIndex >= questions.length">
        <game-card>
            <game-message class="fade" text="Quiz complete!" />
            <game-button @click="restartGame" value="Restart"></game-button>
        </game-card>
    </div>
</div>
</template>

<script>
// <select-field placeholder="ddd" :options="ss" @selection="onSelection" />
import "./components/lit/game-button.js";
import "./components/lit/game-message.js";
import "./components/lit/text-field.js";
import "./components/lit/select-field.js";
import "./components/lit/game-card.js";
import "./components/lit/game-option.js";
import {
    constants
} from "./constants";
export default {
    name: "App",
    data() {
        return {
            userName: "",
            selectedCategory: null,
            categories: [...constants.categories],
            correctCount: -1,
            questions: [...constants.questions],
            currentQuestionIndex: 0
        };
    },
    computed: {
        score() {
            return `${this.correctCount}/${this.questions.length}`;
        }
    },
    methods: {
        startGame(category) {
            if (this.selectedCategory == null) {
                this.selectedCategory = category;
                this.correctCount = 0;
                return;
            }
            if (this.selectedCategory.code != category.code) {
                this.restartGame();
            }
        },
        selectOption(option) {
            if (option.code === this.questions[this.currentQuestionIndex].answer) {
                this.correctCount++;
            }
            this.currentQuestionIndex++;
        },
        restartGame() {
            this.correctCount = 0;
            this.currentQuestionIndex = 0;
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
