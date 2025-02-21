'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth`;
    const options = { method: "POST", body: JSON.stringify({password}) };
    try {
      const res = await fetch(url, options);
      if(!res.ok) {
        setIsAuthenticated(false);
        setError('Invalid password');
      } else {
        setIsAuthenticated(true);
        setError('');
      }
    } catch(err) {
      setIsAuthenticated(false);
      setError('Invalid password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                />
              </div>
              {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <div className="space-y-8">
        <EditListingForm password={password} />
        <AddBlogForm password={password} />
        <AddYouTubeVideoForm password={password} />
        <DeleteMediaForm password={password} />
      </div>
    </div>
  );
}

function EditListingForm({ password }) {
  const router = useRouter();

  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [address3, setAddress3] = useState("");
  const [errors, setErrors] = useState({ address1: "", address2: "", address3: "" });

  const validateAddress = (address) => {
    return address.trim().length > 0;
  };

  const handleSubmit = async (address, setAddress, idx) => {
    if (!validateAddress(address)) {
      setErrors(prev => ({ ...prev, [`address${idx + 1}`]: "Address is required" }));
      return;
    }

    try {
      console.log(password);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/updateFeaturedListings?listing=${idx}&address=${address}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${password}`
        }
      });
      if (response.ok) {
        alert('Listing updated successfully!');
        setAddress("");
        setErrors(prev => ({ ...prev, [`address${idx + 1}`]: "" }));
        router.refresh();
      } else {
        alert('Failed to update listing');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred while updating the listing');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Featured Listings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {[1, 2, 3].map((num) => (
          <div key={num} className="space-y-4">
            <label htmlFor={`fl${num}`} className="block text-sm font-medium">
              Featured Listing {num}
            </label>
            <div className="flex space-x-2">
              <Input
                type="text"
                id={`fl${num}`}
                value={[address1, address2, address3][num - 1]}
                onChange={(e) => {
                  [setAddress1, setAddress2, setAddress3][num - 1](e.target.value);
                  setErrors(prev => ({ ...prev, [`address${num}`]: "" }));
                }}
                placeholder="Enter address"
                className="flex-grow"
              />
              <Button 
                onClick={() => handleSubmit([address1, address2, address3][num - 1], [setAddress1, setAddress2, setAddress3][num - 1], num - 1)}
                disabled={![address1, address2, address3][num - 1]}
              >
                Update
              </Button>
            </div>
            {errors[`address${num}`] && <Alert variant="destructive"><AlertDescription>{errors[`address${num}`]}</AlertDescription></Alert>}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function AddBlogForm({ password }) {
  const router = useRouter();
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({ link: "", title: "", description: "" });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { link: "", title: "", description: "" };

    if (!link.trim()) {
      newErrors.link = "Blog link is required";
      isValid = false;
    } else if (!/^https?:\/\/.+/.test(link)) {
      newErrors.link = "Invalid URL format";
      isValid = false;
    }

    if (!title.trim()) {
      newErrors.title = "Blog title is required";
      isValid = false;
    }

    if (!description.trim()) {
      newErrors.description = "Blog description is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/addMedia`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`
        },
        body: JSON.stringify({ isVideo: false, videoId: title, link, title, description }),
      });
      if (response.ok) {
        alert('Blog added successfully!');
        setLink("");
        setTitle("");
        setDescription("");
        router.refresh();
      } else {
        alert('Failed to add blog');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred while adding the blog');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Blog</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="blogLink" className="block text-sm font-medium">
              Blog Link
            </label>
            <Input
              type="url"
              id="blogLink"
              value={link}
              onChange={(e) => {
                setLink(e.target.value);
                setErrors(prev => ({ ...prev, link: "" }));
              }}
              placeholder="Enter blog link"
              required
            />
            {errors.link && <Alert variant="destructive"><AlertDescription>{errors.link}</AlertDescription></Alert>}
          </div>
          <div className="space-y-2">
            <label htmlFor="blogTitle" className="block text-sm font-medium">
              Blog Title
            </label>
            <Input
              type="text"
              id="blogTitle"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setErrors(prev => ({ ...prev, title: "" }));
              }}
              placeholder="Enter blog title"
              required
            />
            {errors.title && <Alert variant="destructive"><AlertDescription>{errors.title}</AlertDescription></Alert>}
          </div>
          <div className="space-y-2">
            <label htmlFor="blogDescription" className="block text-sm font-medium">
              Blog Description
            </label>
            <Textarea
              id="blogDescription"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setErrors(prev => ({ ...prev, description: "" }));
              }}
              placeholder="Enter blog description"
              rows={4}
              required
            />
            {errors.description && <Alert variant="destructive"><AlertDescription>{errors.description}</AlertDescription></Alert>}
          </div>
          <Button type="submit" className="w-full">
            Add Blog
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function AddYouTubeVideoForm({ password }) {
  const router = useRouter();
  const [videoId, setVideoId] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [errors, setErrors] = useState({ videoId: "", title: "", link: "" });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { videoId: "", title: "", link: "" };

    if (!videoId.trim()) {
      newErrors.videoId = "YouTube video ID is required";
      isValid = false;
    }

    if (!title.trim()) {
      newErrors.title = "Video title is required";
      isValid = false;
    }

    if (!link.trim()) {
      newErrors.link = "Video link is required";
      isValid = false;
    } else if (!/^https?:\/\/(www\.)?youtube\.com\/.+/.test(link)) {
      newErrors.link = "Invalid YouTube URL format";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/addMedia`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`
        },
        body: JSON.stringify({ isVideo: true, videoId, title, link, description: ""}),
      });
      if (response.ok) {
        alert('YouTube video added successfully!');
        setVideoId("");
        setTitle("");
        setLink("");
        router.refresh();
      } else {
        alert('Failed to add YouTube video');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred while adding the YouTube video');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add YouTube Video</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="videoId" className="block text-sm font-medium">
              YouTube Video ID
            </label>
            <Input
              type="text"
              id="videoId"
              value={videoId}
              onChange={(e) => {
                setVideoId(e.target.value);
                setErrors(prev => ({ ...prev, videoId: "" }));
              }}
              placeholder="Enter YouTube video ID"
              required
            />
            {errors.videoId && <Alert variant="destructive"><AlertDescription>{errors.videoId}</AlertDescription></Alert>}
          </div>
          <div className="space-y-2">
            <label htmlFor="videoTitle" className="block text-sm font-medium">
              Video Title
            </label>
            <Input
              type="text"
              id="videoTitle"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setErrors(prev => ({ ...prev, title: "" }));
              }}
              placeholder="Enter video title"
              required
            />
            {errors.title && <Alert variant="destructive"><AlertDescription>{errors.title}</AlertDescription></Alert>}
          </div>
          <div className="space-y-2">
            <label htmlFor="videoLink" className="block text-sm font-medium">
              Video Link
            </label>
            <Input
              type="url"
              id="videoLink"
              value={link}
              onChange={(e) => {
                setLink(e.target.value);
                setErrors(prev => ({ ...prev, link: "" }));
              }}
              placeholder="Enter video link"
              required
            />
            {errors.link && <Alert variant="destructive"><AlertDescription>{errors.link}</AlertDescription></Alert>}
          </div>
          <Button type="submit" className="w-full">
            Add YouTube Video
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}



function DeleteMediaForm({ password }) {
  const router = useRouter();
  const [videoId, setVideoId] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [error, setError] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();
    setError("");

    if (!videoId && !blogTitle) {
      setError("Please enter either a Video ID or Blog Title");
      return;
    }

    const isVideo = !!videoId;
    const identifier = isVideo ? videoId : blogTitle;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/deleteMedia`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`
        },
        body: JSON.stringify({ isVideo, videoId: identifier }),
      });
      if (response.ok) {
        alert(`${isVideo ? 'Video' : 'Blog post'} deleted successfully!`);
        setVideoId("");
        setBlogTitle("");
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.message || `Failed to delete ${isVideo ? 'video' : 'blog post'}`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred while deleting the media');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Delete Media</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleDelete} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="videoId" className="block text-sm font-medium">
              YouTube Video ID
            </label>
            <Input
              type="text"
              id="videoId"
              value={videoId}
              onChange={(e) => {
                setVideoId(e.target.value);
                setBlogTitle("");
              }}
              placeholder="Enter YouTube video ID to delete"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="blogTitle" className="block text-sm font-medium">
              Blog Title
            </label>
            <Input
              type="text"
              id="blogTitle"
              value={blogTitle}
              onChange={(e) => {
                setBlogTitle(e.target.value);
                setVideoId("");
              }}
              placeholder="Enter blog title to delete"
            />
          </div>
          {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
          <Button type="submit" className="w-full">
            Delete Media
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

