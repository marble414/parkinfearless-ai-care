"use client";

import { useEffect, useRef, useState } from "react";

const heroProof = [
  ["344", "份有效问卷", "系统需求调研"],
  ["93%+", "认可产品必要性", "用户需求验证"],
  ["5", "次重大版本更新", "工程持续迭代"],
  ["18", "份合作意向", "机构协作网络"],
];

const productScenes = [
  {
    id: "dining",
    order: "01",
    label: "自主进食",
    title: "智能防抖勺",
    copy: "以 90° 弯折餐具与三轴主动补偿稳定盛取、移动和入口动作；历史进食成功率持续参与策略微调，让辅助更贴合个人习惯。",
    tags: ["三轴同步阻尼", "磁吸快拆", "触觉完成提示"],
    accent: "稳",
  },
  {
    id: "dressing",
    order: "02",
    label: "从容穿衣",
    title: "AI 穿衣辅助器",
    copy: "切换高精度控制模式，结合压力反馈动态调整辅助轨迹，面向扣纽扣、穿袖与整理衣物等精细生活任务。",
    tags: ["离线语音唤醒", "高精度模式", "压力感知"],
    accent: "柔",
  },
  {
    id: "relax",
    order: "03",
    label: "肌肉舒缓",
    title: "按摩止颤模块",
    copy: "在握持区域加入低频舒缓单元，面向掌心与前臂肌肉紧张，与机械补偿形成协同辅助，丰富日常照护体验。",
    tags: ["低频舒缓", "握区集成", "多模式反馈"],
    accent: "缓",
  },
  {
    id: "gait",
    order: "04",
    label: "安全步态",
    title: "视觉步态引导",
    copy: "可伸缩激光投射提供稳定视觉参照，面向冻结步态、起步困难等场景探索辅助路径，让同一手柄覆盖更多生活时刻。",
    tags: ["视觉参照", "可伸缩设计", "户外场景"],
    accent: "行",
  },
];

const techTabs = [
  {
    id: "sense",
    index: "A",
    eyebrow: "PERCEPTION LAYER",
    title: "先理解动作意图",
    copy: "HD-sEMG、9 轴 IMU、磁编码器与压力阵列同步工作，建立“人体意图—操作场景—交互状态”三位一体感知。",
    list: ["1000Hz 肌电信号采集", "500Hz 姿态与位置采集", "时间戳对齐与实时降噪"],
    metrics: [["4", "类输入模态"], ["<1ms", "时间对齐目标"]],
  },
  {
    id: "predict",
    index: "B",
    eyebrow: "HTPN MODEL",
    title: "在震颤发生前预判",
    copy: "自研 HTPN 混合时序网络融合 CNN、BiLSTM 与 Attention，在端侧进行类型分类、幅度回归与提前预警。",
    list: ["CNN 并行局部特征提取", "BiLSTM 建模 200ms 时序", "Attention 聚焦关键时间步"],
    metrics: [["94K", "模型参数量"], ["150ms", "规划预判提前量"]],
  },
  {
    id: "act",
    index: "C",
    eyebrow: "CONTROL LAYER",
    title: "把判断转成精准动作",
    copy: "端侧控制器生成反向补偿指令，驱动三维防抖平台与双模执行器，在高动态与高精度任务之间实时切换。",
    list: ["三轴独立控制", "无刷直流力矩电机", "LRA 触觉反馈"],
    metrics: [["8.5ms", "端侧推理延迟"], [">85%", "阶段性抑制水平"]],
  },
  {
    id: "evolve",
    index: "D",
    eyebrow: "CLOUD–EDGE LOOP",
    title: "让系统持续贴合用户",
    copy: "本地用户特征库保留个体差异，匿名化数据用于云端模型迭代，再把改进后的策略安全地反馈到设备与服务平台。",
    list: ["端侧优先计算", "匿名脱敏聚合", "趋势报告与亲友守护"],
    metrics: [["7", "层闭环架构"], ["24/7", "连续服务愿景"]],
  },
];

