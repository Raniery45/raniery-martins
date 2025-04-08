"use client";

import { Github, ExternalLink, Code2, ChevronDown, Coffee, Globe, Sparkles, Instagram, Twitter, Phone, Mic, Play, Pause } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ThemeToggle } from "@/components/theme-toggle";
import { ParticlesBackground } from "@/components/particles-background";

interface Project {
  title: string;
  description: string;
  image: string;
  images: string[];
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

interface Podcast {
  title: string;
  host: string;
  description: string;
  date: string;
  image: string;
  url: string;
}

const podcasts: Podcast[] = [
  {
    title: "BUSINESS E TECNOLOGIA | RA1Z",
    host: "PROGRAMA SAUDAÇÕES",
    description: "Uma conversa profunda sobre as tendências emergentes no desenvolvimento web, frameworks modernos e o futuro da programação.",
    date: "15 de Março, 2024",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=1000",
    url: "https://www.youtube.com/watch?v=ykMN5I_4qm0&t=873s"
  },
  {
    title: "DEEPSEEK: A NOVA PROMESSA DO MERCADO? | RA1Z - SÉRIE",
    host: "PROGRAMA SAUDAÇÕES",
    description: "Compartilhando minha jornada no mundo do desenvolvimento, desafios superados e dicas para novos desenvolvedores.",
    date: "28 de Fevereiro, 2024",
    image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?auto=format&fit=crop&q=80&w=1000",
    url: "https://www.youtube.com/watch?v=ke9xqmKSVEs&t=1381s"
  },
  {
    title: "A REVOLUÇÃO DA IA: SOLUÇÕES E PROBLEMÁTICAS ",
    host: "SAUDAÇÕES PODCAST",
    description: "Discussão sobre inovação tecnológica, projetos open-source e o impacto da tecnologia na sociedade.",
    date: "10 de Janeiro, 2024",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=1000",
    url: "https://www.youtube.com/watch?v=gMS4qJ86dJA&t=149s"
  }
];

const projects: Project[] = [
  {
    title: "Portal de Notícias da TV BAND E Difusora News ",
    description: "Desenvolvi os portais de notícias da TV BAND Maranhão e da Difusora News, dois dos principais sites de informação do estado, combinando performance técnica e usabilidade. Com arquitetura otimizada para carregamento rápido, design responsivo e integração ágil de conteúdo, ambos os projetos entregam uma experiência moderna aos leitores, aliando robustez tecnológica à demanda dinâmica do jornalismo digital.",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1000",
    tags: ["HTML 5", "CSS", "JavaScript", "Wordpress"],
    githubUrl: "https://github.com/username/ecommerce",
    liveUrl: "https://ecommerce-demo.com",
    images: [
      "/images/portal-band-1.jpg",
      "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1612422380917-0a07c914dc15?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1000"
    ]
  },
  {
    title: "SO1L: Inteligência Artificial Nativa da RA1Z",
    description: "Participei ativamente do desenvolvimento da SO1L, IA proprietária da RA1Z, projetada para oferecer soluções inteligentes e personalizadas em gestão de dados e automação de processos. Minha contribuição incluiu: Modelagem de algoritmos para processamento de linguagem natural (NLP) e análise preditiva. Integração de APIs que conectam a IA a sistemas internos e plataformas de terceiros.Otimização de performance para respostas rápidas e escalabilidade em grandes volumes de dados.Desenvolvida com tecnologias como Python, TensorFlow e Node.js, a SO1L se destaca por sua capacidade de aprendizado contínuo, adaptando-se às necessidades dinâmicas de negócios e entregando insights acionáveis.",

    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=1000",
    tags: ["Python", "Javascript", "Mistral"],
    githubUrl: "https://github.com/username/task-manager",
    liveUrl: "https://task-manager-demo.com",
    images: [
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&q=80&w=1000"
    ]
  },
  {
    title: "App de Gerenciamento Financeiro GSTCOM",
    description: "Desenvolvi o GSTCON, aplicativo de gestão financeira interno da TV BAND Maranhão, criado para otimizar e automatizar processos contábeis e administrativos. A solução oferece:Controle integrado de despesas, receitas e fluxo de caixa em tempo real. Relatórios automatizados com dashboards intuitivos para análise financeira ágil.Segurança de dados e acesso restrito por níveis de permissão. Design responsivo, acessível tanto em desktop quanto mobile.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
    tags: ["Python", "CSS", "Typescript", "MongoDB"],
    githubUrl: "https://github.com/username/ai-content",
    liveUrl: "https://ai-content-demo.com",
    images: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1676320831395-7d57b5e09ba7?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1673187178966-2ed3020ed83b?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1675557009875-6864c6fd8e3d?auto=format&fit=crop&q=80&w=1000"
    ]
  }
];

