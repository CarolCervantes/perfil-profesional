<template>
  <ion-page>
    <!-- Encabezado Superior -->
    <ion-header :translucent="true">
      <ion-toolbar color="light" class="main-toolbar">
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

        <!-- 6. CONTADOR REACTIVO DE ME GUSTA / NO ME GUSTA (MANITOS) -->
        <LikeDislikeCounter />

      </div>
    </ion-content>

    <!-- 7. BARRITA DE ESTADO (STATUS BAR) CON ENLACE A REPOSITORIO DE GITHUB -->
    <ion-footer class="custom-footer-status">
      <ion-toolbar color="light">
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
  --background: #f8fafc;
}

.resume-wrapper {
  max-width: 820px;
  margin: 0 auto;
  padding: 16px 12px 32px 12px;
}

.main-toolbar {
  --border-color: #e2e8f0;
}

.app-title {
  font-size: 1rem;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.3px;
}

/* 1. Encabezado de Identidad */
.profile-header {
  text-align: center;
  padding: 28px 16px 16px 16px;
  background-color: #ffffff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.avatar-initials {
  width: 84px;
  height: 84px;
  margin: 0 auto 14px auto;
  border-radius: 50%;
  background: linear-gradient(135deg, #1e3a8a, #2563eb);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: 1px;
  box-shadow: 0 4px 10px rgba(37, 99, 235, 0.25);
}

.student-name {
  font-size: 1.85rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  line-height: 1.25;
  letter-spacing: -0.5px;
}

.student-headline {
  font-size: 1rem;
  color: #475569;
  margin: 8px auto 14px auto;
  max-width: 580px;
  line-height: 1.45;
  font-weight: 500;
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
  padding: 5px 12px;
  background-color: #f1f5f9;
  color: #334155;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  border: 1px solid #e2e8f0;
}

/* 2. Separador */
.divider-area {
  padding: 10px 0;
}

.section-divider {
  border: none;
  height: 1px;
  background-color: #cbd5e1;
  margin: 6px 0;
}

/* 3. Tarjetas */
.content-card {
  margin: 14px 0;
  background-color: #ffffff;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.card-heading {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.18rem;
  font-weight: 700;
  color: #0f172a;
}

.icon-blue {
  color: #2563eb;
  font-size: 1.4rem;
}

.icon-indigo {
  color: #4f46e5;
  font-size: 1.4rem;
}

.icon-teal {
  color: #0d9488;
  font-size: 1.4rem;
}

/* Grilla de Datos Personales */
.personal-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
  padding-top: 4px;
}

.info-cell {
  background-color: #f8fafc;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 0.78rem;
  color: #64748b;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 2px;
  letter-spacing: 0.4px;
}

.info-value {
  font-size: 0.95rem;
  color: #1e293b;
}

.font-semibold {
  font-weight: 600;
}

.link-text {
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
}

.link-text:hover {
  text-decoration: underline;
}

/* Educación */
.education-block {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
}

.education-row {
  display: flex;
  gap: 14px;
  position: relative;
}

.edu-marker {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #2563eb;
  margin-top: 6px;
  flex-shrink: 0;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
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
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.edu-badge {
  font-size: 0.8rem;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 12px;
  background-color: #f1f5f9;
  color: #475569;
  border: 1px solid #e2e8f0;
}

.badge-current {
  background-color: #ecfdf5;
  color: #047857;
  border-color: #a7f3d0;
}

.edu-school {
  font-size: 0.9rem;
  font-weight: 600;
  color: #2563eb;
  margin: 3px 0;
}

.edu-details {
  font-size: 0.88rem;
  color: #475569;
  line-height: 1.4;
  margin: 4px 0 0 0;
}

/* Cursos */
.subhead-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.96rem;
  font-weight: 700;
  color: #1e293b;
  margin: 20px 0 12px 0;
  border-top: 1px dashed #e2e8f0;
  padding-top: 16px;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 8px;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #f8fafc;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #f1f5f9;
  font-size: 0.87rem;
  color: #334155;
  font-weight: 500;
}

.skill-check {
  color: #10b981;
  font-size: 1.1rem;
  flex-shrink: 0;
}

/* Experiencia Laboral */
.work-card-inner {
  padding: 4px 0;
}

.work-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 8px;
}

.work-role {
  font-size: 1.05rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.work-company {
  font-size: 0.9rem;
  font-weight: 600;
  color: #0d9488;
  margin: 3px 0;
}

.work-badge {
  font-size: 0.8rem;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 12px;
  background-color: #f0fdfa;
  color: #0f766e;
  border: 1px solid #ccfbf1;
}

.work-desc {
  font-size: 0.88rem;
  color: #475569;
  line-height: 1.45;
  margin: 8px 0;
}

.work-tasks {
  margin: 8px 0 14px 18px;
  padding: 0;
  color: #334155;
  font-size: 0.87rem;
  line-height: 1.5;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tech-pill {
  font-size: 0.78rem;
  font-weight: 600;
  background-color: #f1f5f9;
  color: #334155;
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
}

/* 7. Footer Status Bar */
.custom-footer-status {
  border-top: 1px solid #e2e8f0;
  background-color: #ffffff;
}

.footer-status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 16px;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-dot {
  width: 9px;
  height: 9px;
  background-color: #10b981;
  border-radius: 50%;
  display: inline-block;
}

.status-msg {
  font-size: 0.82rem;
  font-weight: 600;
  color: #475569;
}

.github-btn {
  font-weight: 600;
  --border-radius: 8px;
}
</style>
