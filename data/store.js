// data/store.js

const STORE_KEY = 'retro_platform_data';

export const DataStore = {
  loadAll: () => {
    try {
      let data = JSON.parse(localStorage.getItem(STORE_KEY));
      if (!data) {
        // Try migrating from old key
        const oldData = JSON.parse(localStorage.getItem('retro_admin_v4'));
        if (oldData && Array.isArray(oldData)) {
          data = oldData;
          localStorage.setItem(STORE_KEY, JSON.stringify(data));
        } else {
          data = [];
        }
      }
      return data;
    } catch {
      return [];
    }
  },

  saveAll: (data) => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  },

  listRetrospectives: () => {
    return DataStore.loadAll();
  },

  getRetrospective: (idOrSlug) => {
    const all = DataStore.loadAll();
    return all.find(r => r.id === idOrSlug || r.slug === idOrSlug) || null;
  },

  createRetrospective: (initialData = {}) => {
    const all = DataStore.loadAll();
    const newRetro = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2),
      status: 'draft',
      slug: '',
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      couple: { name1: '', name2: '', nickname: '', startDate: '', matchDate: '', cover: '' },
      content: { title: 'Nosso Primeiro Ano ❤️', subtitle: 'Uma pequena experiência para a pessoa mais importante da minha vida.', intro: '', finalMessage: '', surpriseText: '' },
      timeline: [],
      gallery: [],
      quiz: [],
      music: { type: 'url', url: '', autoplay: false },
      cartas: [],
      places: [],
      video: {},
      theme: { primaryColor: '#c9a96e', secondaryColor: '#e8a0a0', bgColor: '#0a0a0f', style: 'elegant', font: 'cormorant', mode: 'dark' },
      sections: { counter: true, timeline: true, gallery: true, quiz: true, music: true, loveLetter: false, map: false, video: false },
      ...initialData
    };
    all.unshift(newRetro);
    DataStore.saveAll(all);
    return newRetro;
  },

  updateRetrospective: (id, updates) => {
    const all = DataStore.loadAll();
    const index = all.findIndex(r => r.id === id);
    if (index === -1) return null;
    
    all[index] = { ...all[index], ...updates, updatedAt: new Date().toISOString() };
    DataStore.saveAll(all);
    return all[index];
  },

  deleteRetrospective: (id) => {
    const all = DataStore.loadAll();
    const filtered = all.filter(r => r.id !== id);
    DataStore.saveAll(filtered);
    return true;
  }
};

export const generateSlug = (str) => {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-') || 'retrospectiva-' + Date.now().toString(36);
};
