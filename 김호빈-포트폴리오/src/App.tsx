import { ReactNode, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Code2, 
  Palette, 
  Lightbulb, 
  ExternalLink, 
  Mail, 
  ChevronRight,
  Gamepad2,
  Layers,
  Wind,
  X
} from "lucide-react";

const Section = ({ children, id, className = "" }: { children: ReactNode; id?: string; className?: string }) => (
  <section id={id} className={`py-20 px-6 md:px-12 max-w-7xl mx-auto ${className}`}>
    {children}
  </section>
);

const ProjectCard = ({ 
  title, 
  description, 
  role, 
  features, 
  link, 
  status,
  icon: Icon,
  details,
  variant = "accent"
}: { 
  title: string; 
  description: string; 
  role: string; 
  features: string[]; 
  link?: string;
  status?: string;
  icon: any;
  details?: ReactNode;
  variant?: "brand" | "accent";
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isBrand = variant === "brand";
  const bgLight = isBrand ? "bg-brand-50" : "bg-accent-50";
  const textPrimary = isBrand ? "text-brand-600" : "text-accent-600";
  const btnPrimary = isBrand ? "bg-brand-600 hover:bg-brand-700" : "bg-accent-600 hover:bg-accent-700";
  const btnSecondary = isBrand ? "bg-brand-50 text-brand-700 hover:bg-brand-100" : "bg-accent-50 text-accent-700 hover:bg-accent-100";
  const dotColor = isBrand ? "text-brand-500" : "text-accent-500";

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  return (
    <>
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col h-full"
    >
      <div className="flex items-start justify-between mb-6">
        <div className={`p-3 ${bgLight} rounded-2xl ${textPrimary}`}>
          <Icon size={32} />
        </div>
        {status && (
          <span className="px-3 py-1 bg-slate-100 text-slate-500 text-xs font-medium rounded-full">
            {status}
          </span>
        )}
      </div>
      <h3 className="text-2xl mb-2">{title}</h3>
      <p className="text-slate-600 mb-6 leading-relaxed">{description}</p>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 block">역할</span>
          <p className="text-slate-800 font-medium text-sm">{role}</p>
        </div>
      </div>

      <div className="mb-8 mt-auto">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3 block">핵심 특징</span>
        <ul className="space-y-2">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start text-slate-700 text-sm">
              <ChevronRight size={14} className={`${dotColor} mr-2 mt-1 flex-shrink-0`} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        {details && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className={`flex items-center justify-center px-6 py-3 ${btnSecondary} rounded-xl font-bold text-sm transition-colors`}
          >
            상세 기획 내용 보기
          </button>
        )}
        {link && (
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center px-6 py-3 ${btnPrimary} text-white rounded-xl font-medium transition-colors group w-full`}
          >
            프로젝트 보기
            <ExternalLink size={16} className="ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        )}
      </div>
    </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-4">
                  <div className={`p-2 ${bgLight} rounded-xl ${textPrimary}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-bold">{title} 상세 기획</h3>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                <div className="mb-8">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 block">프로젝트 개요</span>
                  <p className="text-slate-600 leading-relaxed">{description}</p>
                </div>
                
                <div className="mb-8">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-4 block">상세 시스템 및 기획 의도</span>
                  <div className="p-6 bg-slate-50 rounded-2xl text-slate-700 leading-relaxed space-y-4 border border-slate-100">
                    {details}
                  </div>
                </div>

              </div>

              <div className="p-6 md:p-8 border-t border-slate-100 bg-slate-50/50 flex justify-end">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className={`px-6 py-3 ${btnPrimary} text-white rounded-xl font-bold text-sm transition-colors`}
                >
                  닫기
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default function App() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-bottom border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-display font-bold text-xl tracking-tighter text-brand-500">HOBIN.K</span>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
            <a href="#about" className="hover:text-accent-500 transition-colors">About</a>
            <a href="#projects" className="hover:text-accent-500 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-accent-500 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Section className="pt-40 pb-32 text-center md:text-left">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-accent-50 text-accent-600 text-xs font-bold rounded-full mb-6 tracking-wide uppercase">
              Game Designer Portfolio
            </span>
            <div className="mb-4 text-slate-400 font-medium text-sm flex items-center">
              <span className="w-8 h-px bg-slate-200 mr-3"></span>
              한성대학교 IT공과대학 (재학 중)
            </div>
            <h1 className="text-5xl md:text-7xl mb-6 leading-[1.1]">
              독창적인 시도로<br />
              <span className="text-brand-500 underline decoration-brand-200 decoration-8 underline-offset-8">새로운 재미</span>를 만드는<br />
              <span className="text-accent-500">김호빈</span>입니다.
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
              독창적이고 과감한 시도를 즐기는 게임 기획자 지망생입니다. 
              프로그래밍과 아트 역량을 바탕으로 기술과 감성이 조화된 게임을 기획합니다.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a href="#projects" className="px-8 py-4 bg-brand-600 text-white rounded-2xl font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-200">
                프로젝트 보기
              </a>
              <a href="#contact" className="px-8 py-4 bg-white text-accent-600 border border-accent-200 rounded-2xl font-bold hover:bg-accent-50 transition-all">
                연락하기
              </a>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden md:block"
          >
            <div className="aspect-square bg-brand-100 rounded-[40px] rotate-6 absolute inset-0 -z-10" />
            <div className="aspect-square bg-white rounded-[40px] shadow-2xl shadow-accent-100 flex items-center justify-center p-12 overflow-hidden">
              <div className="grid grid-cols-2 gap-4 w-full h-full">
                <div className="bg-brand-50 rounded-2xl flex items-center justify-center text-brand-500">
                  <Gamepad2 size={48} />
                </div>
                <div className="bg-accent-50 rounded-2xl flex items-center justify-center text-accent-500">
                  <Layers size={48} />
                </div>
                <div className="bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                  <Code2 size={48} />
                </div>
                <div className="bg-brand-500 rounded-2xl flex items-center justify-center text-white">
                  <Palette size={48} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* About Section */}
      <Section id="about" className="bg-white/50">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4">기획자로서의 강점</h2>
          <p className="text-slate-500">다양한 분야의 이해를 바탕으로 실현 가능한 창의성을 추구합니다.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Code2,
              title: "Technical Insight",
              desc: "프로그래밍 관련 학과 진학을 통해 얻은 지식으로 개발팀과 원활하게 소통하며 실현 가능한 기획을 제안합니다."
            },
            {
              icon: Palette,
              title: "Artistic Vision",
              desc: "픽셀아트 일러스트 작업 경험을 통해 게임의 시각적 완성도와 아트 컨셉에 대한 높은 이해도를 보유하고 있습니다."
            },
            {
              icon: Lightbulb,
              title: "Creative Thinking",
              desc: "편견 없는 사고방식으로 기존의 틀을 깨는 독창적인 아이디어를 도출하고 이를 게임 시스템으로 구체화합니다."
            }
          ].map((strength, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm"
            >
              <div className="w-12 h-12 bg-accent-50 text-accent-600 rounded-xl flex items-center justify-center mb-6">
                <strength.icon size={24} />
              </div>
              <h3 className="text-xl mb-3">{strength.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{strength.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl mb-4">주요 프로젝트</h2>
            <p className="text-slate-500">기획 총괄로서 참여한 대표 프로젝트들입니다.</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <ProjectCard 
            title="DreaMeal"
            icon={Gamepad2}
            variant="brand"
            description="예지몽을 꾸는 소년이 꿈을 섭취하는 맥을 저지하고 마을에 일어날 재난을 막는 2D 액션 디펜스 추리 게임"
            role="기획 총괄"
            details={
              <div className="space-y-4">
                <p>• <strong>낮과 밤의 유기적 순환:</strong> 밤에는 '맥'을 물리치며 예지몽 정보를 수급하고, 낮에는 그 정보를 바탕으로 마을의 재난을 막는 추리를 진행합니다.</p>
                <p>• <strong>밤 시스템:</strong> 액션/디펜스 장르. 꿈 수급과 방해 요소(맥) 제거 사이의 적절한 밸런스 유지가 핵심입니다.</p>
                <p>• <strong>낮 시스템:</strong> 추리/비주얼 노벨 장르. 밤에 얻은 단서로 '누구'에게 '어떤' 일이 생길지 추리합니다. 추리 실패 시 NPC가 사라지며 단서가 누락되는 연쇄적 영향을 줍니다.</p>
                <p>• <strong>메타 구조:</strong> 1회차의 의도적 배드엔딩을 '하나의 큰 예지몽'으로 설정하여, 다음 회차에서 진정한 결말로 나아가는 구조를 설계했습니다.</p>
              </div>
            }
            features={[
              "낮과 밤 시스템의 유기적인 상호작용",
              "액션, 디펜스, 추리 장르의 독창적 결합",
              "다회차 플레이를 고려한 분기별 엔딩 시스템"
            ]}
            link="https://drive.google.com/file/d/14ihUOdClasz9FjRxIzlZZB4IkKdFxy-5/view"
          />
          <ProjectCard 
            title="UN/DERTY"
            icon={Wind}
            variant="accent"
            description="캐릭터를 직접 조작하지 않고 바람을 이용해 간접적으로 조작하는 2D 액션 퍼즐 게임"
            role="기획 총괄"
            status="개발 중단"
            details={
              <div className="space-y-4">
                <p>• <strong>바람 메커니즘:</strong> 마우스 클릭 시 캐릭터로부터 클릭 방향으로 짧은 시간 '바람' 가속 장판이 생성됩니다.</p>
                <p>• <strong>물리 기반 상호작용:</strong> 이 바람은 캐릭터뿐만 아니라 맵의 지형지물과 오브젝트에도 영향을 주어 다양한 변수를 창출합니다.</p>
                <p>• <strong>장르의 융합:</strong> 바람을 활용한 정교한 컨트롤(플랫포머)과 오브젝트를 움직여 길을 찾는 퍼즐 요소가 결합되어 있습니다.</p>
              </div>
            }
            features={[
              "바람의 방향과 세기를 활용한 물리 기반 상호작용",
              "퍼즐과 액션 요소의 조화로운 결합",
              "반복 플레이를 유도하는 레벨 디자인 구조"
            ]}
            link="https://teamodd.pages.dev/project/1764046510806"
          />
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="pb-40">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-accent-200 via-accent-300 to-brand-100 rounded-[40px] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-accent-100/30"
        >
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-brand-200/30 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl mb-8 text-slate-900">함께 새로운 재미를<br />만들어보고 싶으신가요?</h2>
            <p className="text-slate-600 mb-12 text-lg max-w-xl mx-auto">
              독창적인 아이디어와 기술적인 이해를 바탕으로 
              최고의 게임 경험을 기획합니다. 언제든 편하게 연락주세요.
            </p>
            <a 
              href="mailto:hobin.kim.1028@gmail.com"
              className="inline-flex items-center px-8 py-4 bg-brand-600 text-white rounded-2xl font-bold hover:bg-brand-700 transition-all shadow-xl shadow-brand-900/10 hover:-translate-y-1"
            >
              <Mail size={20} className="mr-3" />
              hobin.kim.1028@gmail.com
            </a>
          </div>
        </motion.div>
      </Section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 text-center text-slate-400 text-sm">
        <p>© 2024 김호빈. All rights reserved.</p>
      </footer>
    </div>
  );
}