const tiers = [
  {
    name: "启航系列",
    type: "普通版",
    price: "¥699",
    badge: "普惠首选",
    copy: "聚焦日常核心需求，用更可及的价格提供基础感知与主动防抖能力。",
    specs: ["IMU + 标准 EMG", "基础情境感知", "进食核心模式", "模块化配件接口"],
  },
  {
    name: "睿智系列",
    type: "Pro 版",
    price: "¥1,999–2,999",
    badge: "全功能旗舰",
    copy: "面向更高性能与个性化需求，扩展高密度感知、语音交互与云边协同。",
    specs: ["高密度 EMG 阵列", "IMU + 磁编码器", "语音与多情境感知", "帕益助平台服务"],
  },
  {
    name: "守护系列",
    type: "定制版",
    price: "专业评估",
    badge: "机构 / 特殊需求",
    copy: "在 Pro 能力之上按个体症状和机构场景增配特殊传感器与功能模块。",
    specs: ["个体化参数标定", "特殊传感器增配", "机构级服务支持", "开放式模块扩展"],
  },
];

const pipeline = [
  ["01", "采集", "EMG / IMU / 压力 / 场景"],
  ["02", "清洗", "校准、降噪与同步"],
  ["03", "识别", "多模态特征挖掘"],
  ["04", "预判", "个体化策略生成"],
  ["05", "执行", "三轴反向补偿"],
  ["06", "进化", "云边协同迭代"],
  ["07", "呈现", "健康趋势可视化"],
];

const serviceSteps = [
  ["01", "咨询与初评", "了解震颤程度、生活场景与核心诉求，建立清晰的使用预期。"],
  ["02", "设备选择与试用", "由专业人员匹配产品版本与配件，并在真实动作中体验辅助效果。"],
  ["03", "培训与指导", "完成安全使用、充电维护、配件切换与个体化操作培训。"],
  ["04", "配送与调试", "提供到家配送、组装调试与独立操作确认的一站式服务规划。"],
  ["05", "持续随访", "交付后 7 天、30 天及季度回访，形成“反馈—处理—确认”闭环。"],
  ["06", "维修与保养", "模块化更换降低维护成本；符合条件的返修场景规划提供备用设备。"],
];

const faqs = [
  ["它与普通防抖勺有什么不同？", "普通方案通常在检测到震颤后进行响应；帕不怕以 EMG 与多模态信号捕捉动作意图，探索在震颤发生前完成预判，再由三轴执行平台进行补偿。"],
  ["产品会替代用户的自主动作吗？", "不会。产品定位是辅助稳定，而不是替代动作。设计目标是保留使用者的动作意图与主动参与，让日常任务完成得更稳、更自然。"],
  ["是否只有进食功能？", "不是。同一智能手柄通过标准化磁吸接口连接进食、穿衣、肌肉舒缓与步态引导等模块，未来还将探索洗漱、握笔与取物场景。"],
  ["数据如何处理？", "项目规划采用端侧优先、本地特征库存储与匿名脱敏上传的云边协同方式。平台数据用于趋势展示和服务优化，不替代专业医疗诊断。"],
  ["现在处于什么阶段？", "项目已经完成核心技术研发、工程样机和多轮真实场景试点，并持续推进临床闭环、产品定型、小批量试产与合规验证。"],
];

function SignalCanvas({ warm = false }: { warm?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let frame = 0;
    let width = 0;
    let height = 0;
    const pointer = { x: -999, y: -999 };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from({ length: 54 }, (_, i) => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - .5) * .00018,
      vy: (Math.random() - .5) * .00018,
      r: i % 9 === 0 ? 2.4 : 1,
    }));

    const resize = () => {
      const box = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = box.width; height = box.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      nodes.forEach((node) => {
        if (!reduce) {
          node.x += node.vx; node.y += node.vy;
          if (node.x < 0 || node.x > 1) node.vx *= -1;
          if (node.y < 0 || node.y > 1) node.vy *= -1;
        }
      });
      nodes.forEach((a, i) => {
        const ax = a.x * width; const ay = a.y * height;
        nodes.slice(i + 1).forEach((b) => {
          const bx = b.x * width; const by = b.y * height;
          const d = Math.hypot(ax - bx, ay - by);
          if (d < 132) {
            ctx.strokeStyle = warm ? `rgba(235,108,46,${.14 * (1 - d / 132)})` : `rgba(255,175,110,${.2 * (1 - d / 132)})`;
            ctx.lineWidth = .75; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
          }
        });
        const near = Math.hypot(ax - pointer.x, ay - pointer.y) < 150;
        ctx.fillStyle = warm ? `rgba(225,92,31,${near ? .85 : .34})` : `rgba(255,193,143,${near ? .92 : .44})`;
        ctx.beginPath(); ctx.arc(ax, ay, a.r, 0, Math.PI * 2); ctx.fill();
      });
      if (!reduce) frame = requestAnimationFrame(draw);
    };
    const move = (e: PointerEvent) => {
      const box = canvas.getBoundingClientRect(); pointer.x = e.clientX - box.left; pointer.y = e.clientY - box.top;
    };
    const leave = () => { pointer.x = -999; pointer.y = -999; };
    resize(); draw();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); canvas.removeEventListener("pointermove", move); canvas.removeEventListener("pointerleave", leave); };
  }, [warm]);
  return <canvas className="signal-canvas" ref={canvasRef} aria-hidden="true" />;
}

