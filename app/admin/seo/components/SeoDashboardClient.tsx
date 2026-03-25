'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SeoConfig, SeoPageConfig } from '@/src/lib/seo-config';

interface Props {
  initialConfig: SeoConfig;
}

type Tab = 'overview' | 'pages' | 'keywords' | 'sitemap' | 'settings';

export default function SeoDashboardClient({ initialConfig }: Props) {
  const [config, setConfig] = useState<SeoConfig>(initialConfig);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [selectedPage, setSelectedPage] = useState<SeoPageConfig | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Resumen', icon: 'dashboard' },
    { id: 'pages', label: 'Páginas', icon: 'article' },
    { id: 'keywords', label: 'Keywords', icon: 'key' },
    { id: 'sitemap', label: 'Sitemap', icon: 'map' },
    { id: 'settings', label: 'Configuración', icon: 'settings' },
  ];

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const updatePage = async (path: string, updates: Partial<SeoPageConfig>) => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/seo/page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path, ...updates }),
      });
      
      if (res.ok) {
        const newConfig = await res.json();
        setConfig(newConfig);
        showMessage('success', 'Cambios guardados');
      } else {
        showMessage('error', 'Error al guardar');
      }
    } catch {
      showMessage('error', 'Error de conexión');
    } finally {
      setSaving(false);
    }
  };

  const updateSettings = async (updates: Partial<SeoConfig>) => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/seo/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      
      if (res.ok) {
        const newConfig = await res.json();
        setConfig(newConfig);
        showMessage('success', 'Configuración actualizada');
      } else {
        showMessage('error', 'Error al guardar');
      }
    } catch {
      showMessage('error', 'Error de conexión');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-surface-container border-b border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined">arrow_back</span>
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <div className="h-6 w-px bg-outline-variant/30" />
              <h1 className="text-xl font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-container">search</span>
                Panel SEO
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              <a
                href="https://search.google.com/search-console"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-surface-container-high rounded-lg hover:bg-surface-container-highest transition-colors"
              >
                <span className="material-symbols-outlined text-sm">open_in_new</span>
                <span className="hidden sm:inline">Search Console</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Message Toast */}
      {message && (
        <div className={`fixed top-20 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
          message.type === 'success' ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'
        }`}>
          <span className={`material-symbols-outlined ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
            {message.type === 'success' ? 'check_circle' : 'error'}
          </span>
          <span className="text-sm">{message.text}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-outline-variant/20 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary-container text-primary-container'
                    : 'border-transparent text-on-surface-variant hover:text-on-surface hover:border-outline-variant/50'
                }`}
              >
                <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && <OverviewTab config={config} />}
        {activeTab === 'pages' && (
          <PagesTab
            config={config}
            selectedPage={selectedPage}
            onSelectPage={setSelectedPage}
            onUpdatePage={updatePage}
            saving={saving}
          />
        )}
        {activeTab === 'keywords' && <KeywordsTab config={config} />}
        {activeTab === 'sitemap' && <SitemapTab config={config} />}
        {activeTab === 'settings' && <SettingsTab config={config} onUpdate={updateSettings} saving={saving} />}
      </main>
    </div>
  );
}

