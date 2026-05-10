import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import '../globals.css';
import Logo from '../../components/Logo';

export default function About() {
  // 读取 Markdown 文件
  const filePath = path.join(process.cwd(), 'content/about.md');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  // 使用 gray-matter 解析 Frontmatter
  const { data } = matter(fileContent);

  return (
    <div className="about-page-wrapper">
      <main className="about-v5">
        {/* Hero Section */}
        <section className="v5-hero container">
          <div className="v5-hero-main">
            <span className="category-tag" style={{ marginBottom: '24px' }}>{data.tag}</span>
            <h1 className="v5-display-title">
              {data.title.split('，').map((t: string, i: number) => (
                <span key={i}>
                  {i === 1 ? <span className="text-gradient">{t}</span> : t}
                  {i === 0 && <br />}
                </span>
              ))}
            </h1>
            <p className="v5-lead">{data.subtitle}</p>
          </div>
          
          {/* Logo Creed Block */}
          <div className="v5-logo-creed-block">
            <div className="v5-logo-wrap">
              <Logo size={200} />
            </div>
            <div className="v5-creed-grid">
              <div className="v5-creed-header">{data.logo_creed.header}</div>
              <div className="v5-creed-items-container">
                {data.logo_creed.items.map((item: any, i: number) => (
                  <div key={i} className="v5-creed-item">
                    <span className="v5-creed-label">{item.label}</span>
                    <strong className="v5-creed-title">{item.title}</strong>
                    <p className="v5-creed-desc">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Sections from Markdown */}
        <div className="v5-sections-container">
          {data.sections.map((section: any, idx: number) => (
            <section key={idx} className={`v5-content-block ${section.type === 'pipeline' ? 'alt-bg-section' : ''}`}>
              <div className="container">
                <div className="v5-grid-row">
                  <div className="v5-side-label">{section.id}</div>
                  <div className="v5-main-content">
                    <h2 className="v5-h2">{section.title}</h2>
                    
                    {/* 渲染 Pipeline 类型 */}
                    {section.type === 'pipeline' && (
                      <div className="v5-engine-timeline">
                        {section.steps.map((step: any, sIdx: number) => (
                          <div key={sIdx} className="v5-step">
                            <div className="v5-step-head">
                              <span className="v5-step-num">{step.num}</span>
                              <h3 className="v5-step-name">{step.name}</h3>
                            </div>
                            <p className="v5-step-desc">{step.desc}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 渲染 Philosophy 或 隐式 items 类型 */}
                    {(section.type === 'philosophy' || (!section.type && section.items)) && (
                      <div className="v5-phi-grid">
                        {section.items?.map((phi: any, pIdx: number) => (
                          <div key={pIdx} className="v5-phi-item">
                            <h3 className="v5-phi-title">{phi.title}</h3>
                            <p className="v5-phi-desc">{phi.desc}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 渲染纯文本内容 (仅当 content 存在时) */}
                    {!section.type && section.content && (
                      <div className="v5-text-cols">
                        {section.content.split('\n\n').filter(Boolean).map((p: string, pIdx: number) => (
                          <p key={pIdx} className="v5-p">{p}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
