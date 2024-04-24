interface MealDetailsProps {
  params: { slug: string };
}

export default function MealDetails({ params }: MealDetailsProps) {
  const { slug } = params;
  return (
    <main>
      <h1>{slug}</h1>
    </main>
  );
}
