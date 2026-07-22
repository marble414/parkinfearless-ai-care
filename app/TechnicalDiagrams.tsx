type TechnicalDiagramProps = {
  className?: string;
};

type DiagramHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

function DiagramHeader({ eyebrow, title, description }: DiagramHeaderProps) {
  return (
    <figcaption className="td-header">
      <span className="td-eyebrow">{eyebrow}</span>
      <h3 className="td-title">{title}</h3>
      <p className="td-description">{description}</p>
    </figcaption>
  );
}

const productSystemNodes = [
  {
    index: "01",
    name: "智能感知手柄",
    role: "全方位情境感知端",
    detail: "汇集生理、运动、握持、环境与语音交互信息，形成系统的多模态感知入口。",
  },
  {
    index: "02",
    name: "连接器",
    role: "硬件互联与信号枢纽",
    detail: "连接手柄、AI 计算单元、模块化执行平台及计数器，承担数据传输与电力供应。",
  },
  {
    index: "03",
    name: "计数器",
    role: "数据沉淀与行为分析单元",
    detail: "记录使用频次、单次使用时长与功能模块激活次数，为行为分析形成基础数据。",
  },
  {
    index: "04",
    name: "AI 计算单元",
    role: "自主进化大脑",
    detail: "承载多模态数据融合、本地用户震颤特征库与强化学习控制策略优化能力。",
  },
  {
    index: "05",
    name: "模块化执行平台",
    role: "开放交互终端",
    detail: "通过智能磁吸底座与 ROS2 标准化机电气接口，接入不同功能执行配件。",
  },
  {
    index: "06",
    name: "配套数据服务系统",
    role: "长期健康管理与协同服务",
    detail: "提供使用记录、家属协同守护、健康趋势展示与后续远程服务支持。",
  },
] as const;

