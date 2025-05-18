// ✅ app/Exam/[examId]/page.tsx
import React from 'react'
import ExamClient from '@/components/exam/ExamClient'
import { Metadata } from 'next'

type Props = {
  params: Promise<{ examId: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  return {
    title: `Exam ${resolvedParams.examId}`,
    description: 'Take your certification exam'
  }
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params
  return <ExamClient params={resolvedParams} />
}