// Overview Tab
function OverviewTab({ config }: { config: SeoConfig }) {
  const stats = [
    { label: 'Páginas configuradas', value: config.pages.length, icon: 'article', color: 'primary-container' },
    { label: 'Keywords globales', value: config.globalKeywords.length, icon: 'key', color: 'secondary' },
    { label: 'Indexables', value: config.pages.filter(p => !p.noIndex).length, icon: 'visibility', color: 'green-500' },
    { label: 'No indexables', value: config.pages.filter(p => p.noIndex).length, icon: 'visibility_off', color: 'orange-500' },
  ];

  const quickWins = [
    { text: 'Añadir Open Graph image', done: !!config.defaultOgImage, priority: 'high' },
    { text: 'Verificar en Google Search Console', done: !!config.googleVerificationCode, priority: 'high' },
    { text: 'Configurar enlaces sociales', done: !!(config.socialLinks.linkedin || config.socialLinks.twitter), priority: 'medium' },
    { text: 'Añadir más de 5 keywords globales', done: config.globalKeywords.length >= 5, priority: 'medium' },
    { text: 'Configurar al menos 4 páginas', done: config.pages.length >= 4, priority: 'low' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="p-4 rounded-xl bg-surface-container border border-outline-variant/20">
            <div className="flex items-center gap-3 mb-2">
              <span className={`material-symbols-outlined text-${stat.color}`}>{stat.icon}</span>
              <span className="text-on-surface-variant text-sm">{stat.label}</span>
            </div>
            <div className="text-3xl font-bold">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Quick Wins */}
      <div className="p-6 rounded-xl bg-surface-container border border-outline-variant/20">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-container">checklist</span>
          Mejoras rápidas
        </h3>
        <div className="space-y-3">
          {quickWins.map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-surface">
              <div className="flex items-center gap-3">
                <span className={`material-symbols-outlined ${item.done ? 'text-green-500' : 'text-on-surface-variant'}`}>
                  {item.done ? 'check_circle' : 'radio_button_unchecked'}
                </span>
                <span className={item.done ? 'line-through text-on-surface-variant' : ''}>{item.text}</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${
                item.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                item.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-surface-container-high text-on-surface-variant'
              }`}>
                {item.priority === 'high' ? 'Alta' : item.priority === 'medium' ? 'Media' : 'Baja'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Pages */}
      <div className="p-6 rounded-xl bg-surface-container border border-outline-variant/20">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-container">schedule</span>
          Páginas recientes
        </h3>
        <div className="space-y-2">
          {config.pages.slice(0, 5).map((page, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-surface">
              <div className="flex items-center gap-3">
                <span className={`material-symbols-outlined ${page.noIndex ? 'text-orange-500' : 'text-green-500'}`}>
                  {page.noIndex ? 'visibility_off' : 'visibility'}
                </span>
                <div>
                  <div className="font-medium">{page.path}</div>
                  <div className="text-xs text-on-surface-variant truncate max-w-md">{page.title}</div>
                </div>
              </div>
              <div className="text-xs text-on-surface-variant">
                {new Date(page.lastModified).toLocaleDateString('es-ES')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Pages Tab
function PagesTab({
  config,
  selectedPage,
  onSelectPage,
  onUpdatePage,
  saving,
}: {
  config: SeoConfig;
  selectedPage: SeoPageConfig | null;
  onSelectPage: (page: SeoPageConfig | null) => void;
  onUpdatePage: (path: string, updates: Partial<SeoPageConfig>) => void;
  saving: boolean;
}) {
  const [editForm, setEditForm] = useState<Partial<SeoPageConfig>>({});

  useEffect(() => {
    if (selectedPage) {
      setEditForm(selectedPage);
    }
  }, [selectedPage]);

  const handleSave = () => {
    if (selectedPage && editForm) {
      onUpdatePage(selectedPage.path, editForm);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Page List */}
      <div className="lg:col-span-1 space-y-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold">Páginas</h3>
          <button className="text-sm text-primary-container hover:underline">+ Añadir</button>
        </div>
        {config.pages.map((page) => (
          <button
            key={page.path}
            onClick={() => onSelectPage(page)}
            className={`w-full text-left p-4 rounded-lg border transition-colors ${
              selectedPage?.path === page.path
                ? 'border-primary-container bg-primary-container/10'
                : 'border-outline-variant/20 bg-surface hover:border-outline-variant/40'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm">{page.path}</span>
              <span className={`material-symbols-outlined text-sm ${page.noIndex ? 'text-orange-500' : 'text-green-500'}`}>
                {page.noIndex ? 'visibility_off' : 'visibility'}
              </span>
            </div>
            <div className="text-xs text-on-surface-variant mt-1 truncate">{page.title.substring(0, 40)}...</div>
          </button>
        ))}
      </div>

      {/* Editor */}
      <div className="lg:col-span-2">
        {selectedPage ? (
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-surface-container border border-outline-variant/20">
              <h3 className="text-lg font-bold mb-4">Editar SEO: {selectedPage.path}</h3>
              
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Título
                    <span className="text-on-surface-variant ml-2">({editForm.title?.length || 0}/60)</span>
                  </label>
                  <input
                    type="text"
                    value={editForm.title || ''}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full px-3 py-2 bg-surface border border-outline-variant/30 rounded-lg focus:border-primary-container outline-none"
                    placeholder="Título SEO de la página"
                  />
                  {(editForm.title?.length || 0) > 60 && (
                    <p className="text-xs text-orange-500 mt-1">⚠️ Título demasiado largo</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Descripción
                    <span className="text-on-surface-variant ml-2">({editForm.description?.length || 0}/160)</span>
                  </label>
                  <textarea
                    value={editForm.description || ''}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 bg-surface border border-outline-variant/30 rounded-lg focus:border-primary-container outline-none resize-none"
                    placeholder="Descripción meta para resultados de búsqueda"
                  />
                  {(editForm.description?.length || 0) > 160 && (
                    <p className="text-xs text-orange-500 mt-1">⚠️ Descripción demasiado larga</p>
                  )}
                </div>

                {/* Keywords */}
                <div>
                  <label className="block text-sm font-medium mb-1">Keywords</label>
                  <input
                    type="text"
                    value={editForm.keywords?.join(', ') || ''}
                    onChange={(e) => setEditForm({ ...editForm, keywords: e.target.value.split(',').map(k => k.trim()).filter(Boolean) })}
                    className="w-full px-3 py-2 bg-surface border border-outline-variant/30 rounded-lg focus:border-primary-container outline-none"
                    placeholder="keyword1, keyword2, keyword3"
                  />
                  <div className="flex flex-wrap gap-1 mt-2">
                    {editForm.keywords?.map((kw, i) => (
                      <span key={i} className="px-2 py-1 text-xs bg-primary-container/10 text-primary-container rounded">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* No Index */}
                <div className="flex items-center gap-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editForm.noIndex || false}
                      onChange={(e) => setEditForm({ ...editForm, noIndex: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-surface-container-high rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-primary-container after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-on-surface after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                  <span className="text-sm">No indexar (noindex)</span>
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary-container rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {saving ? 'Guardando...' : 'Guardar cambios'}
                </button>
              </div>
            </div>

            {/* Preview */}
            <div className="p-6 rounded-xl bg-surface-container border border-outline-variant/20">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-container">preview</span>
                Vista previa Google
              </h4>
              <div className="bg-surface p-4 rounded-lg">
                <div className="text-blue-400 text-lg mb-1 truncate">{editForm.title || 'Sin título'}</div>
                <div className="text-green-400 text-sm mb-1">{config.siteUrl}{selectedPage.path}</div>
                <div className="text-gray-400 text-sm line-clamp-2">{editForm.description || 'Sin descripción'}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-12 rounded-xl bg-surface-container border border-outline-variant/20 text-center">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-4">touch_app</span>
            <p className="text-on-surface-variant">Selecciona una página para editar su configuración SEO</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Keywords Tab
function KeywordsTab({ config }: { config: SeoConfig }) {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-xl bg-surface-container border border-outline-variant/20">
        <h3 className="text-lg font-bold mb-4">Keywords globales</h3>
        <div className="flex flex-wrap gap-2">
          {config.globalKeywords.map((kw, i) => (
            <span key={i} className="px-3 py-1.5 bg-primary-container/10 text-primary-container rounded-lg text-sm font-medium">
              {kw}
            </span>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-xl bg-surface-container border border-outline-variant/20">
        <h3 className="text-lg font-bold mb-4">Keywords por página</h3>
        <div className="space-y-3">
          {config.pages.map((page, i) => (
            <div key={i} className="p-4 bg-surface rounded-lg">
              <div className="font-mono text-sm mb-2">{page.path}</div>
              <div className="flex flex-wrap gap-1">
                {page.keywords.map((kw, j) => (
                  <span key={j} className="px-2 py-0.5 bg-surface-container-high text-on-surface-variant rounded text-xs">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Sitemap Tab
function SitemapTab({ config }: { config: SeoConfig }) {
  const sitemapUrl = `${config.siteUrl}/sitemap.xml`;
  
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-xl bg-surface-container border border-outline-variant/20">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-container">link</span>
          URL del Sitemap
        </h3>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={sitemapUrl}
            readOnly
            className="flex-1 px-3 py-2 bg-surface border border-outline-variant/30 rounded-lg text-on-surface-variant"
          />
          <button
            onClick={() => navigator.clipboard.writeText(sitemapUrl)}
            className="px-4 py-2 bg-surface-container-high rounded-lg hover:bg-surface-container-highest transition-colors"
          >
            <span className="material-symbols-outlined">content_copy</span>
          </button>
        </div>
      </div>

      <div className="p-6 rounded-xl bg-surface-container border border-outline-variant/20">
        <h3 className="text-lg font-bold mb-4">Páginas en sitemap</h3>
        <div className="space-y-2">
          {config.pages.filter(p => !p.noIndex).map((page, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-surface rounded-lg">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-green-500">check_circle</span>
                <span className="font-mono text-sm">{config.siteUrl}{page.path}</span>
              </div>
              <span className="text-xs text-on-surface-variant">
                Prioridad: {page.path === '/' ? '1.0' : '0.8'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-xl bg-surface-container border border-outline-variant/20">
        <h3 className="text-lg font-bold mb-4">Enviar a Google</h3>
        <ol className="space-y-3 text-on-surface-variant">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-container/10 text-primary-container flex items-center justify-center text-sm font-bold">1</span>
            <span>Ve a <a href="https://search.google.com/search-console" target="_blank" className="text-primary-container hover:underline">Google Search Console</a></span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-container/10 text-primary-container flex items-center justify-center text-sm font-bold">2</span>
            <span>Selecciona tu propiedad (lumicatech.es)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-container/10 text-primary-container flex items-center justify-center text-sm font-bold">3</span>
            <span>Ve a "Sitemaps" en el menú izquierdo</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-container/10 text-primary-container flex items-center justify-center text-sm font-bold">4</span>
            <span>Pega la URL del sitemap y haz clic en "Enviar"</span>
          </li>
        </ol>
      </div>
    </div>
  );
}

// Settings Tab
function SettingsTab({ config, onUpdate, saving }: { config: SeoConfig; onUpdate: (updates: Partial<SeoConfig>) => void; saving: boolean }) {
  const [form, setForm] = useState(config);

  const handleSave = () => {
    onUpdate({
      siteName: form.siteName,
      siteUrl: form.siteUrl,
      defaultOgImage: form.defaultOgImage,
      googleVerificationCode: form.googleVerificationCode,
      globalKeywords: form.globalKeywords,
      socialLinks: form.socialLinks,
    });
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="p-6 rounded-xl bg-surface-container border border-outline-variant/20">
        <h3 className="text-lg font-bold mb-4">Configuración general</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre del sitio</label>
            <input
              type="text"
              value={form.siteName}
              onChange={(e) => setForm({ ...form, siteName: e.target.value })}
              className="w-full px-3 py-2 bg-surface border border-outline-variant/30 rounded-lg focus:border-primary-container outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">URL del sitio</label>
            <input
              type="url"
              value={form.siteUrl}
              onChange={(e) => setForm({ ...form, siteUrl: e.target.value })}
              className="w-full px-3 py-2 bg-surface border border-outline-variant/30 rounded-lg focus:border-primary-container outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Open Graph Image (1200x630)</label>
            <input
              type="text"
              value={form.defaultOgImage}
              onChange={(e) => setForm({ ...form, defaultOgImage: e.target.value })}
              className="w-full px-3 py-2 bg-surface border border-outline-variant/30 rounded-lg focus:border-primary-container outline-none"
              placeholder="/og-image.png"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Google Verification Code</label>
            <input
              type="text"
              value={form.googleVerificationCode}
              onChange={(e) => setForm({ ...form, googleVerificationCode: e.target.value })}
              className="w-full px-3 py-2 bg-surface border border-outline-variant/30 rounded-lg focus:border-primary-container outline-none"
              placeholder="AbC123..."
            />
          </div>
        </div>
      </div>

      <div className="p-6 rounded-xl bg-surface-container border border-outline-variant/20">
        <h3 className="text-lg font-bold mb-4">Keywords globales</h3>
        <textarea
          value={form.globalKeywords.join(', ')}
          onChange={(e) => setForm({ ...form, globalKeywords: e.target.value.split(',').map(k => k.trim()).filter(Boolean) })}
          rows={3}
          className="w-full px-3 py-2 bg-surface border border-outline-variant/30 rounded-lg focus:border-primary-container outline-none resize-none"
          placeholder="keyword1, keyword2, keyword3"
        />
      </div>

      <div className="p-6 rounded-xl bg-surface-container border border-outline-variant/20">
        <h3 className="text-lg font-bold mb-4">Redes sociales</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">LinkedIn</label>
            <input
              type="url"
              value={form.socialLinks.linkedin || ''}
              onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, linkedin: e.target.value } })}
              className="w-full px-3 py-2 bg-surface border border-outline-variant/30 rounded-lg focus:border-primary-container outline-none"
              placeholder="https://linkedin.com/company/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Twitter/X</label>
            <input
              type="url"
              value={form.socialLinks.twitter || ''}
              onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, twitter: e.target.value } })}
              className="w-full px-3 py-2 bg-surface border border-outline-variant/30 rounded-lg focus:border-primary-container outline-none"
              placeholder="https://twitter.com/..."
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary-container rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {saving ? 'Guardando...' : 'Guardar configuración'}
      </button>
    </div>
  );
}
