"use client";

import { useEffect, useRef, useState } from "react";

const proof = [
  ["344", "份有效问卷", "需求研究"],
  ["93%", "明确需求", "用户反馈"],
  ["+62%", "自主进食成功率", "阶段性试用"],
  ["4.8/5", "操作满意度", "真实场景"],
];

const ecosystem = [
  {
    id: "eat",
    number: "01",
    label: "进食",
    title: "智能防抖勺",
    copy: "面向中式进食场景，融合三轴补偿、人体工学握持与 90° 弯折勺头，让盛取与送入口中的动作更稳定。",
    meta: ["三轴主动补偿", "磁吸快拆", "触觉反馈"],
  },
  {
    id: "dress",
    number: "02",
    label: "穿衣",
    title: "AI 穿衣辅助器",
    copy: "同一智能手柄连接穿衣辅助模块，通过个性化适应与语音交互，扩展日常自理的边界。",
    meta: ["模块化接口", "语音交互", "个性化学习"],
  },
  {
    id: "cloud",
    number: "03",
    label: "守护",
    title: "帕益助数据平台",
    copy: "把复杂的震颤数据转化为易懂趋势，为患者、家属与专业人员建立更连续、更清晰的健康管理参考。",
    meta: ["趋势可视化", "亲友云守护", "云边协同"],
  },
];

function NeuralField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animation = 0;
    let width = 0;
    let height = 0;
    const pointer = { x: -1000, y: -1000 };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const particles = Array.from({ length: 46 }, (_, index) => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - .5) * .00016,
      vy: (Math.random() - .5) * .00016,
      r: index % 8 === 0 ? 2.3 : 1.1,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        if (!reduced) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > 1) p.vx *= -1;
          if (p.y < 0 || p.y > 1) p.vy *= -1;
        }
      });
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        const ax = a.x * width;
        const ay = a.y * height;
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const bx = b.x * width;
          const by = b.y * height;
          const distance = Math.hypot(ax - bx, ay - by);
          if (distance < 125) {
            ctx.strokeStyle = `rgba(240, 141, 82, ${.16 * (1 - distance / 125)})`;
            ctx.lineWidth = .7;
            ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
          }
        }
        const pointerDistance = Math.hypot(ax - pointer.x, ay - pointer.y);
        const glow = pointerDistance < 160 ? .8 : .38;
        ctx.fillStyle = `rgba(255, 196, 145, ${glow})`;
        ctx.beginPath(); ctx.arc(ax, ay, a.r, 0, Math.PI * 2); ctx.fill();
      }
      if (!reduced) animation = requestAnimationFrame(draw);
    };

    const move = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };
    resize(); draw();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", () => { pointer.x = -1000; pointer.y = -1000; });
    return () => { cancelAnimationFrame(animation); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas className="neural-canvas" ref={canvasRef} aria-hidden="true" />;
}

function PredictionDemo() {
  const [intensity, setIntensity] = useState(64);
  const compensated = Math.max(8, Math.round(intensity * .15));
  return (
    <div className="prediction-console">
      <div className="console-head">
        <div><span className="status-dot"></span>AI 补偿演示</div>
        <span>交互示意 · 非诊断工具</span>
      </div>
      <div className="wave-grid" style={{ "--input": `${intensity}%`, "--output": `${compensated}%` } as React.CSSProperties}>
        <div className="wave-row">
          <span>输入震颤</span>
          <div className="wave raw"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <strong>{intensity}</strong>
        </div>
        <div className="wave-row output-row">
          <span>补偿输出</span>
          <div className="wave calm"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <strong>{compensated}</strong>
        </div>
      </div>
      <label className="range-label" htmlFor="intensity"><span>模拟震颤强度</span><span>AI 实时重算</span></label>
      <input id="intensity" type="range" min="25" max="100" value={intensity} onChange={(event) => setIntensity(Number(event.target.value))} />
      <div className="console-foot"><strong>≈85%</strong><span>计划书所列目标震颤抑制水平</span></div>
    </div>
  );
}

