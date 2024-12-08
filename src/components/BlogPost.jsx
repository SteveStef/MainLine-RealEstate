
import { CalendarIcon, ClockIcon, UserIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function BlogPost({ title, date, author, content, readTime }) {
  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <div className="flex items-center space-x-4 mb-8 text-gray-600">
        <div className="flex items-center">
          <CalendarIcon className="h-5 w-5 mr-2" />
          <span>{date}</span>
        </div>
        <div className="flex items-center">
          <ClockIcon className="h-5 w-5 mr-2" />
          <span>{readTime} read</span>
        </div>
      </div>
      <div className="flex items-center mb-8">
        <Avatar className="h-10 w-10 mr-4">
          <AvatarImage src={author.image} alt={"Peter Stefanatos"} />
          <AvatarFallback>{"Peter Stefanatos"}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">Peter Stefanatos</p>
          <p className="text-sm text-gray-600">Real Estate Agent</p>
        </div>
      </div>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  )
}

