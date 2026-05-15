'use client';

import React, { useState, Fragment } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Zap, Target, GitBranch, ShieldCheck } from 'lucide-react';

export default function CollectionDetailClient({ col, skills }: { col: any, skills: any[] }) {

  // Helper to render text with bold, code, and auto-links
  const renderLine = (line: string, key: any) => {
    if (!line) return null;
    
    const trimmedLine = line.trim();

    // Workflow Detection Logic (v4.8 Protocol)
    const isWorkflowLine = /^\s*\d+/.test(trimmedLine) || trimmedLine.includes('->') || trimmedLine.includes('→') || trimmedLine.includes('=>');
    
    // 1. Handle Blockquotes ("> ")
    const isBlockquote = trimmedLine.startsWith('>');
    const lineContent = isBlockquote ? trimmedLine.replace(/^>\s*/, '') : line;

    // 2. Handle Bullets
    const isBullet = lineContent.trim().startsWith('- ') || lineContent.trim().startsWith('* ') || lineContent.trim().startsWith('• ');
    const content = isBullet ? lineContent.trim().replace(/^[-*•]\s*/, '') : lineContent.trim();

    // Internal helper to apply skill links to a string
    const applyLinks = (text: string) => {
      let parts: (string | JSX.Element)[] = [text];
      skills.forEach(skill => {
        parts = parts.flatMap(part => {
          if (typeof part !== 'string') return part;
          
          const nameVar = skill.name.replace(/-/g, '[\\s-]');
          const idVar = skill.id.replace(/-/g, '[\\s-]').replace(/-vfinal$/i, '');
          
          const patterns = [nameVar, idVar];
          if (skill.id.toLowerCase().includes('okr')) patterns.push('OKR');
          if (skill.id.toLowerCase().includes('retro')) patterns.push('Retro', 'Retrospective');
          if (skill.id.toLowerCase().includes('office')) patterns.push('Office Hours');

          const regex = new RegExp(`\\b(${patterns.join('|')})\\b`, 'gi');
          const bits = part.split(regex);
          
          return bits.map((bit, k) => {
            if (!bit) return bit;
            const isMatch = patterns.some(p => new RegExp(`^${p}$`, 'i').test(bit));
            if (isMatch) {
              return <Link key={k} href={`/skills/${skill.id}`} style={{ color: 'var(--primary)', fontWeight: '700', borderBottom: '1px solid rgba(var(--primary-rgb), 0.3)' }}>{bit}</Link>;
            }
            return bit;
          });
        });
      });
      return parts;
    };

    // 3. Handle Flow Arrows ("->", "→") and Steps ("1.", "2 ", "3Start")
    const renderSegments = (text: string, isWorkflow: boolean = false) => {
      const segmentRegex = /(\s*->\s*|\s*→\s*|\s*=>\s*|\b\d+[\.、\s]?\s*)/g;
      const parts = text.split(segmentRegex);
      
      const rows: JSX.Element[] = [];
      let currentContent: JSX.Element[] = [];

      parts.forEach((part, idx) => {
        if (!part) return;
        const trimmed = part.trim();
        
        // 1. Match arrows
        if (trimmed === '->' || trimmed === '→' || trimmed === '=>' || trimmed === '>>') {
          currentContent.push(<span key={`arrow-${idx}`} className="flow-arrow" style={{ margin: '0 12px', opacity: 0.3 }}>→</span>);
          return;
        } 
        
        // 2. Match numeric steps - ONLY if in Workflow context AND at start or after arrow
        const stepMatch = trimmed.match(/^(\d+)([\.、\s])?$/);
        const isActuallyAStep = isWorkflow && (
          idx === 1 || // Start of string (idx 0 is usually empty if matched at start)
          (idx > 1 && (parts[idx-1] === '' && (parts[idx-2]?.includes('->') || parts[idx-2]?.includes('→') || parts[idx-2]?.includes('=>'))))
        );

        if (stepMatch && isActuallyAStep) {
          // If we already have content, push it as a row
          if (currentContent.length > 0) {
            rows.push(<div key={`row-${idx-1}`} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px', flexWrap: 'wrap' }}>{currentContent}</div>);
            currentContent = [];
          }
          
          currentContent.push(
            <span key={`step-${idx}`} className="inline-step-num" style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px',
              background: '#0f172a',
              color: 'white',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: '800',
              flexShrink: 0,
              marginRight: '12px',
              marginTop: '2px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              {stepMatch[1]}
            </span>
          );
          return;
        }

        // Handle normal markdown
        const mdRegex = /(\*\*[^*]+\*\*|\[[^\]]+\]|`[^`]+`)/g;
        const mdSegments = part.split(mdRegex);

        currentContent.push(
          <div key={`content-${idx}`} style={{ display: 'inline-block', verticalAlign: 'top', color: '#334155', fontWeight: '500', lineHeight: '1.6' }}>
            {mdSegments.map((seg, i) => {
              if (seg.startsWith('**') && seg.endsWith('**')) {
                const inner = seg.slice(2, -2);
                return <strong key={i} style={{ fontWeight: '800', color: '#1e293b' }}>{applyLinks(inner)}</strong>;
              }
              if (seg.startsWith('`') && seg.endsWith('`')) {
                return <code key={i} style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', color: '#475569' }}>{applyLinks(seg.slice(1, -1))}</code>;
              }
              return <Fragment key={i}>{applyLinks(seg)}</Fragment>;
            })}
          </div>
        );
      });

      // Push final row
      if (currentContent.length > 0) {
        rows.push(<div key="final-row" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '4px', flexWrap: 'wrap' }}>{currentContent}</div>);
      }

      return <div className="vertical-workflow-stack" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>{rows}</div>;
    };

    const finalElements = renderSegments(content, isWorkflowLine);

    // Render Logic Based on Type
    if (isBlockquote) {
      return (
        <div key={key} style={{ 
          margin: '20px 0', 
          padding: '16px 24px', 
          background: '#f8fafc', 
          borderLeft: '4px solid var(--primary-container)', 
          borderRadius: '0 12px 12px 0',
          fontStyle: 'italic',
          color: '#475569'
        }}>
          {finalElements}
        </div>
      );
    }

    if (isBullet) {
      return (
        <div key={key} className="wisdom-li">
          <span className="bullet-dot">•</span>
          <span className="bullet-text">{finalElements}</span>
        </div>
      );
    }
    
    
    if (isWorkflowLine) {
      return (
        <div key={key} className="workflow-step-container" style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          alignItems: 'center', 
          gap: '12px',
          padding: '12px 0',
          width: '100%'
        }}>
          {finalElements}
        </div>
      );
    }

    return <div key={key} className="wisdom-p">{finalElements}</div>;
  };

  const renderWisdomContent = (text: string) => {
    if (!text) return null;

    const lines = text.split('\n');
    const patches: string[] = [];
    const normalLines: string[] = [];

    // Separate [Patches] from normal lines (SkillDetail Logic)
    lines.forEach(line => {
      const trimmed = line.trim();
      // Match "[Tag]", "- [Tag]", "**[Tag]**", etc.
      const isPatch = /^\s*([-*•]\s+)?(\*\*)?\[[^\]]+\]/.test(trimmed);
      
      if (isPatch) {
        // Aggressive cleaning: remove bullets, bolding around tags, and trailing colons
        const cleanPatch = trimmed
          .replace(/^[-*•]\s*/, '')
          .replace(/^\*\*(\[[^\]]+\])\*\*/, '$1') // Remove ** around [Tag]
          .replace(/^\*\*|\*\*$/, '')           // Remove remaining edge bolding
          .replace(/[:\s]*$/, '');               // Remove trailing colons/spaces
        patches.push(cleanPatch);
      } else if (trimmed) {
        normalLines.push(line);
      }
    });

    return (
      <div className="wisdom-text-flow">
        {normalLines.length > 0 && (
          <div className="normal-content">
            {normalLines.map((line, i) => renderLine(line, i))}
          </div>
        )}
        
        {patches.length > 0 && (
          <div className="wisdom-patches" style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {patches.map((patch, i) => (
              <div key={i} className="cognitive-patch-card">
                <div className="patch-badge">Cognitive Patch</div>
                <div className="patch-content">
                  {renderLine(patch, `patch-${i}`)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="container" style={{ paddingBottom: '120px' }}>
      <header style={{ margin: '80px 0 60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
        </div>
        
        <h1 className="hero-title" style={{ fontSize: '4rem', fontWeight: '950', marginBottom: '32px', letterSpacing: '-0.04em', lineHeight: '1.1', color: '#0f172a' }}>
          {col.title}
        </h1>
        
        <p className="hero-desc" style={{ fontSize: '1.5rem', color: 'var(--on-background)', maxWidth: '900px', lineHeight: '1.6', fontWeight: '500' }}>
          {col.description}
        </p>
      </header>

      <main>
        {col.v47_data ? (
          <div className="v47-container">
            <section className="v47-section">
              <div className="v47-section-header">
                <Clock className="v47-icon" size={24} />
                <h3>适用时机与语境 / Timing</h3>
              </div>
              <div className="v47-card">
                {renderWisdomContent(col.v47_data.timing)}
              </div>
            </section>

            <div className="v47-grid">
              <section className="v47-section">
                <div className="v47-section-header">
                  <Zap className="v47-icon" size={24} />
                  <h3>核心心法 / Philosophy</h3>
                </div>
                <div className="v47-card glow">
                  {renderWisdomContent(col.v47_data.philosophy)}
                </div>
              </section>

              <section className="v47-section">
                <div className="v47-section-header">
                  <ShieldCheck className="v47-icon" size={24} />
                  <h3>落地模型 / System</h3>
                </div>
                <div className="v47-card">
                  {renderWisdomContent(col.v47_data.system)}
                </div>
              </section>

              <section className="v47-section">
                <div className="v47-section-header">
                  <GitBranch className="v47-icon" size={24} />
                  <h3>执行动线 / Workflow</h3>
                </div>
                <div className="v47-card">
                  {renderWisdomContent(col.v47_data.workflow)}
                </div>
              </section>

              <section className="v47-section">
                <div className="v47-section-header">
                  <Target className="v47-icon" size={24} />
                  <h3>实战技巧 / Tactic</h3>
                </div>
                <div className="v47-card">
                  {renderWisdomContent(col.v47_data.tactic)}
                </div>
              </section>
            </div>
          </div>
        ) : (
          <div className="legacy-fallback" style={{ padding: '60px', textAlign: 'center', background: '#f8fafc', borderRadius: '24px', border: '2px dashed #e2e8f0' }}>
            <p style={{ color: '#64748b', fontSize: '1.1rem' }}>正在为该集锦注入 v4.7 高保真智慧协议...</p>
          </div>
        )}

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
                      <span style={{ fontWeight: '900', color: 'var(--primary)' }}>{skill.ai_wisdom?.score || 98}</span>
                    </div>
                    <h3 className="card-title">{skill.name}</h3>
                    <div className="card-text" style={{ fontSize: '0.9rem', lineHeight: '1.6', height: '160px', overflow: 'hidden', position: 'relative' }}>
                      {(skill.ai_wisdom?.layers?.[0]?.content || '').split('\n').filter((l: string) => l.trim()).slice(0, 3).map((line: string, lIdx: number) => (
                        <div key={lIdx} style={{ marginBottom: '8px' }}>{renderLine(line, `card-line-${lIdx}`)}</div>
                      ))}
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: 'linear-gradient(to bottom, transparent, white)' }} />
                    </div>
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

      <style jsx>{`
        .category-tag { background: #f1f5f9; color: #475569; padding: 4px 12px; border-radius: 6px; font-size: 0.8rem; font-weight: 700; }
        .v47-section { margin-bottom: 48px; }
        .v47-section-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
        .v47-section-header h3 { font-size: 1.5rem; font-weight: 800; color: #0f172a; margin: 0; }
        .v47-icon { color: var(--primary); }
        .v47-card { background: white; border: 1px solid #e2e8f0; border-radius: 24px; padding: 32px; line-height: 1.7; }
        .v47-card.glow { border-color: var(--primary-container); box-shadow: 0 10px 30px rgba(16, 185, 129, 0.05); }
        .v47-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }

        /* New Workflow & Flow Styles */
        .workflow-step-container { 
          display: flex; 
          flex-wrap: wrap; 
          align-items: center; 
          gap: 12px;
          padding: 8px 0;
        }
        .inline-step-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          background: #0f172a;
          color: white;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 800;
          flex-shrink: 0;
          margin-right: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .flow-arrow {
          color: var(--primary);
          font-weight: 900;
          opacity: 0.5;
          margin: 0 12px;
          font-size: 1.2rem;
        }
        .segment-text {
          color: #334155;
          font-weight: 500;
        }
        .wisdom-li {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
        }
        .bullet-dot { color: var(--primary); font-weight: 900; }
        .bullet-text { color: #334155; }
        .wisdom-p { margin-bottom: 16px; color: #334155; }
      `}</style>
    </div>
  );
}
