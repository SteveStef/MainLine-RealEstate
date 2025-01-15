"use client";

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Youtube, ChevronRight, ExternalLink, ArrowLeft, ArrowRight } from 'lucide-react'
import Header from "@/components/Header.jsx";

const blogs = [
  { id: 1, title: "10 Tips for Better Productivity", excerpt: "Boost your productivity with these simple tips and tricks. Learn how to manage your time effectively and increase your output." },
  { id: 2, title: "The Future of AI in Web Development", excerpt: "Explore how AI is shaping the future of web development. Discover the latest trends and technologies in AI-driven web solutions." },
  { id: 3, title: "Mastering React Hooks", excerpt: "Learn how to effectively use React Hooks in your projects. Dive deep into useState, useEffect, and custom hooks to enhance your React skills." },
  { id: 4, title: "Responsive Design Best Practices", excerpt: "Discover the best practices for creating responsive web designs that look great on all devices. Learn about mobile-first approach and fluid layouts." },
  { id: 5, title: "Introduction to GraphQL", excerpt: "Get started with GraphQL, the modern API query language. Learn how to build efficient, powerful APIs for your web applications." },
  { id: 6, title: "Optimizing Web Performance", excerpt: "Explore techniques to optimize your web application's performance. Learn about lazy loading, code splitting, and other performance boosting strategies." },
  { id: 7, title: "Accessibility in Web Design", excerpt: "Learn how to make your websites accessible to all users. Discover ARIA attributes, keyboard navigation, and other essential accessibility features." },
  { id: 8, title: "Serverless Architecture Explained", excerpt: "Dive into the world of serverless architecture. Understand the benefits and use cases of building serverless applications." },
  { id: 9, title: "CSS Grid vs Flexbox", excerpt: "Compare CSS Grid and Flexbox layout systems. Learn when to use each and how to combine them for powerful layouts." },
  { id: 10, title: "Progressive Web Apps (PWAs)", excerpt: "Explore Progressive Web Apps and learn how to build web applications that work offline and feel like native apps." },
  { id: 11, title: "TypeScript for React Developers", excerpt: "Discover how TypeScript can improve your React development experience. Learn about type safety, interfaces, and advanced TypeScript features." },
  { id: 12, title: "Web Security Best Practices", excerpt: "Learn essential web security practices to protect your applications from common vulnerabilities. Explore HTTPS, XSS prevention, and CSRF protection." },
]

const videos = [
  { id: 1, title: "Introduction to Next.js", videoId: "uWXRNbCrNdI" },
  { id: 2, title: "Building a REST API with Node.js", videoId: "fgTGADljAeg" },
  { id: 3, title: "CSS Grid Layout Tutorial", videoId: "68O6eOGAGqA" },
  { id: 4, title: "React Hooks Explained", videoId: "dpw9EHDh2bM" },
  { id: 5, title: "Responsive Web Design", videoId: "srvUrASNj0s" },
  { id: 6, title: "JavaScript ES6 Tutorial", videoId: "nZ1DMMsyVyI" },
  { id: 7, title: "TypeScript Crash Course", videoId: "BCg4U1FzODs" },
  { id: 8, title: "GraphQL Tutorial for Beginners", videoId: "ZQL7tL2S0oQ" },
  { id: 9, title: "Docker for Beginners", videoId: "zJ6WbK9zFpI" },
  { id: 10, title: "Git and GitHub for Beginners", videoId: "RGOj5yH7evk" },
  { id: 11, title: "Python Django Web Framework", videoId: "F5mRW0jo-U4" },
  { id: 12, title: "Vue.js Crash Course", videoId: "qZXt1Aom3Cs" },
]

export default function MediaPage() {
  const [blogPage, setBlogPage] = useState(0);
  const [videoPage, setVideoPage] = useState(0);

  const blogsPerPage = 6;
  const videosPerPage = 6;

  const displayedBlogs = blogs.slice(blogPage * blogsPerPage, (blogPage + 1) * blogsPerPage);
  const displayedVideos = videos.slice(videoPage * videosPerPage, (videoPage + 1) * videosPerPage);

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 mt-16">
        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold flex items-center">
              <BookOpen className="mr-2 h-6 w-6" />
              Latest Blog Posts
            </h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setBlogPage(prev => Math.max(0, prev - 1))}
                disabled={blogPage === 0}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setBlogPage(prev => Math.min(Math.floor((blogs.length - 1) / blogsPerPage), prev + 1))}
                disabled={(blogPage + 1) * blogsPerPage >= blogs.length}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {blogs.length === 0 ? (
            <Card className="p-6 text-center">
              <p className="text-muted-foreground">No blog posts available at the moment.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedBlogs.map((blog) => (
                <Card 
                  key={blog.id} 
                  className="flex flex-col transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
                >
                  <CardHeader>
                    <CardTitle>{blog.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{blog.excerpt}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View More <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </section>
        
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold flex items-center">
              <Youtube className="mr-2 h-6 w-6" />
              Featured Videos
            </h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setVideoPage(prev => Math.max(0, prev - 1))}
                disabled={videoPage === 0}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setVideoPage(prev => Math.min(Math.floor((videos.length - 1) / videosPerPage), prev + 1))}
                disabled={(videoPage + 1) * videosPerPage >= videos.length}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {videos.length === 0 ? (
            <Card className="p-6 text-center">
              <p className="text-muted-foreground">No videos available at the moment.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedVideos.map((video) => (
                <Card 
                  key={video.id} 
                  className="flex flex-col transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{video.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="aspect-w-16 aspect-h-9 mb-4">
                      <iframe
                        src={`https://www.youtube.com/embed/${video.videoId}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full rounded-md"
                      ></iframe>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Learn More <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  )
}

