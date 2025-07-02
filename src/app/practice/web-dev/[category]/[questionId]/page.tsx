import React from 'react';
import QuestionPageClient from './QuestionPageClient';

export const runtime = 'edge';

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ category: string; questionId: string }>;
}) {
  const resolvedParams = await params;
  return <QuestionPageClient params={resolvedParams} />;
} 