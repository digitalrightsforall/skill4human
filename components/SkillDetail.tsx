'use client';

import { useState, useMemo, Fragment } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  AlertTriangle, 
  User, 
  ExternalLink, 
  Folder, 
  Lightbulb, 
  ShieldCheck, 
  Compass, 
  Zap,
  CheckCircle2,
  Code,
  Clock
} from 'lucide-react';

export default function SkillDetail({ skill }: { skill: any }) {
  const currentWisdom = skill.ai_wisdom || skill.wisdom;

  // Enhanced helper to render rich text with bullet support and link processing
  const renderContent = (text: string) => {
    if (!text) return null;
    
    const lines = text.split('\n');
    const patches: string[] = [];
    const normalLines: string[] = [];

    // Separate [Patches] from normal lines
    lines.forEach(line => {
      const trimmed = line.trim();
      // Robust detection: matches "[Tag]", "- [Tag]", "**[Tag]**", etc.
      const isPatch = /^\s*([-*]\s+)?(\*\*)?\[[^\]]+\]/.test(trimmed);
      
      if (isPatch) {
        // Clean all markers (bullets, bolding) for the patch card
        const cleanPatch = trimmed
          .replace(/^[-*]\s+/, '')      // Remove bullet
          .replace(/^\*\*|\*\*$/g, '')  // Remove bolding at edges
          .replace(/^\*\*|:\s*$/, '');  // Remove trailing colon and bolding again if needed
        patches.push(cleanPatch);
      } else if (trimmed) {
        normalLines.push(line);
      }
    });

    // Helper to render text with bold, code, and auto-links
    const renderLine = (line: string, key: any) => {
      if (!line) return null;
      
      const trimmedLine = line.trim();
      
      // Workflow & Flow Detection Logic (Aggressive) - MOVE TO TOP
      const isWorkflowLine = /^\s*\d+/.test(trimmedLine) || trimmedLine.includes('->') || trimmedLine.includes('→') || trimmedLine.includes('=>');

      // 1. Handle Flow Arrows ("->", "→") and Steps ("1.", "2 ", "3Start")
      const segmentRegex = /(\s*->\s*|\s*→\s*|\s*=>\s*|\b\d+[\.、\s]?\s*)/g;
      const parts = trimmedLine.split(segmentRegex);
      
      const rows: React.ReactNode[] = [];
      let currentContent: React.ReactNode[] = [];

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
        const isActuallyAStep = isWorkflowLine && (
          idx === 1 || 
          (idx > 1 && (parts[idx-1] === '' && (parts[idx-2]?.includes('->') || parts[idx-2]?.includes('→') || parts[idx-2]?.includes('=>'))))
        );

        if (stepMatch && isActuallyAStep) {
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
          <span key={`content-${idx}`} style={{ display: 'inline-block', verticalAlign: 'top', color: '#334155', fontWeight: '500', lineHeight: '1.6' }}>
            {mdSegments.map((seg, i) => {
              if (seg.startsWith('**') && seg.endsWith('**')) {
                const inner = seg.slice(2, -2);
                return <strong key={i} style={{ fontWeight: '800', color: '#1e293b' }}>{inner}</strong>;
              }
              if (seg.startsWith('`') && seg.endsWith('`')) {
                return <code key={i} style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', color: '#475569' }}>{seg.slice(1, -1)}</code>;
              }
              return <Fragment key={i}>{seg}</Fragment>;
            })}
          </span>
        );
      });

      if (currentContent.length > 0) {
        rows.push(<div key="final-row" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '4px', flexWrap: 'wrap' }}>{currentContent}</div>);
      }

      const segments = <div className="vertical-workflow-stack" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>{rows}</div>;
      
      if (isWorkflowLine) {
        return (
          <div key={key} className="workflow-step-container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            {segments}
          </div>
        );
      }
      
      return <div key={key} style={{ marginBottom: '12px', lineHeight: '1.6', color: '#334155' }}>{segments}</div>;
    };

    return (
      <div className="content-wrapper">
        {normalLines.length > 0 && (
          <div className="normal-content">
            {normalLines.map((line, i) => renderLine(line, i))}
          </div>
        )}
        
        {patches.length > 0 && (
          <div className="wisdom-patches" style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {patches.map((patch, i) => (
              <div key={i} style={{ 
                padding: '12px 16px',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
                borderLeft: '4px solid #10b981',
                borderRadius: '8px',
                fontSize: '0.9rem',
                position: 'relative',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
              }}>
                <div style={{ 
                  position: 'absolute', 
                  top: '-10px', 
                  right: '12px', 
                  fontSize: '0.7rem', 
                  background: '#10b981', 
                  color: 'white', 
                  padding: '2px 8px', 
                  borderRadius: '10px',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Cognitive Gain
                </div>
                {renderLine(patch, `patch-${i}`)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const typeMap: Record<string, string> = {
    'Philosophy': '核心心法',
    'System': '落地模型',
    'Workflow': '执行动线',
    'Tactic': '实战技巧'
  };

  // Group layers for V2 Flow
  const logicLayers = useMemo(() => 
    currentWisdom.layers.filter((l: any) => 
      ['philosophy', 'system'].includes(l.type.toLowerCase())
    ), [currentWisdom]);

  const executionLayers = useMemo(() => 
    currentWisdom.layers.filter((l: any) => 
      ['workflow', 'tactic'].includes(l.type.toLowerCase())
    ), [currentWisdom]);

  return (
    <div className="container" style={{ paddingBottom: '120px', maxWidth: '1000px' }}>
      <nav style={{ padding: '32px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/skills" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          color: 'var(--muted)', 
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: '600'
        }}>
          <ArrowLeft size={18} /> 返回图书馆
        </Link>
      </nav>

      {/* Header Section */}
      <header style={{ marginBottom: '64px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '40px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 500px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <span className="badge">Wisdom Unit</span>
              <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Score: {skill.wisdom.score}
              </span>
            </div>
            <h1 style={{ 
              fontSize: '3.5rem', 
              fontWeight: '950', 
              lineHeight: '1.1', 
              letterSpacing: '-0.05em', 
              marginBottom: '24px',
              color: '#0f172a'
            }}>
              {skill.name}
            </h1>
            
            <div style={{ display: 'flex', gap: '24px', color: 'var(--muted)', fontSize: '0.9rem', fontWeight: '600', marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={16} />
                <span>{skill.author}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Folder size={16} />
                <span>{skill.category}</span>
              </div>
              <a 
                href={skill.repo_url && !skill.repo_url.includes('github.com/source') ? skill.repo_url : `https://skills.mp/s/${skill.name}`} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', textDecoration: 'none' }}
              >
                <ExternalLink size={16} />
                <span>原始出处</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
            {/* Phase 1: The Hook (Cognitive Anchor) */}
                <section style={{ 
                  background: 'linear-gradient(135deg, #fff7ed 0%, #fff 100%)', 
                  borderRadius: '40px', 
                  padding: '48px', 
                  border: '1px solid #ffedd5',
                  boxShadow: '0 20px 40px -20px rgba(251, 146, 60, 0.2)'
                }}>
                  <div style={{ display: 'flex', gap: '24px' }}>
                    <div style={{ 
                      width: '64px', 
                      height: '64px', 
                      borderRadius: '20px', 
                      background: 'white', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      boxShadow: '0 8px 16px -4px rgba(251, 146, 60, 0.1)',
                      flexShrink: 0
                    }}>
                      <Lightbulb size={32} color="#f97316" />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '0.85rem', color: '#047857', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
                        核心认知增益 / Cognitive Gain
                      </h3>
                      <div style={{ 
                        fontSize: '1.75rem', 
                        color: '#431407', 
                        fontWeight: '850', 
                        lineHeight: '1.3',
                        letterSpacing: '-0.02em'
                      }}>
                        {renderContent(skill.wisdom.human_gain)}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Phase 0: Timing & Context (Now Visually Parallel) */}
                {skill.wisdom.timing && (
                  <section>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                      <Clock size={24} color="var(--primary)" />
                      <h3 style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '-0.02em' }}>适用时机与语境 (Timing & Context)</h3>
                    </div>
                    <div style={{ 
                      background: '#f8fafc', 
                      borderRadius: '32px', 
                      padding: '40px',
                      border: '1px solid #e2e8f0',
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                      gap: '40px' 
                    }}>
                      <div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: '800', marginBottom: '12px', textTransform: 'uppercase' }}>
                          典型情景 (Context)
                        </p>
                        <div style={{ fontSize: '1.15rem', fontWeight: '700', color: '#1e293b', lineHeight: '1.5' }}>
                          {renderContent(skill.wisdom.timing.context)}
                        </div>
                      </div>
                      <div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: '800', marginBottom: '12px', textTransform: 'uppercase' }}>
                          启动信号 (Trigger)
                        </p>
                        <div style={{ fontSize: '1.15rem', fontWeight: '700', color: '#1e293b', lineHeight: '1.5' }}>
                          {renderContent(skill.wisdom.timing.trigger)}
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* Phase 2: Core Logic (Philosophy & System) */}
                <section>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                    <Compass size={24} color="var(--primary)" />
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '-0.02em' }}>核心认知与机制 (Core Know-How)</h3>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
                    {logicLayers.map((layer: any, idx: number) => (
                      <div 
                        key={idx} 
                        id={layer.type.toLowerCase()}
                        style={{ 
                          background: '#f8fafc', 
                          padding: '32px', 
                          borderRadius: '24px', 
                          border: '1px solid #e2e8f0',
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                      >
                        <div style={{ 
                          fontSize: '0.875rem', 
                          fontWeight: '900', 
                          color: 'var(--primary)', 
                          letterSpacing: '0.1em',
                          marginBottom: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <span style={{ padding: '2px 8px', background: 'rgba(var(--primary-rgb), 0.1)', borderRadius: '6px' }}>
                            {typeMap[layer.type] || layer.type}
                          </span>
                        </div>
                        <h4 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b', marginBottom: '16px' }}>
                          {layer.title}
                        </h4>
                        <div style={{ color: 'var(--muted)', fontSize: '1.1rem', lineHeight: '1.7' }}>
                          {renderContent(layer.content)}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Phase 3: Execution (Workflow & Tactics) */}
                <section>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                    <Zap size={24} color="#10b981" />
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '-0.02em' }}>实战指引与执行</h3>
                  </div>

                  {executionLayers.map((layer: any, index: number) => (
                    <div key={index} id={layer.type.toLowerCase()} style={{ 
                      background: layer.type.toLowerCase() === 'workflow' ? '#f8fafc' : 'white', 
                      padding: '40px', 
                      borderRadius: '32px', 
                      border: '1px solid var(--border)',
                      marginBottom: '24px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', alignItems: 'center' }}>
                        <h4 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b' }}>{layer.title}</h4>
                        <span style={{ 
                          fontSize: '0.75rem', 
                          fontWeight: '900', 
                          color: 'var(--primary)', 
                          background: 'rgba(var(--primary-rgb), 0.1)', 
                          padding: '4px 10px', 
                          borderRadius: '6px',
                          letterSpacing: '0.05em'
                        }}>
                          {typeMap[layer.type] || layer.type}
                        </span>
                      </div>

                      <div style={{ color: 'var(--muted)', fontSize: '1.1rem', lineHeight: '1.7' }}>
                        {renderContent(layer.content)}
                      </div>
                    </div>
                  ))}
                </section>

                {/* Phase 4: Guardrails (Heuristics & Anti-patterns) */}
                {(skill.wisdom.heuristics || skill.wisdom.anti_patterns) && (
                  <section style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
                    gap: '24px',
                    marginTop: '20px'
                  }}>
                    {skill.wisdom.heuristics && (
                      <div style={{ 
                        background: 'linear-gradient(135deg, #fefce8 0%, #fff 100%)', 
                        padding: '40px', 
                        borderRadius: '32px', 
                        border: '1px solid #fef08a'
                      }}>
                        <h4 style={{ color: '#854d0e', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', fontSize: '1.25rem' }}>
                          <ShieldCheck size={24} /> 启发金句 (Heuristics)
                        </h4>
                        <div style={{ color: '#713f12', fontSize: '1.15rem', fontStyle: 'italic', lineHeight: '1.6', fontWeight: '600' }}>
                          {renderContent(skill.wisdom.heuristics)}
                        </div>
                      </div>
                    )}

                    {skill.wisdom.anti_patterns && (
                      <div style={{ 
                        background: 'linear-gradient(135deg, #fef2f2 0%, #fff 100%)', 
                        padding: '40px', 
                        borderRadius: '32px', 
                        border: '1px solid #fecaca'
                      }}>
                        <h4 style={{ color: '#b91c1c', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', fontSize: '1.25rem' }}>
                          <AlertTriangle size={24} /> 避坑指南 (Anti-patterns)
                        </h4>
                        <div style={{ color: '#991b1b', fontSize: '1.15rem', fontStyle: 'italic', lineHeight: '1.6', fontWeight: '600' }}>
                          {renderContent(skill.wisdom.anti_patterns)}
                        </div>
                      </div>
                    )}
                  </section>
                )}


          </div>
      </main>
      <style jsx>{`
        .inline-step-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          background: #0f172a;
          color: white;
          border-radius: 5px;
          font-size: 0.7rem;
          font-weight: 800;
          flex-shrink: 0;
          margin-right: 6px;
        }
        .flow-arrow {
          color: var(--primary);
          font-weight: 900;
          opacity: 0.4;
          margin: 0 8px;
        }
        .segment-text { color: #334155; }
        .badge { background: #f1f5f9; color: #475569; padding: 4px 12px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
      `}</style>
    </div>
  );
}
