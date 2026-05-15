---
name: skill4human-analyze
description: Use when distilling complex agent skills into a hierarchical knowledge architecture for human learning (Timing -> Philosophy -> System -> Workflow -> Tactic).
---

# skill4human-analyze (v4.7 - Wisdom Reverse Engineering Edition)

## Overview
This skill transforms "machine logic" into a "human wisdom tree." It prioritizes **Cognitive Flow**: ensuring the user understands not just *what* to do, but *when* to think, *how* to judge, and *where* the logic connects.

## Core Process (The 5-Layer Hierarchy)

### 1. Timing (适用时机)
Define the **"Pre-project Night"** status. When should a human pull this wisdom from their mental library?
- Identify the trigger (e.g., "Before writing a single line of code").
- Define the emotional/contextual state (e.g., "When you have a 'brilliant idea' that needs cold water").

### 2. Philosophy (核心心法)
Extract the "Principle" or "Belief" that governs the entire skill.
- **Mandatory**: Use human-centric metaphors (e.g., "Boil the Lake", "Adversarial Review").
- **Heuristic**: Why does this belief work better than the default amateur mindset?

### 3. System (落地模型)
The structured "Mental Framework" used to process the reality.
- Often takes the form of "N Forcing Questions" or a specific "Audit Checklist."
- Must be a stable system that doesn't change with specific cases.

### 4. Workflow (执行动线)
The "Cognitive Map" that links everything together.
- **Role**: It's a summary that connects Philosophy to Tactic.
- **UI Tip**: Use Internal Anchors `[text](#id)` to link workflow steps back to their corresponding Philosophy or System definitions.

### 5. Tactic (实战技巧)
The "Reverse Pressure Test" or "Winning Moves."
- Actionable, atomic rules.
- **Role**: A quality assurance layer applied *after* the workflow is complete.

## Deep Heuristic Extraction (The "Judgment Rule")
For each layer, you MUST extract:
- **[启发式准则 (Heuristics)]**: The "hidden rule" for making a judgment. (e.g., "If it feels too easy, you've missed the core friction").
- **[认知增益 (Cognitive Gain)]**: How this logic improves human decision-making in real life.
- **[反面模式 (Anti-patterns)]**: What an amateur would do (e.g., "Falling in love with your own solution").

## Implementation Template (Office Hours Standard)
```markdown
# 适用时机 / Timing & Context
> 当你产生一个“绝妙点子”，但一行代码都还没写的时候。

# 核心心法 / Philosophy
- **对抗性评审**: 不要顺着需求走，要从审讯官视角审视。如果你想做一个‘日历简报 App’，本质可能需要的是一个‘AI 个人幕僚长’。挖掘表层需求背后的‘本质诉求’。

# 落地模型 / System
- **六个强迫性问询 (Six Forcing Questions)**: 
  1. **Demand Reality**: 谁会因为这个产品消失而真正焦虑？（拒绝‘感兴趣’这种伪需求）
  2. **Status Quo**: 用户现在用什么笨办法解决？如果现状不够痛，你就没机会。
  3. **Desperate Specificity**: 谁是那个‘极度渴望’它的具体受众？（不能是‘年轻人’，必须是具体画像）
  4. **Narrowest Wedge**: 你明天能发布的最小核心功能是什么？
  5. **Observation**: 你观察到了什么别人没注意到的怪异行为或秘密细节？
  6. **Future-fit**: 这个极窄的切口如何演变成未来的商业帝国？

# 执行动线 / Workflow
1. 识别核心冲突（痛点）。 -> 2. 强制剥离非必要功能，只保留核心亮点。 -> 3. 模拟‘事后尸检’。

# 实战技巧 / Tactic
- **提问与反馈技巧**: 不要问‘你觉得这个产品如何’。要观察用户的实际行为，看他们是否愿意付出金钱或大量时间成本。‘沸腾湖泊原则’： marginal cost 接近零时，追求 100% 的完成度。
```

## Mandatory Rules
- **Human-Centric Filtration (去机化清洗)**: IGNORE ALL operational machine logic such as `STOP points`, `AskUserQuestion tool usage`, `bash scripts`, `subagent / cross-model fallback logic`, or `JSON/JSONL data writes`. ONLY extract the cognitive frameworks and mental models meant for human learning. Do NOT include instructions on how an AI agent should operate.
- **Core Lever Focus (核心杠杆聚焦)**: Do NOT blindly summarize all branches of the source. Identify the SINGLE most valuable cognitive insight or problem-solving framework in the skill (the "core lever"). Devote 80% of the extraction to this core lever. Ruthlessly cut or condense secondary or generic branches (e.g., if a skill has a unique "Startup Mode" but a generic "Builder Mode", focus entirely on the unique one).
- **Cognitive Cohesion (认知连贯性)**: The extraction MUST feel like a single, flowing thought process. 
  - **Timing** sets the stage (the friction).
  - **Philosophy** provides the new lens.
  - **System** provides the tool.
  - **Workflow** is the *specific mental bridge* that explains how to use that tool through that lens to resolve that friction. 
  - **Tactic** is the final pressure test. 
  Each layer must explicitly or implicitly reference the logic of the previous layers.
- **Mental Move Refinement (思维招式提纯)**: Use language that describes "Mental Moves" (人类思维动作), not "Computational Moves" (计算指令). For example, instead of "Stop and wait for input", use "Pause to confront the silence of the reality" or "Perform a mental audit of the hidden assumptions".
- **High-Resolution Interrogation (深度审讯规则)**: When extracting the `System` or `Tactic`, you MUST generate "High-Resolution" questions that pierce the surface.
  - *Example*: Don't just ask "Is there demand?". Ask "Who would be *fired* or *promoted* because of this? What specific money was lost yesterday without it?"
- **Cognitive Patching (认知补丁分层)**: You MUST distribute cognitive tags (`[启发式准则]`, `[反面模式]`, `[认知增益]`) across ALL layers. They are the "bridges" from machine logic to human intuition.
- **Meta-Bridge Disclosure (元数据公开)**: At the end of the report, you MUST include a "备注" section explaining what each cognitive tag means and why they exist (to prevent blind machine-following).
- **Report Tone (报告语态)**: Use the tone of a "Reverse Engineering Report" (智慧逆向工程报告). The goal is to "crack" the machine logic and expose the raw human wisdom underneath.
- **High-Fidelity Extraction (高保真提取)**: NEVER truncate lists, questions, or concrete examples. If the source has N questions or rules, you MUST extract and detail exactly N items, including the specific criteria for each. Do not summarize into just keywords. Provide the "原汁原味的佐证" (original proof/examples).
- **Integrity**: If source has N logic blocks, output MUST have N logic blocks.
- **Single Source**: Maintain `wisdom_db.json` integrity by deduplicating entries.
- **Rich Text**: Use **bold** for emphasis and `#` for internal linking to ensure the UI renders a coherent cognitive experience.
