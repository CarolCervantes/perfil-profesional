<template>
  <ion-card class="reaction-card">
    <ion-card-header>
      <ion-card-title class="reaction-title">
        ¿Qué te parece mi perfil?
      </ion-card-title>
      <ion-card-subtitle class="reaction-subtitle">
        Déjame tu reacción para conocer tu opinión
      </ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      <div class="reaction-buttons-container">
        <!-- Manito Arriba (Me Gusta) -->
        <ion-button
          :fill="userVote === 'like' ? 'solid' : 'outline'"
          color="success"
          size="default"
          class="vote-btn"
          @click="voteLike"
        >
          <ion-icon slot="start" :icon="userVote === 'like' ? thumbsUp : thumbsUpOutline"></ion-icon>
          Me Gusta
          <ion-badge slot="end" color="success" class="vote-badge">{{ likes }}</ion-badge>
        </ion-button>

        <!-- Manito Abajo (No Me Gusta) -->
        <ion-button
          :fill="userVote === 'dislike' ? 'solid' : 'outline'"
          color="danger"
          size="default"
          class="vote-btn"
          @click="voteDislike"
        >
          <ion-icon slot="start" :icon="userVote === 'dislike' ? thumbsDown : thumbsDownOutline"></ion-icon>
          No Me Gusta
          <ion-badge slot="end" color="danger" class="vote-badge">{{ dislikes }}</ion-badge>
        </ion-button>
      </div>

      <!-- Resumen Reactivo con Alto Contraste -->
      <div class="feedback-summary">
        <p v-if="userVote === 'like'" class="feedback-msg positive">
          👍 ¡Muchas gracias por el apoyo!
        </p>
        <p v-else-if="userVote === 'dislike'" class="feedback-msg negative">
          🤝 Gracias por tu opinión, seguiré preparándome y mejorando.
        </p>
        <p v-else class="feedback-msg neutral">
          Haz clic en una manito para dejar tu reacción.
        </p>

        <div class="stats-bar">
          <small>Total de reacciones: {{ totalVotes }} &bull; Aprobación: {{ approvalRate }}%</small>
        </div>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonBadge,
  IonIcon
} from '@ionic/vue';
import {
  thumbsUp,
  thumbsUpOutline,
  thumbsDown,
  thumbsDownOutline
} from 'ionicons/icons';

// Estado reactivo inicializado en 0 para likes y dislikes
const likes = ref<number>(0);
const dislikes = ref<number>(0);
const userVote = ref<'like' | 'dislike' | null>(null);

// Propiedades computadas
const totalVotes = computed(() => likes.value + dislikes.value);
const approvalRate = computed(() => {
  if (totalVotes.value === 0) return 0;
  return Math.round((likes.value / totalVotes.value) * 100);
});

// Métodos de votación reactivos
const voteLike = () => {
  if (userVote.value === 'like') {
    likes.value--;
    userVote.value = null;
  } else {
    if (userVote.value === 'dislike') {
      dislikes.value--;
    }
    likes.value++;
    userVote.value = 'like';
  }
};

const voteDislike = () => {
  if (userVote.value === 'dislike') {
    dislikes.value--;
    userVote.value = null;
  } else {
    if (userVote.value === 'like') {
      likes.value--;
    }
    dislikes.value++;
    userVote.value = 'dislike';
  }
};
</script>

<style scoped>
.reaction-card {
  margin: 16px 0;
  background-color: #ffffff !important;
  border-radius: 14px;
  border: 1px solid #cbd5e1;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.08);
}

.reaction-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: #0f172a !important;
}

.reaction-subtitle {
  font-size: 0.92rem;
  color: #334155 !important;
  margin-top: 4px;
  font-weight: 500;
}

.reaction-buttons-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin: 14px 0;
}

.vote-btn {
  flex: 1 1 170px;
  max-width: 220px;
  --border-radius: 8px;
  font-weight: 700;
  letter-spacing: -0.2px;
}

.vote-badge {
  margin-left: 8px;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 0.9rem;
}

.feedback-summary {
  margin-top: 14px;
  text-align: center;
  border-top: 1px dashed #cbd5e1;
  padding-top: 12px;
}

.feedback-msg {
  font-size: 0.95rem;
  font-weight: 600;
  margin: 6px 0;
}

.feedback-msg.positive {
  color: #15803d !important;
}

.feedback-msg.negative {
  color: #b91c1c !important;
}

.feedback-msg.neutral {
  color: #334155 !important;
}

.stats-bar small {
  color: #475569 !important;
  font-size: 0.85rem;
  font-weight: 600;
}
</style>
