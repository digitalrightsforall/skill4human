'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

export default function SkillDetail({ skill }: { skill: any }) {
  const [viewMode, setViewMode] = useState<'study' | 'source'>('study');

  const getLayerIcon = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('phi')) return '🏛️';
    if (t.includes('sys')) return '🧩';
    if (t.includes('wor')) return '⚙️';
    if (t.includes('tac')) return '⚡';
    return '💎';
  };

  const getTypeClass = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('phi')) return 'layer-phi';
    if (t.includes('sys')) return 'layer-sys';
    if (t.includes('wor') || t.includes('flow')) return 'layer-wor';
    return 'layer-tac';
  };

  return (
    <div className="container" style={{ paddingBottom: '120px' }}>
      <header style={{ margin: '60px 0 60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <span className="badge" style={{ marginBottom: '24px' }}>Wisdom Unit</span>
            <h2 style={{ fontSize: '3.5rem', fontWeight: '900', lineHeight: '1.2', letterSpacing: '-0.04em', marginBottom: '32px', maxWidth: '800px' }}>{skill.name}</h2>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => setViewMode('study')}
                style={{
                  padding: '10px 24px',
                  borderRadius: '12px',
                  fontWeight: '800',
                  background: viewMode === 'study' ? 'var(--primary)' : 'white',
                  color: viewMode === 'study' ? 'white' : 'var(--muted)',
                  border: '2px solid' + (viewMode === 'study' ? 'var(--primary)' : 'var(--border)'),
                  cursor: 'pointer'
                }}
              >
                研习模式
              </button>
              <button 
                onClick={() => setViewMode('source')}
                style={{
                  padding: '10px 24px',
                  borderRadius: '12px',
                  fontWeight: '800',
                  background: viewMode === 'source' ? 'var(--primary)' : 'white',
                  color: viewMode === 'source' ? 'white' : 'var(--muted)',
                  border: '2px solid' + (viewMode === 'source' ? 'var(--primary)' : 'var(--border)'),
                  cursor: 'pointer'
                }}
              >
                查看源码
              </button>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '8px' }}>智慧评分</div>
            <div style={{ fontSize: '4rem', fontWeight: '900', color: 'var(--primary)', lineHeight: '1' }}>{skill.wisdom.score}</div>
          </div>
        </div>
      </header>

      <main>
        {viewMode === 'study' ? (
          <>
            <section style={{ background: '#fff7ed', borderRadius: '32px', padding: '40px', display: 'flex', gap: '24px', marginBottom: '48px', border: '2px solid #ffedd5' }}>
              <div style={{ fontSize: '3.5rem' }}>💡</div>
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#9a3412', fontWeight: '800', marginBottom: '12px' }}>核心认知增益 (Human Gain)</h3>
                <p style={{ fontSize: '1.4rem', color: '#c2410c', fontWeight: '700', lineHeight: '1.5' }}>{skill.wisdom.human_gain}</p>
              </div>
            </section>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '1.75rem', fontWeight: '900', marginBottom: '20px' }}>🏛️ 智慧塔解构 (The Wisdom Tower)</h3>
              {skill.wisdom.layers.map((layer: any, index: number) => (
                <div key={index} className={`tower-layer ${getTypeClass(layer.type)}`} style={{ padding: '40px' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', flexShrink: 0 }}>
                    {getLayerIcon(layer.type)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <span className="badge" style={{ marginBottom: '12px', opacity: 0.8, fontSize: '0.7rem' }}>{layer.type}</span>
                    <h4 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '16px' }}>{layer.title}</h4>
                    <div style={{ color: 'var(--on-background)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                      {layer.content.split('\n').map((line: string, i: number) => <p key={i} style={{ marginBottom: '12px' }}>{line}</p>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {skill.wisdom.anti_patterns && (
              <div style={{ marginTop: '60px', padding: '40px', background: '#fef2f2', borderRadius: '32px', border: '2px dashed #fecaca' }}>
                <h4 style={{ color: '#b91c1c', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', fontSize: '1.5rem' }}>
                  <AlertTriangle size={28} /> 避坑指南 (Anti-patterns)
                </h4>
                <div style={{ color: '#991b1b', fontSize: '1.2rem', fontStyle: 'italic', lineHeight: '1.6' }}>
                  “{skill.wisdom.anti_patterns}”
                </div>
              </div>
            )}
          </>
        ) : (
          <div style={{ background: 'white', padding: '40px', borderRadius: '32px', border: '1px solid var(--border)', overflowX: 'auto' }}>
            <pre style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: '1.6' }}><code>{JSON.stringify(skill, null, 2)}</code></pre>
          </div>
        )}
      </main>
    </div>
  );
}
