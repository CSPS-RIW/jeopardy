<!-- Question.vue -->
<template>
  <div class="question-page-wrapper" aria-live="polite" tabindex="-1">
    <div class="category">
      <h2>{{ category }}</h2>
      <p v-if="question">{{ t("question.for") }} {{ question.value }} {{ t("question.points") }}</p>
      <p v-else>{{ t("question.for") }} {{ ("question.points") }} </p>
    </div>
    <div class="container">
        <div class="question-wrapper" ref="questionWrapper">
          <h2>Question</h2>
          <p v-if="question">{{ question.question }}</p>
          <fieldset v-if="question">
            <legend></legend>
            <span v-for="(option, index) in question.options" :key="index" class="option">
              <input type="radio" :id="'option_' + index" :value="option" name="option" v-model="selectedOption"
                :disabled="isSubmitted" ref="options">
              <label :for="'option_' + index">{{ option }}</label>
            </span>
            <div class="feedback-wrapper" aria-live="polite">
              <div class="feedback" v-if="isSubmitted" tabindex="-1">
                <div class="correct-feedback" v-if="selectedOption === question.answer">
                  <p>{{ question.feedback.correct }}</p>
                </div>
                <div class="incorrect-feedback" v-else>
                  <p>{{ question.feedback.incorrect }}</p>
                </div>
                <div class="generic-feedback" >
                  <p>{{ question.feedback.generic }}</p>
                </div>
              </div>
            </div>
          </fieldset>
          <div class="controls">
            <button @click="checkAnswer" class="game-button" :disabled="!selectedOption || isSubmitted">{{
          t("question.submit") }}</button>
            <button @click="goBack" class="game-button" :disabled="!isSubmitted">{{ t("question.back") }}</button>
          </div>
        </div>
      
    </div>
  </div>
</template>

<script setup>
// imports
import { onMounted, ref, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProgressStore } from '../stores/progressStore';
import { usePlayerStore } from '../stores/playerStore';
import { useScoreStore } from '@/stores/scoreStore';
import { useI18n } from 'vue-i18n';
import 'animate.css'

// i18n
const { t, locale, availableLocales } = useI18n()

let lang = document.querySelector('html').getAttribute('lang')

// stores
const progressStore = useProgressStore();
const playerStore = usePlayerStore();
const scoreStore = useScoreStore();

//router
const route = useRoute();
const router = useRouter();

// questions, category, questionwrapper for height animation
const questionId = ref(route.params.id);
const question = ref(null);
const category = ref(null)
const questionWrapper = ref(null);

// selected option on the quiz and if quiz is submitted or not
const selectedOption = ref('');
const isSubmitted = ref(false);


const updateWrapperHeight = async () => {
  await nextTick();
  if (questionWrapper.value) {
    const height = questionWrapper.value.scrollHeight + 'px';
    questionWrapper.value.style.height = height;
  }
};

onMounted(() => {
  // load progress
  progressStore.loadProgress()

  // set the question and category values
  question.value = progressStore.gameData.questions.find(q => q.id === parseInt(questionId.value));
  category.value = progressStore.gameData.categories[question.value.categoryId]

  // set focus on page wrapper for accessibility
  document.querySelector('.question-page-wrapper').focus()

  // wrapper height for animation
  updateWrapperHeight();
  // After setting initial height, remove the fixed height to allow natural expansion
  nextTick(() => {
    if (questionWrapper.value) {
      questionWrapper.value.style.height = 'auto';
    }
  });
});

// watching to update wrapper height with animation
watch(isSubmitted, updateWrapperHeight);


