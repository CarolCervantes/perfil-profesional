<template>
  <ion-page>
    <!-- Encabezado Superior -->
    <ion-header :translucent="false">
      <ion-toolbar class="main-toolbar">
        <ion-title class="app-title">Hoja de Vida &bull; Perfil Profesional</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="page-content">
      <div class="resume-wrapper">

        <!-- 1. SECCIÓN SUPERIOR: NOMBRE E IDENTIDAD -->
        <header class="profile-header">
          <div class="avatar-initials" aria-label="Foto de perfil">
            <span>CC</span>
          </div>
          
          <h1 class="student-name">{{ persona.nombreCompleto }}</h1>
          <p class="student-headline">{{ persona.profesion }}</p>
          
          <div class="identity-tag-wrapper">
            <span class="id-tag">
              <ion-icon :icon="idCardOutline"></ion-icon>
              C.C. {{ persona.documentoIdentidad }}
            </span>
            <span class="location-tag">
              <ion-icon :icon="locationOutline"></ion-icon>
              {{ persona.ciudad }}
            </span>
          </div>
        </header>

        <!-- 2. SEPARADOR (LÍNEA DIVISORIA) -->
        <div class="divider-area">
          <hr class="section-divider" />
        </div>

        <!-- 3. DATOS DE LA PERSONA -->
        <ion-card class="content-card">
          <ion-card-header>
            <ion-card-title class="card-heading">
              <ion-icon :icon="personOutline" class="icon-blue"></ion-icon>
              Información Personal
            </ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <div class="personal-info-grid">
              <div class="info-cell">
                <span class="info-label">Nombre y Apellidos</span>
                <span class="info-value font-semibold">{{ persona.nombreCompleto }}</span>
              </div>

              <div class="info-cell">
                <span class="info-label">Documento de Identidad</span>
                <span class="info-value">{{ persona.documentoIdentidad }}</span>
              </div>

              <div class="info-cell">
                <span class="info-label">Correo Electrónico</span>
                <a :href="'mailto:' + persona.correo" class="info-value link-text">
                  {{ persona.correo }}
                </a>
              </div>

              <div class="info-cell">
                <span class="info-label">Teléfono / Celular</span>
                <a :href="'tel:' + persona.telefonoRaw" class="info-value link-text">
                  {{ persona.telefonoFormato }}
                </a>
              </div>

              <div class="info-cell">
                <span class="info-label">Ubicación</span>
                <span class="info-value">{{ persona.ciudad }}</span>
              </div>

              <div class="info-cell">
                <span class="info-label">Género</span>
                <span class="info-value">{{ persona.genero }}</span>
              </div>

              <div class="info-cell">
                <span class="info-label">Fecha de Nacimiento</span>
                <span class="info-value">{{ persona.fechaNacimiento }}</span>
              </div>

              <div class="info-cell">
                <span class="info-label">Nacionalidad</span>
                <span class="info-value">{{ persona.nacionalidad }}</span>
              </div>
            </div>
          </ion-card-content>
        </ion-card>

        <!-- 4. SECCIÓN: EXPERIENCIA ACADÉMICA Y CURSOS -->
        <ion-card class="content-card">
          <ion-card-header>
            <ion-card-title class="card-heading">
              <ion-icon :icon="schoolOutline" class="icon-indigo"></ion-icon>
              Formación Académica & Cursos
            </ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <!-- Historial Educativo -->
            <div class="education-block">
              <div
                v-for="(edu, idx) in educacion"
                :key="'edu-' + idx"
                class="education-row"
              >
                <div class="edu-marker"></div>
                <div class="edu-body">
                  <div class="edu-top">
                    <h3 class="edu-degree">{{ edu.titulo }}</h3>
                    <span class="edu-badge" :class="{ 'badge-current': edu.enCurso }">
                      {{ edu.periodo }}
                    </span>
                  </div>
                  <p class="edu-school">{{ edu.institucion }} &bull; {{ edu.ciudad }}</p>
                  <p class="edu-details">{{ edu.descripcion }}</p>
                </div>
              </div>
            </div>

            <!-- Cursos y Habilidades Clave -->
            <h4 class="subhead-title">
              <ion-icon :icon="ribbonOutline"></ion-icon>
              Cursos & Habilidades Técnicas
            </h4>
            <div class="skills-grid">
              <div
                v-for="(habilidad, sIdx) in cursosYHabilidades"
                :key="'skill-' + sIdx"
                class="skill-item"
              >
                <ion-icon :icon="checkmarkOutline" class="skill-check"></ion-icon>
                <span>{{ habilidad }}</span>
              </div>
            </div>
          </ion-card-content>
        </ion-card>

        <!-- 5. SECCIÓN: EXPERIENCIA LABORAL -->
        <ion-card class="content-card">
          <ion-card-header>
            <ion-card-title class="card-heading">
              <ion-icon :icon="briefcaseOutline" class="icon-teal"></ion-icon>
              Experiencia Laboral
            </ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <div
              v-for="(exp, expIdx) in experiencia"
              :key="'exp-' + expIdx"
              class="work-card-inner"
            >
              <div class="work-header">
                <div>
                  <h3 class="work-role">{{ exp.cargo }}</h3>
                  <p class="work-company">{{ exp.empresa }} &bull; {{ exp.tipo }}</p>
                </div>
                <span class="work-badge">{{ exp.periodo }}</span>
              </div>

              <p class="work-desc">{{ exp.descripcion }}</p>

              <ul class="work-tasks">
                <li v-for="(tarea, tIdx) in exp.tareas" :key="'task-' + tIdx">
                  {{ tarea }}
                </li>
              </ul>

              <div class="tags-container">
                <span
                  v-for="(tag, tagIdx) in exp.tecnologias"
                  :key="'tag-' + tagIdx"
                  class="tech-pill"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </ion-card-content>
        </ion-card>

        <!-- 6. CONTADOR REACTIVO DE ME GUSTA / NO ME GUSTA (MANITOS EN 0) -->
        <LikeDislikeCounter />

      </div>
    </ion-content>

    <!-- 7. BARRITA DE ESTADO (STATUS BAR) CON ENLACE A REPOSITORIO DE GITHUB -->
    <ion-footer class="custom-footer-status">
      <ion-toolbar class="footer-toolbar">
        <div class="footer-status-bar">
          <div class="footer-left">
            <span class="status-dot"></span>
            <span class="status-msg">Cartagena &bull; Disponible</span>
          </div>

          <ion-button
            color="dark"
            size="small"
            fill="solid"
            class="github-btn"
            :href="githubRepoUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ion-icon slot="start" :icon="logoGithub"></ion-icon>
            Mi Repositorio GitHub
          </ion-button>
        </div>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonButton,
  IonFooter
} from '@ionic/vue';
import {
  idCardOutline,
  locationOutline,
  personOutline,
  schoolOutline,
  ribbonOutline,
  briefcaseOutline,
  checkmarkOutline,
  logoGithub
} from 'ionicons/icons';

