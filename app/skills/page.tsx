'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import wisdomData from '../../data/wisdom_db.json';
import Logo from '../../components/Logo';
import { ArrowLeft, Search, Zap } from 'lucide-react';
import '../globals.css';

function SkillsContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [search, setSearch] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(wisdomData.map(d => d.category).filter(Boolean)))];

  const filteredSkills = wisdomData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.wisdom.human_gain.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container" style={{ paddingBottom: '100px' }}>
      <header style={{ margin: '80px 0 60px' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '900', letterSpacing: '-0.04em' }}>研习原子技能库 (Atomic Skills)</h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--muted)', marginTop: '16px', maxWidth: '800px' }}>
          解构顶级 AI 指令背后的底层逻辑，将其转化为人类可习得、可复用的认知单元。
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
            placeholder="搜索技能名称、标签或核心逻辑..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="wisdom-grid">
          {filteredSkills.map(item => (
            <Link key={item.id} href={`/skills/${item.id}`} className="card-link">
              <div className="wisdom-card">
                <div className="card-accent" />
                <div className="card-content">
                  <div className="card-meta">
                    <span className="category-tag">{item.category}</span>
                    <span style={{ fontWeight: '900', color: 'var(--primary)', fontSize: '1.2rem' }}>{item.wisdom.score}</span>
                  </div>
                  <h3 className="card-title">{item.name}</h3>
                  <div style={{ background: 'var(--surface-container-low)', padding: '16px', borderRadius: '16px', fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--muted)', marginBottom: '20px' }}>
                    “{item.wisdom.human_gain.slice(0, 80)}...”
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                    {item.tags?.slice(0, 3).map((t: string) => <span key={t} style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)' }}>#{t}</span>)}
                  </div>
                  <div className="card-footer">
                    <span>开始研习</span>
                    <Zap size={18} />
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

export default function SkillsPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center">正在开启原子图书馆...</div>}>
      <SkillsContent />
    </Suspense>
  );
}
