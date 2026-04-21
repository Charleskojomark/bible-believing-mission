import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full glass border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-primary font-bold">B</div>
          <span className="text-xl font-bold tracking-tight">Bible Believing Mission</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#about" className="hover:text-accent transition-colors">About Us</a>
          <a href="#mission" className="hover:text-accent transition-colors">Mission</a>
          <a href="#values" className="hover:text-accent transition-colors">Beliefs</a>
          <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
          <button className="bg-accent text-primary px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform">
            Join Us
          </button>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/20 rounded-full blur-[120px]" />
          </div>

          <div className="relative z-10 max-w-4xl text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance leading-[1.1]">
              Walking in <span className="text-accent underline decoration-4 underline-offset-8">Truth</span>, Built on <span className="text-accent">Faith</span>.
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
              Join a community dedicated to the unchanging Word of God, serving our neighbors, and living out the Gospel in every aspect of life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button className="w-full sm:w-auto bg-accent text-primary px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform shadow-lg shadow-accent/20">
                Begin Your Journey
              </button>
              <button className="w-full sm:w-auto glass border border-white/20 px-8 py-4 rounded-full text-lg font-bold hover:bg-white/5 transition-colors">
                Watch Our Story
              </button>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section id="mission" className="py-24 px-6 bg-primary text-white">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-accent font-bold uppercase tracking-widest text-sm">Our Mission</h2>
              <h3 className="text-4xl md:text-5xl font-bold tracking-tight">To Spread Love, Faith, and the Unchanging Truth.</h3>
              <p className="text-lg text-slate-300 leading-relaxed">
                We believe in a world transformed by the Gospel. Our mission is to equip believers, serve the vulnerable, and create a space where everyone can experience the restorative power of God's grace.
              </p>
              <ul className="space-y-4 pt-4">
                {[
                  "Faith-centered worship experiences",
                  "Community outreach and support",
                  "Deep Biblical teaching and discipleship",
                  "A welcoming home for all seekers"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                      <svg className="w-3 h-3 text-primary fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z" /></svg>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent z-10" />
              <Image
                src="/community_gathering.png"
                alt="Community Gathering"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section id="values" className="py-24 px-6">
          <div className="max-w-6xl mx-auto text-center space-y-16">
            <div className="space-y-4">
              <h2 className="text-accent font-bold tracking-widest uppercase text-sm">Core Beliefs</h2>
              <h3 className="text-4xl md:text-5xl font-bold tracking-tight">What We Stand For</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Biblical Authority", desc: "The Word of God is our ultimate guide and foundation for everything we do." },
                { title: "Sacrificial Service", desc: "Following Christ's example by putting others' needs above our own." },
                { title: "Faithful Community", desc: "Growing together through authentic relationships and shared purpose." },
                { title: "Global Vision", desc: "Reaching beyond our local borders to share the message of hope worldwide." },
                { title: "Spirit-Led Living", desc: "Depending on the Holy Spirit for wisdom, strength, and transformation." },
                { title: "Unwavering Trust", desc: "Holding fast to God's promises in every season of life." }
              ].map((value, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-2 transition-all text-left space-y-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent font-bold text-xl">
                    {i + 1}
                  </div>
                  <h4 className="text-xl font-bold">{value.title}</h4>
                  <p className="text-muted leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-accent z-0" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent)] z-1" />
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 text-primary">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Ready to step into your purpose?</h2>
            <p className="text-xl font-medium opacity-90 max-w-2xl mx-auto">
              There is a place for you here. Whether you are looking for a spiritual home or just want to learn more, we welcome you with open arms.
            </p>
            <div className="pt-8">
              <button className="bg-primary text-white px-10 py-5 rounded-full text-xl font-bold hover:scale-105 transition-transform shadow-2xl">
                Get Connected Today
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-slate-950 text-white py-20 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-primary font-bold">B</div>
              <span className="text-2xl font-bold tracking-tight">Bible Believing Mission</span>
            </div>
            <p className="text-slate-400 max-w-sm">
              Dedicated to following the Word, serving the world, and building a community of faith that lasts.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-accent">Links</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ministries</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Giving</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-accent">Contact</h4>
            <ul className="space-y-4 text-slate-400">
              <li>123 Faith Avenue, City Grace</li>
              <li>contact@bbmission.org</li>
              <li>+1 (555) 000-0000</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-20 mt-20 border-t border-white/5 flex flex-col md:row items-center justify-between gap-6 text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Bible Believing Mission. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
