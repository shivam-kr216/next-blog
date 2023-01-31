import Head from 'next/head';
import Link from 'next/link';
import { getSlugs } from '../lib/posts';

export async function getStaticProps() {
    const posts = await getSlugs();
    return {
        props: {
            posts
        }
    };
}

function Homepage({ posts }) {
    // below code gets executed on server side therefore msg gets printed on terminal as well
    return (
        <>
            <Head>
                <title>My Blog</title>
            </Head>
            <h1>Homepage</h1>
            <ul>
                {
                    posts.map((post, idx) => {
                        return (
                            <li key={idx}>
                                <Link href={`/posts/${post}`}> 
                                    {post}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default Homepage;