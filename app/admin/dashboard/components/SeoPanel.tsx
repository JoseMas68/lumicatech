'use client';

import { useState, useEffect } from 'react';

interface SeoPage {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  noIndex: boolean;
  lastModified: string;
}

interface SeoConfig {
  siteName: string;
  siteUrl: string;
  defaultOgImage: string;
  googleVerificationCode: string;
  pages: SeoPage[];
  globalKeywords: string[];
  socialLinks: {
    linkedin?: string;
    twitter?: string;
  };
}

type SeoTab = 'overview' | 'pages' | 'settings';

export default function SeoPanel() {
  const [config, setConfig] = useState<SeoConfig | null>(null);
  const [activeTab, setActiveTab] = useState<SeoTab>('overview');
  const [selectedPage, setSelectedPage] = useState<SeoPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/admin/seo/settings');
      if (res.ok) {
        const data = await res.json();
        setConfig(data);
      }
    } catch (error) {
      console.error('Error fetching SEO config:', error);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const updatePage = async (path: string, updates: Partial<SeoPage>) => {
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
        showMessage('success', 'Guardado ✓');
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
        showMessage('success', 'Configuración actualizada ✓');
      } else {
        showMessage('error', 'Error al guardar');
      }
    } catch {
      showMessage('error', 'Error de conexión');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!config) {
    return (
      <div className="text-center py-20 text-gray-400">
        Error al cargar configuración SEO
      </div>
    );
  }

  const quickWins = [
    { text: 'Añadir Open Graph image', done: !!config.defaultOgImage },
    { text: 'Verificar en Google Search Console', done: !!config.googleVerificationCode },
    { text: 'Configurar enlaces sociales', done: !!(config.socialLinks.linkedin || config.socialLinks.twitter) },
    { text: 'Añadir más de 5 keywords', done: config.globalKeywords.length >= 5 },
  ];

  return (
    <div className="space-y-6">
      {/* Toast */}
      {message && (
        <div className={`fixed top-20 right-4 z-50 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 ${
          message.type === 'success' ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'
        }`}>
          <span className={`text-sm ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
            {message.text}
          </span>
        </div>
      )}

      {/* Sub-tabs */}
      <div className="flex gap-1 bg-[#23242f] p-1 rounded-lg border border-white/10 w-fit">
        {[
          { id: 'overview' as SeoTab, label: 'Resumen' },
          { id: 'pages' as SeoTab, label: 'Páginas' },
          { id: 'settings' as SeoTab, label: 'Config' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Páginas', value: config.pages.length, color: 'indigo' },
            { label: 'Keywords', value: config.globalKeywords.length, color: 'purple' },
            { label: 'Indexables', value: config.pages.filter(p => !p.noIndex).length, color: 'green' },
            { label: 'No index', value: config.pages.filter(p => p.noIndex).length, color: 'orange' },
          ].map((stat, i) => (
            <div key={i} className="bg-[#23242f] border border-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Wins */}
      {activeTab === 'overview' && (
        <div className="bg-[#23242f] border border-white/10 rounded-xl p-4">
          <h3 className="font-bold mb-3 text-sm text-gray-300">Mejoras pendientes</h3>
          <div className="space-y-2">
            {quickWins.map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className={item.done ? 'text-green-400' : 'text-gray-500'}>
                  {item.done ? '✓' : '○'}
                </span>
                <span className={item.done ? 'text-gray-500 line-through' : 'text-gray-300'}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pages Tab */}
      {activeTab === 'pages' && (
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Page list */}
          <div className="lg:col-span-1 space-y-2">
            {config.pages.map((page) => (
              <button
                key={page.path}
                onClick={() => setSelectedPage(page)}
                className={`w-full text-left p-3 rounded-lg border transition text-sm ${
                  selectedPage?.path === page.path
                    ? 'border-indigo-500 bg-indigo-500/10'
                    : 'border-white/10 bg-[#23242f] hover:border-white/20'
                }`}
              >
                <div className="font-mono text-xs text-gray-400">{page.path}</div>
                <div className="text-white truncate mt-1">{page.title.substring(0, 50)}...</div>
              </button>
            ))}
          </div>

          {/* Editor */}
          <div className="lg:col-span-2">
            {selectedPage ? (
              <PageEditor
                page={selectedPage}
                siteUrl={config.siteUrl}
                onSave={updatePage}
                saving={saving}
              />
            ) : (
              <div className="bg-[#23242f] border border-white/10 rounded-xl p-8 text-center text-gray-400">
                Selecciona una página para editar
              </div>
            )}
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <SettingsEditor
          config={config}
          onSave={updateSettings}
          saving={saving}
        />
      )}
    </div>
  );
}

// Page Editor Component
function PageEditor({ 
  page, 
  siteUrl, 
  onSave, 
  saving 
}: { 
  page: SeoPage; 
  siteUrl: string;
  onSave: (path: string, updates: Partial<SeoPage>) => void;
  saving: boolean;
}) {
  const [form, setForm] = useState(page);

  useEffect(() => {
    setForm(page);
  }, [page]);

  return (
    <div className="bg-[#23242f] border border-white/10 rounded-xl p-4 space-y-4">
      <h3 className="font-bold text-sm text-gray-300">Editar: {page.path}</h3>
      
      {/* Title */}
      <div>
        <label className="block text-xs text-gray-400 mb-1">
          Título ({form.title.length}/60)
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full bg-[#1a1b24] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs text-gray-400 mb-1">
          Descripción ({form.description.length}/160)
        </label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
          className="w-full bg-[#1a1b24] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none resize-none"
        />
      </div>

      {/* Keywords */}
      <div>
        <label className="block text-xs text-gray-400 mb-1">Keywords</label>
        <input
          type="text"
          value={form.keywords.join(', ')}
          onChange={(e) => setForm({ ...form, keywords: e.target.value.split(',').map(k => k.trim()).filter(Boolean) })}
          className="w-full bg-[#1a1b24] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none"
        />
        <div className="flex flex-wrap gap-1 mt-2">
          {form.keywords.map((kw, i) => (
            <span key={i} className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded text-xs">
              {kw}
            </span>
          ))}
        </div>
      </div>

      {/* No Index */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="noIndex"
          checked={form.noIndex}
          onChange={(e) => setForm({ ...form, noIndex: e.target.checked })}
          className="w-4 h-4 rounded"
        />
        <label htmlFor="noIndex" className="text-sm text-gray-300">
          No indexar (noindex)
        </label>
      </div>

      {/* Preview */}
      <div className="bg-[#1a1b24] rounded-lg p-3 mt-4">
        <div className="text-xs text-gray-500 mb-2">Vista previa Google:</div>
        <div className="text-blue-400 text-sm truncate">{form.title}</div>
        <div className="text-green-400 text-xs">{siteUrl}{page.path}</div>
        <div className="text-gray-400 text-xs mt-1 line-clamp-2">{form.description}</div>
      </div>

      {/* Save */}
      <button
        onClick={() => onSave(page.path, form)}
        disabled={saving}
        className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition disabled:opacity-50"
      >
        {saving ? 'Guardando...' : 'Guardar'}
      </button>
    </div>
  );
}

// Settings Editor Component
function SettingsEditor({ 
  config, 
  onSave, 
  saving 
}: { 
  config: SeoConfig;
  onSave: (updates: Partial<SeoConfig>) => void;
  saving: boolean;
}) {
  const [form, setForm] = useState(config);

  return (
    <div className="bg-[#23242f] border border-white/10 rounded-xl p-4 space-y-4 max-w-lg">
      <h3 className="font-bold text-sm text-gray-300">Configuración general</h3>

      <div>
        <label className="block text-xs text-gray-400 mb-1">Nombre del sitio</label>
        <input
          type="text"
          value={form.siteName}
          onChange={(e) => setForm({ ...form, siteName: e.target.value })}
          className="w-full bg-[#1a1b24] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-400 mb-1">URL del sitio</label>
        <input
          type="url"
          value={form.siteUrl}
          onChange={(e) => setForm({ ...form, siteUrl: e.target.value })}
          className="w-full bg-[#1a1b24] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-400 mb-1">OG Image</label>
        <input
          type="text"
          value={form.defaultOgImage}
          onChange={(e) => setForm({ ...form, defaultOgImage: e.target.value })}
          className="w-full bg-[#1a1b24] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none"
          placeholder="/og-image.png"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-400 mb-1">Google Verification Code</label>
        <input
          type="text"
          value={form.googleVerificationCode}
          onChange={(e) => setForm({ ...form, googleVerificationCode: e.target.value })}
          className="w-full bg-[#1a1b24] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none"
          placeholder="AbC123..."
        />
      </div>

      <div>
        <label className="block text-xs text-gray-400 mb-1">Keywords globales</label>
        <textarea
          value={form.globalKeywords.join(', ')}
          onChange={(e) => setForm({ ...form, globalKeywords: e.target.value.split(',').map(k => k.trim()).filter(Boolean) })}
          rows={2}
          className="w-full bg-[#1a1b24] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none resize-none"
        />
      </div>

      <button
        onClick={() => onSave({
          siteName: form.siteName,
          siteUrl: form.siteUrl,
          defaultOgImage: form.defaultOgImage,
          googleVerificationCode: form.googleVerificationCode,
          globalKeywords: form.globalKeywords,
        })}
        disabled={saving}
        className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition disabled:opacity-50"
      >
        {saving ? 'Guardando...' : 'Guardar configuración'}
      </button>
    </div>
  );
}
