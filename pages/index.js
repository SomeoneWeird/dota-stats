import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ul>
          <li><Link href="/players/207736551"><a>Player</a></Link></li>
        </ul>
      </main>
    </div>
  );
}
