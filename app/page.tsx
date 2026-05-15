import Link from 'next/link';
import wisdomData from '../data/wisdom_db.json';
import collectionsData from '../data/collections.json';
import Logo from '../components/Logo';
import { Search, Zap, Layers, ArrowRight } from 'lucide-react';
import './globals.css';

export default function Home() {
  const stats = {
    skills: wisdomData.length,
    collections: collectionsData.length,
    updates: '24h'
  };

  // 分类提取 Collection
  const scenarioCollections = [
    collectionsData.find(c => c.id === 'academic-excellence'),
    collectionsData.find(c => c.id === 'action-engine-workflow'),
    collectionsData.find(c => c.id === 'knowledge-to-action-unity')
  ].filter(Boolean);

  const eliteCollections = [
    collectionsData.find(c => c.id === 'engineering-excellence'),
    collectionsData.find(c => c.id === 'decision-making'),
    collectionsData.find(c => c.id === 'copywriting-mastery')
  ].filter(Boolean);

  return (
    <div className="home-container">
      <main>
        {/* Hero Section */}
        <header className="hero-section container">
          <div className="hero-content">
            <h1 className="hero-title">
              从 AI Skill 中学习<br />
              <span className="text-gradient">实现人类的自我增强</span>
            </h1>
            <p className="hero-subtitle">
              当人类 Know-How 被炼化为 Skill，为何不将其视为一个学习和提升自我的机会？<br />
              将 Skill 变成人读得懂的秘籍，赋能人的能力提升。
            </p>

            <div className="home-search-entry">
              <Search className="search-icon" size={20} />
              <input 
                type="text" 
                className="home-search-input" 
                placeholder="搜索你想要提升的能力，如：深度思考、学术写作..." 
              />
              <button className="search-button">立即探索</button>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-value">{stats.skills}+</span>
                <span className="stat-label">原子技能</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-value">{stats.collections}+</span>
                <span className="stat-label">智慧集锦</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-value">{stats.updates}</span>
                <span className="stat-label">实时更新</span>
              </div>
            </div>
          </div>
        </header>

        {/* 第一组：典型场景 */}
        <section className="section-block">
          <div className="container">
            <div className="section-header">
              <div className="section-title-group">
                <h2 className="section-title">典型研习场景</h2>
                <p className="section-desc">针对高频学习与工作痛点，构建端到端的认知闭环</p>
              </div>
              <div className="section-action">
                <Link href="/collections" className="view-all-btn">
                  <span>查看全部集锦</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
            
            <div className="wisdom-grid">
              {scenarioCollections.map((col: any) => (
                <Link key={col.id} href={`/collections/${col.id}`} className="card-link">
                  <div className="wisdom-card">
                    <div className="card-accent" />
                    <div className="card-content">
                      <div className="card-meta">
                        <span className="category-tag">{col.category || '综合场景'}</span>
                        <span className="badge-light">{col.skills?.length || 0} 项技能</span>
                      </div>
                      <h3 className="card-title">{col.title}</h3>
                      <p className="card-text">{col.description.slice(0, 100)}...</p>
                      <div className="card-footer">
                        <span className="action-text">进入研习</span>
                        <ArrowRight size={16} className="arrow-icon" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 第二组：大师框架 */}
        <section className="section-block alt-bg-section">
          <div className="container">
            <div className="section-header">
              <div className="section-title-group">
                <h2 className="section-title">顶级大脑思考框架</h2>
                <p className="section-desc">解构全球顶尖专家与组织的底层逻辑与实战直觉</p>
              </div>
              <div className="section-action">
                <Link href="/collections" className="view-all-btn">
                  <span>查看全部集锦</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
            
            <div className="wisdom-grid">
              {eliteCollections.map((col: any) => (
                <Link key={col.id} href={`/collections/${col.id}`} className="card-link">
                  <div className="wisdom-card">
                    <div className="card-accent" />
                    <div className="card-content">
                      <div className="card-meta">
                        <span className="category-tag">{col.category || '顶级框架'}</span>
                        <span className="badge-light">{col.skills?.length || 0} 项技能</span>
                      </div>
                      <h3 className="card-title">{col.title}</h3>
                      <p className="card-text">{col.description.slice(0, 100)}...</p>
                      <div className="card-footer">
                        <span className="action-text">进入研习</span>
                        <ArrowRight size={16} className="arrow-icon" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
