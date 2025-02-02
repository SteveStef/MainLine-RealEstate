"use client";

import { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Youtube, ChevronRight, ExternalLink, ArrowLeft, ArrowRight } from 'lucide-react'
import Header from "@/components/Header.jsx";

export default function MediaPage() {
  const [blogPage, setBlogPage] = useState(0);
  const [videoPage, setVideoPage] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const [videos, setVideos] = useState([]);

  const blogsPerPage = 6;
  const videosPerPage = 6;

  const displayedBlogs = blogs.slice(blogPage * blogsPerPage, (blogPage + 1) * blogsPerPage);
  const displayedVideos = videos.slice(videoPage * videosPerPage, (videoPage + 1) * videosPerPage);

  useEffect(() => {
    async function getMedia() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getMedia`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if(response.ok) {
          const mediaList = JSON.parse(await response.text());
          setBlogs(mediaList.blogs || []);
          setVideos(mediaList.videos || []);
        }
      } catch (error) {
        console.error('An error occurred:', error);
        setBlogs([]);
        setVideos([]);
      }
    }
    getMedia();
  },[]);

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
                  key={blog.VideoId} 
                  className="flex flex-col transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
                >
                  <CardHeader>
                    <CardTitle>{blog.Title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{blog.Description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={()=>window.open(blog.Link, '_blank')}>
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
                  key={video.VideoId} 
                  className="flex flex-col transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{video.Title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="aspect-w-16 aspect-h-9 mb-4">
                      <iframe
                        src={`https://www.youtube.com/embed/${video.VideoId}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full rounded-md"
                      ></iframe>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={()=>window.open(video.Link)}>
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

