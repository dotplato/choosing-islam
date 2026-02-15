import {
  ArrowRight,
  Search,
  Globe,
  MessageCircle,
  Users,
  Book,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import HeroCarousel from "@/components/HeroCarousel";
import {
  getCategories,
  getRecentArticles,
  getHistoryArticles,
} from "@/lib/contentful";

export default async function Home() {
  // Fetch categories and articles from Contentful
  const contentfulCategories = await getCategories();
  const recentArticles = await getRecentArticles(7);
  const historyArticles = await getHistoryArticles(); // Fetch articles marked for History section

  // Map Contentful categories to topics format (fallback to placeholder if empty)
  const topics =
    contentfulCategories.length > 0
      ? contentfulCategories.map((cat) => ({
          title: cat.fields.title,
          description: cat.fields.description || "Explore this category",
          image: cat.fields.catimage?.fields.file.url
            ? `https:${cat.fields.catimage.fields.file.url}`
            : "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=800",
        }))
      : [
          {
            title: "Core Beliefs",
            description:
              "Understanding the fundamental principles and teachings",
            image:
              "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=800",
          },
          {
            title: "Daily Practice",
            description:
              "Practical guidance for incorporating faith into everyday life",
            image:
              "https://images.pexels.com/photos/1001897/pexels-photo-1001897.jpeg?auto=compress&cs=tinysrgb&w=800",
          },
          {
            title: "Community & Service",
            description: "Building connections and serving humanity together",
            image:
              "https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=800",
          },
          {
            title: "Spiritual Development",
            description: "Growing in wisdom, compassion, and understanding",
            image:
              "https://images.pexels.com/photos/1738986/pexels-photo-1738986.jpeg?auto=compress&cs=tinysrgb&w=800",
          },
        ];

  return (
    <>
      <section className="relative text-white py-20 lg:py-28 overflow-hidden">
        <HeroCarousel />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
Islamic Mission Belize – A Legacy of Dawah            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-teal-50 leading-relaxed">
             From its beginnings in 1972 to becoming a fully grounded Sunni community, the Islamic Mission Belize stands as a center of faith, education, and outreach dedicated to spreading authentic Islam across Belize.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-white text-teal-700 hover:bg-gray-100"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-teal-700"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* History of Belize Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              History of Belize
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the rich Islamic history and heritage of Belize
            </p>
          </div>

          {historyArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {historyArticles.map((article) => {
                const thumbnailUrl = article.fields.thumbnail?.fields.file.url
                  ? `https:${article.fields.thumbnail.fields.file.url}`
                  : "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=800";

                const categoryName =
                  article.fields.category?.[0]?.fields.title || "General";

                return (
                  <Link
                    key={article.sys.id}
                    href={`/articles/${article.fields.slug}`}
                    className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-teal-500"
                  >
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img
                        src={thumbnailUrl}
                        alt={article.fields.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                          {categoryName}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-2 min-h-[3.5rem]">
                        {article.fields.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                        {article.fields.excerpt}
                      </p>
                      <div className="flex items-center text-teal-600 font-medium text-sm group-hover:gap-2 transition-all">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No history articles available yet. Mark articles with "Show in
                History Section" in Contentful.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Explore Topics
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dive deep into various subjects and find answers to your questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topics.slice(0, 4).map((topic, index) => (
              <Link
                key={index}
                href={`/articles?category=${encodeURIComponent(topic.title)}`}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer block"
              >
                <div className="aspect-[4/3] relative">
                  <img
                    src={topic.image}
                    alt={topic.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{topic.title}</h3>
                  <p className="text-sm text-gray-200 line-clamp-3">
                    {topic.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {topics.length > 4 && (
            <div className="text-center mt-12">
              <Link href="/articles">
                <Button
                  size="lg"
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                  View All Topics
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-teal-600 to-cyan-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Have Questions? We're Here to Help
              </h2>
              <p className="text-xl text-teal-50 mb-8 leading-relaxed">
                Our knowledgeable team is available 24/7 to answer your
                questions and provide guidance. Whether you're new to your
                spiritual journey or seeking deeper understanding, we're here
                for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-teal-700 hover:bg-gray-100"
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Chat With Us
                </Button>
                <Button
                  size="lg"
                  className="bg-white text-teal-700 hover:bg-gray-100"
                >
                  Call: 1-800-123-4569
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                  <Globe className="w-10 h-10 mb-2" />
                  <CardTitle className="text-white">50+ Countries</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-teal-50">Serving communities worldwide</p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                  <Users className="w-10 h-10 mb-2" />
                  <CardTitle className="text-white">100K+ Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-teal-50">Active community members</p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                  <Book className="w-10 h-10 mb-2" />
                  <CardTitle className="text-white">1000+ Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-teal-50">Educational materials</p>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                  <Search className="w-10 h-10 mb-2" />
                  <CardTitle className="text-white">24/7 Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-teal-50">Always here to help</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Articles Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Recent Articles
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our latest insights and knowledge
            </p>
          </div>

          {recentArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentArticles.slice(0, 6).map((article) => {
                const thumbnailUrl = article.fields.thumbnail?.fields.file.url
                  ? `https:${article.fields.thumbnail.fields.file.url}`
                  : "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=800";

                const categoryName =
                  article.fields.category?.[0]?.fields.title || "General";
                const publishDate = new Date(
                  article.fields.publishDate,
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });

                return (
                  <Link
                    key={article.sys.id}
                    href={`/articles/${article.fields.slug}`}
                    className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="aspect-[16/9] relative overflow-hidden">
                      <img
                        src={thumbnailUrl}
                        alt={article.fields.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {categoryName}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-gray-500 mb-2">
                        {publishDate}
                      </p>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                        {article.fields.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-3 mb-4">
                        {article.fields.excerpt}
                      </p>
                      <div className="flex items-center text-teal-600 font-medium group-hover:gap-2 transition-all">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No articles available yet. Check back soon!
              </p>
            </div>
          )}

          {recentArticles.length > 6 && (
            <div className="text-center mt-12">
              <Link href="/articles">
                <Button
                  size="lg"
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                  View All Articles
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of others who have found knowledge, community, and
            spiritual growth through Islamic Dawah Center of Belize.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/about">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
              >
                Learn About Us
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-1 border-white text-teal-700 hover:bg-white/10"
            >
              Browse Resources
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
