import Link from 'next/link';
import collectionsData from '../../../data/collections.json';
import wisdomData from '../../../data/wisdom_db.json';
import Logo from '../../../components/Logo';
import { ArrowLeft } from 'lucide-react';
import '../../globals.css';

export async function generateStaticParams() {
  return collectionsData.map((col) => ({
    id: col.id,
  }));
}

export default async function CollectionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const col = collectionsData.find(c => c.id === id);

  if (!col) {
    return <div className="container p-20 text-center">未找到该智慧集锦。 <Link href="/collections">返回列表</Link></div>;
  }

  const skills = wisdomData.filter(s => col.skills.includes(s.id));

  return (
    <div className="container" style={{ paddingBottom: '120px' }}>
      <header style={{ margin: '80px 0 60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <Link href="/collections" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            color: 'var(--muted)', 
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: '700'
          }}>
            <ArrowLeft size={16} /> 返回列表
          </Link>
          <span style={{ color: 'var(--border)' }}>/</span>
          <span className="category-tag">{col.category || '智慧集锦'}</span>
        </div>
        
        <h1 style={{ 
          fontSize: '4rem', 
          fontWeight: '950', 
          marginBottom: '32px', 
          letterSpacing: '-0.04em',
          lineHeight: '1.1',
          color: '#0f172a'
        }}>{col.title}</h1>
        
        <p style={{ 
          fontSize: '1.5rem', 
          color: 'var(--on-background)', 
          maxWidth: '900px', 
          lineHeight: '1.6',
          fontWeight: '500'
        }}>{col.description}</p>
      </header>

      <main style={{ marginTop: '60px' }}>
        {/* Playbook Section */}
        {col.playbook && (
          <section className="section-block" style={{ borderTop: 'none', paddingTop: 0 }}>
            <div className="section-header" style={{ marginBottom: '40px' }}>
              <div className="section-title-group">
                <h3 className="section-title" style={{ fontSize: '2rem' }}>研习路径 / Playbook</h3>
                <p className="section-desc">按照解构后的逻辑步骤进行刻意练习，将认知转化为本能。</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {col.playbook.map((step, idx) => (
                <div key={idx} className="wisdom-card" style={{ padding: '40px' }}>
                  <div style={{ display: 'flex', gap: '24px' }}>
                    <div style={{ 
                      width: '48px', 
                      height: '48px', 
                      background: 'var(--primary)', 
                      color: 'white', 
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '900',
                      flexShrink: 0
                    }}>
                      {idx + 1}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '16px', color: '#0f172a' }}>{step.step}</h4>
                      <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: 'var(--on-background)', marginBottom: '20px' }}>{step.action}</p>
                      {step.heuristic && (
                        <div style={{ 
                          padding: '16px 24px', 
                          background: '#f8fafc', 
                          borderRadius: '12px', 
                          borderLeft: '4px solid var(--primary-container)',
                          fontStyle: 'italic',
                          color: '#475569'
                        }}>
                          “{step.heuristic}”
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Detailed Analysis */}
        {col.detailed_analysis && (
          <section className="section-block" style={{ background: '#f1f5f9', margin: '0 -100vw', padding: '100px 100vw' }}>
            <div className="section-header" style={{ borderColor: '#cbd5e1' }}>
              <div className="section-title-group">
                <h3 className="section-title" style={{ fontSize: '2rem' }}>深度解构 / Analysis</h3>
                <p className="section-desc" style={{ color: '#64748b' }}>穿透表象，理解底层逻辑的演进与权衡。</p>
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '48px' }}>
              {col.detailed_analysis.map((item, idx) => (
                <div key={idx}>
                  <h4 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '20px', color: '#1e293b' }}>{item.title}</h4>
                  <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#475569' }}>{item.content}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        <section className="section-block">
          <div className="section-header">
            <div className="section-title-group">
              <h3 className="section-title" style={{ fontSize: '2rem' }}>涉及原子技能 / Skills</h3>
              <p className="section-desc">该集锦提炼自以下 AI Skill，建议点击深入研究其源码逻辑。</p>
            </div>
          </div>

          <div className="wisdom-grid">
            {skills.map(skill => (
              <Link key={skill.id} href={`/skills/${skill.id}`} className="card-link">
                <div className="wisdom-card">
                  <div className="card-accent" />
                  <div className="card-content">
                    <div className="card-meta">
                      <span className="category-tag">{skill.category}</span>
                      <span style={{ fontWeight: '900', color: 'var(--primary)' }}>{skill.wisdom.score}</span>
                    </div>
                    <h3 className="card-title">{skill.name}</h3>
                    <p className="card-text">
                      {skill.wisdom.human_gain.slice(0, 100)}...
                    </p>
                    <div className="card-footer">
                      <span>研习解构逻辑</span>
                      <ArrowLeft size={18} style={{ transform: 'rotate(180deg)' }} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