import LikeDislikeCounter from '@/components/LikeDislikeCounter.vue';

// Enlace al repositorio de GitHub
const githubRepoUrl = ref('https://github.com/CarolCervantes');

// Datos Personales de Carol Cervantes Acosta
const persona = reactive({
  nombreCompleto: 'Carol Cervantes Acosta',
  profesion: 'Estudiante de Tecnología en Desarrollo de Sistemas de Información y de Software',
  documentoIdentidad: '1142917654',
  correo: 'cervantesacostacarol@gmail.com',
  telefonoRaw: '3148833289',
  telefonoFormato: '(+57) 314 883 3289',
  ciudad: 'Cartagena de Indias, Colombia',
  genero: 'Femenino',
  fechaNacimiento: '12 de junio de 2007',
  nacionalidad: 'Colombiana'
});

// Formación Académica
const educacion = reactive([
  {
    titulo: 'Tecnológica en Desarrollo de Sistemas de Información y de Software',
    institucion: 'Fundación Universitaria Colombo Internacional (Unicolombo)',
    ciudad: 'Cartagena de Indias',
    periodo: 'En curso',
    enCurso: true,
    descripcion: 'Formación orientada al análisis, diseño e implementación de soluciones informáticas, bases de datos, lógica de programación y desarrollo de software.'
  },
  {
    titulo: 'Bachiller Académico',
    institucion: 'Institución Educativa Mercedes Ábrego',
    ciudad: 'Cartagena de Indias',
    periodo: '2023',
    enCurso: false,
    descripcion: 'Graduada con énfasis en formación ciudadana, competencias lógicas y fundamentos tecnológicos.'
  }
]);

