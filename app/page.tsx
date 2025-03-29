"use client"

import { Github, Linkedin, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Portfolio() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 150 // Increased particle count
    const colors = ["#00FFFF", "#0088FF", "#0044FF", "#00DDFF", "#00AAFF"]

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      opacity: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.opacity = Math.random() * 0.5 + 0.3
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      }
    }

    function init() {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()

        // Connect particles with lines
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            // Increased connection distance
            ctx.beginPath()
            ctx.strokeStyle = `rgba(0, 200, 255, ${0.15 - distance / 1000})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    init()
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="min-h-screen bg-blue-950 text-gray-100 relative overflow-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-40" />

      {/* Enhanced Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0">
        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Header */}
      <header className="container mx-auto py-6 relative z-10">
        <nav className="flex justify-between items-center backdrop-blur-sm bg-black/20 p-4 rounded-xl">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Nawal Akhlaq
          </h1>
          <div className="hidden md:flex items-center gap-6">
            <Link href="#about" className="hover:text-cyan-400 transition-colors">
              About
            </Link>
            <Link href="#skills" className="hover:text-cyan-400 transition-colors">
              Skills
            </Link>
            <Link href="#experience" className="hover:text-cyan-400 transition-colors">
              Experience
            </Link>
            <Link href="#projects" className="hover:text-cyan-400 transition-colors">
              Projects
            </Link>
            <Link href="#contact">
              <Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10">
                Contact
              </Button>
            </Link>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-fadeIn">
            <h1 className="text-5xl font-bold mb-4">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Nawal Akhlaq
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">Computer Science Student & Full Stack Developer</p>
            <div className="flex gap-4">
              <Link href="https://github.com/Nawal-Akhlaq" target="_blank">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 hover:scale-110 transition-transform"
                >
                  <Github className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="https://www.linkedin.com/in/nawal-akhlaq-2610b7244/" target="_blank">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 hover:scale-110 transition-transform"
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="mailto:nawalakhlaq71@gmail.com">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 hover:scale-110 transition-transform"
                >
                  <Mail className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center animate-float">
            <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-cyan-500 shadow-[0_0_25px_rgba(0,200,255,0.4)]">
              <Image
                src="/images/profile.png"
                alt="Nawal Akhlaq"
                fill
                className="object-cover object-[center_30%]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative z-10">
        <div className="container mx-auto">
          <div className="backdrop-blur-md bg-black/30 rounded-2xl p-10 border border-cyan-500/20 shadow-[0_0_25px_rgba(0,200,255,0.1)]">
            <h2 className="text-3xl font-bold mb-12 text-center">
              About <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Me</span>
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-300 mb-6">
                I'm a Computer Science student at FAST-NUCES with a passion for full-stack development and AI. Currently
                pursuing my BS in Computer Science, I've developed expertise in various programming languages and
                frameworks through academic projects and freelance work.
              </p>
              <p className="text-lg text-gray-300">
                My interests span from web development to data science and generative AI, and I'm constantly exploring
                new technologies to expand my skill set.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="container mx-auto py-20 relative z-10">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Education</span>
        </h2>
        <div className="max-w-3xl mx-auto">
          <Card className="bg-black/40 backdrop-blur-md border-cyan-500/20 hover:border-cyan-500/50 transition-all shadow-[0_0_25px_rgba(0,200,255,0.1)] hover:shadow-[0_0_35px_rgba(0,200,255,0.2)] group">
            <CardHeader>
              <CardTitle className="group-hover:text-cyan-400 transition-colors">BS Computer Science</CardTitle>
              <CardDescription className="text-gray-400">
                National University of Computer and Emerging Sciences (FAST-NUCES)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">Chiniot-Faisalabad Campus, Faisalabad</p>
              <p className="text-gray-400 mt-2">August 2021 - August 2025</p>

              <div className="mt-6">
                <h4 className="font-medium mb-2">Courses of Interest</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition-colors"
                  >
                    Generative AI
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition-colors"
                  >
                    Data Science
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition-colors"
                  >
                    Database Systems
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition-colors"
                  >
                    Object Oriented Programming
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition-colors"
                  >
                    Data Structures and Algorithms
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition-colors"
                  >
                    Web Development
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative z-10">
        <div className="container mx-auto">
          <div className="backdrop-blur-md bg-black/30 rounded-2xl p-10 border border-cyan-500/20 shadow-[0_0_25px_rgba(0,200,255,0.1)]">
            <h2 className="text-3xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Skills</span>
            </h2>

            <Tabs defaultValue="languages" className="max-w-3xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 bg-black/50 border border-cyan-500/20">
                <TabsTrigger
                  value="languages"
                  className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300"
                >
                  Programming Languages
                </TabsTrigger>
                <TabsTrigger
                  value="frameworks"
                  className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300"
                >
                  Frameworks
                </TabsTrigger>
                <TabsTrigger
                  value="tools"
                  className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300"
                >
                  Tools
                </TabsTrigger>
              </TabsList>

              <TabsContent value="languages" className="mt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["JavaScript", "Python", "C++", "C", "C#"].map((lang, index) => (
                    <Card
                      key={lang}
                      className="bg-black/40 backdrop-blur-md border-cyan-500/20 hover:border-cyan-500/50 transition-all hover:shadow-[0_0_15px_rgba(0,200,255,0.2)] hover:-translate-y-1 group"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardContent className="flex flex-col items-center justify-center p-6">
                        <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4 group-hover:bg-cyan-500/30 transition-colors">
                          <span className="text-xl font-bold text-cyan-400">{lang.charAt(0)}</span>
                        </div>
                        <h3 className="font-medium group-hover:text-cyan-400 transition-colors">{lang}</h3>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="frameworks" className="mt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["Node.js", "React.js", "React Native", "Django", ".NET"].map((framework, index) => (
                    <Card
                      key={framework}
                      className="bg-black/40 backdrop-blur-md border-cyan-500/20 hover:border-cyan-500/50 transition-all hover:shadow-[0_0_15px_rgba(0,200,255,0.2)] hover:-translate-y-1 group"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardContent className="flex flex-col items-center justify-center p-6">
                        <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4 group-hover:bg-cyan-500/30 transition-colors">
                          <span className="text-xl font-bold text-cyan-400">{framework.charAt(0)}</span>
                        </div>
                        <h3 className="font-medium group-hover:text-cyan-400 transition-colors">{framework}</h3>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="tools" className="mt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["VS Code", "MySQL", "MongoDB", "Google Colab", "Kaggle", "Anaconda", "GitHub"].map(
                    (tool, index) => (
                      <Card
                        key={tool}
                        className="bg-black/40 backdrop-blur-md border-cyan-500/20 hover:border-cyan-500/50 transition-all hover:shadow-[0_0_15px_rgba(0,200,255,0.2)] hover:-translate-y-1 group"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <CardContent className="flex flex-col items-center justify-center p-6">
                          <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4 group-hover:bg-cyan-500/30 transition-colors">
                            <span className="text-xl font-bold text-cyan-400">{tool.charAt(0)}</span>
                          </div>
                          <h3 className="font-medium group-hover:text-cyan-400 transition-colors">{tool}</h3>
                        </CardContent>
                      </Card>
                    ),
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="container mx-auto py-20 relative z-10">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Experience</span>
        </h2>

        <div className="max-w-3xl mx-auto">
          <Card className="bg-black/40 backdrop-blur-md border-cyan-500/20 hover:border-cyan-500/50 transition-all shadow-[0_0_25px_rgba(0,200,255,0.1)] hover:shadow-[0_0_35px_rgba(0,200,255,0.2)]">
            <CardHeader>
              <CardTitle className="group-hover:text-cyan-400 transition-colors">Freelancing</CardTitle>
              <CardDescription className="text-gray-400">April 2022 - Present</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc list-inside text-gray-300">
                <li className="hover:text-cyan-400 transition-colors">
                  WordPress-based portfolio website for a Dietitian (Saher Fatima)
                </li>
                <li className="hover:text-cyan-400 transition-colors">
                  Elementor-based website for a business in Singapore
                </li>
                <li className="hover:text-cyan-400 transition-colors">
                  C# and Access Database based project "Administration of Hannover"
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative z-10">
        <div className="container mx-auto">
          <div className="backdrop-blur-md bg-black/30 rounded-2xl p-10 border border-cyan-500/20 shadow-[0_0_25px_rgba(0,200,255,0.1)]">
            <h2 className="text-3xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Projects</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: "Roman-Urdu Poetry Generator",
                  tech: "Python, LSTM",
                  description:
                    "A poetry generator that creates poetry from one or more words provided, developed using Python based on an LSTM model.",
                },
                {
                  title: "YouTube Transcriber",
                  tech: "React.js, Whisper.ai",
                  description:
                    "Transcribes YouTube videos to English and generates a summary at the end, developed using Whisper.ai and React.js.",
                },
                {
                  title: "Personalized Scholarship Recommendation System",
                  tech: "MERN Stack, Python",
                  description:
                    "A web application that recommends scholarships based on user profile and preferences. Developed using MERN stack with a Python recommendation engine.",
                },
                {
                  title: "Notes App",
                  tech: "Python, Gradio, BART",
                  description:
                    "A Gradio-based app that helps summarize notes, translate from any language to English, convert text to Word or PDF, and convert YouTube videos to text.",
                },
                {
                  title: "E-commerce Portfolio",
                  tech: "Elementor",
                  description: "TSK Steel PTE.LTD – Effortless Home Services, Right at Your Doorstep!",
                },
                {
                  title: "Weather App",
                  tech: "Node.js",
                  description: "A weather application built with Node.js.",
                  link: "https://nawal-akhlaq.github.io/Weather_Website/",
                },
              ].map((project, index) => (
                <Card
                  key={project.title}
                  className="bg-black/40 backdrop-blur-md border-cyan-500/20 hover:border-cyan-500/50 transition-all hover:shadow-[0_0_25px_rgba(0,200,255,0.3)] hover:-translate-y-1 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <CardTitle className="group-hover:text-cyan-400 transition-colors">{project.title}</CardTitle>
                    <CardDescription className="text-gray-400">{project.tech}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 group-hover:text-gray-200 transition-colors">{project.description}</p>
                    {project.link && (
                      <Link
                        href={project.link}
                        target="_blank"
                        className="text-cyan-400 hover:text-cyan-300 hover:underline mt-2 inline-block"
                      >
                        View Project →
                      </Link>
                    )}
                  </CardContent>
                </Card>
              ))}

              <Card className="bg-black/40 backdrop-blur-md border-cyan-500/20 hover:border-cyan-500/50 transition-all hover:shadow-[0_0_25px_rgba(0,200,255,0.3)] hover:-translate-y-1 group md:col-span-2">
                <CardHeader>
                  <CardTitle className="group-hover:text-cyan-400 transition-colors">Lumi Creative Suite</CardTitle>
                  <CardDescription className="text-gray-400">Tailwind CSS</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                    A creative suite built with Tailwind CSS.
                  </p>
                  <Link
                    href="https://v0-lumicreativesuite.vercel.app/"
                    target="_blank"
                    className="text-cyan-400 hover:text-cyan-300 hover:underline mt-2 inline-block"
                  >
                    View Project →
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto py-20 relative z-10">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Contact Me</span>
        </h2>

        <div className="max-w-3xl mx-auto">
          <Card className="bg-black/40 backdrop-blur-md border-cyan-500/20 hover:border-cyan-500/50 transition-all shadow-[0_0_25px_rgba(0,200,255,0.1)] hover:shadow-[0_0_35px_rgba(0,200,255,0.2)]">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Get In Touch
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 hover:text-cyan-400 transition-colors group">
                      <Mail className="h-5 w-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span>nawalakhlaq71@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-3 group">
                      <Github className="h-5 w-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <Link
                        href="https://github.com/Nawal-Akhlaq"
                        target="_blank"
                        className="hover:text-cyan-400 transition-colors"
                      >
                        github.com/Nawal-Akhlaq
                      </Link>
                    </div>
                    <div className="flex items-center gap-3 group">
                      <Linkedin className="h-5 w-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <Link
                        href="https://www.linkedin.com/in/nawal-akhlaq-2610b7244/"
                        target="_blank"
                        className="hover:text-cyan-400 transition-colors"
                      >
                        linkedin.com/in/nawal-akhlaq-2610b7244
                      </Link>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Send a Message
                  </h3>
                  <form
                    action="https://formspree.io/f/mwplnnvl"
                    method="POST"
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault()
                      const form = e.currentTarget
                      const formData = new FormData(form)

                      fetch("https://formspree.io/f/mwplnnvl", {
                        method: "POST",
                        body: formData,
                        headers: {
                          Accept: "application/json",
                        },
                      })
                        .then((response) => {
                          if (response.ok) {
                            alert("Thank you for your message! I'll get back to you soon.")
                            form.reset()
                          } else {
                            alert("Oops! There was a problem sending your message. Please try again.")
                          }
                        })
                        .catch((error) => {
                          console.error("Error:", error)
                          alert("Oops! There was a problem sending your message. Please try again.")
                        })
                    }}
                  >
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className="w-full p-3 rounded-md bg-black/50 border border-cyan-500/30 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="_replyto"
                        placeholder="Your Email"
                        className="w-full p-3 rounded-md bg-black/50 border border-cyan-500/30 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <textarea
                        name="message"
                        placeholder="Your Message"
                        rows={4}
                        className="w-full p-3 rounded-md bg-black/50 border border-cyan-500/30 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all"
                        required
                      ></textarea>
                    </div>
                    <input type="hidden" name="_subject" value="New message from portfolio website" />
                    <input type="text" name="_gotcha" style={{ display: "none" }} />
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-[0_0_15px_rgba(0,200,255,0.4)] hover:shadow-[0_0_25px_rgba(0,200,255,0.6)] transition-all"
                    >
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cyan-500/20 py-8 relative z-10">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} Nawal Akhlaq. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-4">
            <Link href="https://github.com/Nawal-Akhlaq" target="_blank">
              <Button variant="ghost" size="icon" className="rounded-full hover:text-cyan-400 transition-colors">
                <Github className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="https://www.linkedin.com/in/nawal-akhlaq-2610b7244/" target="_blank">
              <Button variant="ghost" size="icon" className="rounded-full hover:text-cyan-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

