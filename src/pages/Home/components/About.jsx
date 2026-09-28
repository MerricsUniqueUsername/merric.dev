import { useState, useEffect, useRef } from 'react'

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const aboutMeRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.6 }
    )

    if (aboutMeRef.current) {
      observer.observe(aboutMeRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={aboutMeRef}
      className="relative bg-[#020204] w-full min-h-screen flex items-center overflow-hidden px-8 md:px-32 py-24"
    >
      <div className="absolute inset-0 opacity-[0.18]">
        <img
          className="w-full h-full object-cover object-[center_75%]"
          src="https://merricpictures.s3.us-east-005.backblazeb2.com/merricdev/VeilNebula.png"
          alt=""
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-b from-[#020204] via-transparent to-[#020204]" />
      <div className="absolute inset-0 bg-linear-to-r from-[#020204] via-transparent to-transparent" />

      <div
        className={`relative max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-16 transform transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div className="flex-1 max-w-lg">
          <h2 className="text-neutral-100 text-4xl font-[Georgia] mb-6">
            About Me
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            I'm Merric Justian, a computer science major from Michigan Technological University.
            I like building web applications and solving challenging problems.
            Other than coding, I enjoy hiking and astrophotography.
          </p>
        </div>

        <div className="shrink-0">
          <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border border-slate-700/50">
            <img
              className="w-full h-full object-cover object-[center_35%]"
              src="https://merricpictures.s3.us-east-005.backblazeb2.com/merricdev/me-BiIpKdeZ.jpg"
              alt="Merric Justian"
            />
          </div>
        </div>
      </div>
    </section>
  )
}