import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getArticleBySlug, getArticles } from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import ShareButton from "./ShareButton";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import PositionedImage from "@/components/PositionedImage";

// Rich text rendering options
const richTextOptions = {
  renderMark: {
    [MARKS.BOLD]: (text: React.ReactNode) => <strong>{text}</strong>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => (
      <p className="mb-6">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (node: any, children: React.ReactNode) => (
      <h1 className="text-3xl font-bold mt-10 mb-6">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: React.ReactNode) => (
      <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node: any, children: React.ReactNode) => (
      <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>
    ),
    [BLOCKS.UL_LIST]: (node: any, children: React.ReactNode) => (
      <ul className="list-disc pl-6 mb-6 spacing-y-2">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node: any, children: React.ReactNode) => (
      <ol className="list-decimal pl-6 mb-6 spacing-y-2">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node: any, children: React.ReactNode) => (
      <li className="pl-1">{children}</li>
    ),
    [BLOCKS.QUOTE]: (node: any, children: React.ReactNode) => (
      <blockquote className="border-l-4 border-teal-500 pl-4 italic my-6 text-gray-700 bg-gray-50 py-2 rounded-r">
        {children}
      </blockquote>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { title, file } = node.data.target.fields;
      if (!file) return null;
      return (
        <div className="my-8 rounded-xl overflow-hidden shadow-lg">
          <img
            src={`https:${file.url}`}
            alt={title || "Article Image"}
            className="w-full h-auto object-cover"
          />
          {title && (
            <p className="text-center text-sm text-gray-500 mt-2">{title}</p>
          )}
        </div>
      );
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
      const entry = node.data?.target;

      // Safety check: ensure entry exists
      if (!entry || !entry.fields) {
        console.warn("Embedded entry missing data:", node);
        return null;
      }

      // Check if this is a video embed entry
      if (entry.sys?.contentType?.sys?.id === "videoEmbed") {
        const { title, youtubeUrl, description } = entry.fields;
        if (!youtubeUrl) {
          console.warn("Video embed missing URL");
          return null;
        }
        return (
          <YouTubeEmbed
            url={youtubeUrl}
            title={title}
            description={description}
          />
        );
      }

      // Check if this is an image entry with positioning
      if (entry.sys?.contentType?.sys?.id === "imageEntry") {
        const { title, image, caption, alignment } = entry.fields;

        // Validate image data exists
        if (
          !image ||
          !image.fields ||
          !image.fields.file ||
          !image.fields.file.url
        ) {
          console.warn("Image entry missing image data:", entry.fields);
          return null;
        }

        // Handle alignment - Contentful might return it as array or string
        let finalAlignment: "left" | "right" | "center" = "center";
        if (alignment) {
          // If it's an array, take the first value
          const alignValue = String(
            Array.isArray(alignment) ? alignment[0] : alignment,
          )
            .toLowerCase()
            .trim();

          // Validate it's a valid alignment
          if (
            alignValue === "left" ||
            alignValue === "right" ||
            alignValue === "center"
          ) {
            finalAlignment = alignValue as "left" | "right" | "center";
          }
        }

        return (
          <PositionedImage
            src={`https:${image.fields.file.url}`}
            alt={title || caption || "Article Image"}
            caption={caption}
            alignment={finalAlignment}
          />
        );
      }

      // Fallback for other embedded entry types
      console.log(
        "Unknown embedded entry type:",
        entry.sys?.contentType?.sys?.id,
      );
      return null;
    },
  },
};

// Generate static params for all articles
export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.fields.slug,
  }));
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;

  const article = await getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Article Not Found
          </h1>
          <Link href="/articles">
            <Button className="bg-teal-600 hover:bg-teal-700">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Articles
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Extract article data
  const articleData = {
    title: article.fields.title,
    excerpt: article.fields.excerpt,
    category: article.fields.category?.[0]?.fields?.title || "Uncategorized",
    image: article.fields.thumbnail?.fields?.file?.url
      ? `https:${article.fields.thumbnail.fields.file.url}`
      : "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=1200",
    date: article.fields.publishDate,
    readTime: "5 min read",
    author: article.fields.author || "Islamic Scholar",
    content: article.fields.bodyContent,
  };

  // Related articles (fetch all and filter by category)
  const allArticles = await getArticles();
  const relatedArticles = allArticles
    .filter(
      (a) =>
        a.sys.id !== article.sys.id &&
        a.fields.category?.[0]?.fields?.title === articleData.category,
    )
    .slice(0, 3)
    .map((a) => ({
      id: a.sys.id,
      slug: a.fields.slug,
      title: a.fields.title,
      excerpt: a.fields.excerpt,
      image: a.fields.thumbnail?.fields?.file?.url
        ? `https:${a.fields.thumbnail.fields.file.url}`
        : "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=800",
      readTime: "5 min read",
    }));

  return (
    <>
      {/* Hero Section with Featured Image */}
      <section className="relative h-[400px] bg-gray-900">
        <img
          src={articleData.image}
          alt={articleData.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <Link href="/articles">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/20 w-fit"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back to Articles
                </Button>
              </Link>
              <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium w-fit">
                {articleData.category}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {articleData.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{articleData.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>
                  {new Date(articleData.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{articleData.readTime}</span>
              </div>
              <ShareButton title={articleData.title} />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Article Body - Rich Text */}
          <div
            className="prose prose-lg max-w-none
              prose-headings:text-gray-900 prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-teal-600 prose-a:no-underline hover:prose-a:underline"
          >
            {documentToReactComponents(articleData.content, richTextOptions)}
          </div>

          {/* Author Bio */}
          <div className="mt-12 p-6 bg-gray-50 rounded-lg border">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {articleData.author.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  About {articleData.author}
                </h3>
                <p className="text-gray-700">
                  A dedicated Islamic scholar and educator committed to sharing
                  knowledge and promoting understanding of Islam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  href={`/articles/${relatedArticle.slug}`}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer group">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={relatedArticle.image}
                        alt={relatedArticle.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {relatedArticle.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{relatedArticle.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
