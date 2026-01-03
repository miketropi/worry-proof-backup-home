import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeShiki from "@shikijs/rehype";

export async function markdownToHtml(markdown) {
  const html = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeShiki, {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    })
    .use(rehypeStringify)
    .process(markdown);

  return html.toString();
}
