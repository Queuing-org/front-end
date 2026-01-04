type Props = {
  params: Promise<{ slug: string }>;
};

export default async function RoomPage({ params }: Props) {
  const { slug } = await params;

  return <div>room: {slug}</div>;
}
