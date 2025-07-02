import React from 'react';
import SubjectQuizPageClient from './SubjectQuizPageClient';

export const runtime = 'edge';

export default async function SubjectQuizPage({ 
  params 
}: { 
  params: Promise<{ subjectId: string }> 
}) {
  const resolvedParams = await params;
  return <SubjectQuizPageClient params={resolvedParams} />;
}