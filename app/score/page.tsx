export default async function Score() {
  const data = await fetch(`${process.env.API_URL}/players`);
  const players = await data.json();

  return (
    <ul>
      {players.map((p: { id: string; name: string; score: number }) => (
        <li key={p.id}>
          {p.name} - {p.score}
        </li>
      ))}
    </ul>
  );
}
