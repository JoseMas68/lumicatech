'use client';

import { useState, useEffect } from 'react';

interface SeoPage {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
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

type SeoTab = 'overview' | 'pages' | 'preview' | 'analysis' | 'settings';

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
      <div className="flex gap-1 bg-[#23242f] p-1 rounded-lg border border-white/10 overflow-x-auto scrollbar-hide">
        {[
          { id: 'overview' as SeoTab, label: '📊 Resumen' },
          { id: 'pages' as SeoTab, label: '📄 Páginas' },
          { id: 'preview' as SeoTab, label: '👁️ Preview Redes' },
          { id: 'analysis' as SeoTab, label: '🔍 Análisis' },
          { id: 'settings' as SeoTab, label: '⚙️ Config' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'overview' && <OverviewTab config={config} onSelectPage={setSelectedPage} onTabChange={setActiveTab} />}
      {activeTab === 'pages' && (
        <PagesTab
          config={config}
          selectedPage={selectedPage}
          onSelectPage={setSelectedPage}
          onUpdatePage={updatePage}
          saving={saving}
        />
      )}
      {activeTab === 'preview' && <PreviewTab config={config} selectedPage={selectedPage} onSelectPage={setSelectedPage} />}
      {activeTab === 'analysis' && <AnalysisTab config={config} />}
      {activeTab === 'settings' && <SettingsEditor config={config} onSave={updateSettings} saving={saving} />}
    </div>
  );
}

// ==================== OVERVIEW TAB ====================
function OverviewTab({ config, onSelectPage, onTabChange }: { 
  config: SeoConfig; 
  onSelectPage: (page: SeoPage) => void;
  onTabChange: (tab: SeoTab) => void;
}) {
  const score = calculateSeoScore(config);
  const quickWins = getQuickWins(config);
  const criticalIssues = getCriticalIssues(config);

  return (
    <div className="space-y-6">
      {/* Score Card */}
      <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">Puntuación SEO</h3>
            <p className="text-gray-400 text-sm">Basado en {config.pages.length} páginas analizadas</p>
          </div>
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle cx="48" cy="48" r="40" stroke="#23242f" strokeWidth="8" fill="none" />
              <circle 
                cx="48" cy="48" r="40" 
                stroke={score >= 80 ? '#22c55e' : score >= 60 ? '#eab308' : '#ef4444'} 
                strokeWidth="8" 
                fill="none"
                strokeDasharray={`${score * 2.51} 251`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-2xl font-bold ${score >= 80 ? 'text-green-400' : score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                {score}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Páginas', value: config.pages.length, color: 'indigo' },
          { label: 'Keywords', value: config.globalKeywords.length, color: 'purple' },
          { label: 'Indexables', value: config.pages.filter(p => !p.noIndex).length, color: 'green' },
          { label: 'Con OG Image', value: config.pages.filter(p => p.ogImage || config.defaultOgImage).length, color: 'blue' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#23242f] border border-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Critical Issues */}
      {criticalIssues.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <h4 className="font-bold text-red-400 mb-3 flex items-center gap-2">
            <span>⚠️</span> Problemas críticos
          </h4>
          <div className="space-y-2">
            {criticalIssues.map((issue, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <span className="text-red-400 mt-0.5">•</span>
                <div>
                  <span className="text-gray-200">{issue.text}</span>
                  {issue.action && (
                    <button 
                      onClick={issue.action.onClick}
                      className="text-indigo-400 hover:underline ml-2"
                    >
                      {issue.action.label}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Wins */}
      <div className="bg-[#23242f] border border-white/10 rounded-xl p-4">
        <h4 className="font-bold text-gray-300 mb-3 flex items-center gap-2">
          <span>✅</span> Mejoras pendientes
        </h4>
        <div className="space-y-2">
          {quickWins.map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <span className={item.done ? 'text-green-400' : 'text-gray-500'}>
                {item.done ? '✓' : '○'}
              </span>
              <span className={item.done ? 'text-gray-500 line-through' : 'text-gray-300'}>
                {item.text}
              </span>
              {!item.done && item.priority === 'high' && (
                <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded">Prioritario</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==================== PAGES TAB ====================
function PagesTab({
  config,
  selectedPage,
  onSelectPage,
  onUpdatePage,
  saving,
}: {
  config: SeoConfig;
  selectedPage: SeoPage | null;
  onSelectPage: (page: SeoPage | null) => void;
  onUpdatePage: (path: string, updates: Partial<SeoPage>) => void;
  saving: boolean;
}) {
  return (
    <div className="grid lg:grid-cols-3 gap-4">
      {/* Page list */}
      <div className="lg:col-span-1 space-y-2">
        {config.pages.map((page) => {
          const pageScore = calculatePageScore(page, config);
          return (
            <button
              key={page.path}
              onClick={() => onSelectPage(page)}
              className={`w-full text-left p-3 rounded-lg border transition text-sm ${
                selectedPage?.path === page.path
                  ? 'border-indigo-500 bg-indigo-500/10'
                  : 'border-white/10 bg-[#23242f] hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-gray-400">{page.path}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded ${
                  pageScore >= 80 ? 'bg-green-500/20 text-green-400' :
                  pageScore >= 60 ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {pageScore}%
                </span>
              </div>
              <div className="text-white truncate mt-1 text-xs">{page.title.substring(0, 50)}...</div>
            </button>
          );
        })}
      </div>

      {/* Editor */}
      <div className="lg:col-span-2">
        {selectedPage ? (
          <PageEditor
            page={selectedPage}
            siteUrl={config.siteUrl}
            defaultOgImage={config.defaultOgImage}
            onSave={onUpdatePage}
            saving={saving}
          />
        ) : (
          <div className="bg-[#23242f] border border-white/10 rounded-xl p-8 text-center text-gray-400">
            Selecciona una página para editar
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== PAGE EDITOR ====================
function PageEditor({ 
  page, 
  siteUrl,
  defaultOgImage,
  onSave, 
  saving 
}: { 
  page: SeoPage; 
  siteUrl: string;
  defaultOgImage: string;
  onSave: (path: string, updates: Partial<SeoPage>) => void;
  saving: boolean;
}) {
  const [form, setForm] = useState(page);
  const [activeSection, setActiveSection] = useState<'basic' | 'social' | 'advanced'>('basic');

  useEffect(() => {
    setForm(page);
  }, [page]);

  const pageScore = calculatePageScore(form, { defaultOgImage } as SeoConfig);
  const issues = getPageIssues(form);

  return (
    <div className="bg-[#23242f] border border-white/10 rounded-xl p-4 space-y-4">
      {/* Header con score */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-sm text-gray-300">Editar: {page.path}</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Score:</span>
          <span className={`text-sm font-bold ${
            pageScore >= 80 ? 'text-green-400' :
            pageScore >= 60 ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {pageScore}%
          </span>
        </div>
      </div>

      {/* Issues */}
      {issues.length > 0 && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
          <div className="text-xs text-yellow-400 mb-1">⚠️ Problemas detectados:</div>
          <ul className="text-xs text-gray-300 space-y-1">
            {issues.map((issue, i) => (
              <li key={i}>• {issue}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Section tabs */}
      <div className="flex gap-1 bg-[#1a1b24] p-1 rounded-lg">
        {[
          { id: 'basic' as const, label: 'Básico' },
          { id: 'social' as const, label: 'Redes' },
          { id: 'advanced' as const, label: 'Avanzado' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className={`flex-1 px-3 py-1.5 rounded text-xs font-medium transition ${
              activeSection === tab.id
                ? 'bg-indigo-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Basic Section */}
      {activeSection === 'basic' && (
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs text-gray-400 mb-1">
              Título SEO ({form.title.length}/60)
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full bg-[#1a1b24] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none"
            />
            {form.title.length > 60 && (
              <p className="text-xs text-yellow-400 mt-1">⚠️ Título demasiado largo para Google</p>
            )}
            {form.title.length < 30 && form.title.length > 0 && (
              <p className="text-xs text-yellow-400 mt-1">💡 Título corto - añade más keywords</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs text-gray-400 mb-1">
              Meta descripción ({form.description.length}/160)
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full bg-[#1a1b24] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none resize-none"
            />
            {form.description.length > 160 && (
              <p className="text-xs text-yellow-400 mt-1">⚠️ Se cortará en resultados de búsqueda</p>
            )}
          </div>

          {/* Keywords */}
          <div>
            <label className="block text-xs text-gray-400 mb-1">
              Keywords ({form.keywords.length})
            </label>
            <input
              type="text"
              value={form.keywords.join(', ')}
              onChange={(e) => setForm({ ...form, keywords: e.target.value.split(',').map(k => k.trim()).filter(Boolean) })}
              className="w-full bg-[#1a1b24] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none"
              placeholder="keyword1, keyword2, keyword3"
            />
            <div className="flex flex-wrap gap-1 mt-2">
              {form.keywords.map((kw, i) => (
                <span key={i} className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded text-xs">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Social Section */}
      {activeSection === 'social' && (
        <div className="space-y-4">
          {/* OG Image */}
          <div>
            <label className="block text-xs text-gray-400 mb-1">
              Open Graph Image (1200x630 recomendado)
            </label>
            <input
              type="text"
              value={form.ogImage || ''}
              onChange={(e) => setForm({ ...form, ogImage: e.target.value })}
              className="w-full bg-[#1a1b24] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none"
              placeholder="/og-image.png o URL completa"
            />
            <p className="text-xs text-gray-500 mt-1">
              Por defecto: {defaultOgImage || 'No configurada'}
            </p>
          </div>

          {/* Preview Facebook/LinkedIn */}
          <div className="bg-[#1a1b24] rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-2">📱 Preview Facebook/LinkedIn:</div>
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative overflow-hidden">
                {form.ogImage || defaultOgImage ? (
                  <img 
                    src={form.ogImage || defaultOgImage} 
                    alt="OG Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <span className="text-gray-400 text-xs">❌ Sin imagen</span>
                )}
              </div>
              <div className="p-3">
                <div className="text-xs text-gray-500 uppercase">{siteUrl}</div>
                <div className="font-bold text-sm text-gray-900 truncate mt-1">{form.title || 'Sin título'}</div>
                <div className="text-xs text-gray-600 line-clamp-2 mt-1">{form.description || 'Sin descripción'}</div>
              </div>
            </div>
          </div>

          {/* Preview Twitter */}
          <div className="bg-[#1a1b24] rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-2">🐦 Preview Twitter/X:</div>
            <div className="border border-gray-600 rounded-xl overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center relative overflow-hidden">
                {form.ogImage || defaultOgImage ? (
                  <img 
                    src={form.ogImage || defaultOgImage}
                    alt="Twitter Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <span className="text-gray-500 text-xs">❌ Sin imagen</span>
                )}
              </div>
              <div className="p-3 bg-[#1a1b24]">
                <div className="text-white font-medium text-sm truncate">{form.title || 'Sin título'}</div>
                <div className="text-gray-500 text-xs mt-1">{siteUrl}{page.path}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Section */}
      {activeSection === 'advanced' && (
        <div className="space-y-4">
          {/* Canonical URL */}
          <div>
            <label className="block text-xs text-gray-400 mb-1">
              URL Canónica
            </label>
            <input
              type="text"
              value={form.canonical || ''}
              onChange={(e) => setForm({ ...form, canonical: e.target.value })}
              className="w-full bg-[#1a1b24] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none"
              placeholder="https://ejemplo.com/pagina-canonica"
            />
            <p className="text-xs text-gray-500 mt-1">Para contenido duplicado - usa la URL principal</p>
          </div>

          {/* No Index */}
          <div className="flex items-center gap-3 p-3 bg-[#1a1b24] rounded-lg">
            <input
              type="checkbox"
              id="noIndex"
              checked={form.noIndex}
              onChange={(e) => setForm({ ...form, noIndex: e.target.checked })}
              className="w-4 h-4 rounded"
            />
            <div>
              <label htmlFor="noIndex" className="text-sm text-gray-300 block">
                No indexar (noindex)
              </label>
              <span className="text-xs text-gray-500">Google no mostrará esta página en resultados</span>
            </div>
          </div>

          {/* Google Preview */}
          <div className="bg-[#1a1b24] rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-2">🔍 Preview Google SERP:</div>
            <div className="bg-white rounded p-3">
              <div className="text-blue-700 text-lg hover:underline cursor-pointer truncate">
                {form.title || 'Sin título'}
              </div>
              <div className="text-green-700 text-sm">{siteUrl}{page.path}</div>
              <div className="text-gray-600 text-sm mt-1 line-clamp-2">
                {form.description || 'Sin descripción - Google usará contenido de la página'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save */}
      <button
        onClick={() => onSave(page.path, form)}
        disabled={saving}
        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition disabled:opacity-50"
      >
        {saving ? 'Guardando...' : 'Guardar cambios'}
      </button>
    </div>
  );
}

// ==================== PREVIEW TAB ====================
function PreviewTab({ config, selectedPage, onSelectPage }: {
  config: SeoConfig;
  selectedPage: SeoPage | null;
  onSelectPage: (page: SeoPage) => void;
}) {
  const page = selectedPage || config.pages[0];
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(page);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(page);
  }, [page]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/seo/page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          path: page.path, 
          title: form.title,
          description: form.description,
          keywords: form.keywords,
          ogImage: form.ogImage,
          canonical: form.canonical,
          noIndex: form.noIndex,
        }),
      });
      
      if (res.ok) {
        setEditing(false);
        // Refresh config would happen via parent
      }
    } catch {
      console.error('Error saving');
    } finally {
      setSaving(false);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Page selector */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {config.pages.map((p) => (
          <button
            key={p.path}
            onClick={() => { onSelectPage(p); setEditing(false); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
              page?.path === p.path
                ? 'bg-indigo-600 text-white'
                : 'bg-[#23242f] text-gray-400 hover:text-white'
            }`}
          >
            {p.path}
          </button>
        ))}
      </div>

      {/* Edit button */}
      <div className="flex justify-end">
        <button
          onClick={() => setEditing(!editing)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            editing 
              ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
              : 'bg-indigo-600 text-white'
          }`}
        >
          {editing ? 'Cancelar' : '✏️ Editar'}
        </button>
      </div>

      {/* Edit form */}
      {editing && (
        <div className="bg-[#23242f] border border-indigo-500/30 rounded-xl p-4 space-y-4">
          <h4 className="font-bold text-sm text-indigo-400">Editando: {page.path}</h4>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Título</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-[#1a1b24] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none"
              />
            </div>
            
            <div>
              <label className="block text-xs text-gray-400 mb-1">OG Image</label>
              <input
                type="text"
                value={form.ogImage || ''}
                onChange={(e) => setForm({ ...form, ogImage: e.target.value })}
                className="w-full bg-[#1a1b24] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none"
                placeholder={config.defaultOgImage || '/og-image.png'}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Descripción</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
              className="w-full bg-[#1a1b24] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Keywords</label>
            <input
              type="text"
              value={form.keywords.join(', ')}
              onChange={(e) => setForm({ ...form, keywords: e.target.value.split(',').map(k => k.trim()).filter(Boolean) })}
              className="w-full bg-[#1a1b24] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-medium transition disabled:opacity-50"
          >
            {saving ? 'Guardando...' : '✓ Guardar cambios'}
          </button>
        </div>
      )}

      {page && (
        <>
          {/* Google Desktop Preview */}
          <div className="bg-[#23242f] border border-white/10 rounded-xl p-4">
            <h4 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2">
              <span>🖥️</span> Google Desktop
            </h4>
            <div className="bg-white rounded-lg p-4">
              <div className="text-blue-700 text-xl hover:underline cursor-pointer truncate max-w-2xl">
                {editing ? form.title : page.title}
              </div>
              <div className="text-green-700 text-sm">{config.siteUrl}{page.path}</div>
              <div className="text-gray-600 text-sm mt-2 line-clamp-2 max-w-2xl">
                {editing ? form.description : page.description}
              </div>
            </div>
          </div>

          {/* Google Mobile Preview */}
          <div className="bg-[#23242f] border border-white/10 rounded-xl p-4">
            <h4 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2">
              <span>📱</span> Google Mobile
            </h4>
            <div className="max-w-xs mx-auto bg-white rounded-2xl p-4 border-4 border-gray-800">
              <div className="text-blue-700 text-base truncate">
                {editing ? form.title : page.title}
              </div>
              <div className="text-green-700 text-xs truncate">{config.siteUrl}{page.path}</div>
              <div className="text-gray-600 text-xs mt-2 line-clamp-3">
                {editing ? form.description : page.description}
              </div>
            </div>
          </div>

          {/* Facebook/LinkedIn Preview */}
          <div className="bg-[#23242f] border border-white/10 rounded-xl p-4">
            <h4 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2">
              <span>📘</span> Facebook / LinkedIn
            </h4>
            <div className="max-w-md bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="h-52 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative overflow-hidden">
                {(editing ? form.ogImage : page.ogImage) || config.defaultOgImage ? (
                  <img 
                    src={(editing ? form.ogImage : page.ogImage) || config.defaultOgImage} 
                    alt="OG Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div className={`text-center ${((editing ? form.ogImage : page.ogImage) || config.defaultOgImage) ? 'hidden' : ''}`}>
                  <div className="text-4xl mb-2">❌</div>
                  <div className="text-xs text-red-500">Sin OG Image</div>
                </div>
              </div>
              <div className="p-4">
                <div className="text-xs text-gray-500 uppercase tracking-wide">{config.siteUrl.replace('https://', '')}</div>
                <div className="font-bold text-base text-gray-900 mt-1">{editing ? form.title : page.title}</div>
                <div className="text-sm text-gray-600 mt-2 line-clamp-2">{editing ? form.description : page.description}</div>
              </div>
            </div>
          </div>

          {/* Twitter Preview */}
          <div className="bg-[#23242f] border border-white/10 rounded-xl p-4">
            <h4 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2">
              <span>🐦</span> Twitter / X
            </h4>
            <div className="max-w-md border border-gray-600 rounded-xl overflow-hidden">
              <div className="h-52 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center relative overflow-hidden">
                {(editing ? form.ogImage : page.ogImage) || config.defaultOgImage ? (
                  <img 
                    src={(editing ? form.ogImage : page.ogImage) || config.defaultOgImage}
                    alt="Twitter Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div className={`text-center ${((editing ? form.ogImage : page.ogImage) || config.defaultOgImage) ? 'hidden' : ''}`}>
                  <div className="text-4xl mb-2">❌</div>
                  <div className="text-xs text-red-400">Sin imagen</div>
                </div>
              </div>
              <div className="p-4 bg-[#1a1b24]">
                <div className="text-white font-medium">{editing ? form.title : page.title}</div>
                <div className="text-gray-500 text-sm mt-1">{config.siteUrl}{page.path}</div>
              </div>
            </div>
          </div>

          {/* WhatsApp Preview */}
          <div className="bg-[#23242f] border border-white/10 rounded-xl p-4">
            <h4 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2">
              <span>💬</span> WhatsApp
            </h4>
            <div className="max-w-sm bg-[#075e54] rounded-lg p-3 ml-auto">
              <div className="bg-[#005c4b] rounded-lg p-3">
                <div className="text-white text-sm">{editing ? form.title : page.title}</div>
                <div className="text-gray-300 text-xs mt-1 truncate">{config.siteUrl}{page.path}</div>
                <div className="text-gray-300 text-xs mt-1">{(editing ? form.description : page.description).substring(0, 100)}...</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ==================== ANALYSIS TAB ====================
function AnalysisTab({ config }: { config: SeoConfig }) {
  const overallScore = calculateSeoScore(config);
  const recommendations = getSeoRecommendations(config);

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-xl p-6">
        <div className="flex items-center gap-6">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle cx="64" cy="64" r="56" stroke="#23242f" strokeWidth="12" fill="none" />
              <circle 
                cx="64" cy="64" r="56" 
                stroke={overallScore >= 80 ? '#22c55e' : overallScore >= 60 ? '#eab308' : '#ef4444'} 
                strokeWidth="12" 
                fill="none"
                strokeDasharray={`${overallScore * 3.52} 352`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-bold ${
                overallScore >= 80 ? 'text-green-400' : 
                overallScore >= 60 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {overallScore}
              </span>
              <span className="text-xs text-gray-400">de 100</span>
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">
              {overallScore >= 80 ? '🎉 Excelente' : 
               overallScore >= 60 ? '👍 Bien, pero puede mejorar' : 
               '⚠️ Necesita mejoras'}
            </h3>
            <p className="text-gray-400 text-sm">
              {overallScore >= 80 
                ? 'Tu SEO está muy bien optimizado. Continúa monitorizando.'
                : overallScore >= 60 
                ? 'Hay aspectos que puedes mejorar para posicionar mejor.'
                : 'Hay problemas importantes que afectan tu posicionamiento.'}
            </p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-[#23242f] border border-white/10 rounded-xl p-4">
        <h4 className="font-bold text-gray-300 mb-4 flex items-center gap-2">
          <span>💡</span> Recomendaciones SEO
        </h4>
        <div className="space-y-3">
          {recommendations.map((rec, i) => (
            <div 
              key={i} 
              className={`p-3 rounded-lg border ${
                rec.priority === 'high' 
                  ? 'bg-red-500/10 border-red-500/30' 
                  : rec.priority === 'medium'
                  ? 'bg-yellow-500/10 border-yellow-500/30'
                  : 'bg-[#1a1b24] border-white/10'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className={`text-lg ${
                  rec.priority === 'high' ? 'text-red-400' : 
                  rec.priority === 'medium' ? 'text-yellow-400' : 
                  'text-gray-400'
                }`}>
                  {rec.priority === 'high' ? '🔴' : rec.priority === 'medium' ? '🟡' : '🟢'}
                </span>
                <div className="flex-1">
                  <div className="text-sm text-white font-medium">{rec.title}</div>
                  <div className="text-xs text-gray-400 mt-1">{rec.description}</div>
                  {rec.action && (
                    <div className="text-xs text-indigo-400 mt-2">{rec.action}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Checklist */}
      <div className="bg-[#23242f] border border-white/10 rounded-xl p-4">
        <h4 className="font-bold text-gray-300 mb-4 flex items-center gap-2">
          <span>📋</span> Checklist SEO
        </h4>
        <div className="grid sm:grid-cols-2 gap-2">
          {[
            { text: 'Sitemap enviado a Google', done: true },
            { text: 'Robots.txt configurado', done: true },
            { text: 'HTTPS activo', done: true },
            { text: 'Meta descriptions únicas', done: config.pages.every(p => p.description && p.description.length > 0) },
            { text: 'Titles optimizados (<60 chars)', done: config.pages.every(p => p.title.length <= 60) },
            { text: 'OG Image configurada', done: !!config.defaultOgImage },
            { text: 'Google Search Console verificado', done: !!config.googleVerificationCode },
            { text: 'Redes sociales configuradas', done: !!(config.socialLinks.linkedin || config.socialLinks.twitter) },
            { text: 'Keywords definidas por página', done: config.pages.every(p => p.keywords.length >= 3) },
            { text: 'Contenido indexable', done: config.pages.filter(p => !p.noIndex).length > 0 },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm p-2 bg-[#1a1b24] rounded">
              <span className={item.done ? 'text-green-400' : 'text-gray-500'}>
                {item.done ? '✓' : '○'}
              </span>
              <span className={item.done ? 'text-gray-300' : 'text-gray-500'}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Keywords Analysis */}
      <div className="bg-[#23242f] border border-white/10 rounded-xl p-4">
        <h4 className="font-bold text-gray-300 mb-4 flex items-center gap-2">
          <span>🔑</span> Keywords Globales ({config.globalKeywords.length})
        </h4>
        <div className="flex flex-wrap gap-2">
          {config.globalKeywords.map((kw, i) => (
            <span key={i} className="px-3 py-1.5 bg-indigo-500/20 text-indigo-300 rounded-lg text-sm">
              {kw}
            </span>
          ))}
        </div>
        {config.globalKeywords.length < 5 && (
          <p className="text-xs text-yellow-400 mt-3">
            💡 Recomendación: Añade más keywords para mejorar el posicionamiento
          </p>
        )}
      </div>
    </div>
  );
}

// ==================== SETTINGS EDITOR ====================
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
    <div className="max-w-lg space-y-6">
      {/* Basic Settings */}
      <div className="bg-[#23242f] border border-white/10 rounded-xl p-4 space-y-4">
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
          <label className="block text-xs text-gray-400 mb-1">
            OG Image por defecto (1200x630)
          </label>
          <input
            type="text"
            value={form.defaultOgImage}
            onChange={(e) => setForm({ ...form, defaultOgImage: e.target.value })}
            className="w-full bg-[#1a1b24] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none"
            placeholder="/og-image.png"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1">
            Código verificación Google
          </label>
          <input
            type="text"
            value={form.googleVerificationCode}
            onChange={(e) => setForm({ ...form, googleVerificationCode: e.target.value })}
            className="w-full bg-[#1a1b24] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none"
            placeholder="AbC123..."
          />
          <p className="text-xs text-gray-500 mt-1">
            Lo encuentras en Google Search Console → Verificar → Etiqueta HTML
          </p>
        </div>
      </div>

      {/* Keywords */}
      <div className="bg-[#23242f] border border-white/10 rounded-xl p-4 space-y-4">
        <h3 className="font-bold text-sm text-gray-300">Keywords globales</h3>
        <textarea
          value={form.globalKeywords.join(', ')}
          onChange={(e) => setForm({ ...form, globalKeywords: e.target.value.split(',').map(k => k.trim()).filter(Boolean) })}
          rows={3}
          className="w-full bg-[#1a1b24] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none resize-none"
          placeholder="keyword1, keyword2, keyword3"
        />
        <div className="flex flex-wrap gap-1">
          {form.globalKeywords.map((kw, i) => (
            <span key={i} className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded text-xs">
              {kw}
            </span>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-[#23242f] border border-white/10 rounded-xl p-4 space-y-4">
        <h3 className="font-bold text-sm text-gray-300">Redes sociales</h3>
        
        <div>
          <label className="block text-xs text-gray-400 mb-1">LinkedIn</label>
          <input
            type="url"
            value={form.socialLinks.linkedin || ''}
            onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, linkedin: e.target.value } })}
            className="w-full bg-[#1a1b24] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none"
            placeholder="https://linkedin.com/company/..."
          />
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1">Twitter/X</label>
          <input
            type="url"
            value={form.socialLinks.twitter || ''}
            onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, twitter: e.target.value } })}
            className="w-full bg-[#1a1b24] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none"
            placeholder="https://twitter.com/..."
          />
        </div>
      </div>

      <button
        onClick={() => onSave({
          siteName: form.siteName,
          siteUrl: form.siteUrl,
          defaultOgImage: form.defaultOgImage,
          googleVerificationCode: form.googleVerificationCode,
          globalKeywords: form.globalKeywords,
          socialLinks: form.socialLinks,
        })}
        disabled={saving}
        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition disabled:opacity-50"
      >
        {saving ? 'Guardando...' : 'Guardar configuración'}
      </button>
    </div>
  );
}

// ==================== HELPER FUNCTIONS ====================

function calculateSeoScore(config: SeoConfig): number {
  let score = 0;
  const weights = {
    pages: 30,
    keywords: 20,
    ogImage: 20,
    verification: 15,
    social: 15,
  };

  // Pages score
  if (config.pages.length >= 4) score += weights.pages;
  else if (config.pages.length >= 2) score += weights.pages * 0.5;

  // Keywords score
  if (config.globalKeywords.length >= 5) score += weights.keywords;
  else if (config.globalKeywords.length >= 3) score += weights.keywords * 0.5;

  // OG Image
  if (config.defaultOgImage) score += weights.ogImage;

  // Verification
  if (config.googleVerificationCode) score += weights.verification;

  // Social
  if (config.socialLinks.linkedin && config.socialLinks.twitter) score += weights.social;
  else if (config.socialLinks.linkedin || config.socialLinks.twitter) score += weights.social * 0.5;

  return Math.round(score);
}

function calculatePageScore(page: SeoPage, config: SeoConfig): number {
  let score = 0;
  
  if (page.title.length > 0 && page.title.length <= 60) score += 25;
  else if (page.title.length > 0) score += 15;
  
  if (page.description.length > 0 && page.description.length <= 160) score += 25;
  else if (page.description.length > 0) score += 15;
  
  if (page.keywords.length >= 3) score += 25;
  else if (page.keywords.length > 0) score += 10;
  
  if (page.ogImage || config.defaultOgImage) score += 25;
  
  return score;
}

function getPageIssues(page: SeoPage): string[] {
  const issues: string[] = [];
  
  if (!page.title) issues.push('Falta título');
  else if (page.title.length > 60) issues.push('Título demasiado largo');
  else if (page.title.length < 30) issues.push('Título muy corto');
  
  if (!page.description) issues.push('Falta descripción');
  else if (page.description.length > 160) issues.push('Descripción muy larga');
  else if (page.description.length < 120) issues.push('Descripción corta');
  
  if (page.keywords.length < 3) issues.push('Añade más keywords');
  
  return issues;
}

function getQuickWins(config: SeoConfig) {
  return [
    { text: 'Añadir Open Graph image', done: !!config.defaultOgImage, priority: 'high' },
    { text: 'Verificar en Google Search Console', done: !!config.googleVerificationCode, priority: 'high' },
    { text: 'Configurar LinkedIn', done: !!config.socialLinks.linkedin, priority: 'medium' },
    { text: 'Configurar Twitter', done: !!config.socialLinks.twitter, priority: 'medium' },
    { text: 'Añadir 5+ keywords globales', done: config.globalKeywords.length >= 5, priority: 'medium' },
    { text: 'Configurar 4+ páginas', done: config.pages.length >= 4, priority: 'low' },
  ];
}

function getCriticalIssues(config: SeoConfig) {
  const issues: { text: string; action?: { label: string; onClick: () => void } }[] = [];
  
  if (!config.googleVerificationCode) {
    issues.push({
      text: 'Google Search Console no verificado',
    });
  }
  
  if (!config.defaultOgImage) {
    issues.push({
      text: 'Sin imagen OG para redes sociales',
    });
  }
  
  if (config.globalKeywords.length < 3) {
    issues.push({
      text: 'Muy pocas keywords definidas',
    });
  }
  
  return issues;
}

function getSeoRecommendations(config: SeoConfig) {
  const recommendations: { title: string; description: string; priority: 'high' | 'medium' | 'low'; action?: string }[] = [];
  
  if (!config.googleVerificationCode) {
    recommendations.push({
      title: 'Verificar propiedad en Google',
      description: 'Registra tu web en Google Search Console para monitorizar el posicionamiento.',
      priority: 'high',
      action: '→ Ve a Config e introduce el código de verificación',
    });
  }
  
  if (!config.defaultOgImage) {
    recommendations.push({
      title: 'Crear imagen OG (1200x630px)',
      description: 'Las imágenes OG mejoran la apariencia en redes sociales y aumentan el CTR.',
      priority: 'high',
      action: '→ Crea una imagen con el logo y colores de marca',
    });
  }
  
  if (config.globalKeywords.length < 5) {
    recommendations.push({
      title: 'Añadir más keywords',
      description: 'Define al menos 5-10 keywords relevantes para tu negocio.',
      priority: 'medium',
      action: '→ Incluye términos locales como "software Castellón"',
    });
  }
  
  if (config.pages.length < 4) {
    recommendations.push({
      title: 'Crear más páginas SEO',
      description: 'Más páginas indexables = más oportunidades de posicionamiento.',
      priority: 'medium',
      action: '→ Añade páginas de servicios, casos de éxito, blog',
    });
  }
  
  if (!config.socialLinks.linkedin) {
    recommendations.push({
      title: 'Configurar LinkedIn',
      description: 'Mejora la apariencia cuando compartas en LinkedIn.',
      priority: 'low',
      action: '→ Añade la URL de tu página de empresa',
    });
  }
  
  recommendations.push({
    title: 'Crear contenido regular',
    description: 'Publica artículos de blog con keywords objetivo para mejorar el posicionamiento.',
    priority: 'medium',
  });
  
  recommendations.push({
    title: 'Optimizar velocidad de carga',
    description: 'Usa herramientas como PageSpeed Insights para optimizar Core Web Vitals.',
    priority: 'low',
  });
  
  return recommendations;
}
