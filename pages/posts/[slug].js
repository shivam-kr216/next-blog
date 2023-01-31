import Head from 'next/head';
import { getPost, getSlugs } from '../../lib/posts';

export async function getStaticPaths() {
    console.log('getStaticPaths');
    const slugs = await getSlugs();
    return {
        paths: slugs.map(slug => ({
            params: { slug }
        })),
        fallback: false,
    };
}

//this function gets call on server side before render and always returns an object in dev but not in prod
export async function getStaticProps({ params: {slug }}) {
    console.log('getStaticProps');
    const post = await getPost(slug);
    return {
        props: { post },
    };
}

function Firstpost({ post }) {
    // below code gets executed on server side therefore msg gets printed on terminal as well
    // console.log('first post', post);
    return (
        <>
            <Head>
                <title>{`${post.title} - My Blog`}</title>
            </Head>
            <main>
                <h1>{post.title}</h1>
                <article dangerouslySetInnerHTML={{ __html: post.body }} />
            </main>
        </>
    )
}

export default Firstpost;