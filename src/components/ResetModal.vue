// the modal component. Used to soft or hard reset the game
<template>
    <div v-if="isOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-button" @click="closeModal" :title="t('modal.close')">&times;</button>
        <h2>{{ t("modal.title") }}</h2>
        <p>{{ t("modal.paragraph") }}</p>
        <div class="button-container">
            <button class="game-button mr-1" @click="$emit('update:reset'); $emit('close')">{{ t("gameOver.resetButton") }}</button>
            <button class="game-button ml-1" @click="$emit('update:retry')">{{ t("gameOver.back") }}</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import { usePlayerStore } from '../stores/playerStore';
  import { useProgressStore } from '../stores/progressStore';
  import { useScoreStore } from '../stores/scoreStore';
  import { useI18n } from 'vue-i18n';


  
  const props = defineProps(['isOpen']);
  const emit = defineEmits(['close', 'update:reset', 'update:retry']);
  const router = useRouter();
  const playerStore = usePlayerStore();
  const progressStore = useProgressStore();
  const scoreStore = useScoreStore();
  const { t, locale, availableLocales } = useI18n();
  
  const closeModal = () => {
    emit('close');
  };
  
  
  const resetAndReconfigure = () => {
    progressStore.resetProgress();
    playerStore.resetPlayerStore();
    scoreStore.resetScore();
    closeModal();
    router.push('/');
  };
  </script>
  
  <style scoped lang="scss">
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;

     
  } 
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    position: relative;
    max-width: 700px;

    @media (prefers-color-scheme: dark) {
      background-color: black;
      outline: 1px solid white;
    }
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    background: none;
    border: none;
    cursor: pointer;

    &:hover {
        color: red;
    }
    
  }
  
  .button-container {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }

  @media (prefers-color-scheme: dark) {
      .modal-content {
        color: black;
      }
    }
  </style>