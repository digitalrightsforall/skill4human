import wisdomData from '../../../data/wisdom_db.json';
import SkillDetail from '../../../components/SkillDetail';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export async function generateStaticParams() {
  return wisdomData.map((skill) => ({
    id: skill.id,
  }));
}

export default async function SkillDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const skill = (wisdomData as any[]).find(s => s.id === id);

  if (!skill) {
    return (
      <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>未找到该技能单元</h2>
        <Link href="/skills" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>返回原子技能图书馆</Link>
      </div>
    );
  }

  // Load raw source if available
  try {
    const filePath = path.join(process.cwd(), 'data', 'skills', `${id}.md`);
    if (fs.existsSync(filePath)) {
      skill.raw_source = fs.readFileSync(filePath, 'utf8');
    }
  } catch (e) {
    console.error('Failed to load raw source:', e);
  }

  return <SkillDetail skill={skill} />;
}