// Cursos y Habilidades Prácticas
const cursosYHabilidades = reactive([
  'Desarrollo Frontend con HTML5, CSS3, JavaScript y Vue.js',
  'Fundamentos de Bases de Datos Relacionales (SQL y MySQL)',
  'Control de Versiones y Trabajo Colaborativo con Git y GitHub',
  'Mantenimiento Preventivo y Correctivo de Equipos de Cómputo',
  'Configuración de Redes de Datos Locales (LAN / Wi-Fi)',
  'Soporte Técnico a Usuarios y Diagnóstico de Incidencias'
]);

// Experiencia Laboral / Práctica Formativa
const experiencia = reactive([
  {
    cargo: 'Aprendiz de Sistemas',
    empresa: 'Hotel Estelar Cartagena de Indias',
    tipo: 'Practicante',
    periodo: 'Práctica Formativa',
    descripcion: 'Apoyo operativo y técnico al departamento de Tecnologías de la Información (TI), garantizando la continuidad de los servicios computacionales y de conectividad del hotel.',
    tareas: [
      'Atención y resolución de requerimientos de soporte técnico a usuarios internos y huéspedes.',
      'Mantenimiento preventivo, limpieza y actualización de estaciones de trabajo, impresoras y periféricos.',
      'Soporte a la infraestructura de conectividad de red local y verificación de puntos de acceso.',
      'Apoyo en la gestión operativa de software y plataformas hoteleras internas.'
    ],
    tecnologias: ['Soporte TI', 'Mantenimiento de Hardware', 'Redes LAN/WLAN', 'Windows', 'Gestión de Incidencias', 'Atención a Usuarios']
  }
]);
</script>

<style scoped>
/* Contenedor general */
.page-content {
  --background: #f1f5f9;
  background-color: #f1f5f9;
}

.resume-wrapper {
  max-width: 820px;
  margin: 0 auto;
  padding: 16px 12px 32px 12px;
}

.main-toolbar {
  --background: #ffffff;
  background: #ffffff;
  --border-color: #cbd5e1;
  border-bottom: 1px solid #cbd5e1;
}

.app-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: #0f172a !important;
  letter-spacing: -0.3px;
}

/* 1. Encabezado de Identidad */
.profile-header {
  text-align: center;
  padding: 28px 16px 20px 16px;
  background-color: #ffffff;
  border-radius: 16px;
  border: 1px solid #cbd5e1;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.06);
}

.avatar-initials {
  width: 86px;
  height: 86px;
  margin: 0 auto 14px auto;
  border-radius: 50%;
  background: linear-gradient(135deg, #1e3a8a, #2563eb);
  color: #ffffff !important;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.1rem;
  font-weight: 800;
  letter-spacing: 1px;
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.25);
}

.student-name {
  font-size: 1.95rem;
  font-weight: 800;
  color: #0f172a !important;
  margin: 0;
  line-height: 1.25;
  letter-spacing: -0.5px;
}

.student-headline {
  font-size: 1.05rem;
  color: #1e293b !important;
  margin: 8px auto 16px auto;
  max-width: 600px;
  line-height: 1.5;
  font-weight: 600;
}

.identity-tag-wrapper {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

.id-tag,
.location-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background-color: #e2e8f0 !important;
  color: #0f172a !important;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 700;
  border: 1px solid #94a3b8 !important;
}

/* 2. Separador */
.divider-area {
  padding: 12px 0;
}

.section-divider {
  border: none;
  height: 2px;
  background-color: #94a3b8;
  margin: 6px 0;
  opacity: 0.8;
}

/* 3. Tarjetas */
.content-card {
  margin: 16px 0;
  background-color: #ffffff !important;
  border-radius: 14px;
  border: 1px solid #cbd5e1;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.06);
}

