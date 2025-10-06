export default async function Score() {
  const data = await fetch(`${process.env.API_URL}/players`);
  const players = await data.json();

  return (
    <ul>
      {players.map((p: { name: string; score: number }) => (
        <li key={p.name}>{p.name}</li>
      ))}
    </ul>
  );
}
