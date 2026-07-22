const metrics = [
  { value: "344", label: "份有效用户问卷", note: "问卷、访谈与场景观察" },
  { value: "93%", label: "受访者表达明确需求", note: "聚焦进食与穿衣场景" },
  { value: "+62%", label: "自主进食成功率", note: "阶段性真实场景试用" },
  { value: "4.8/5", label: "操作满意度", note: "来自试用参与者反馈" },
];

const capabilities = [
  {
    index: "01",
    title: "多模态感知",
    copy: "融合肌电、IMU、磁编码器等信号，捕捉每位使用者独特的震颤特征。",
  },
  {
    index: "02",
    title: "AI 提前预判",
    copy: "基于本地特征库与强化学习，在震颤发生前完成识别与控制决策。",
  },
  {
    index: "03",
    title: "三轴精准补偿",
    copy: "执行平台实时反向补偿，帮助降低进食动作中的非自主抖动干扰。",
  },
  {
    index: "04",
    title: "持续个性化",
    copy: "控制策略随使用反馈持续优化，让设备越用越贴合个人习惯。",
  },
];

const ecosystem = [
  {
    tag: "核心场景",
    title: "智能防抖勺",
    copy: "针对中式进食习惯设计，兼顾三轴防抖、90°弯折勺头与舒适握持。",
  },
  {
    tag: "拓展场景",
    title: "AI 穿衣辅助器",
    copy: "通过磁吸接口快速更换配件，帮助完成穿衣、提拉等日常动作。",
  },
  {
    tag: "数字服务",
    title: "帕益助守护平台",
    copy: "把复杂震颤数据转化为易懂趋势，为患者、家属与专业人员提供参考。",
  },
];