export default function Home() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible"));
    }, { threshold: .14 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const selected = ecosystem[active];
  return (
    <main id="top">
      <header className="site-header">
        <div className="site-shell header-inner">
          <a className="brand" href="#top" aria-label="帕不怕首页">
            <span className="brand-symbol" aria-hidden="true"><i></i></span>
            <span><strong>帕不怕</strong><small>ParkinFearless</small></span>
          </a>
          <nav className={menuOpen ? "main-nav open" : "main-nav"} aria-label="主导航">
            <a href="#vision" onClick={() => setMenuOpen(false)}>项目愿景</a>
            <a href="#technology" onClick={() => setMenuOpen(false)}>AI 技术</a>
            <a href="#product" onClick={() => setMenuOpen(false)}>产品生态</a>
            <a href="#evidence" onClick={() => setMenuOpen(false)}>验证进展</a>
          </nav>
          <a className="nav-cta" href="#cooperate">合作咨询 <span>↗</span></a>
          <button className="menu-button" aria-expanded={menuOpen} aria-label="打开导航" onClick={() => setMenuOpen(!menuOpen)}><i></i><i></i></button>
        </div>
      </header>

      <section className="hero-premium">
        <img className="hero-image" src="/hero-lifestyle-v2.png" alt="长者在家中使用帕不怕智能防抖勺" />
        <div className="hero-wash"></div>
        <NeuralField />
        <div className="site-shell hero-content">
          <div className="hero-copy reveal is-visible">
            <div className="overline"><span>AI · EMG</span><i></i>下一代震颤管理辅助系统</div>
            <h1>让自主生活，<br /><em>先于震颤发生。</em></h1>
            <p>全球首创 AI–EMG 主动预判路径，以多模态感知、边缘智能与三轴精准补偿，让科技回应每一次真实的生活需要。</p>
            <div className="hero-actions">
              <a className="primary-action" href="#product">探索产品系统 <span>→</span></a>
              <a className="video-link" href="#technology"><i>▶</i><span>观看技术原理<small>2 分钟了解主动预判</small></span></a>
            </div>
          </div>
          <div className="hero-data">
            <div className="data-orbit"><span></span><span></span><span></span><strong>AI</strong></div>
            <div className="prediction-chip chip-a"><span>预测提前量</span><strong>150<small>ms</small></strong></div>
            <div className="prediction-chip chip-b"><span>目标震颤抑制</span><strong>85<small>%+</small></strong></div>
            <div className="scroll-cue"><i></i><span>向下探索</span></div>
          </div>
        </div>
      </section>

      <section className="proof-ribbon" aria-label="阶段性验证数据">
        <div className="proof-track">
          {[...proof, ...proof].map(([value, label, type], index) => (
            <div className="proof-item" key={`${label}-${index}`}><small>{type}</small><strong>{value}</strong><span>{label}</span><i></i></div>
          ))}
        </div>
      </section>

      <section className="vision-section site-shell" id="vision">
        <div className="vision-index reveal"><span>01</span><i></i><small>WHY IT MATTERS</small></div>
        <div className="vision-copy reveal">
          <p className="section-label">科技向善，不止于一把勺子</p>
          <h2>不是替代一双手。<br />而是把生活的<strong>选择权</strong>，<br />重新交还给人。</h2>
        </div>
        <div className="vision-aside reveal">
          <p>中国拥有庞大的帕金森患者群体。对许多人而言，进食、穿衣这些看似平常的动作，意味着尊严、信心与家庭照护压力。</p>
          <div><strong>¥699</strong><span>主力产品规划起售价<br />让先进技术真正可及</span></div>
        </div>
      </section>

      <section className="technology-premium" id="technology">
        <NeuralField />
        <div className="site-shell">
          <div className="section-head light-head reveal">
            <div><span>02 / INTELLIGENCE</span><h2>震颤尚未发生，<br />AI 已经开始响应。</h2></div>
            <p>从肌电信号中捕捉动作意图，在本地完成快速判断，再由执行平台进行反向补偿——这是一条从感知到行动的完整智能闭环。</p>
          </div>
          <div className="tech-stage reveal">
            <div className="tech-flow">
              <article><span>01</span><i></i><div><small>SENSE</small><h3>多模态感知</h3><p>HD-sEMG、9轴 IMU 与磁编码器同步采集。</p></div></article>
              <article><span>02</span><i></i><div><small>PREDICT</small><h3>强化学习预判</h3><p>个体震颤特征库驱动实时决策与持续优化。</p></div></article>
              <article><span>03</span><i></i><div><small>COMPENSATE</small><h3>三轴精准补偿</h3><p>无刷直流力矩电机快速执行反向控制。</p></div></article>
            </div>
            <PredictionDemo />
          </div>
        </div>
      </section>

      <section className="product-showcase" id="product">
        <div className="site-shell section-head reveal">
          <div><span>03 / PRODUCT</span><h2>精密技术，<br />藏进自然的一握。</h2></div>
          <p>轻量、易握、可扩展。我们把复杂的传感、计算与执行收进一个直觉化的智能手柄，让使用者专注于生活本身。</p>
        </div>
        <div className="product-canvas reveal">
          <img src="/product-hero-v2.png" alt="帕不怕智能防抖勺高清产品展示" />
          <div className="product-callout callout-a"><i></i><span>边缘 AI 计算单元<small>低时延本地决策</small></span></div>
          <div className="product-callout callout-b"><i></i><span>智能磁吸接口<small>配件快速更换</small></span></div>
          <div className="product-callout callout-c"><i></i><span>人体工学手柄<small>稳定、自然、易握</small></span></div>
        </div>
        <div className="site-shell product-specs reveal">
          <div><small>COMPENSATION</small><strong>三轴</strong><span>正交方向同步抑制</span></div>
          <div><small>ARCHITECTURE</small><strong>模块化</strong><span>一个手柄，多种场景</span></div>
          <div><small>LEARNING</small><strong>自适应</strong><span>随使用持续优化</span></div>
          <div><small>PRIVACY</small><strong>端侧优先</strong><span>敏感计算尽量本地完成</span></div>
        </div>
      </section>

      <section className="ecosystem-section site-shell">
        <div className="section-head compact-head reveal">
          <div><span>04 / ECOSYSTEM</span><h2>一柄多用，<br />覆盖更多生活场景。</h2></div>
        </div>
        <div className="ecosystem-layout reveal">
          <div className="ecosystem-tabs" role="tablist" aria-label="产品生态">
            {ecosystem.map((item, index) => (
              <button key={item.id} role="tab" aria-selected={active === index} onClick={() => setActive(index)}>
                <span>{item.number}</span><strong>{item.label}</strong><i>↗</i>
              </button>
            ))}
          </div>
          <div className="ecosystem-detail" role="tabpanel">
            <div className={`ecosystem-visual visual-${selected.id}`}>
              <div className="visual-core"><span></span><i></i><b></b></div>
              <small>MODULAR / {selected.id.toUpperCase()}</small>
            </div>
            <div className="ecosystem-copy">
              <span>{selected.number} · {selected.label}</span>
              <h3>{selected.title}</h3>
              <p>{selected.copy}</p>
              <ul>{selected.meta.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      <section className="evidence-section" id="evidence">
        <div className="site-shell">
          <div className="section-head light-head reveal">
            <div><span>05 / EVIDENCE</span><h2>从样机到真实家庭，<br />每一步都有反馈。</h2></div>
            <p>项目已完成需求识别、工程样机与场景试用的关键闭环，并在医疗、社区与养老网络中持续验证。</p>
          </div>
          <div className="evidence-grid reveal">
            <div className="evidence-feature">
              <img src="/hero-lifestyle-v2.png" alt="真实居家环境中的帕不怕产品体验" />
              <div><span>REAL-WORLD PILOT</span><h3>让实验室里的创新，<br />经得起一日三餐。</h3></div>
            </div>
            <div className="evidence-numbers">
              <article><strong>15<small>户</small></strong><span>社区居家试点家庭</span></article>
              <article><strong>10<small>+</small></strong><span>产品交流与试用活动</span></article>
              <article><strong>1.8<small>h</small></strong><span>日均照护时长平均减少</span></article>
              <article><strong>18<small>份</small></strong><span>合作意向书</span></article>
            </div>
          </div>
          <div className="network-strip reveal">
            <span>协作网络</span><strong>8 家专业机构</strong><i></i><strong>32 家社区服务中心</strong><i></i><strong>26 家养老驿站</strong>
          </div>
        </div>
      </section>

      <section className="roadmap-section site-shell">
        <div className="section-head reveal"><div><span>06 / EVOLUTION</span><h2>从一件辅具，<br />走向全场景健康管理。</h2></div><p>项目已完成 5 次重大版本迭代，并规划从生活辅助终端向轻量化设备与数据平台持续演进。</p></div>
        <div className="roadmap reveal">
          <article className="active"><span>NOW</span><strong>V1.0</strong><h3>智能防抖辅具</h3><p>进食与穿衣核心场景</p></article>
          <article><span>NEXT</span><strong>V2.0</strong><h3>AI–EMG 深度适配</h3><p>更精细的个体化预判</p></article>
          <article><span>FUTURE</span><strong>V3.0</strong><h3>轻量设备与平台</h3><p>连续数据与健康服务</p></article>
        </div>
      </section>

      <section className="cooperate-premium" id="cooperate">
        <NeuralField />
        <div className="site-shell cooperate-content reveal">
          <span>BUILD WITH US</span>
          <h2>让“有帕不怕”，<br />照亮更多家庭。</h2>
          <p>欢迎医疗机构、社区养老服务方、康复团队与产业伙伴，共同开展产品体验、场景试点与合作验证。</p>
          <div><a className="primary-action light-action" href="#evidence">了解合作基础 <span>→</span></a><a href="#top" className="back-top">返回顶部 ↑</a></div>
        </div>
      </section>

      <footer>
        <div className="site-shell footer-main">
          <a className="brand footer-brand" href="#top"><span className="brand-symbol" aria-hidden="true"><i></i></span><span><strong>帕不怕</strong><small>ParkinFearless</small></span></a>
          <p>基于多模态感知、AI–EMG 主动预判与三轴精准补偿的下一代震颤管理辅助系统。</p>
          <div><a href="#technology">AI 技术</a><a href="#product">产品生态</a><a href="#evidence">验证进展</a></div>
        </div>
        <div className="site-shell footer-bottom"><small>本产品为生活辅助工具，不替代专业医疗诊断、治疗或康复建议。页面数据来自项目计划书所列阶段性调研与试点。</small><span>© 2026 ParkinFearless</span></div>
      </footer>
    </main>
  );
}
