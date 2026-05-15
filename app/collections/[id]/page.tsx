import React from 'react';
import collectionsData from '../../../data/collections.json';
import wisdomData from '../../../data/wisdom_db.json';
import CollectionDetailClient from '../../../components/CollectionDetailClient';

export async function generateStaticParams() {
  return collectionsData.map((col) => ({
    id: col.id,
  }));
}

export default async function CollectionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const col = collectionsData.find(c => c.id === id);

  if (!col) {
    return <div className="container p-20 text-center">未找到该智慧集锦。</div>;
  }

  const skills = wisdomData.filter(s => col.skills.includes(s.id));

  return <CollectionDetailClient col={col} skills={skills} />;
}