export default function Home() {
  return (
    <main id="top">
      <header className="site-header">
        <div className="shell header-inner">
          <a className="brand" href="#top" aria-label="帕不怕首页">
            <span className="brand-mark" aria-hidden="true">帕</span>
            <span className="brand-copy">
              <strong>帕不怕</strong>
              <span>ParkinFearless</span>
            </span>
          </a>
          <nav className="desktop-nav" aria-label="主导航">
            <a href="#product">产品方案</a>
            <a href="#technology">核心技术</a>
            <a href="#validation">验证进展</a>
            <a href="#mission">项目愿景</a>
          </nav>
          <a className="header-cta" href="#cooperate">了解合作</a>
        </div>
      </header>

      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span></span>AI–EMG 主动预判型智能防抖辅具</p>
          <h1 id="hero-title">让每一次自主进食，<em>都更从容。</em></h1>
          <p className="hero-lead">
            通过肌电信号与智能算法，<strong>在抖动发生前主动识别并补偿</strong>。
            我们希望把一件日常小事，重新交还到使用者自己手中。
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#product">了解产品方案 <span>→</span></a>
            <div className="price"><strong>¥699 起</strong><span>为真实家庭设计</span></div>
          </div>
          <p className="hero-note">面向帕金森患者及上肢震颤人群的生活辅助产品</p>
        </div>

        <div className="hero-visual">
          <div className="hero-photo-wrap">
            <img src="/pilot-user-1.jpeg" alt="试用者手持帕不怕智能防抖辅具" />
            <span className="scene-pill">真实试用 · 自主进食</span>
          </div>
          <aside className="emg-card" aria-label="AI-EMG 实时预判技术说明">
            <div className="emg-top"><span>AI–EMG 实时预判</span><span className="live"><i></i>感知中</span></div>
            <div className="signal" aria-hidden="true">
              <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
            </div>
            <strong>更早感知，更稳响应</strong>
            <p>融合个体肌电特征，帮助降低进食动作中的非自主抖动干扰。</p>
          </aside>
          <div className="hero-stamp"><strong>5</strong><span>次重大<br />版本迭代</span></div>
        </div>
      </section>

      <section className="proof-band" aria-label="项目阶段性验证数据">
        <div className="shell">
          <div className="proof-intro"><span>来自用户调研与阶段性验证的真实反馈</span><small>项目计划书阶段性数据</small></div>
          <div className="metrics">
            {metrics.map((metric) => (
              <article className="metric" key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
                <small>{metric.note}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section problem-section shell" id="mission">
        <div className="section-heading narrow-heading">
          <p className="kicker">从真实生活出发</p>
          <h2>不是替代双手，<br />而是把自主权交还给人。</h2>
        </div>
        <div className="problem-grid">
          <div className="story-card story-main">
            <img src="/pilot-user-2.jpeg" alt="试用者在日常场景中体验智能防抖勺" />
            <div>
              <span>进食困难</span>
              <p>手部震颤让盛取、送入口中这些日常动作变得费力，也增加了照护压力。</p>
            </div>
          </div>
          <div className="story-card">
            <img src="/pilot-user-3.jpeg" alt="试用者展示智能防抖辅具" />
            <div>
              <span>尊严与信心</span>
              <p>一件可靠、易用且买得起的辅具，能够带来更独立的生活体验。</p>
            </div>
          </div>
          <blockquote>
            “很多患者跟我们说，最难受的不是生病本身，而是连饭都没法自己吃。”
            <cite>— 项目团队在长期志愿服务中的真实洞察</cite>
          </blockquote>
        </div>
      </section>

      <section className="section technology-section" id="technology">
        <div className="shell">
          <div className="section-heading heading-row">
            <div>
              <p className="kicker light">核心技术</p>
              <h2>从“发生后抵消”<br />到“发生前干预”</h2>
            </div>
            <p>围绕“感知—决策—执行—进化”构建完整闭环，让防抖不只是一种机械反应，而是持续适应使用者的智能协作。</p>
          </div>
          <div className="capability-grid">
            {capabilities.map((item) => (
              <article className="capability" key={item.index}>
                <span>{item.index}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
          <div className="architecture-card">
            <div className="architecture-copy">
              <span>全栈技术闭环</span>
              <h3>多源感知，本地决策，云端进化</h3>
              <p>从 HD-sEMG 肌电阵列、9轴 IMU 到高适应 AI 震颤预判引擎，再到三轴防抖平台，形成端侧快速执行与云端模型迭代的协同路径。</p>
              <ul>
                <li>边缘侧低时延处理</li>
                <li>本地个体震颤特征库</li>
                <li>强化学习控制策略</li>
              </ul>
            </div>
            <img src="/technology-architecture.png" alt="帕不怕智能防抖辅具技术架构图" />
          </div>
        </div>
      </section>

      <section className="section product-section shell" id="product">
        <div className="section-heading heading-row dark-heading">
          <div>
            <p className="kicker">一柄多用</p>
            <h2>从一餐饭，走向更多生活场景。</h2>
          </div>
          <p>智能磁吸底座与标准化接口，让同一手柄快速连接不同配件。减少重复购置，也为后续场景扩展保留空间。</p>
        </div>
        <div className="product-feature">
          <div className="product-image">
            <img src="/product-matrix.png" alt="帕不怕智能防抖辅具核心产品结构与功能说明" />
          </div>
          <div className="ecosystem-list">
            {ecosystem.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")} · {item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section validation-section" id="validation">
        <div className="shell">
          <div className="section-heading heading-row dark-heading">
            <div>
              <p className="kicker">真实场景验证</p>
              <h2>让实验室里的创新，<br />经得起一日三餐。</h2>
            </div>
            <p>项目已完成从需求调研、核心样机到真实场景试用的关键闭环，并持续与医疗、社区、养老服务网络协作。</p>
          </div>
          <div className="validation-layout">
            <div className="validation-photo">
              <img src="/home-pilot.png" alt="居家真实场景中的产品试用" />
              <div><strong>15 户</strong><span>社区居家试点家庭</span></div>
            </div>
            <div className="validation-facts">
              <article><strong>10+</strong><span>产品交流与试用活动</span></article>
              <article><strong>1.8 小时</strong><span>日均照护时长平均减少</span></article>
              <article><strong>8 / 32 / 26</strong><span>专业机构 / 社区中心 / 养老驿站</span></article>
              <article><strong>18 份</strong><span>合作意向书</span></article>
            </div>
          </div>
        </div>
      </section>

      <section className="section trust-section shell">
        <div className="trust-copy">
          <p className="kicker">技术与社会价值并行</p>
          <h2>高端技术，<br />普惠应用。</h2>
          <p>团队围绕数据处理、AI 算法、云边协同与可视化交互布局知识产权，让产品创新有据可依，也让普惠定价拥有持续迭代的技术基础。</p>
          <div className="trust-stats">
            <div><strong>6</strong><span>项软件著作权</span></div>
            <div><strong>3</strong><span>项专利布局</span></div>
            <div><strong>100+</strong><span>媒体关注</span></div>
          </div>
        </div>
        <div className="partner-card">
          <img src="/partner-network.png" alt="项目团队与帕友关爱中心、社区及养老机构合作网络" />
          <div><span>共建网络</span><strong>医疗 × 社区 × 养老</strong></div>
        </div>
      </section>

      <section className="section cooperate-section" id="cooperate">
        <div className="shell cooperate-inner">
          <div>
            <p className="kicker light">一起让科技更有温度</p>
            <h2>让“有帕不怕”，<br />照亮更多家庭。</h2>
          </div>
          <div className="cooperate-copy">
            <p>项目正处于产业化推进阶段，欢迎医疗机构、社区养老服务方、康复团队与产业伙伴共同开展产品体验、场景试点与合作验证。</p>
            <div className="cooperate-links">
              <a className="button button-light" href="#validation">查看试点基础 <span>→</span></a>
              <a className="text-link" href="#top">返回顶部 ↑</a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="shell footer-inner">
          <div className="brand footer-brand">
            <span className="brand-mark" aria-hidden="true">帕</span>
            <span className="brand-copy"><strong>帕不怕</strong><span>ParkinFearless</span></span>
          </div>
          <p>基于多模态感知与 AI 预判的智能生活辅助系统</p>
          <small>本产品为生活辅助工具，不替代专业医疗诊断、治疗或康复建议。页面数据来自项目计划书所列阶段性调研与试点。</small>
        </div>
      </footer>
    </main>
  );
}