export function ProductSystemMap({ className }: TechnicalDiagramProps) {
  return (
    <figure
      className={joinClassNames("technical-diagram", "td-product-system", className)}
      data-diagram="product-system"
    >
      <DiagramHeader
        eyebrow="PRODUCT SYSTEM / SIX NODES"
        title="六个单元，构成完整产品系统"
        description="以智能感知手柄为感知入口，经硬件互联、端侧计算与模块化执行形成辅助闭环，并由配套数据服务系统承接长期记录与协同服务。"
      />

      <ol className="td-system-grid" aria-label="产品系统六个组成单元">
        {productSystemNodes.map((node) => (
          <li className="td-system-node" key={node.index} data-node={node.index}>
            <span className="td-node-index" aria-hidden="true">
              {node.index}
            </span>
            <div className="td-node-copy">
              <h4>{node.name}</h4>
              <p className="td-node-role">{node.role}</p>
              <p className="td-node-detail">{node.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}

const technicalPipelineStages = [
  {
    index: "01",
    title: "多模态数据采集",
    layer: "感知层",
    summary: "连续获取肌电、姿态、位置、握持、环境与语音交互信息。",
  },
  {
    index: "02",
    title: "数据清洗与预处理",
    layer: "质量控制",
    summary: "完成时间同步、滤波降噪、异常值处理、标准化与特征向量提取。",
  },
  {
    index: "03",
    title: "AI 特征挖掘与震颤识别",
    layer: "识别层",
    summary: "从多模态时序信号中提取判别性特征，形成震颤识别与前兆检测结果。",
  },
  {
    index: "04",
    title: "自适应 AI 预判与决策",
    layer: "决策层",
    summary: "结合用户状态与任务场景，生成补偿方向、强度、时机和控制模式参数。",
  },
  {
    index: "05",
    title: "精准执行与反馈",
    layer: "控制执行层",
    summary: "将决策参数转化为物理辅助动作，并回传执行状态与交互反馈。",
  },
  {
    index: "06",
    title: "云边协同进化",
    layer: "持续学习",
    summary: "连接终端实时能力与云端长期学习，使模型和策略能够持续迭代。",
  },
  {
    index: "07",
    title: "可视化与健康管理",
    layer: "平台层",
    summary: "将识别、控制与行为记录转化为趋势、报告和分层健康管理信息。",
  },
  {
    index: "08",
    title: "用户行为分析与产品迭代",
    layer: "持续进化层",
    summary: "分析真实使用规律，并将结果反馈至结构、功能、策略与交互优化。",
  },
] as const;

export function EightStagePipeline({ className }: TechnicalDiagramProps) {
  return (
    <figure
      className={joinClassNames("technical-diagram", "td-eight-stage", className)}
      data-diagram="eight-stage-pipeline"
    >
      <DiagramHeader
        eyebrow="TECHNOLOGY PIPELINE / 01—08"
        title="从多模态采集到产品迭代的八阶段技术链路"
        description="八个阶段依次连接感知、处理、识别、决策、执行、协同、管理与迭代，形成由真实使用数据驱动的完整技术闭环。"
      />

      <ol className="td-stage-list" aria-label="八阶段技术链路">
        {technicalPipelineStages.map((stage, stageIndex) => (
          <li className="td-stage" key={stage.index} data-stage={stage.index}>
            <div className="td-stage-marker" aria-hidden="true">
              <span>{stage.index}</span>
            </div>
            <div className="td-stage-copy">
              <span className="td-stage-layer">{stage.layer}</span>
              <h4>{stage.title}</h4>
              <p>{stage.summary}</p>
            </div>
            {stageIndex < technicalPipelineStages.length - 1 ? (
              <span className="td-flow-connector" aria-hidden="true">
                <span />
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </figure>
  );
}

const htpnInputs = ["EMG", "IMU", "视觉（实验采集）", "压力"] as const;
const htpnLayers = [
  {
    index: "01",
    name: "CNN",
    role: "局部特征提取",
    detail: "并行提取多模态序列中的局部模式特征。",
  },
  {
    index: "02",
    name: "BiLSTM",
    role: "时序依赖建模",
    detail: "双向建模震颤演变过程中的时间依赖关系。",
  },
  {
    index: "03",
    name: "Attention",
    role: "关键时间步加权",
    detail: "动态分配权重，聚焦与当前震颤状态相关的关键片段。",
  },
] as const;
const htpnOutputs = ["震颤类型判定", "震颤幅度回归", "150ms 预测提前量"] as const;

export function HTPNModelDiagram({ className }: TechnicalDiagramProps) {
  return (
    <figure
      className={joinClassNames("technical-diagram", "td-htpn", className)}
      data-diagram="htpn-model"
    >
      <DiagramHeader
        eyebrow="HTPN / HYBRID TEMPORAL PREDICTION NETWORK"
        title="CNN + BiLSTM + Attention 混合时序预测模型"
        description="HTPN 连接多模态局部特征提取、时序依赖建模与关键时间步加权，并面向震颤类型、幅度和预测提前量形成多任务输出。"
      />

      <div className="td-model-flow">
        <section className="td-model-group td-model-inputs" aria-labelledby="td-htpn-input-heading">
          <h4 id="td-htpn-input-heading">多模态输入</h4>
          <ul aria-label="HTPN 输入模态">
            {htpnInputs.map((input) => (
              <li key={input}>{input}</li>
            ))}
          </ul>
        </section>

        <span className="td-model-arrow" aria-hidden="true">
          <span />
        </span>

        <ol className="td-model-layers" aria-label="HTPN 三层模型架构">
          {htpnLayers.map((layer, layerIndex) => (
            <li key={layer.name} data-layer={layer.name.toLowerCase()}>
              <span className="td-layer-index" aria-hidden="true">
                {layer.index}
              </span>
              <div>
                <strong>{layer.name}</strong>
                <h4>{layer.role}</h4>
                <p>{layer.detail}</p>
              </div>
              {layerIndex < htpnLayers.length - 1 ? (
                <span className="td-layer-connector" aria-hidden="true">
                  <span />
                </span>
              ) : null}
            </li>
          ))}
        </ol>

        <span className="td-model-arrow" aria-hidden="true">
          <span />
        </span>

        <section className="td-model-group td-model-outputs" aria-labelledby="td-htpn-output-heading">
          <h4 id="td-htpn-output-heading">多任务输出</h4>
          <ul aria-label="HTPN 输出任务">
            {htpnOutputs.map((output, outputIndex) => (
              <li key={output}>
                <span aria-hidden="true">0{outputIndex + 1}</span>
                <strong>{output}</strong>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </figure>
  );
}

const cloudEdgeStages = [
  {
    index: "01",
    side: "EDGE",
    title: "端侧实时识别、预判与控制",
    detail: "设备本地完成状态识别、策略生成和执行控制，保证实际使用中的响应与连续性。",
  },
  {
    index: "02",
    side: "PRIVACY",
    title: "匿名化、脱敏化特征摘要",
    detail: "上传经过匿名化、脱敏化和结构化处理的特征摘要、模型参数、策略日志与统计结果。",
  },
  {
    index: "03",
    side: "CLOUD",
    title: "云端长期学习与全局优化",
    detail: "汇聚多终端信息，进行模式归纳、参数修正、模型更新与控制策略再校准。",
  },
  {
    index: "04",
    side: "RETURN",
    title: "优化能力回传",
    detail: "以版本更新、云服务同步或静默下发方式，将优化后的模型或参数重新部署至终端。",
  },
] as const;

export function CloudEdgeLoop({ className }: TechnicalDiagramProps) {
  return (
    <figure
      className={joinClassNames("technical-diagram", "td-cloud-edge", className)}
      data-diagram="cloud-edge-loop"
    >
      <DiagramHeader
        eyebrow="CLOUD–EDGE CO-EVOLUTION"
        title="端侧实时响应，云端长期进化"
        description="本地执行、云端汇总、集中优化与终端回传组成连续闭环，将个体适配能力延展为跨用户、跨场景的长期优化能力。"
      />

      <ol className="td-loop" aria-label="云边协同进化的四个连续环节">
        {cloudEdgeStages.map((stage, stageIndex) => (
          <li key={stage.index} className="td-loop-stage" data-side={stage.side.toLowerCase()}>
            <div className="td-loop-node">
              <span className="td-loop-index" aria-hidden="true">
                {stage.index}
              </span>
              <span className="td-loop-side">{stage.side}</span>
              <h4>{stage.title}</h4>
              <p>{stage.detail}</p>
            </div>
            <span className="td-loop-connector" aria-hidden="true">
              <span>{stageIndex === cloudEdgeStages.length - 1 ? "↺" : "→"}</span>
            </span>
          </li>
        ))}
      </ol>

      <aside className="td-privacy-note" aria-label="隐私保护原则">
        <strong>隐私保护原则</strong>
        <p>仅上传脱敏后的中间结果、特征摘要与模型参数；原始数据保留在本地。</p>
      </aside>
    </figure>
  );
}

const dataSplits = [
  {
    key: "train",
    label: "训练集",
    share: "70%",
    hours: "161",
    description: "用于模型训练",
  },
  {
    key: "validation",
    label: "验证集",
    share: "15%",
    hours: "34.5",
    description: "用于模型选择与参数验证",
  },
  {
    key: "test",
    label: "测试集",
    share: "15%",
    hours: "34.5",
    description: "用于独立性能评估",
  },
] as const;

export function DataSplitDiagram({ className }: TechnicalDiagramProps) {
  return (
    <figure
      className={joinClassNames("technical-diagram", "td-data-split", className)}
      data-diagram="data-split"
    >
      <DiagramHeader
        eyebrow="DATASET / PATIENT-LEVEL VALIDATION"
        title="约 230 患者小时多模态数据集"
        description="数据按照 70% / 15% / 15% 划分为训练集、验证集与测试集；另采用留一患者交叉验证（LOSO）评估跨个体泛化能力。"
      />

      <div className="td-data-total" aria-label="数据集总量约 230 患者小时">
        <strong>≈230</strong>
        <span>患者小时</span>
        <small>多模态数据集总量</small>
      </div>

      <div className="td-split-bar" role="img" aria-label="训练集占 70%，验证集占 15%，测试集占 15%">
        {dataSplits.map((split) => (
          <span
            className="td-split-segment"
            key={split.key}
            data-split={split.key}
            data-share={split.share}
            aria-hidden="true"
          >
            {split.share}
          </span>
        ))}
      </div>

      <dl className="td-split-details" aria-label="数据集划分明细">
        {dataSplits.map((split) => (
          <div key={split.key} className="td-split-card" data-split={split.key}>
            <dt>
              <span>{split.label}</span>
              <strong>{split.share}</strong>
            </dt>
            <dd>
              <strong>{split.hours}</strong>
              <span>患者小时</span>
              <small>{split.description}</small>
            </dd>
          </div>
        ))}
      </dl>

      <aside className="td-loso" aria-label="留一患者交叉验证方法">
        <span className="td-loso-mark" aria-hidden="true">
          LOSO
        </span>
        <div>
          <strong>留一患者交叉验证</strong>
          <p>每轮留出一名患者数据用于独立评估，以检验模型面对未见个体时的泛化表现。</p>
        </div>
      </aside>
    </figure>
  );
}