.card-heading {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.25rem;
  font-weight: 800;
  color: #0f172a !important;
}

.icon-blue {
  color: #1d4ed8;
  font-size: 1.45rem;
}

.icon-indigo {
  color: #4338ca;
  font-size: 1.45rem;
}

.icon-teal {
  color: #0f766e;
  font-size: 1.45rem;
}

/* Grilla de Datos Personales con Alto Contraste */
.personal-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
  padding-top: 6px;
}

.info-cell {
  background-color: #f8fafc;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #cbd5e1;
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 0.8rem;
  color: #334155 !important;
  text-transform: uppercase;
  font-weight: 800;
  margin-bottom: 4px;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 1rem;
  color: #0f172a !important;
  font-weight: 700;
}

.font-semibold {
  font-weight: 800;
}

.link-text {
  color: #1d4ed8 !important;
  text-decoration: underline;
  font-weight: 700;
}

.link-text:hover {
  color: #1e40af !important;
}

/* Educación */
.education-block {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 22px;
}

.education-row {
  display: flex;
  gap: 14px;
  position: relative;
}

.edu-marker {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #1d4ed8;
  margin-top: 6px;
  flex-shrink: 0;
  box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.25);
}

.edu-body {
  flex: 1;
}

.edu-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 8px;
}

.edu-degree {
  font-size: 1.05rem;
  font-weight: 800;
  color: #0f172a !important;
  margin: 0;
}

.edu-badge {
  font-size: 0.82rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 12px;
  background-color: #e2e8f0 !important;
  color: #0f172a !important;
  border: 1px solid #94a3b8;
}

.badge-current {
  background-color: #dcfce7 !important;
  color: #14532d !important;
  border-color: #86efac;
}

.edu-school {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1d4ed8 !important;
  margin: 4px 0;
}

.edu-details {
  font-size: 0.92rem;
  color: #1e293b !important;
  line-height: 1.5;
  margin: 6px 0 0 0;
  font-weight: 500;
}

/* Cursos */
.subhead-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.05rem;
  font-weight: 800;
  color: #0f172a !important;
  margin: 22px 0 14px 0;
  border-top: 1px dashed #94a3b8;
  padding-top: 18px;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 10px;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #f8fafc;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-size: 0.92rem;
  color: #0f172a !important;
  font-weight: 600;
}

.skill-check {
  color: #059669;
  font-size: 1.25rem;
  flex-shrink: 0;
}

/* Experiencia Laboral */
.work-card-inner {
  padding: 6px 0;
}

.work-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 8px;
}

.work-role {
  font-size: 1.1rem;
  font-weight: 800;
  color: #0f172a !important;
  margin: 0;
}

.work-company {
  font-size: 0.95rem;
  font-weight: 700;
  color: #0f766e !important;
  margin: 4px 0;
}

.work-badge {
  font-size: 0.82rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 12px;
  background-color: #ccfbf1 !important;
  color: #115e59 !important;
  border: 1px solid #99f6e4;
}

.work-desc {
  font-size: 0.92rem;
  color: #1e293b !important;
  line-height: 1.5;
  margin: 10px 0;
  font-weight: 500;
}

.work-tasks {
  margin: 10px 0 16px 20px;
  padding: 0;
  color: #0f172a !important;
  font-size: 0.92rem;
  line-height: 1.55;
  font-weight: 500;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-pill {
  font-size: 0.82rem;
  font-weight: 700;
  background-color: #e2e8f0 !important;
  color: #0f172a !important;
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
}

/* 7. Footer Status Bar */
.custom-footer-status {
  border-top: 1px solid #cbd5e1;
  background-color: #ffffff;
}

.footer-toolbar {
  --background: #ffffff;
  background: #ffffff;
}

.footer-status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-dot {
  width: 10px;
  height: 10px;
  background-color: #10b981;
  border-radius: 50%;
  display: inline-block;
  box-shadow: 0 0 6px #10b981;
}

.status-msg {
  font-size: 0.88rem;
  font-weight: 700;
  color: #0f172a !important;
}

.github-btn {
  font-weight: 700;
  --border-radius: 8px;
  --background: #0f172a;
  --color: #ffffff;
}
</style>
