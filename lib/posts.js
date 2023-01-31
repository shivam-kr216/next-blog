import { readdir, readFile } from 'fs/promises';
import marked from 'marked';
import matter from 'gray-matter';

export async function getPost(slug) {
    // const source = await readFile(`content/posts/${slug}.json`, 'utf-8');
    const source = await readFile(`content/posts/${slug}.md`, 'utf-8');
    const { data, content } = matter(source);
    const body = marked(content);
    // console.log(data);
    // return JSON.parse(data);
    return {
        title: data.title,
        body,
    };
}

export async function getSlugs() {
    const files = await readdir('content/posts');
    return files.filter(file => file.endsWith('.md'))
    .map(file => file.slice(0, -3));
}