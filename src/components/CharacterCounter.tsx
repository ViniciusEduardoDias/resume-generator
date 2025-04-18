export default function CharacterCounter({
  count,
  max,
}: {
  count: number;
  max: number;
}) {
  return (
    <div className="text-sm text-right text-gray-500">
      {count}/{max}
    </div>
  );
}
