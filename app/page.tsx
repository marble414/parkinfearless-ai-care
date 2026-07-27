"use client";

import {
  Activity,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  BatteryCharging,
  Boxes,
  BrainCircuit,
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleGauge,
  Cloud,
  Database,
  FileCheck2,
  Footprints,
  Hand,
  HeartHandshake,
  HeartPulse,
  House,
  Link2,
  Menu,
  Mic2,
  MoonStar,
  PackageCheck,
  Play,
  RotateCcw,
  ScanLine,
  ShieldCheck,
  Shirt,
  Sparkles,
  Sun,
  Target,
  TimerReset,
  UtensilsCrossed,
  Waves,
  Workflow,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  CloudEdgeLoop,
  DataSplitDiagram,
  EightStagePipeline,
  HTPNModelDiagram,
  ProductSystemMap,
} from "./TechnicalDiagrams";

const proofStats = [
  { value: "344", label: "份有效问卷", note: "系统需求调研" },
  { value: "93%+", label: "认可应用价值", note: "认为此类产品具有重要应用价值" },
  { value: "5", label: "次重大版本更新", note: "产品持续进化" },
  { value: "18", label: "份合作意向", note: "14 份正式文件 · 4 份推进中" },
];

const needs = [
  { value: 92, title: "稳定进食", copy: "患者将“进食时餐具稳定控制”列为首要需求。", icon: UtensilsCrossed },
  { value: 87, title: "穿衣辅助", copy: "中重度患者强烈需要穿衣动作辅助。", icon: Shirt },
  { value: 83, title: "轻量易用", copy: "照护者关注轻量化与操作简易性。", icon: Hand },
];

const scenarios = [
  {
    id: "dining",
    index: "01",
    label: "自主进食",
    title: "智能防抖勺",
    icon: UtensilsCrossed,
    lead: "把小臂精细控制转化为更易完成的大臂摆动。",
    copy: "优化设计 90° 弯折进食工具，系统分析多模态信号预判震颤，并结合历史进食成功率微调补偿策略，减少食物泼洒。",
    tags: ["90° 弯折进食工具", "自适应补偿", "触觉反馈"],
    planned: false,
  },
  {
    id: "dressing",
    index: "02",
    label: "从容穿衣",
    title: "AI 穿衣辅助器",
    icon: Shirt,
    lead: "面向扣纽扣、穿袖与整理衣物等精细动作。",
    copy: "用户可通过离线语音指令切换穿衣模式；系统调用高精度模式，并依据压力传感器反馈动态调整辅助轨迹。",
    tags: ["离线语音激活", "高精度模式", "阻力反馈"],
    planned: false,
  },
  {
    id: "relax",
    index: "03",
    label: "肌肉舒缓",
    title: "按摩止颤模块",
    icon: HeartPulse,
    lead: "未来拓展低频舒缓按摩，与机械防抖形成协同辅助。",
    copy: "产品蓝图规划在手柄握把区域集成微型震动按摩单元，对掌心与前臂肌肉进行低频舒缓按摩，面向肌肉僵硬、痉挛与过度紧张等日常困扰。",
    tags: ["规划模块", "微型震动单元", "低频舒缓"],
    planned: true,
  },
  {
    id: "gait",
    index: "04",
    label: "安全步态",
    title: "视觉步态引导",
    icon: Footprints,
    lead: "以稳定直线激光提供可见的步态参照。",
    copy: "产品蓝图规划在手柄底部可伸缩式搭载激光投射装置，面向冻结步态、起步困难与行走偏移等日常场景，拓展非进食状态下的辅助行走用途。",
    tags: ["规划模块", "直线激光参照", "可伸缩设计"],
    planned: true,
  },
];

const sensors: Array<{ code: string; title: string; copy: string; spec: string; icon: LucideIcon }> = [
  { code: "01", title: "HD-sEMG 肌电阵列", copy: "捕捉震颤前兆肌肉电信号，为动作意图与异常趋势分析提供生理信号。", spec: "1000Hz", icon: Activity },
  { code: "02", title: "9 轴 IMU", copy: "量化震颤频率、幅度、方向与相位，并记录三维姿态变化。", spec: "500Hz", icon: Waves },
  { code: "03", title: "磁编码器", copy: "补充高精度位置与角度信息，修正 IMU 长期漂移。", spec: "500Hz", icon: CircleGauge },
  { code: "04", title: "压力传感阵列", copy: "监测握持力度与接触变化，判断有效握持及交互稳定性。", spec: "100Hz", icon: Hand },
  { code: "05", title: "环境光传感器", copy: "采集外部光照信息，辅助识别室内外与明暗场景。", spec: "50Hz", icon: Sun },
  { code: "06", title: "双麦克风阵列", copy: "支持离线语音唤醒、模式切换和功能调用。", spec: "连续监听", icon: Mic2 },
];

const techCapabilities = [
  {
    id: "sense",
    index: "A",
    eyebrow: "PERCEPTION LAYER",
    title: "智能感知",
    icon: ScanLine,
    copy: "智能感知手柄汇集肌电、姿态、位置、握持、环境与语音交互信息，形成“人体意图—操作场景—交互状态”多维感知入口。",
    points: ["多源信号统一时间戳", "滤波降噪与标准化", "本地用户震颤特征库"],
    metrics: [["6 类", "感知与交互单元"], ["<1ms", "标准动作采集时间戳对齐"]],
  },
  {
    id: "predict",
    index: "B",
    eyebrow: "HTPN + LIGHTWEIGHT SAC",
    title: "自主决策",
    icon: BrainCircuit,
    copy: "HTPN 负责多模态时序预测，轻量化 SAC 聚焦端侧补偿策略的个体化适配；两者分别承担状态理解与策略优化。",
    points: ["CNN + BiLSTM + Attention", "震颤类型、幅度与预测提前量多任务输出", "依据历史反馈优化补偿策略"],
    metrics: [["94K", "模型参数量"], ["150ms", "预测提前量 / 预判式补偿"]],
  },
  {
    id: "act",
    index: "C",
    eyebrow: "CONTROL & EXECUTION",
    title: "精准执行",
    icon: Zap,
    copy: "执行层将补偿方向、强度、时机和模式选择转化为物理动作，由三轴独立控制防抖云台和高转矩密度无刷直流力矩电机完成补偿。",
    points: ["高动态模式面向连续进食动作", "高精度模式面向穿衣等精细任务", "LRA 位于模块化执行平台，提供触觉反馈"],
    metrics: [["8.5ms", "端侧推理延迟"], [">85%", "震颤抑制率"]],
  },
  {
    id: "evolve",
    index: "D",
    eyebrow: "CLOUD–EDGE EVOLUTION",
    title: "持续进化",
    icon: Cloud,
    copy: "端侧承担实时识别、预判与控制；云端承担长期学习和全局优化。匿名化、脱敏化的特征摘要与统计信息用于参数修正和模型更新。",
    points: ["原始数据优先保留本地", "上传脱敏特征摘要与统计结果", "优化模型或参数回传终端"],
    metrics: [["4 环", "云边协同连续链路"], ["端侧", "优先实时决策"]],
  },
];

