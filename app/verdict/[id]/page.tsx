import { VerdictView } from "@/components/verdict/VerdictView";

export const metadata = {
  title: "Sparring · Verdict",
};

export default async function VerdictPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <VerdictView id={id} />;
}
