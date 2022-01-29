import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Home: NextPage= () => {
  const { query } = useRouter();
  return (
    <div>
      <Link href="/">
      <h1 className="text-black bg-green-500">Hello: {query.name}</h1>

      </Link>
    </div>
  )
}

export default Home