function PredictionConsole() {
  const [input, setInput] = useState(68);
  const output = Math.max(7, Math.round(input * .15));
  return (
    <div className="prediction-console">
      <div className="console-top"><span><i></i> LIVE COMPENSATION</span><small>交互原理示意</small></div>
      <div className="console-number"><span>补偿后模拟震颤</span><strong>{output}<small>/100</small></strong></div>
      <div className="wave-stage" style={{ "--raw": `${input}%`, "--calm": `${output}%` } as React.CSSProperties}>
        <div><span>输入信号</span><b className="raw-line"></b><em>{input}</em></div>
        <div><span>补偿输出</span><b className="calm-line"></b><em>{output}</em></div>
      </div>
      <label htmlFor="tremor-level"><span>拖动模拟震颤强度</span><span>AI 实时重算</span></label>
      <input id="tremor-level" type="range" min="24" max="100" value={input} onChange={(e) => setInput(Number(e.target.value))} />
      <div className="console-stats"><div><strong>8.5ms</strong><span>端侧推理</span></div><div><strong>150ms</strong><span>规划预判</span></div><div><strong>&gt;85%</strong><span>阶段性抑制</span></div></div>
    </div>
  );
}

function TechnologyLab() {
  const [active, setActive] = useState(1);
  const item = techTabs[active];
  return (
    <div className="tech-lab reveal">
      <div className="tech-tablist" role="tablist" aria-label="技术核心能力">
        {techTabs.map((tab, index) => (
          <button key={tab.id} role="tab" aria-selected={active === index} onClick={() => setActive(index)}>
            <span>{tab.index}</span><strong>{tab.title}</strong><i>↗</i>
          </button>
        ))}
      </div>
      <div className="tech-panel" role="tabpanel">
        <div className="tech-panel-copy">
          <span>{item.eyebrow}</span><h3>{item.title}</h3><p>{item.copy}</p>
          <ul>{item.list.map((point) => <li key={point}>{point}</li>)}</ul>
          <div className="tech-mini-metrics">{item.metrics.map(([value, label]) => <div key={label}><strong>{value}</strong><small>{label}</small></div>)}</div>
        </div>
        <div className={`tech-visual tech-visual-${item.id}`} aria-hidden="true">
          <div className="radar-rings"><i></i><i></i><i></i><strong>{item.index}</strong></div>
          <div className="data-stream"><i></i><i></i><i></i><i></i><i></i></div>
          <span>ACTIVE / {item.id.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
}

function ProductMatrix() {
  const [active, setActive] = useState(0);
  const item = productScenes[active];
  return (
    <div className="matrix-card reveal">
      <div className="matrix-nav" role="tablist" aria-label="生活场景产品矩阵">
        {productScenes.map((scene, index) => (
          <button key={scene.id} role="tab" aria-selected={active === index} onClick={() => setActive(index)}>
            <span>{scene.order}</span><strong>{scene.label}</strong><i></i>
          </button>
        ))}
      </div>
      <div className={`matrix-detail matrix-${item.id}`} role="tabpanel">
        <div className="matrix-symbol" aria-hidden="true"><i></i><b>{item.accent}</b><span></span></div>
        <div className="matrix-copy"><span>{item.order} / {item.label}</span><h3>{item.title}</h3><p>{item.copy}</p><div>{item.tags.map((tag) => <small key={tag}>{tag}</small>)}</div></div>
      </div>
    </div>
  );
}

function VersionSelector() {
  const [active, setActive] = useState(1);
  return (
    <div className="version-selector reveal">
      <div className="version-rail" role="tablist" aria-label="产品版本">
        {tiers.map((tier, index) => <button key={tier.name} role="tab" aria-selected={active === index} onClick={() => setActive(index)}><span>0{index + 1}</span>{tier.name}</button>)}
      </div>
      <div className="version-card" role="tabpanel">
        <div className="version-intro"><span>{tiers[active].badge}</span><small>{tiers[active].type}</small><h3>{tiers[active].name}</h3><strong>{tiers[active].price}</strong><p>{tiers[active].copy}</p></div>
        <div className="version-specs">{tiers[active].specs.map((spec, index) => <div key={spec}><span>0{index + 1}</span><strong>{spec}</strong><i>✓</i></div>)}</div>
      </div>
    </div>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return <div className="faq-list reveal">{faqs.map(([question, answer], index) => <article key={question} className={open === index ? "open" : ""}><button aria-expanded={open === index} onClick={() => setOpen(open === index ? -1 : index)}><span>0{index + 1}</span><strong>{question}</strong><i>+</i></button><div><p>{answer}</p></div></article>)}</div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: .1 });
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true }); update();
    return () => { observer.disconnect(); window.removeEventListener("scroll", update); };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  return (
    <main id="top">
      <div className="scroll-progress" style={{ width: `${scroll}%` }}></div>
      <header className="site-header">
        <div className="site-shell header-inner">
          <a className="brand" href="#top" aria-label="帕不怕首页"><span className="brand-symbol"><i></i></span><span><strong>帕不怕</strong><small>ParkinFearless</small></span></a>
          <nav className={menuOpen ? "main-nav open" : "main-nav"} aria-label="主导航">
            <a href="#product" onClick={closeMenu}>产品系统</a><a href="#technology" onClick={closeMenu}>AI 技术</a><a href="#research" onClick={closeMenu}>验证研究</a><a href="#service" onClick={closeMenu}>服务体系</a><a href="#about" onClick={closeMenu}>关于我们</a>
          </nav>
          <a className="header-cta" href="#cooperate">合作咨询 <span>↗</span></a>
          <button className="menu-button" aria-label="切换导航" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><i></i><i></i></button>
        </div>
      </header>

      <section className="hero">
        <img className="hero-photo" src="./hero-lifestyle-v2.png" alt="长者在明亮居家空间使用帕不怕智能防抖勺" />
        <div className="hero-overlay"></div><SignalCanvas />
        <div className="site-shell hero-layout">
          <div className="hero-copy reveal is-visible">
            <div className="eyebrow"><span>AI × EMG × HUMAN DIGNITY</span><i></i><small>下一代震颤管理辅助系统</small></div>
            <h1>在震颤之前，<br /><em>把生活稳稳接住。</em></h1>
            <p>从肌电前兆到三轴补偿，帕不怕将多模态感知、端侧智能与模块化产品生态融合，让进食、穿衣与更多生活动作重新自然发生。</p>
            <div className="hero-actions"><a className="button-primary" href="#product">探索完整产品系统 <span>→</span></a><a className="button-ghost" href="#technology"><i>▶</i><span>了解 HTPN 模型<small>从感知到执行的 7 层闭环</small></span></a></div>
          </div>
          <div className="hero-console" aria-label="核心性能摘要">
            <div className="hero-orbit"><i></i><i></i><i></i><strong>PF</strong><span>ACTIVE INTELLIGENCE</span></div>
            <div className="hero-chip chip-one"><small>端侧推理</small><strong>8.5<span>ms</span></strong></div>
            <div className="hero-chip chip-two"><small>阶段性震颤抑制</small><strong>85<span>%+</span></strong></div>
            <div className="hero-chip chip-three"><small>模型规模</small><strong>94<span>K</span></strong></div>
          </div>
          <div className="hero-bottom"><span>SCROLL TO DISCOVER</span><i></i><small>项目数据来自《帕不怕商业计划书》阶段性成果</small></div>
        </div>
      </section>

      <section className="proof-band" aria-label="项目进展数据"><div className="site-shell proof-grid">{heroProof.map(([value, label, note]) => <article key={label}><small>{note}</small><strong>{value}</strong><span>{label}</span></article>)}</div></section>

      <section className="manifesto site-shell" id="vision">
        <div className="section-number reveal"><span>01</span><i></i><small>WHY IT MATTERS</small></div>
        <div className="manifesto-title reveal"><span className="section-kicker">从真实生活出发</span><h2>我们解决的不是<br />一把勺子的抖动，<br />而是一个人对<strong>日常的掌控感。</strong></h2></div>
        <div className="manifesto-copy reveal"><p>中国帕金森患者总数超过 500 万。对许多人而言，进食、穿衣这些普通动作意味着尊严、自信，也意味着一个家庭每天投入的照护时间。</p><blockquote>“以科技守护日常尊严，让每一次进餐都成为安心的体验。”</blockquote><span>北京帕护智能科技有限公司 · 核心理念</span></div>
      </section>

      <section className="problem-section">
        <div className="site-shell problem-layout">
          <div className="problem-story reveal"><span>THE GAP</span><h2>昂贵、单一、被动响应。<br />真实需求，远不止如此。</h2><p>国外产品价格与渠道门槛较高，国内主流产品多聚焦单一进食场景。帕不怕从 344 份有效问卷、专科机构访谈与居家观察中重新定义产品：更可及、更主动，也更能持续扩展。</p><div className="insight-line"><i></i><strong>92%</strong><span>患者将“进食时餐具稳定控制”列为首要需求</span></div><div className="insight-line"><i></i><strong>87%</strong><span>中重度患者强烈需要穿衣动作辅助</span></div><div className="insight-line"><i></i><strong>83%</strong><span>照护者关注轻量化与操作简易性</span></div></div>
          <div className="comparison-stack reveal">
            <div className="comparison-card muted"><span>海外主流方案</span><strong>约 ¥2,100</strong><small>以进食单场景为主</small><i></i></div>
            <div className="comparison-card muted"><span>国内主流方案</span><strong>约 ¥1,900</strong><small>响应式抵消路径</small><i></i></div>
            <div className="comparison-card focus"><span>帕不怕 · 启航系列</span><strong>¥699</strong><small>AI 预判 + 模块化多场景</small><i>普惠定价</i></div>
          </div>
        </div>
      </section>

      <section className="product-section" id="product">
        <div className="site-shell section-head reveal"><div><span>02 / PRODUCT SYSTEM</span><h2>一个智能核心，<br />延展四种生活能力。</h2></div><p>智能感知手柄承担感知、计算与控制；标准化磁吸接口连接不同功能配件，让产品从单一器具进化为开放的生活辅助平台。</p></div>
        <div className="product-hero reveal"><img src="./product-hero-v2.png" alt="帕不怕智能防抖手柄与餐具产品展示" /><div className="product-glow"></div><div className="product-pin pin-a"><i></i><span>智能感知手柄<small>多模态传感集成</small></span></div><div className="product-pin pin-b"><i></i><span>AI 计算单元<small>NPU 端侧实时推理</small></span></div><div className="product-pin pin-c"><i></i><span>模块化执行平台<small>ROS2 标准化接口</small></span></div><div className="product-caption"><span>ENGINEERED FOR EVERYDAY LIFE</span><strong>350g<small>以内重量控制目标</small></strong></div></div>
        <div className="site-shell"><ProductMatrix /></div>
      </section>

      <section className="engineering-section">
        <div className="site-shell engineering-layout">
          <div className="engineering-image reveal"><img src="./product-anatomy.jpg" alt="帕不怕智能手柄内部工程结构示意" /><span>ENGINEERING SAMPLE / INTERNAL ARCHITECTURE</span></div>
          <div className="engineering-copy reveal"><span className="section-kicker">每一个毫米，都服务于握持</span><h2>把复杂工程，<br />收进自然的一握。</h2><p>从肌电透层接触皮肤、主控板定位固定，到电池舱、LRA 马达与 Type-C 接口，内部结构围绕稳定、可维护与量产装配进行模块化设计。</p><div className="engineering-specs"><article><span>01</span><strong>可更换电池模组</strong><small>延长产品生命周期 2–3 年</small></article><article><span>02</span><strong>独立传感模组</strong><small>故障时无需更换整机</small></article><article><span>03</span><strong>国产 / 进口双备份</strong><small>增强关键器件供应韧性</small></article><article><span>04</span><strong>无工具快装结构</strong><small>兼顾试产与规模化装配</small></article></div></div>
        </div>
      </section>

      <section className="technology-section" id="technology"><SignalCanvas />
        <div className="site-shell">
          <div className="section-head light reveal"><div><span>03 / ACTIVE INTELLIGENCE</span><h2>不是等震颤发生，<br />而是提前理解它。</h2></div><p>HTPN 混合时序预测网络将多模态输入、特征提取、时序建模、注意力机制和多任务输出连接成端侧智能链路。</p></div>
          <TechnologyLab />
          <div className="pipeline reveal"><div className="pipeline-head"><span>END-TO-END PIPELINE</span><strong>7 层智能闭环</strong><small>从信号到服务的完整技术链路</small></div><div className="pipeline-track">{pipeline.map(([number, title, copy]) => <article key={number}><span>{number}</span><i></i><strong>{title}</strong><small>{copy}</small></article>)}</div></div>
          <div className="model-deep-dive reveal"><div className="model-image"><img src="./model-architecture.png" alt="HTPN 震颤预判模型结构图" /></div><div className="model-copy"><span>HTPN / CNN + BiLSTM + ATTENTION</span><h3>94K 参数，完成三项任务</h3><p>多分支 CNN 提取 EMG、IMU、视觉与压力局部特征；BiLSTM 建模时序依赖；Attention 聚焦关键时间步，最终同步输出震颤类型、幅度与提前预警。</p><div className="model-tasks"><div><i>01</i><strong>4 类震颤分类</strong></div><div><i>02</i><strong>0–5 级幅度回归</strong></div><div><i>03</i><strong>150ms 提前预警</strong></div></div></div></div>
          <PredictionConsole />
        </div>
      </section>

      <section className="research-section" id="research">
        <div className="site-shell section-head reveal"><div><span>04 / RESEARCH & EVIDENCE</span><h2>让每一个技术判断，<br />经得起数据追问。</h2></div><p>项目从需求、样机、模型到真实场景建立分层验证体系，持续记录性能、体验与照护价值。</p></div>
        <div className="site-shell research-grid reveal">
          <article className="research-score"><span>TEST ACCURACY</span><strong>92.3<small>%</small></strong><p>50 名患者、14 天监测条件下的阶段性测试集准确率</p><div><i style={{ width: "92.3%" }}></i></div></article>
          <article><span>PRECISION</span><strong>91.7<small>%</small></strong><p>宏平均精确率</p></article>
          <article><span>RECALL</span><strong>92.1<small>%</small></strong><p>宏平均召回率</p></article>
          <article><span>EVENT MISS RATE</span><strong>4.1<small>%</small></strong><p>事件级漏报率</p></article>
          <article><span>DATASET</span><strong>230<small>+h</small></strong><p>临床与社区患者数据</p></article>
        </div>
        <div className="site-shell evidence-layout">
          <div className="trial-gallery reveal"><div className="trial-main"><img src="./field-trial-a.png" alt="项目团队在真实场景中开展产品试用" /><span>FIELD TEST · REAL FEEDBACK</span></div><div className="trial-small"><img src="./field-trial-b.jpg" alt="长者参与产品体验" /><div><strong>真实场景</strong><span>专科机构 · 社区 · 居家</span></div></div></div>
          <div className="impact-panel reveal"><span>REAL-WORLD IMPACT</span><h3>从“能运行”到<br />“真正愿意使用”。</h3><div className="impact-list"><article><strong>+62%</strong><span>自主进食成功率</span></article><article><strong>4.8/5</strong><span>患者操作满意度</span></article><article><strong>-1.8h</strong><span>家庭日均照护时长</span></article><article><strong>-34%</strong><span>照护者焦虑指数</span></article></div><p>阶段性试点结果来自北京帕友关爱中心及社区家庭场景；后续仍将通过更大样本与规范化验证持续完善。</p></div>
        </div>
        <div className="site-shell validation-network reveal"><span>协作验证网络</span><div><strong>8<small>家</small></strong><p>帕金森专业机构</p></div><i></i><div><strong>32<small>家</small></strong><p>社区服务中心</p></div><i></i><div><strong>26<small>家</small></strong><p>养老驿站</p></div><i></i><div><strong>10<small>位</small></strong><p>跨学科专家评审</p></div></div>
      </section>

      <section className="versions-section">
        <div className="site-shell section-head reveal"><div><span>05 / PRODUCT PORTFOLIO</span><h2>从普惠入门，<br />到专业级个体适配。</h2></div><p>三层产品版本覆盖不同预算、症状与机构需求，既保证核心能力可及，也为高阶感知和定制扩展保留空间。</p></div>
        <div className="site-shell"><VersionSelector /></div>
      </section>

      <section className="service-section" id="service">
        <div className="site-shell service-layout">
          <div className="service-intro reveal"><span>06 / CARE CONTINUUM</span><h2>交付一件产品，<br />更要陪伴长期使用。</h2><p>服务从咨询、试用到培训、随访与维修，连接客户信息系统、亲友云守护与患者社群，形成产品之外的持续支持。</p><div className="service-promise"><strong>7 × 24</strong><span>规划客服支持体系<small>以正式运营标准为准</small></span></div></div>
          <div className="service-steps reveal">{serviceSteps.map(([number, title, copy]) => <article key={number}><span>{number}</span><div><strong>{title}</strong><p>{copy}</p></div><i>↗</i></article>)}</div>
        </div>
        <div className="site-shell platform-cards reveal"><article><span>FOR PATIENTS</span><strong>健康趋势</strong><p>震颤频率、使用行为与长期变化，以更清晰的方式被理解。</p></article><article><span>FOR FAMILIES</span><strong>亲友云守护</strong><p>在尊重隐私的前提下，为家庭提供连续的使用与生活参考。</p></article><article><span>FOR PROFESSIONALS</span><strong>远程服务参考</strong><p>为专业人员提供更连续的数据线索与随访依据。</p></article><article><span>FOR COMMUNITY</span><strong>病友交流</strong><p>让经验、鼓励与社会支持成为产品服务的一部分。</p></article></div>
      </section>

      <section className="market-section"><SignalCanvas warm />
        <div className="site-shell">
          <div className="section-head light reveal"><div><span>07 / OPPORTUNITY</span><h2>普惠产品背后，<br />是一条可持续的增长路径。</h2></div><p>从医院与社区建立信任，以线上健康平台扩大触达，再通过模块配件、专业版本和数据服务形成长期价值。</p></div>
          <div className="market-grid reveal"><article><span>TAM · 总可寻址市场</span><strong>27.3<small>亿元</small></strong><p>基于计划书目标患者基数与加权客单价测算的存量市场</p></article><article><span>SAM · 可服务市场</span><strong>13.65<small>亿元</small></strong><p>结合初期产品定位、合规能力与渠道覆盖估算</p></article><article><span>SOM · 1–2 年目标</span><strong>2,730–5,460<small>万元 / 年</small></strong><p>按初期可服务市场 2%–4% 渗透测算</p></article></div>
          <div className="growth-path reveal"><div><span>01 / 信任建立</span><strong>医院 · 康复机构</strong><p>试用、培训与专业反馈</p></div><i>→</i><div><span>02 / 规模触达</span><strong>电商 · 养老机构</strong><p>线上渠道与批量采购</p></div><i>→</i><div><span>03 / 生态延展</span><strong>平台 · 海外合作</strong><p>数据服务与本地化分销</p></div></div>
        </div>
      </section>

      <section className="ip-section">
        <div className="site-shell ip-layout">
          <div className="ip-intro reveal"><span>08 / INTELLECTUAL PROPERTY</span><h2>从数据基石，<br />到云端大脑。</h2><p>围绕“感知—决策—执行—进化”完整链路，项目已形成软件著作权与专利协同的技术保护矩阵。</p><div><strong>6</strong><span>项软件著作权</span><strong>3</strong><span>项专利 / 专利储备</span></div></div>
          <div className="ip-stack reveal"><article><span>01</span><div><strong>大数据清洗预处理</strong><small>数据基石 · 2025SR0449053</small></div></article><article><span>02</span><div><strong>AI 大数据处理挖掘</strong><small>智能核心 · 2024SR0380546</small></div></article><article><span>03</span><div><strong>机器学习优化评估</strong><small>调优专家 · 2024SR1056710</small></div></article><article><span>04</span><div><strong>用户行为分析</strong><small>需求洞察 · 2025SR0431816</small></div></article><article><span>05</span><div><strong>AI 大数据云服务</strong><small>云端大脑 · 2024SR0147521</small></div></article><article><span>06</span><div><strong>大数据可视化平台</strong><small>交互窗口 · 2025SR0427123</small></div></article></div>
        </div>
      </section>

      <section className="roadmap-section">
        <div className="site-shell section-head reveal"><div><span>09 / FROM PROTOTYPE TO SCALE</span><h2>每一次迭代，<br />都来自真实反馈。</h2></div><p>从养老院和社区的痛点观察，到三轴原型、工程样机、临床闭环和量产准备，项目持续把反馈转化为结构与算法改进。</p></div>
        <div className="site-shell roadmap reveal"><article><span>2024.09—12</span><i></i><strong>痛点验证</strong><p>问卷、访谈与场景观察，形成超过 200 页访谈记录。</p></article><article><span>2024.11—2025.05</span><i></i><strong>技术原型</strong><p>完成第一代三轴防抖原型，验证基础技术路径。</p></article><article><span>2025.06—08</span><i></i><strong>临床反馈</strong><p>围绕响应延迟、手柄防滑与人体工学进行关键修正。</p></article><article className="active"><span>NOW</span><i></i><strong>工程样机</strong><p>完成多模态识别、主动补偿与 5 次重大版本迭代。</p></article><article><span>NEXT</span><i></i><strong>小批量试产</strong><p>推进临床闭环、合规测试与 1,000 台级工艺验证。</p></article><article><span>FUTURE</span><i></i><strong>智能照护生态</strong><p>扩展轻量设备、健康平台与更广泛的行动障碍场景。</p></article></div>
      </section>

      <section className="about-section" id="about">
        <div className="site-shell about-layout">
          <div className="about-title reveal"><span>10 / ABOUT PARKINFEARLESS</span><h2>科技重塑尊严，<br />关爱融入日常。</h2></div>
          <div className="about-copy reveal"><p>北京帕护智能科技有限公司是一家专注提升帕金森病患者生活品质的科技企业。团队与神经内科医师、康复治疗师及患者紧密合作，把真实需求转化为可持续迭代的产品系统。</p><p>我们的愿景，是成为帕金森病及行动障碍领域智能照护解决方案的引领者与标准推动者，构建连接智能硬件、AI 算法、云服务与用户社群的开放生态。</p></div>
          <div className="values reveal"><article><span>01</span><strong>关爱</strong><p>从人的尊严与真实生活出发</p></article><article><span>02</span><strong>创新</strong><p>用跨学科技术重做辅具体验</p></article><article><span>03</span><strong>责任</strong><p>让先进技术更可靠、更可及</p></article><article><span>04</span><strong>共创</strong><p>让患者与专业人员参与迭代</p></article></div>
        </div>
      </section>

      <section className="faq-section"><div className="site-shell faq-layout"><div className="faq-title reveal"><span>11 / QUESTIONS</span><h2>更完整地<br />了解帕不怕。</h2><p>关于技术路径、使用定位、数据与当前进展的常见问题。</p></div><Faq /></div></section>

      <section className="cooperate-section" id="cooperate"><SignalCanvas />
        <div className="site-shell cooperate-layout reveal"><div><span>BUILD THE FUTURE OF CARE</span><h2>让“有帕不怕”，<br />成为更多家庭的日常。</h2></div><div><p>欢迎医疗机构、康复团队、社区养老服务方、产业伙伴与公益组织，共同推进产品试用、联合验证、服务共建与产业转化。</p><a className="button-primary light-button" href="#research">查看合作基础 <span>→</span></a></div></div>
      </section>

      <footer><div className="site-shell footer-main"><a className="brand footer-brand" href="#top"><span className="brand-symbol"><i></i></span><span><strong>帕不怕</strong><small>ParkinFearless</small></span></a><p>AI–EMG 主动预判型智能防抖辅具系统<br />北京帕护智能科技有限公司</p><div><a href="#product">产品系统</a><a href="#technology">AI 技术</a><a href="#research">验证研究</a><a href="#service">服务体系</a><a href="#about">关于我们</a></div></div><div className="site-shell footer-bottom"><small>本产品为生活辅助工具，不替代专业医疗诊断、治疗或康复建议。页面数据来自项目计划书所列阶段性研究、测试与规划，正式产品参数以最终合规验证与发布信息为准。</small><span>© 2026 ParkinFearless</span></div></footer>
    </main>
  );
}
