import wisdomData from '../../../data/wisdom_db.json';
import SkillDetail from '../../../components/SkillDetail';
import Link from 'next/link';

export async function generateStaticParams() {
  return wisdomData.map((skill) => ({
    id: skill.id,
  }));
}

export default async function SkillDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const skill = wisdomData.find(s => s.id === id);

  if (!skill) {
    return (
      <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>未找到该技能单元</h2>
        <Link href="/skills" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>返回原子技能图书馆</Link>
      </div>
    );
  }

  return <SkillDetail skill={skill} />;
}
