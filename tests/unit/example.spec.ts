import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';

import HomePage from '@/views/HomePage.vue';
import LikeDislikeCounter from '@/components/LikeDislikeCounter.vue';

describe('Perfil Profesional App - Carol Cervantes Acosta', () => {
  test('HomePage.vue renderiza correctamente los datos de Carol Cervantes', () => {
    const wrapper = mount(HomePage);
    expect(wrapper.text()).toContain('Carol Cervantes Acosta');
    expect(wrapper.text()).toContain('1142917654');
    expect(wrapper.text()).toContain('cervantesacostacarol@gmail.com');
    expect(wrapper.text()).toContain('Cartagena de Indias, Colombia');
    expect(wrapper.text()).toContain('Unicolombo');
    expect(wrapper.text()).toContain('Mercedes Ábrego');
    expect(wrapper.text()).toContain('Hotel Estelar Cartagena de Indias');
    expect(wrapper.text()).toContain('Mi Repositorio GitHub');
  });

  test('LikeDislikeCounter.vue inicia en 0 y maneja la reactividad de me gusta y no me gusta', async () => {
    const wrapper = mount(LikeDislikeCounter);
    expect(wrapper.text()).toContain('Me Gusta');
    expect(wrapper.text()).toContain('No Me Gusta');
    expect(wrapper.text()).toContain('Total de reacciones: 0');

    const buttons = wrapper.findAll('ion-button');
    expect(buttons.length).toBeGreaterThanOrEqual(2);

    // Voto positivo
    await buttons[0].trigger('click');
    expect(wrapper.text()).toContain('Total de reacciones: 1');
    expect(wrapper.text()).toContain('Aprobación: 100%');

    // Voto negativo (cambio de voto)
    await buttons[1].trigger('click');
    expect(wrapper.text()).toContain('Total de reacciones: 1');
    expect(wrapper.text()).toContain('Aprobación: 0%');
  });
});