export default function Home() {
  const [currentImages, setCurrentImages] = useState<{ [key: number]: number }>({});
  const [scrolled, setScrolled] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [playingPodcast, setPlayingPodcast] = useState<string | null>(null);
  const { ref: projectsRef, inView: projectsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { ref: aboutRef, inView: aboutInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { ref: podcastsRef, inView: podcastsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const nextImage = (projectIndex: number) => {
    setCurrentImages(prev => ({
      ...prev,
      [projectIndex]: ((prev[projectIndex] || 0) + 1) % 4
    }));
  };

  const prevImage = (projectIndex: number) => {
    setCurrentImages(prev => ({
      ...prev,
      [projectIndex]: ((prev[projectIndex] || 0) - 1 + 4) % 4
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <ParticlesBackground />
      <ThemeToggle />
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center space-y-6 px-4"
        >
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="mb-6"
          >
            <Sparkles className="w-12 h-12 mx-auto text-primary" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-foreground"
          >
            Conheça{" "}
            <span className="inline-block">
              <span 
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: "linear-gradient(to right, #3B82F6, #8B5CF6, #EC4899)",
                  backgroundSize: "200% auto",
                  animation: "gradient 8s linear infinite"
                }}
              >
                Raniery Martins
              </span>
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
          >
            Criando aplicações web bonitas, performáticas e amigáveis
          </motion.p>
        </motion.div>

        <motion.div
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        >
          <ChevronDown className="w-8 h-8 text-muted-foreground" />
        </motion.div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="relative min-h-screen flex items-center py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 -z-10"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/20" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 opacity-20"
            style={{
              background: "radial-gradient(circle at 70% 30%, var(--primary) 0%, transparent 70%)",
            }}
          />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <div className="space-y-8">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
              >
                Sobre Mim
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-muted-foreground leading-relaxed"
              >
                Desenvolvedor Front-end com 2+ anos de experiência no mercado, atualmente COO do branding de tecnologia RA1Z.org. Formando em Análise e Desenvolvimento de Sistemas, estudo programação desde os 16 anos e hoje me especializo em desenvolvimento web com tecnologias modernas. Minha paixão por criar interfaces interativas e centradas no usuário me impulsiona a entregar soluções escaláveis e de alto impacto.
              </motion.p>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                className="grid grid-cols-2 gap-6"
              >
                <motion.div
                  variants={fadeInUp}
                  className="p-6 rounded-xl bg-card"
                >
                  <Code2 className="w-8 h-8 mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Desenvolvimento Frontend</h3>
                  <p className="text-muted-foreground">
                    Criando interfaces bonitas e responsivas com frameworks modernos
                  </p>
                </motion.div>
                <motion.div
                  variants={fadeInUp}
                  className="p-6 rounded-xl bg-card"
                >
                  <Globe className="w-8 h-8 mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Sistemas Backend</h3>
                  <p className="text-muted-foreground">
                    Construindo Sistemas robustos e arquiteturas escaláveis
                  </p>
                </motion.div>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 p-1"
            >
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>
              <motion.div className="absolute bottom-8 right-8 z-10 bg-primary/20 rounded-full p-3 backdrop-blur-sm">
                <Coffee className="w-8 h-8 text-primary" />
              </motion.div>
              <motion.img
                src="/profile.jpg"
                alt="Profile"
                className="rounded-full object-cover w-full h-full"
                initial={{ scale: 1.2 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-6xl font-bold text-center py-24 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/70 to-primary"
        >
          Projetos em Destaque
        </motion.h2>
        
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            className="min-h-screen relative flex items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Background gradient */}
            <motion.div
              className="absolute inset-0 -z-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5" />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 opacity-20"
                style={{
                  background: "radial-gradient(circle at center, var(--primary) 0%, transparent 70%)",
                }}
              />
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 w-full">
              <div className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-16 items-center`}>
                <motion.div
                  className="w-full lg:w-1/2 space-y-8"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div>
                    <motion.h3
                      className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
                    >
                      {project.title}
                    </motion.h3>
                    <motion.p
                      className="text-xl text-muted-foreground leading-relaxed"
                    >
                      {project.description}
                    </motion.p>
                  </div>

                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    className="flex flex-wrap gap-3"
                  >
                    {project.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        variants={fadeInUp}
                        whileHover={{ scale: 1.1, y: -5 }}
                        className="px-6 py-2 bg-secondary/80 backdrop-blur-sm text-secondary-foreground rounded-full text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>

                  <motion.div
                    className="flex gap-6 pt-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="flex items-center gap-3 px-8 py-4 bg-secondary/90 backdrop-blur-sm text-secondary-foreground rounded-full hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <Github className="w-6 h-6" />
                        <span className="font-semibold">Ver Código</span>
                      </motion.a>
                    )}
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <ExternalLink className="w-6 h-6" />
                        <span className="font-semibold">Demo ao Vivo</span>
                      </motion.a>
                    )}
                  </motion.div>
                </motion.div>

                <div className="w-full lg:w-1/2 relative h-[600px] overflow-hidden">
                  <div className="flex h-full gap-2">
                    {project.images.map((image, imgIndex) => (
                      <motion.div
                        key={imgIndex}
                        className="flex-1 relative overflow-hidden"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: imgIndex * 0.1 }}
                        whileHover={{ flex: 2 }}
                      >
                        <motion.img
                          src={image}
                          alt={`${project.title} preview ${imgIndex + 1}`}
                          className="absolute inset-0 w-full h-full object-cover"
                          initial={{ scale: 1.2 }}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Podcasts Section */}
      <section ref={podcastsRef} className="relative py-24 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 -z-10"
        >
          <div className="absolute inset-0 bg-muted" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 opacity-20"
            style={{
              background: "radial-gradient(circle at 30% 70%, var(--primary) 0%, transparent 70%)",
            }}
          />
        </motion.div>
        
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold mb-4 inline-flex items-center gap-3"
            >
              <Mic className="w-8 h-8" />
              Participações em Podcasts
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Confira algumas das minhas participações em podcasts onde compartilho conhecimento e experiências
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {podcasts.map((podcast) => (
              <motion.div
                key={podcast.title}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48">
                  <motion.img
                    src={podcast.image}
                    alt={podcast.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{podcast.title}</h3>
                      <p className="text-sm text-muted-foreground">{podcast.host}</p>
                    </div>
                    <motion.button
                      onClick={() => setPlayingPodcast(playingPodcast === podcast.url ? null : podcast.url)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                    >
                      {playingPodcast === podcast.url ? (
                        <Pause className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6" />
                      )}
                    </motion.button>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{podcast.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{podcast.date}</span>
                    <motion.a
                      href={podcast.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm font-medium"
                      whileHover={{ x: 5 }}
                    >
                      Ouvir episódio completo
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-24 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 -z-10"
        >
          <div className="absolute inset-0 bg-muted" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 opacity-20"
            style={{
              background: "radial-gradient(circle at 30% 70%, var(--primary) 0%, transparent 70%)",
            }}
          />
        </motion.div>
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold mb-8"
            >
              Vamos Trabalhar Juntos
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
            >
              Estou sempre interessado em ouvir sobre novos projetos e oportunidades.
              Vamos criar algo incrível juntos.
            </motion.p>
            <motion.a
              href="mailto:your.email@example.com"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-medium hover:opacity-90 transition-all hover:scale-105"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(var(--primary), 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Code2 className="w-6 h-6" />
              </motion.div>
              Entre em Contato
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Social Links Section */}
      <div className="flex justify-center gap-6 py-12 bg-secondary">
        <motion.a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, y: -5 }}
          className="p-4 rounded-full bg-primary/10 backdrop-blur-sm hover:bg-primary/20 transition-colors"
        >
          <Github className="w-6 h-6" />
          <span className="sr-only">GitHub</span>
        </motion.a>
        <motion.a
          href="https://instagram.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, y: -5 }}
          className="p-4 rounded-full bg-primary/10 backdrop-blur-sm hover:bg-primary/20 transition-colors"
        >
          <Instagram className="w-6 h-6" />
          <span className="sr-only">Instagram</span>
        </motion.a>
        <motion.a
          href="https://twitter.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, y: -5 }}
          className="p-4 rounded-full bg-primary/10 backdrop-blur-sm hover:bg-primary/20 transition-colors"
        >
          <Twitter className="w-6 h-6" />
          <span className="sr-only">Twitter</span>
        </motion.a>
        <motion.a
          href="https://wa.me/yourphonenumber"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, y: -5 }}
          className="p-4 rounded-full bg-primary/10 backdrop-blur-sm hover:bg-primary/20 transition-colors"
        >
          <Phone className="w-6 h-6" />
          <span className="sr-only">WhatsApp</span>
        </motion.a>
      </div>
    </div>
  );
}