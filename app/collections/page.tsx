'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import collectionsData from '../../data/collections.json';
import Logo from '../../components/Logo';
import { ArrowLeft, Search, Layers } from 'lucide-react';
import '../globals.css';

function CollectionsContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [search, setSearch] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(collectionsData.map(c => c.category).filter(Boolean)))];

  const filteredCollections = collectionsData.filter(col => {
    const matchesSearch = col.title.toLowerCase().includes(search.toLowerCase()) || 
                         col.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || col.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container" style={{ paddingBottom: '100px' }}>
      <header style={{ margin: '80px 0 60px' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '900', letterSpacing: '-0.04em' }}>探索智慧集锦 (Collections)</h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--muted)', marginTop: '16px', maxWidth: '800px' }}>
          通过跨领域的深度整合，我们将原子技能组合成针对特定场景的实战剧本。
        </p>
      </header>

      <section>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '40px', overflowX: 'auto', paddingBottom: '8px' }}>
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '10px 20px',
                borderRadius: '99px',
                border: '2px solid var(--border)',
                background: selectedCategory === cat ? 'var(--primary)' : 'white',
                color: selectedCategory === cat ? 'white' : 'var(--muted)',
                fontWeight: '700',
                cursor: 'pointer',
                transition: '0.3s',
                whiteSpace: 'nowrap'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="home-search-entry" style={{ margin: '0 0 60px 0', maxWidth: '100%' }}>
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            className="home-search-input" 
            placeholder="搜索集锦标题或描述..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="wisdom-grid">
          {filteredCollections.map(col => (
            <Link key={col.id} href={`/collections/${col.id}`} className="card-link">
              <div className="wisdom-card collection-card">
                <div className="card-accent" />
                <div className="card-content">
                  <div className="card-meta">
                    <span className="category-tag">{col.category || '智库'}</span>
                    <span className="skill-count">{col.skills.length} 项技能</span>
                  </div>
                  <h3 className="card-title">{col.title}</h3>
                  <p className="card-text">{col.description.slice(0, 100)}...</p>
                  <div className="card-footer">
                    <span>开始研习</span>
                    <Layers size={18} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function CollectionsPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center">正在加载智慧地图...</div>}>
      <CollectionsContent />
    </Suspense>
  );
}
