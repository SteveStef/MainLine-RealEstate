"use client"
import Image from 'next/image';
import {  Building, ChartBar, Star, GraduationCap, Award, MapPin, Mail, Phone, Youtube, Users, TrendingUp, Home, Heart} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

import prof from "../../images/pickle.jpg";
import img from "../../images/home2.jpg";

export default function AboutMe() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="relative h-64 sm:h-80">
            <Image
              src={img}
              alt="Main Line Real Estate Background"
              layout="fill"
              objectFit="cover"
              className="brightness-50"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-white text-center">
                Peter Stefanatos - Real Estate Agent
              </h1>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            {/* Profile Section */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start mb-8">
              <Image
                src={prof}
                alt="Peter Stefanatos"
                width={200}
                height={200}
                className="rounded-full mb-4 sm:mb-0 sm:mr-8"
              />
              <div>
                <h2 className="text-3xl font-semibold mb-2">About Peter</h2>
                <p className="text-gray-600 mb-4">
                  Im a passionate and results-driven real estate agent with deep roots in the Main Line, having lived in Villanova and attended Ithan Elementary, Radnor Middle, and Radnor High School. My expertise in the area, combined with years of experience in digital marketing and content creation, helps me connect with clients and deliver exceptional service.
                </p>
                <p className="text-gray-600 mb-4">
                  Beyond real estate, Ive created engaging content on YouTube and social media, achieving millions of views and showcasing my ability to build meaningful connections online. Recognized for my academic excellence with awards like the Penn State Provost Award, Chancellor's Award, and Dean's List honors, I bring dedication, creativity, and a client-first mindset to everything I do!
                </p>
              </div>
            </div>
            <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Education and Awards</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <GraduationCap className="mr-2 h-5 w-5 text-blue-500" />
                    Penn State B.S. - Business Marketing/Management
                  </li>
                  <li className="flex items-center">
                    <GraduationCap className="mr-2 h-5 w-5 text-blue-500" />
                    Radnor High School Graduate
                  </li>
                  <li className="flex items-center">
                    <Home className="mr-2 h-5 w-5 text-blue-500" />
                    REALTOR® - Licensed in PA
                  </li>
                  <li className="flex items-center">
                    <Award className="mr-2 h-5 w-5 text-yellow-500" />
                    Dean's List: Multiple semesters of honors
                  </li>
                  <li className="flex items-center">
                    <Award className="mr-2 h-5 w-5 text-yellow-500" />
                    Provost Award: For academic excellence
                  </li>
                  <li className="flex items-center">
                    <Award className="mr-2 h-5 w-5 text-yellow-500" />
                    Chancellor's Award: For leadership and achievement
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Professional Achievements</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Star className="mr-2 h-5 w-5 text-yellow-500" />
                    Top-performing agent in the Main Line area
                  </li>
                  <li className="flex items-center">
                    <Users className="mr-2 h-5 w-5 text-purple-500" />
                    Part of a team with 400+ successful transactions
                  </li>
                  <li className="flex items-center">
                    <Youtube className="mr-2 h-5 w-5 text-red-500" />
                    3M+ views on social media content
                  </li>
                  <li className="flex items-center">
                    <ChartBar className="mr-2 h-5 w-5 text-green-500" />
                    Consistent year-over-year growth in sales volume
                  </li>
                  <li className="flex items-center">
                    <Building className="mr-2 h-5 w-5 text-blue-500" />
                    Expertise in both residential and commercial properties
                  </li>
                  <li className="flex items-center">
                    <Heart className="mr-2 h-5 w-5 text-pink-500" />
                    High client satisfaction and referral rate
                  </li>
                </ul>
              </div>
            </div>

            {/* Specialties Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Specialties</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <li className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-red-500" />
                  Community Roots: Attended Radnor schools
                </li>
                <li className="flex items-center">
                  <Youtube className="mr-2 h-5 w-5 text-red-500" />
                  Content Creator: 3M+ views on social media
                </li>
                <li className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
                  Pro Negotiator: Securing the best deals for clients
                </li>
                <li className="flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-pink-500" />
                  Client Focus: Building trust and lasting relationships
                </li>
                <li className="flex items-center">
                  <Home className="mr-2 h-5 w-5 text-blue-500" />
                  Local Expert: Lifelong Main Line resident (Villanova)
                </li>
                <li className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-purple-500" />
                  Proven Success: Part of a Top Main Line team with 400+ transactions
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="mb-4">I'm always eager to help with your real estate needs. Feel free to reach out to me directly or use the contact form.</p>
                  <div className="space-y-2">
                    <p className="flex items-center">
                      <Phone className="mr-2 h-5 w-5 text-gray-600" />
                      (555) 123-4567
                    </p>
                    <p className="flex items-center">
                      <Mail className="mr-2 h-5 w-5 text-gray-600" />
                      peter@mainlineconcierge.com
                    </p>
                  </div>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}





function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [formErrors, setFormErrors] = useState({})
  const [formStatus, setFormStatus] = useState('idle')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = () => {
    const errors = {}
    if (!formData.name.trim()) errors.name = 'Name is required'
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid'
    }
    if (formData.phone && !/^\+?[1-9]\d{1,14}$/.test(formData.phone)) {
      errors.phone = 'Phone number is invalid'
    }
    if (!formData.message.trim()) errors.message = 'Message is required'

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSubmit(e) {
    setFormStatus('submitting');
    e.preventDefault()
    if (!validateForm()) return
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/sendEmail`
      const options = {
        method: "POST",
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify(formData)
      }
      const response = await fetch(url, options)
      if(!response.ok) {
        throw new Error('Failed to send email')
      } else {
        setFormStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      }
    } catch(err) {
      console.error(err)
      setFormStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className={formErrors.name ? 'border-red-500' : ''}
        />
        {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
      </div>
      <div>
        <Input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className={formErrors.email ? 'border-red-500' : ''}
        />
        {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
      </div>
      <div>
        <Input
          type="tel"
          name="phone"
          placeholder="Your Phone"
          value={formData.phone}
          onChange={handleChange}
          className={formErrors.phone ? 'border-red-500' : ''}
        />
        {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
      </div>
      <div>
        <Textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className={formErrors.message ? 'border-red-500' : ''}
        />
        {formErrors.message && <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>}
      </div>
      <Button type="submit" disabled={formStatus === 'submitting'}>
        {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
      </Button>
      {formStatus === 'success' && (
        <p className="text-green-600">Thank you for your message. We'll get back to you soon!</p>
      )}
      {formStatus === 'error' && (
        <p className="text-red-600">There was an error sending your message. Please try again.</p>
      )}
    </form>
  )
}