const preprocessing = [
  ["01", "时间同步", "统一多源时间戳，完成跨传感器对齐。"],
  ["02", "滤波降噪", "处理环境干扰、运动伪差、基线漂移与随机噪声。"],
  ["03", "标准化", "完成异常值处理、标准化与滑动窗口切分。"],
  ["04", "特征提取", "将处理后的多模态信号转化为结构化特征向量。"],
  ["05", "标注质控", "结合动作阶段、震颤状态与专家校核形成可训练样本。"],
];

const evidenceMetrics = [
  { value: "92.3%", label: "测试集准确率", copy: "50 名患者、14 天监测条件下的测试结果。", tone: "primary" },
  { value: "91.7%", label: "宏平均精确率", copy: "测试集 sample-level macro precision。" },
  { value: "92.1%", label: "宏平均召回率", copy: "测试集 sample-level macro recall。" },
  { value: "7.9%", label: "样本级假阴性率", copy: "与事件级漏报率采用不同统计口径。" },
  { value: "4.1%", label: "事件级漏报率", copy: "按震颤事件统计，不与样本级指标混用。" },
  { value: "150+h", label: "临床子集", copy: "30 名 H&Y 1–3 级患者受控标准动作数据。" },
];

const dataSources = [
  { title: "临床合作数据", copy: "合作机构受控标准动作采集，覆盖不同症状阶段与任务场景。", icon: Building2 },
  { title: "真实使用数据", copy: "社区、居家与试用场景中的操作记录和反馈，用于优化产品适配。", icon: House },
  { title: "公开基准数据", copy: "PhysioNet 公开数据用于模型预训练，与项目自身数据共同支撑训练流程。", icon: Database },
];

const validationMethods = [
  ["LOSO", "留一患者交叉验证", "每轮留出一名患者作为独立测试，评估面对未见个体时的泛化表现。"],
  ["HOLD-OUT", "独立数据划分", "训练、验证、测试按 70% / 15% / 15% 的患者小时比例划分。"],
  ["SCENARIO", "真实场景试点", "通过专科机构、社区与居家试用发现算法、结构和交互问题。"],
];

const trialImpact = [
  { value: "+62%", label: "自主进食成功率", scope: "帕友关爱中心试点" },
  { value: "4.8/5", label: "患者操作满意度", scope: "帕友关爱中心试点" },
  { value: "-1.8h", label: "家庭日均照护时长", scope: "社区居家试点 · 15 户" },
  { value: "-34%", label: "照护者焦虑指数", scope: "社区居家试点 · 15 户" },
];

const trialFeedback = [
  ["电机响应有延迟", "持续优化防抖算法响应"],
  ["手柄太滑", "增强手柄防滑设计"],
  ["模块切换需要更稳定顺畅", "提升磁吸模块切换体验"],
  ["希望续航更长、充电更简单", "提升续航并简化充电方式"],
];

const tiers = [
  {
    name: "启航系列",
    type: "普通版",
    price: "¥699",
    badge: "性价比首选",
    copy: "面向预算敏感用户与初次体验者，覆盖进食、穿衣等日常核心需求。",
    specs: ["IMU + 标准 EMG", "握力基础情境感知", "本地基础 AI 预判", "防抖勺与穿衣磁吸接口"],
  },
  {
    name: "睿智系列",
    type: "Pro 版",
    price: "¥1,999–2,999",
    badge: "全功能旗舰",
    copy: "面向对性能、数据监测与个性化适配有更高要求的用户。",
    specs: ["高密度 EMG 阵列", "IMU + 磁编码器", "语音与多情境感知", "帕益助平台服务"],
  },
  {
    name: "守护系列",
    type: "定制版",
    price: "按需定价",
    badge: "机构 / 特殊需求",
    copy: "面向特殊症状个体与专业机构，按需求进行参数调优、传感器增配与功能模块开发。",
    specs: ["个体化参数标定", "特殊传感器增配", "机构级服务支持", "开放式模块扩展"],
  },
];

const platformFeatures = [
  { title: "健康趋势", copy: "呈现震颤频率、使用行为与长期变化。", icon: BarChart3 },
  { title: "亲友云守护", copy: "在尊重隐私的前提下，为家庭提供连续参考。", icon: HeartHandshake },
  { title: "远程服务参考", copy: "为专业人员提供更连续的数据线索与随访依据。", icon: Cloud },
  { title: "病友交流", copy: "让经验、鼓励与社会支持成为服务的一部分。", icon: Sparkles },
];

const dashboardModes = [
  { id: "overview", label: "健康概览", title: "让长期变化，更容易被理解。", icon: BarChart3 },
  { id: "trend", label: "震颤趋势", title: "把连续记录，转化为清晰趋势。", icon: Activity },
  { id: "family", label: "亲友守护", title: "在尊重隐私的前提下，连接家庭支持。", icon: HeartHandshake },
  { id: "service", label: "远程服务", title: "为随访与服务，提供连续参考。", icon: Cloud },
];

const serviceSteps = [
  ["01", "售前咨询", "解答产品信息、使用方法和注意事项，并为符合条件的用户提供 7 天试用申请。"],
  ["02", "设备选择与试用", "结合使用场景与操作需求，匹配产品版本、配件和体验方式。"],
  ["03", "培训与指导", "提供正确、安全的设备使用培训，并补充个性化饮食与运动建议。"],
  ["04", "配送与调试", "提供送货上门、组装调试与现场演示，确认用户能够独立操作。"],
  ["05", "定期随访", "交付后 7 天、30 天及每季度回访，形成闭环服务记录。"],
  ["06", "维修与保养", "提供维修、保养和配件更换；符合条件的返厂维修期间提供备用设备。"],
];

