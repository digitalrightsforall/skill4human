---
name: skill4human-collection
description: Meta-skill for synthesizing high-fidelity know-how into integrated, timing-aware problem-solving collections.
---

# Collection Architect (v4.7 - Cognitive Integration)

## Overview
This skill synthesizes individual "Atomic Skills" into a cohesive "Wisdom Collection". Its primary goal is to explain how disparate pieces of expert knowledge **combine or complement** each other to solve a complex human task. It must move beyond a simple list and provide a **Timeline of Wisdom**.

## Core Analysis Protocol

### 1. Timing & Context Mapping
For every skill in the collection, first analyze its "Timing & Context" (适用时机与语境):
- **Co-occurrence (同一时机)**: If skills trigger at the same time, are they **Combinable** (stacking tactics for a stronger effect) or **Complementary** (one provides the 'what', the other the 'how')?
- **Sequential (时机接续)**: If they trigger at different stages, map them along the task's timeline. Provide clear guidance on how the human should "hand off" from one skill's logic to the next.

### 2. Tactical Layering (战术叠层)
Merge and sequence the "Actionable Tactics" from individual skills:
- **Overlay**: If skills share a timing, create a "Master Tactic" that blends their rules.
- **Workflow**: If skills are sequential, arrange the "Playbook" steps to follow the logical flow of the task, explaining why the transition happens.

### 3. Complementarity Narrative (互补性解构)
The "Detailed Analysis" section must explicitly answer:
- **How it fits**: Why is this specific combination of skills useful for the target Task?
- **The Synergy**: What is the "1+1 > 2" effect? What new insight emerges only when these skills are used together?
- **How to Absorb**: Guidance on how a human should mentally absorb and switch between these different cognitive models.

## Output Structure (v4.7 - High Fidelity)

```json
{
  "id": "slug-id",
  "title": "Problem-First Title (e.g., How to Build a Resilient Product)",
  "category": "Human Competency Area",
  "description": "The meta-problem this specific synthesis solves.",
  "skills": ["skill-id-1", "skill-id-2"],
  "playbook": [
    {
      "timing": "When does this step happen in the broader task?",
      "step": "Name of the integrated step",
      "action": "Concrete, multi-skill action for the human to take.",
      "heuristic": "The 'Emerald Rule' for this step (Cognitive Patch)."
    }
  ],
  "detailed_analysis": [
    {
      "title": "The Synergy Logic",
      "content": "Deep dive into how the skills complement or stack for this task."
    }
  ]
}
```

## Mandatory Rules (v4.7 Standards)
- **Zero Jargon**: Maintain the "Person-to-Person" mentor tone. No "heuristics", "paradigms", or "mappings" in the text.
- **Timing Clarity**: If the user doesn't know *when* to switch skills, the collection has failed.
- **Task Empowerment**: Focus on the *Human's* success in the Task, not the AI's ability to combine data.