// check answer function
const checkAnswer = () => {

  // updating wrapper height
  if (questionWrapper.value) {
    questionWrapper.value.style.height = questionWrapper.value.scrollHeight + 'px';
  }

  updateWrapperHeight();

  setTimeout(() => {
    if (questionWrapper.value) {
      questionWrapper.value.style.height = 'auto';
    }
  }, 500); // This should match your transition duration


  //// checking answer and increase or decrease score accordingly

  let currentPlayer
  if (playerStore.gameMode === 'single-player') {
    currentPlayer = playerStore.players[0];
  } else {
    currentPlayer = playerStore.players[playerStore.currentPlayerIndex];
  }

  if (selectedOption.value === question.value.answer) {
    currentPlayer.score += question.value.value;
    scoreStore.increaseScore(question.value.value);
  } else {
    currentPlayer.score -= question.value.value;
    scoreStore.decreaseScore(question.value.value);
    // update turn if multiplayer and question was answered incorrectly
    if (playerStore.gameMode === 'multi-player') {
      playerStore.updateTurn();
    }
  }

  // save score and save config
  playerStore.saveConfig();
  scoreStore.saveScore()
  
  // question is now submitted
  isSubmitted.value = true;

  // set focus for accessibility
  document.querySelector('.feedback-wrapper').focus()

  // last piece for height animation
  void document.querySelector('.question-wrapper').offsetHeight
 
  // question is attempted
  question.value.attempted = true;
  // update progress store
  progressStore.updateProgress(questionId.value);
};

// back to gameboard function
const goBack = () => {
  router.push('/gameboard');
};
</script>


<style scoped lang="scss">

.animate__animated {
  --animate-duration: 0.5s;
}

/* Style quiz when focused */
.question-page-wrapper[tabindex='-1']:focus-visible  {
	outline: 5px solid red !important;
  outline-offset: 5px;
  border-radius: 5px;
}

.question-wrapper {
  background-color: var(--question-wrapper);
  max-width: 700px;
  padding: 20px;
  color: var(--vt-c-black);
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  outline: 1px solid #ffffff00;
  transition: height 0.5s ease-out;
  overflow: hidden;

  @media (min-width: 720px) {
    min-width: 500px;
  }

  @media (min-width: 1000px) {
    min-width: 700px;
  }
}

h2 {
  font-size: 28px;
  font-weight: bold;
  color: var(--game-button-blue);
}

p {
  font-size: 20px;
  margin-bottom: 20px;
}

.container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.controls {
  display: flex;
  justify-content: space-between;
}

.category {
  background: linear-gradient(to bottom, rgba(3, 9, 180, 1) 0%, rgba(0, 15, 82, 1) 100%);
  padding: 0.7rem 1rem;
  border: 3px solid var(--main-yellow);
  border-radius: 5px;
  margin-bottom: 2rem;

  h2 {
    color: var(--main-yellow);
  }

  p {
    color: var(--white-heat);

  }
}

.question-page-wrapper {
  background-color: var(--dark-bgc);
  padding: 1rem;
  border-radius: 5px;
}


/* Custom Radio inputs */
input[type='radio'] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

}

input[type='radio']+label {
  display: block;
  position: relative;
  padding-left: 60px;
  margin-bottom: 30px;
  cursor: pointer;
  font-size: 20px;
  line-height: 36px;
  color: #000;
  user-select: none;

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 36px;
    height: 36px;
    outline: 2px solid #000;
    border-radius: 50%;
    background-color: var(--white-heat);
  }
}

input[type='radio']:checked+label::after {
  content: '';
  display: block;
  width: 26px;
  height: 26px;
  position: absolute;
  left: 5px;
  top: 5px;
  border-radius: 50%;
  outline: 1px solid #444;
  background-color: #444;
}

input[type='radio']:focus+label::before {
  -webkit-box-shadow: var(--input-box-shadow);
  box-shadow: var(--input-box-shadow);
  outline: 3px solid #141414;
}

input[type='radio']:not(:disabled)+label:hover::before {
  border: 3px solid var(--white-heat);
  background-image: var(--input-gradient);
}

/* disabled input styles */
input[type='radio']:disabled,
input[type='radio']:disabled+label,
input[type='checkbox']:disabled,
input[type='checkbox']:disabled+label {
  cursor: not-allowed;
  color: var(--disabled);
}

input[type='radio']:disabled+label::before {
  outline: 2px solid var(--disabled);
}

input[type='radio']:disabled+label::after {
  background-color: var(--disabled);
  border-color: var(--disabled);
  cursor: not-allowed;
}

@media (prefers-contrast: more) {
  fieldset:focus-within {
    outline: 1px solid #ffffff00;
  }
}

@media (forced-colors: active),
(--ms-high-contrast: active) {
  fieldset:focus-within {
    outline: 1px solid #ffffff00;
  }
}
</style>