const marketStats = [
  ["TAM", "27.3", "亿元", "基于目标患者基数与加权客单价测算的存量市场"],
  ["SAM", "13.65", "亿元", "结合初期产品定位、合规能力与渠道覆盖估算"],
  ["SOM", "2,730–5,460", "万元 / 年", "按初期可服务市场 2%–4% 渗透测算的 1–2 年目标"],
];

const ipItems = [
  ["01", "大数据清洗预处理软件 V1.0", "数据基石 · 2025SR0449053"],
  ["02", "基于人工智能的大数据处理挖掘系统 V1.0", "智能核心 · 2024SR0380546"],
  ["03", "机器学习算法优化评估系统 V1.0", "调优专家 · 2024SR1056710"],
  ["04", "大数据用户行为分析软件 V1.0", "需求洞察 · 2025SR0431816"],
  ["05", "人工智能大数据云服务系统 V1.0", "云端大脑 · 2024SR0147521"],
  ["06", "大数据可视化分析平台 V1.0", "交互窗口 · 2025SR0427123"],
];

const faqs = [
  ["它与普通防抖勺有什么不同？", "传统方案多依据 IMU 阈值在检测到震颤后响应；帕不怕的 AI 技术方案融合 EMG、IMU、磁编码器与情境信号，面向震颤发生前的预判式补偿。"],
  ["产品会替代用户的自主动作吗？", "不会。产品定位是辅助稳定而不是替代动作，设计目标是保留使用者的动作意图与主动参与。"],
  ["是否只有进食功能？", "不是。产品平台通过标准化磁吸接口覆盖进食与穿衣核心场景，并将肌肉舒缓、步态引导作为后续规划模块。"],
  ["数据如何处理？", "数据服务方案采用端侧优先、本地特征库存储与匿名脱敏上传的云边协同方式。平台数据用于趋势展示和服务优化，不替代专业医疗诊断。"],
  ["HTPN 与 SAC 分别负责什么？", "HTPN 负责多模态局部特征提取、时序依赖建模和震颤预判；轻量化 Soft Actor-Critic 负责生成三轴补偿量、控制增益、相位提前量和模式切换等连续参数。"],
  ["测试数据采用怎样的口径？", "92.3% 为测试集准确率，4.1% 为事件级漏报率，7.9% 为测试集样本级漏报率。不同统计口径分别呈现，不合并比较。"],
];

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

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
    let visible = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = window.matchMedia("(max-width: 720px)").matches;
    const nodes = Array.from({ length: compact ? 24 : 42 }, (_, index) => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00016,
      vy: (Math.random() - 0.5) * 0.00016,
      r: index % 8 === 0 ? 2.2 : 1,
    }));

    const resize = () => {
      const box = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = box.width;
      height = box.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      if (!visible) return;
      ctx.clearRect(0, 0, width, height);
      for (const node of nodes) {
        if (!reduced) {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x <= 0 || node.x >= 1) node.vx *= -1;
          if (node.y <= 0 || node.y >= 1) node.vy *= -1;
        }
      }
      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        const ax = a.x * width;
        const ay = a.y * height;
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const bx = b.x * width;
          const by = b.y * height;
          const distance = Math.hypot(ax - bx, ay - by);
          if (distance < 128) {
            ctx.strokeStyle = warm
              ? `rgba(184,61,16,${0.12 * (1 - distance / 128)})`
              : `rgba(255,180,120,${0.18 * (1 - distance / 128)})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
        ctx.fillStyle = warm ? "rgba(184,61,16,.42)" : "rgba(255,190,136,.56)";
        ctx.beginPath();
        ctx.arc(ax, ay, a.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduced) frame = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible) draw();
    });
    observer.observe(canvas);
    resize();
    window.addEventListener("resize", resize);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [warm]);

  return <canvas ref={canvasRef} className="signal-canvas" aria-hidden="true" />;
}

function ChapterHeader({
  number,
  eyebrow,
  title,
  copy,
  light = false,
}: {
  number: string;
  eyebrow: string;
  title: React.ReactNode;
  copy: string;
  light?: boolean;
}) {
  return (
    <header className={cx("chapter-header reveal", light && "chapter-header-light")}>
      <div className="chapter-index"><span>{number}</span><i /><small>{eyebrow}</small></div>
      <div className="chapter-title"><span>{eyebrow}</span><h2>{title}</h2></div>
      <p>{copy}</p>
    </header>
  );
}

function ScenarioSwitcher() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const item = scenarios[active];
  const Icon = item.icon;

  const move = (direction: number) => {
    const next = (active + direction + scenarios.length) % scenarios.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="scenario-switcher reveal">
      <div className="scenario-tabs" role="tablist" aria-label="生活场景产品矩阵">
        {scenarios.map((scenario, index) => {
          const SceneIcon = scenario.icon;
          return (
            <button
              key={scenario.id}
              ref={(node) => { tabRefs.current[index] = node; }}
              id={`scene-tab-${scenario.id}`}
              role="tab"
              tabIndex={active === index ? 0 : -1}
              aria-selected={active === index}
              aria-controls={`scene-panel-${scenario.id}`}
              onClick={() => setActive(index)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); move(1); }
                if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); move(-1); }
              }}
            >
              <span>{scenario.index}</span><SceneIcon size={20} /><strong>{scenario.label}{scenario.planned && <small>规划</small>}</strong><ChevronRight size={17} />
            </button>
          );
        })}
      </div>
      <section
        className="scenario-panel"
        id={`scene-panel-${item.id}`}
        role="tabpanel"
        aria-labelledby={`scene-tab-${item.id}`}
      >
        <div className="scenario-visual" data-scene={item.id} aria-hidden="true">
          <div className="scenario-orbit"><span /><span /><span /><Icon /></div>
          <small>SCENARIO / {item.index}</small>
        </div>
        <div className="scenario-copy">
          <span>{item.index} · {item.label}</span>
          <h3>{item.title}</h3>
          <strong>{item.lead}</strong>
          <p>{item.copy}</p>
          <div className="tag-row">{item.tags.map((tag) => <small key={tag}>{tag}</small>)}</div>
          <div className="scenario-controls"><button aria-label="上一个场景" onClick={() => move(-1)}><ChevronLeft /></button><span aria-live="polite">{active + 1} / {scenarios.length}</span><button aria-label="下一个场景" onClick={() => move(1)}><ChevronRight /></button></div>
        </div>
      </section>
    </div>
  );
}

function EngineeringViewer() {
  return (
    <div className="engineering-viewer reveal">
      <div className="engineering-media">
        <div className="engineering-image-stack">
          <figure>
            <img src="./smart-handle-side.jpg" alt="智能感知手柄侧视高清剖面结构" loading="lazy" width="1672" height="570" />
            <figcaption><span>01</span> 侧视剖面</figcaption>
          </figure>
          <figure>
            <img src="./smart-handle-top.jpg" alt="智能感知手柄俯视高清剖面结构" loading="lazy" width="1672" height="391" />
            <figcaption><span>02</span> 俯视剖面</figcaption>
          </figure>
        </div>
        <span className="source-badge"><ScanLine size={15} /> SMART HANDLE / CUTAWAY VIEW</span>
      </div>
      <div className="engineering-copy">
        <span className="micro-label">PRODUCT ARCHITECTURE</span>
        <h3>为长期握持，也为长期使用而设计。</h3>
        <p>手柄内部集成传感、主控、供电与通信单元；LRA 触觉反馈配置于独立的模块化执行平台。核心传感单元独立封装，电池采用标准化、无工具快拆设计。</p>
        <div className="engineering-spec-grid">
          <article><BatteryCharging /><strong>可更换电池模组</strong><small>产品使用寿命可延长 2–3 年</small></article>
          <article><Boxes /><strong>独立传感模组</strong><small>局部故障不必更换整个手柄</small></article>
          <article><ShieldCheck /><strong>多性能材质组合</strong><small>兼顾舒适、安全、强度与耐磨</small></article>
          <article><PackageCheck /><strong>无工具快拆</strong><small>降低长期使用成本</small></article>
        </div>
      </div>
    </div>
  );
}

function TechnologyLab() {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const item = techCapabilities[active];
  const Icon = item.icon;
  const move = (direction: number) => {
    const next = (active + direction + techCapabilities.length) % techCapabilities.length;
    setActive(next);
    refs.current[next]?.focus();
  };
  return (
    <div className="technology-lab reveal">
      <div className="technology-tabs" role="tablist" aria-label="技术核心能力">
        {techCapabilities.map((tab, index) => {
          const TabIcon = tab.icon;
          return (
            <button
              key={tab.id}
              ref={(node) => { refs.current[index] = node; }}
              role="tab"
              id={`tech-tab-${tab.id}`}
              aria-controls={`tech-panel-${tab.id}`}
              aria-selected={active === index}
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); move(1); }
                if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); move(-1); }
              }}
            ><span>{tab.index}</span><TabIcon size={18} /><strong>{tab.title}</strong></button>
          );
        })}
      </div>
      <section className="technology-panel" role="tabpanel" id={`tech-panel-${item.id}`} aria-labelledby={`tech-tab-${item.id}`}>
        <div className="technology-panel-copy">
          <span>{item.eyebrow}</span><h3>{item.title}</h3><p>{item.copy}</p>
          <ul>{item.points.map((point) => <li key={point}><Check size={15} />{point}</li>)}</ul>
          <div className="technology-metrics">{item.metrics.map(([value, label]) => <article key={label}><strong>{value}</strong><small>{label}</small></article>)}</div>
        </div>
        <div className="technology-radar" aria-hidden="true">
          <div className="radar-grid" /><div className="radar-orbit"><span /><span /><span /><Icon /></div>
          <small>ACTIVE / {item.id.toUpperCase()}</small>
        </div>
      </section>
    </div>
  );
}

function CompensationDemo() {
  const [level, setLevel] = useState<"low" | "medium" | "high">("medium");
  const levels = [
    { id: "low", label: "低幅" },
    { id: "medium", label: "中幅" },
    { id: "high", label: "高幅" },
  ] as const;
  const levelLabel = levels.find((item) => item.id === level)?.label;
  return (
    <section className="compensation-demo reveal" id="compensation-demo" aria-labelledby="compensation-title">
      <div className="compensation-copy">
        <span className="micro-label">INTERACTIVE PRINCIPLE</span>
        <h3 id="compensation-title">看见三轴反向补偿</h3>
        <p>切换示意输入，直观看见“多模态输入—补偿决策—三轴执行”的控制关系。</p>
        <div className="principle-switch" role="group" aria-label="切换示意输入幅度">
          {levels.map((item) => <button key={item.id} aria-pressed={level === item.id} onClick={() => setLevel(item.id)}>{item.label}</button>)}
        </div>
        <small className="demo-disclaimer"><ShieldCheck size={14} /> 原理可视化，不模拟患者、设备或 AI 结果</small>
      </div>
      <div className="compensation-visual" data-level={level}>
        <div className="wave-row raw-wave"><span>输入信号</span><i /><strong>{levelLabel}</strong></div>
        <div className="wave-arrow"><ArrowDown /><span>三轴反向补偿</span></div>
        <div className="wave-row calm-wave"><span>执行输出</span><i /><strong>动态</strong></div>
        <div className="demo-metrics"><article><strong>HTPN</strong><span>时序预判</span></article><article><strong>SAC</strong><span>参数决策</span></article><article><strong>3 AXIS</strong><span>反向补偿</span></article></div>
      </div>
    </section>
  );
}

function HealthDashboard() {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const mode = dashboardModes[active];

  const move = (direction: number) => {
    const next = (active + direction + dashboardModes.length) % dashboardModes.length;
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div className="dashboard reveal">
      <aside className="dashboard-sidebar">
        <div className="dashboard-brand"><img className="brand-logo" src="./brand-mark-v2.jpg" alt="" width="158" height="151" /><strong>帕益助</strong></div>
        <div className="dashboard-feature-list" role="tablist" aria-label="平台规划功能">
          {dashboardModes.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                ref={(node) => { refs.current[index] = node; }}
                id={`dashboard-tab-${item.id}`}
                role="tab"
                aria-selected={active === index}
                aria-controls={`dashboard-panel-${item.id}`}
                tabIndex={active === index ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); move(1); }
                  if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); move(-1); }
                }}
              >
                <Icon />{item.label}
              </button>
            );
          })}
        </div>
        <small>PLANNED SERVICE PLATFORM</small>
      </aside>
      <section className="dashboard-main" id={`dashboard-panel-${mode.id}`} role="tabpanel" aria-labelledby={`dashboard-tab-${mode.id}`}>
        <header><div><span>智能健康数据平台 · {mode.label}</span><h3 aria-live="polite">{mode.title}</h3></div><small className="dashboard-note"><ShieldCheck /> 平台功能规划 · 无患者数据</small></header>
        <div className="dashboard-kpis"><article><span>震颤趋势</span><strong>连续<small>记录</small></strong><i>长期变化可视化</i></article><article><span>使用行为</span><strong>场景<small>汇总</small></strong><i>频次与模块激活</i></article><article><span>数据路径</span><strong className="online">端侧优先</strong><i>匿名脱敏协同</i></article></div>
        <div className="dashboard-grid">
          <article className="trend-card"><div><span>震颤变化趋势</span><small>功能界面示意</small></div><div className="trend-flow" aria-label="从设备记录到趋势呈现的功能路径"><span><Activity /><strong>设备记录</strong></span><ArrowRight /><span><Database /><strong>行为汇总</strong></span><ArrowRight /><span><BarChart3 /><strong>趋势呈现</strong></span></div><p>将设备使用、震颤变化与行为记录转化为长期趋势，为患者、家属和专业人员提供连续参考。</p></article>
          <article className="task-card"><span>智能提醒</span><div><Check /><p><strong>用药提醒</strong><small>日常自我管理</small></p></div><div><TimerReset /><p><strong>饮食与作息</strong><small>个性化健康管理</small></p></div><div><MoonStar /><p><strong>医疗预约</strong><small>服务资源协同</small></p></div></article>
        </div>
      </section>
    </div>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq-list reveal">
      {faqs.map(([question, answer], index) => {
        const expanded = open === index;
        return (
          <article key={question} className={expanded ? "open" : ""}>
            <h3><button aria-expanded={expanded} aria-controls={`faq-panel-${index}`} onClick={() => setOpen(expanded ? -1 : index)}><span>0{index + 1}</span><strong>{question}</strong><i><X size={18} /></i></button></h3>
            <div id={`faq-panel-${index}`} hidden={!expanded}><p>{answer}</p></div>
          </article>
        );
      })}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const firstNavLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) entry.target.classList.add("in-view");
    }, { threshold: 0.08, rootMargin: "0px 0px -5%" });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    let ticking = false;
    const update = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const progress = total > 0 ? window.scrollY / total : 0;
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
        ticking = false;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", update); };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    firstNavLinkRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  return (
    <>
      <a className="skip-link" href="#content">跳到主要内容</a>
      <div className="scroll-progress" ref={progressRef} />
      <header className="site-header" id="top">
        <div className="shell header-inner">
          <a className="brand" href="#top" aria-label="帕不怕首页"><img className="brand-logo" src="./brand-mark-v2.jpg" alt="" width="158" height="151" /><span><strong>帕不怕</strong><small>ParkinFearless</small></span></a>
          <nav className={cx("main-nav", menuOpen && "open")} id="main-navigation" aria-label="主导航">
            <a ref={firstNavLinkRef} href="#need" onClick={closeMenu}>需求价值</a><a href="#product" onClick={closeMenu}>产品系统</a><a href="#technology" onClick={closeMenu}>核心技术</a><a href="#research" onClick={closeMenu}>验证研究</a><a href="#service" onClick={closeMenu}>服务与产业化</a><a href="#about" onClick={closeMenu}>品牌合作</a>
          </nav>
          <a className="header-cta" href="#cooperate">合作咨询 <ArrowUpRight size={15} /></a>
          <button ref={menuButtonRef} className="menu-button" aria-label={menuOpen ? "关闭导航" : "打开导航"} aria-controls="main-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <main id="content" tabIndex={-1}>
        <section className="hero" aria-labelledby="hero-title">
          <img className="hero-photo" src="./hero-lifestyle-v2.webp" alt="长者在居家空间使用帕不怕智能生活辅助产品" width="1728" height="974" fetchPriority="high" />
          <div className="hero-overlay" /><div className="hero-grid" /><SignalCanvas />
          <div className="shell hero-layout">
            <div className="hero-copy">
              <div className="hero-status"><span><i /> 多场景智能生活辅助系统</span><small>ACTIVE INTELLIGENCE</small></div>
              <p className="eyebrow">AI × EMG × HUMAN DIGNITY</p>
              <h1 id="hero-title">在震颤之前，<br /><em>把生活稳稳接住。</em></h1>
              <p className="hero-lead">以智能感知手柄为核心，融合多模态生物传感、边缘人工智能与模块化执行平台，面向进食、穿衣等高频日常场景提供主动辅助。</p>
              <div className="hero-actions"><a className="button button-primary" href="#product">探索完整产品系统 <ArrowRight /></a><a className="button-play" href="#technology"><span><Play fill="currentColor" /></span><strong>查看技术链路<small>从多模态采集到产品迭代的 8 阶段闭环</small></strong></a></div>
            </div>
            <aside className="hero-console" aria-label="核心性能摘要">
              <div className="hero-orbit"><span /><span /><span /><strong>PF</strong><small>ACTIVE INTELLIGENCE</small></div>
              <article className="hero-chip chip-one"><span>端侧 NPU 推理延迟</span><strong>8.5<small>ms</small></strong></article>
              <article className="hero-chip chip-two"><span>HTPN 预测提前量</span><strong>150<small>ms</small></strong></article>
              <article className="hero-chip chip-three"><span>HTPN 模型参数量</span><strong>94<small>K</small></strong></article>
              <p>多模态感知 · 端侧智能 · 三轴补偿</p>
            </aside>
            <div className="hero-bottom"><a href="#need"><ArrowDown /><span>向下探索</span></a><small>北京帕护智能科技有限公司</small></div>
          </div>
        </section>

        <section className="proof-band" aria-label="项目进展数据"><div className="shell proof-grid">{proofStats.map((stat) => <article key={stat.label}><small>{stat.note}</small><strong>{stat.value}</strong><span>{stat.label}</span></article>)}</div></section>

        <section className="chapter chapter-need" id="need">
          <div className="shell">
            <ChapterHeader number="01" eyebrow="VALUE & NEED" title={<>从真实生活出发，<br />让日常重新回到自己手中。</>} copy="项目从问卷、专科机构访谈与居家观察出发，不把需求简化为一把勺子的抖动，而是关注进食、穿衣、行走与长期照护中的连续体验。" />
            <div className="manifesto reveal"><div><span className="micro-label">WHY IT MATTERS</span><blockquote>我们解决的不是一把勺子的抖动，而是一个人对日常的<strong>掌控感。</strong></blockquote></div><p>中国帕金森患者总数超过 500 万。手部震颤让独立进食、穿衣等基本动作变得困难，也给家庭带来持续照护压力。帕不怕以“实现价值，有帕不怕”为服务理念，从真实任务重新定义辅助产品。</p></div>
            <div className="needs-grid reveal">{needs.map((need) => { const Icon = need.icon; return <article key={need.title}><div><Icon /><span>需求洞察</span></div><strong>{need.value}<small>%</small></strong><h3>{need.title}</h3><p>{need.copy}</p><i><span style={{ width: `${need.value}%` }} /></i></article>; })}</div>
            <div className="market-gap reveal"><div className="market-gap-copy"><span className="micro-label">THE GAP</span><h3>昂贵、单一、被动响应。<br />真实需求，远不止如此。</h3><p>国外产品价格与渠道门槛较高，国内主流产品多聚焦单一进食场景。帕不怕尝试以更可及的价格、主动预判路径和模块化平台覆盖更多日常动作。</p></div><div className="comparison-cards"><article><span>海外主流方案</span><strong>约 ¥2,100</strong><small>以进食单场景为主</small></article><article><span>国内主流方案</span><strong>约 ¥1,900</strong><small>无人机姿态解算算法</small></article><article className="focus"><span>帕不怕 · 启航系列</span><strong>¥699</strong><small>AI 预判 + 模块化多场景</small><i>普惠定价</i></article></div></div>
          </div>
        </section>

        <section className="chapter chapter-product" id="product">
          <div className="shell">
            <ChapterHeader number="02" eyebrow="PRODUCT PLATFORM" title={<>一支智能手柄，<br />延展多场景生活辅助。</>} copy="产品系统不仅包含智能感知手柄，还由连接器、计数器、AI 计算单元、模块化执行平台与配套数据服务系统共同构成。" />
          </div>
          <div className="product-showcase reveal">
            <img src="./product-hero-v2.webp" alt="帕不怕智能手柄、勺与叉配件的高清产品视觉" width="1728" height="974" loading="lazy" />
            <div className="product-showcase-overlay" />
            <div className="product-callout callout-one"><span /><div><strong>智能感知手柄</strong><small>多模态感知入口</small></div></div>
            <div className="product-callout callout-two"><span /><div><strong>AI 计算单元</strong><small>端侧识别、预判与策略生成</small></div></div>
            <div className="product-callout callout-three"><span /><div><strong>模块化执行平台</strong><small>三轴补偿与标准化接口</small></div></div>
            <div className="product-showcase-caption"><span>ENGINEERED FOR EVERYDAY LIFE</span><strong>≤350g<small>整机重量控制</small></strong></div>
          </div>
          <div className="shell product-system-wrap"><ProductSystemMap /></div>
          <div className="shell"><div className="subsection-head reveal"><span>02.2 / SCENARIO MATRIX</span><h3>两大核心场景，规划两类拓展模块。</h3><p>不同配件通过智能磁吸底座与 ROS2 标准化机电气接口接入同一平台；规划模块在入口处明确标识。</p></div><ScenarioSwitcher /></div>
          <div className="shell"><div className="subsection-head reveal"><span>02.3 / INTERNAL ARCHITECTURE</span><h3>从外部握持，到内部模组。</h3><p>独立传感、快拆电池和标准化连接，共同支撑稳定、持续的日常使用。</p></div><EngineeringViewer /></div>
          <div className="shell kit-card reveal"><div className="kit-copy"><span className="micro-label">PORTABLE STORAGE SYSTEM</span><h3>软质双层收纳，<br />让设备与配件各得其所。</h3><p>轻便可折叠的软质收纳盒采用双隔层设计，上层翻提网袋用于数据线等附件收纳，下层放置产品组件并提供日常携带防护。</p><ul><li><PackageCheck />软质双隔层设计</li><li><Link2 />上层翻提网袋与数据线层</li><li><ShieldCheck />轻便、可折叠、便于携带</li></ul></div><div className="kit-image"><img src="./product-kit-enhanced.webp" alt="帕不怕软质双层产品收纳盒" width="1254" height="1254" loading="lazy" /><span>PORTABLE STORAGE / DOUBLE LAYER</span></div></div>
        </section>

        <section className="chapter chapter-technology" id="technology"><SignalCanvas />
          <div className="shell technology-content">
            <ChapterHeader number="03" eyebrow="CORE TECHNOLOGY" light title={<>智能感知，自主决策，<br />精准执行，持续进化。</>} copy="以“感知—决策—执行—进化”构成完整技术闭环：HTPN 负责多模态时序预测，轻量化 SAC 面向端侧个体化策略适配，三轴平台执行补偿。" />
            <div className="sensor-rack reveal"><header><span>SENSING ARRAY</span><strong>6 类感知与交互单元</strong><small>多模态感知阵列</small></header><div>{sensors.map((sensor) => { const Icon = sensor.icon; return <article key={sensor.code}><span>{sensor.code}</span><Icon /><h3>{sensor.title}</h3><strong>{sensor.spec}</strong><p>{sensor.copy}</p></article>; })}</div></div>
            <TechnologyLab />
            <div className="diagram-shell reveal"><EightStagePipeline /></div>
            <div className="model-layout">
              <div className="diagram-shell reveal"><HTPNModelDiagram /></div>
              <aside className="sac-card reveal"><span>SAC / EDGE POLICY</span><BrainCircuit /><h3>轻量化 SAC</h3><strong>连续补偿参数生成</strong><p>状态空间整合震颤特征、预警、压力、姿态和场景变量，动作空间对应三轴补偿量、控制增益、相位提前量与双模切换系数。</p><div><span>状态</span><ArrowRight /><span>策略</span><ArrowRight /><span>反馈</span><RotateCcw /></div><small>SOFT ACTOR-CRITIC / EDGE DECISION</small></aside>
            </div>
            <div className="preprocess-card reveal"><div className="preprocess-intro"><span className="micro-label">DATA PREPROCESSING</span><h3>先把信号变得可比较，<br />再让模型学习。</h3><p>多模态数据在进入模型前，需要经过同步、降噪、标准化、特征提取与标注质控。</p></div><ol>{preprocessing.map(([index, title, copy]) => <li key={index}><span>{index}</span><div><strong>{title}</strong><p>{copy}</p></div></li>)}</ol></div>
            <div className="diagram-shell reveal"><CloudEdgeLoop /></div>
            <CompensationDemo />
          </div>
        </section>

        <section className="chapter chapter-research" id="research">
          <div className="shell">
            <ChapterHeader number="04" eyebrow="VALIDATION & EVIDENCE" title={<>真实数据，<br />以清晰口径建立可信证据。</>} copy="模型测试、合作机构数据与真实场景试点采用不同样本和统计口径，每一项数据都与对应测试条件一同呈现。" />
            <div className="evidence-metrics reveal">{evidenceMetrics.map((metric) => <article key={metric.label} className={metric.tone === "primary" ? "primary" : ""}><span>{metric.label}</span><strong>{metric.value}</strong><p>{metric.copy}</p>{metric.tone === "primary" && <i><span style={{ width: "92.3%" }} /></i>}</article>)}</div>
            <div className="dataset-layout"><div className="diagram-shell light-diagram reveal"><DataSplitDiagram /></div><aside className="dataset-source reveal"><span className="micro-label">SOURCE & VALIDATION</span><h3>约 230 患者小时，按用途明确拆分。</h3><p>其中 150+ 患者小时来自 30 名 H&amp;Y 1–3 级患者的临床受控标准动作采集；整体数据按训练、验证与测试用途独立划分。</p><div>{dataSources.map((source) => { const Icon = source.icon; return <article key={source.title}><Icon /><div><strong>{source.title}</strong><p>{source.copy}</p></div></article>; })}</div></aside></div>
            <div className="validation-methods reveal">{validationMethods.map(([code, title, copy]) => <article key={code}><span>{code}</span><strong>{title}</strong><p>{copy}</p></article>)}</div>
          </div>
          <div className="trial-section">
            <div className="shell trial-layout">
              <div className="trial-gallery reveal"><figure className="trial-main"><img src="./field-trial-a-restored.jpg" alt="团队在真实场景中开展产品试用" width="973" height="1616" loading="lazy" /><figcaption>专科机构 · 产品体验与结构反馈</figcaption></figure><figure><img src="./field-trial-b-restored.jpg" alt="长者参与社区与居家产品试用" width="1454" height="1082" loading="lazy" /><figcaption>社区 / 居家 · 日常任务试用</figcaption></figure></div>
              <div className="trial-story reveal"><span className="micro-label">REAL-WORLD PILOT</span><h3>从专业机构，<br />走进真实生活场景。</h3><div className="trial-impact">{trialImpact.map((item) => <article key={item.label}><small>{item.scope}</small><strong>{item.value}</strong><span>{item.label}</span></article>)}</div><p>两轮真实场景试点覆盖北京帕友关爱中心与社区家庭，围绕自主进食、操作体验与家庭照护形成连续反馈。</p></div>
            </div>
            <div className="shell feedback-loop reveal"><header><span>USER VOICE → PRODUCT RESPONSE</span><h3>真实反馈，持续塑造更自然的产品体验。</h3></header><div>{trialFeedback.map(([feedback, action], index) => <article key={feedback}><span>0{index + 1}</span><div><small>用户声音</small><strong>“{feedback}”</strong></div><ArrowRight /><div><small>产品回应</small><strong>{action}</strong></div></article>)}</div></div>
          </div>
          <div className="shell evidence-docs reveal"><header><span className="micro-label">TECHNICAL DOCUMENTATION</span><h3>查新与检测资料，<br />让技术成果有据可查。</h3></header><article><img src="./source/novelty-search-report-cover.jpg" alt="科技查新报告封面" width="1356" height="1914" loading="lazy" /><div><FileCheck2 /><span>科技查新报告</span><strong>技术查新资料</strong></div></article><article><img src="./source/commissioned-test-report-cover.jpg" alt="委托检测报告封面" width="1266" height="1791" loading="lazy" /><div><BadgeCheck /><span>委托检测报告</span><strong>产品检测资料</strong></div></article></div>
        </section>

        <section className="chapter chapter-service" id="service">
          <div className="shell">
            <ChapterHeader number="05" eyebrow="SERVICE & INDUSTRIALIZATION" title={<><span className="title-line">产品版本与服务体系规划，</span><span className="title-line">连接长期产品价值。</span></>} copy="围绕不同预算与机构需求规划三层产品版本；帕益助平台规划长期趋势、亲友守护和远程服务，服务体系覆盖咨询、试用、交付、随访与维护。" />
            <div className="version-grid reveal">{tiers.map((tier, index) => <article key={tier.name} className={index === 1 ? "featured" : ""}><header><span>0{index + 1} / {tier.type}</span><small>{tier.badge} · 版本规划</small></header><h3>{tier.name}</h3><strong>{tier.price}</strong><p>{tier.copy}</p><ul>{tier.specs.map((spec) => <li key={spec}><Check />{spec}</li>)}</ul></article>)}</div>
            <div className="subsection-head reveal"><span>05.2 / PAIYIZHU PLATFORM</span><h3>把一次使用，连接成长周期服务。</h3><p>帕益助将设备记录转化为健康趋势、智能提醒、亲友守护与远程服务入口。</p></div>
            <HealthDashboard />
            <div className="platform-features reveal">{platformFeatures.map((feature) => { const Icon = feature.icon; return <article key={feature.title}><Icon /><span>PLATFORM</span><strong>{feature.title}</strong><p>{feature.copy}</p><ArrowUpRight /></article>; })}</div>
            <div className="service-layout"><div className="service-intro reveal"><span className="micro-label">CARE CONTINUUM</span><h3>服务从售前开始，<br />延伸到随访与维护。</h3><p>客户信息系统沉淀反馈，持续优化产品与服务。</p><div><strong>7 × 24</strong><span>全天候服务机制规划<small>咨询 · 维护 · 售后</small></span></div></div><ol className="service-timeline reveal">{serviceSteps.map(([index, title, copy]) => <li key={index}><span>{index}</span><div><strong>{title}</strong><p>{copy}</p></div><ArrowUpRight /></li>)}</ol></div>
          </div>

          <div className="scale-section"><SignalCanvas warm /><div className="shell scale-content"><div className="subsection-head light reveal"><span>05.4 / MARKET & GROWTH</span><h3>普惠产品背后，<br />是一条可持续的增长路径。</h3><p>从专业信任、规模触达到区域合作，连接长期产品价值。</p></div><div className="market-stats reveal">{marketStats.map(([code, value, unit, copy]) => <article key={code}><span>{code}</span><strong>{value}<small>{unit}</small></strong><p>{copy}</p></article>)}</div><div className="growth-path reveal"><article><span>01</span><Building2 /><strong>医院 · 康复机构</strong><p>试用、培训与专业反馈</p></article><ArrowRight /><article><span>02</span><Target /><strong>线上电商 · 养老院集采</strong><p>健康平台与机构批量采购</p></article><ArrowRight /><article><span>03</span><Cloud /><strong>海外代理与本地化</strong><p>区域认证与分销网络</p></article></div></div></div>

          <div className="shell ip-layout"><div className="ip-intro reveal"><span className="micro-label">INTELLECTUAL PROPERTY</span><h3>从数据基石，<br />到云端大脑。</h3><p>6 项已获授权软件著作权与多项专利申请、核心专利储备，共同覆盖数据处理、AI 决策、云边协同、可视化与模块化产品方向。</p><div className="ip-summary"><article><strong>6</strong><span>项已获授权软件著作权</span></article><article><strong>多项</strong><span>专利申请与核心储备</span></article></div></div><div className="ip-list reveal">{ipItems.map(([index, title, code]) => <article key={index}><span>{index}</span><div><strong>{title}</strong><small>{code}</small></div><FileCheck2 /></article>)}</div></div>
        </section>

        <section className="chapter chapter-about" id="about">
          <div className="shell about-layout">
            <ChapterHeader number="06" eyebrow="BRAND & COOPERATION" light title={<>科技重塑尊严，<br />关爱融入日常。</>} copy="北京帕护智能科技有限公司专注提升帕金森病患者生活品质，与神经内科医师、康复治疗师和患者共同把真实需求转化为可持续迭代的产品系统。" />
            <div className="values-grid reveal"><article><span>01</span><HeartHandshake /><strong>关爱</strong><p>从人的尊严与真实生活出发</p></article><article><span>02</span><Sparkles /><strong>创新</strong><p>用跨学科技术重做辅具体验</p></article><article><span>03</span><ShieldCheck /><strong>责任</strong><p>让先进技术更可靠、更可及</p></article></div>
            <div className="co-create reveal"><div><Workflow /><span>USER CO-CREATION</span></div><h3>让真实使用反馈，进入每一次产品进化。</h3><p>患者、照护者、医生、康复治疗师和社区服务方共同参与需求共创，让结构、算法和服务持续贴近真实生活。</p></div>
            <div className="network-band reveal"><span>协作验证网络</span><article><strong>8<small>家</small></strong><p>帕金森专业机构</p></article><i /><article><strong>32<small>家</small></strong><p>社区服务中心</p></article><i /><article><strong>26<small>家</small></strong><p>养老驿站</p></article><i /><article><strong>14<small>份</small></strong><p>正式合作文件</p></article><article><strong>4<small>份</small></strong><p>合作推进中</p></article></div>
          </div>
        </section>

        <section className="faq-section"><div className="shell faq-layout"><header className="faq-title reveal"><span className="micro-label">QUESTIONS / 01—06</span><h2>更完整地<br />了解帕不怕。</h2><p>关于技术路径、产品定位、数据处理与核心指标的常见问题。</p></header><Faq /></div></section>

        <section className="cooperate-section" id="cooperate"><SignalCanvas /><div className="shell cooperate-layout reveal"><div><span>BUILD THE FUTURE OF CARE</span><h2>让“有帕不怕”，<br />成为更多家庭的日常。</h2></div><div><p>欢迎医疗机构、康复团队、社区养老服务方、产业伙伴与公益组织，共同拓展产品应用、专业服务与普惠照护生态。</p><a className="button button-light" href="#resources">查看产品资料 <ArrowDown /></a></div></div><div className="shell resource-grid reveal" id="resources"><article><div className="qr-window qr-video"><img src="./project-resources.png" alt="产品实际应用视频二维码" /></div><span>01</span><strong>产品实际应用视频</strong><small>微信扫码，或<a href="http://liuwamiaoji.com/w/10JoFw" target="_blank" rel="noreferrer">直接打开</a></small></article><article><div className="qr-window qr-platform"><img src="./project-resources.png" alt="帕不怕平台二维码" /></div><span>02</span><strong>帕不怕平台</strong><small>微信扫码，或<a href="https://pabupa.readdy.co" target="_blank" rel="noreferrer">直接打开</a></small></article><article><div className="qr-window qr-report"><img src="./project-resources.png" alt="产品检测报告二维码" /></div><span>03</span><strong>产品检测报告</strong><small>微信扫码，或<a href="https://m.tuwenfujian.com/w/724144174764531712" target="_blank" rel="noreferrer">直接打开</a></small></article></div></section>
      </main>

      <footer><div className="shell footer-main"><a className="brand footer-brand" href="#top"><img className="brand-logo" src="./brand-mark-v2.jpg" alt="" width="158" height="151" /><span><strong>帕不怕</strong><small>ParkinFearless</small></span></a><p>北京帕护智能科技有限公司<br />多场景智能生活辅助系统</p><nav aria-label="页脚导航"><a href="#product">产品系统</a><a href="#technology">核心技术</a><a href="#research">验证研究</a><a href="#service">服务体系</a></nav></div><div className="shell footer-bottom"><small>帕不怕定位为生活辅助产品，不替代医疗诊断或治疗。性能数据均对应特定测试条件，市场数据为项目测算。</small><span>© 2026 PARKINFEARLESS</span></div></footer>
    </>
  );
}
