import { Subtopic, CurriculumSource } from '@/types/tutor';

const DEPED_SCIENCE_SOURCE: CurriculumSource = {
  name: 'DepEd MELC',
  url: 'https://www.deped.gov.ph/wp-content/uploads/2020/07/Science.pdf',
  type: 'deped',
  verified: true,
};

export const SCIENCE_SUBTOPICS: Subtopic[] = [
  {
    id: 'matter-properties',
    title: 'Matter and Its Properties',
    subject: 'science',
    difficulty: 'beginner',
    prerequisites: [],
    estimatedMinutes: 90,
    description:
      'Explore the nature of matter — what it is made of, how it exists in different states, and how physical and chemical changes transform it. This unit builds the foundation for understanding all physical and chemical science.',
    sources: [DEPED_SCIENCE_SOURCE],
    lessons: [
      {
        id: 'states-of-matter',
        title: 'States of Matter',
        order: 1,
        overview:
          'Learn the three main states of matter — solid, liquid, and gas — and understand how particles behave differently in each state. Explore changes of state and how temperature drives them.',
        objectives: [
          'Describe the arrangement and movement of particles in solids, liquids, and gases',
          'Identify and give examples of each state of matter found in everyday Filipino life',
          'Explain changes of state (melting, freezing, evaporation, condensation, sublimation)',
        ],
        estimatedMinutes: 30,
        generatedBy: 'sourced',
        content: `## States of Matter

**Matter** is anything that has mass and takes up space (volume). Everything around you — the air you breathe, the water you drink, the chair you sit on — is matter.

### The Three Main States

**Solid** — Particles are tightly packed in a regular arrangement. They vibrate in place but do not move past each other. Solids have a **definite shape and definite volume**. Examples: ice, rock, wood, a dried *daing* fish.

**Liquid** — Particles are close together but can slide past each other freely. Liquids have a **definite volume but no definite shape** — they take the shape of their container. Examples: water, vinegar (*suka*), coconut oil (*langis ng niyog*), seawater.

**Gas** — Particles are far apart and move rapidly in all directions. Gases have **no definite shape and no definite volume** — they expand to fill any container. Examples: water vapor, the air inside a jeepney tire, the gas from a LPG tank.

### Particle Model Summary

| State | Particle Arrangement | Particle Movement | Shape | Volume |
|-------|---------------------|-------------------|-------|--------|
| Solid | Closely packed, regular | Vibrate only | Definite | Definite |
| Liquid | Close, irregular | Slide past each other | No (takes container shape) | Definite |
| Gas | Far apart, random | Move rapidly in all directions | No | No |

### Changes of State

Matter changes state when energy (heat) is added or removed:

- **Melting** — solid → liquid (e.g., ice in your *halo-halo* melts)
- **Freezing** — liquid → solid (e.g., water freezes into ice)
- **Evaporation** — liquid → gas (e.g., puddles dry up after rain)
- **Condensation** — gas → liquid (e.g., water droplets on a cold glass of buko juice)
- **Sublimation** — solid → gas directly (e.g., dry ice turning into vapor; mothballs disappearing over time)

The temperature at which a substance melts is called its **melting point**. For water, that is 0°C. The temperature at which a liquid boils is its **boiling point** — for water, 100°C at sea level.`,
        examples: [
          'During a hot summer day in Manila, ice candy melts quickly. Describe what is happening at the particle level as the ice changes to liquid.',
          'When you boil water for *lugaw*, steam rises from the pot. Name the change of state occurring and explain what happens to the water particles.',
          'Classify each as solid, liquid, or gas: seawater, a wooden table, the steam from a rice cooker, coconut oil, the air inside a balloon.',
        ],
        quiz: [
          {
            id: 'som-q1',
            question: 'Which property correctly describes a liquid?',
            options: [
              'Definite shape and definite volume',
              'No definite shape and no definite volume',
              'Definite volume but no definite shape',
              'Definite shape but no definite volume',
            ],
            correctIndex: 2,
            explanation:
              'Liquids take the shape of their container (no definite shape) but their volume does not change — pour the same amount of water into a tall glass or a wide bowl and the volume is the same. So liquids have definite volume but no definite shape.',
          },
          {
            id: 'som-q2',
            question:
              'Water droplets form on the outside of a cold glass of pineapple juice on a humid day. What change of state is happening?',
            options: ['Evaporation', 'Melting', 'Condensation', 'Sublimation'],
            correctIndex: 2,
            explanation:
              'The water vapor (gas) in the humid air comes into contact with the cold glass surface, loses energy, and turns into liquid water droplets. This is condensation — gas changing to liquid.',
          },
          {
            id: 'som-q3',
            question: 'In which state of matter are particles closest together and moving the least?',
            options: ['Gas', 'Liquid', 'Plasma', 'Solid'],
            correctIndex: 3,
            explanation:
              'In a solid, particles are tightly packed in a regular arrangement and only vibrate in place. They have the least kinetic energy and the least freedom of movement compared to liquids and gases.',
          },
        ],
      },
      {
        id: 'physical-chemical-changes',
        title: 'Physical and Chemical Changes',
        order: 2,
        overview:
          'Distinguish between physical and chemical changes in matter. Recognize the signs of a chemical change and understand why some changes are reversible while others are not.',
        objectives: [
          'Define physical change and give examples involving no new substance being formed',
          'Define chemical change and identify the signs that indicate one has occurred',
          'Classify everyday changes as physical or chemical with reasoning',
        ],
        estimatedMinutes: 30,
        generatedBy: 'sourced',
        content: `## Physical and Chemical Changes

### Physical Changes

A **physical change** alters the form, size, shape, or state of a substance but does not create a new substance. The chemical composition stays the same.

Key indicator: **the change is usually reversible** and no new substance with different properties is formed.

Examples:
- Cutting a *mangga* into pieces (still mangga, just smaller)
- Melting ice into water (both are H₂O)
- Dissolving sugar in water (the sugar can be recovered by evaporation)
- Bending a wire
- Breaking a glass
- Boiling water to make steam

Even though breaking a glass is hard to reverse in practice, it is still a physical change — the composition of the glass has not changed.

### Chemical Changes

A **chemical change** (also called a chemical reaction) produces one or more **new substances** with different properties from the original materials. The original substances (reactants) are transformed into new substances (products).

Key indicator: **usually not easily reversible** and the new substance has different properties.

**Signs of a chemical change:**
1. **Gas production** — bubbles form (e.g., vinegar + baking soda fizzes)
2. **Color change** — a permanent, unexpected color change (e.g., iron turning rusty red-brown)
3. **Precipitate formation** — a solid forms in a liquid (e.g., mixing two clear solutions that produce a cloudy white solid)
4. **Light or heat produced or absorbed** — flames, glowing, or strong temperature change (e.g., burning wood)
5. **Odor change** — a new smell indicates new substances (e.g., milk souring)

Examples:
- Burning wood (*panggatong*) — ash and smoke are new substances
- Cooking an egg — the proteins change permanently
- Iron rusting — iron + oxygen + water → iron oxide (rust)
- *Tuba* (coconut sap) fermenting into vinegar
- Food digestion inside the body

### Quick Comparison

| Feature | Physical Change | Chemical Change |
|---------|----------------|-----------------|
| New substance formed? | No | Yes |
| Usually reversible? | Yes | No |
| Chemical formula changes? | No | Yes |
| Examples | cutting, melting, dissolving | burning, rusting, cooking |`,
        examples: [
          'A student tears a piece of paper and then burns the pieces. Which action is a physical change and which is a chemical change? Explain.',
          'Is dissolving salt in water for *sinigang* a physical or chemical change? How could you prove it?',
          'A piece of iron nail left outside during the rainy season turns orange-brown. Identify the type of change and list two signs that support your answer.',
        ],
        quiz: [
          {
            id: 'pcc-q1',
            question: 'Which of the following is a chemical change?',
            options: [
              'Slicing a banana',
              'Melting butter for *bibingka*',
              'Burning dried coconut leaves',
              'Dissolving sugar in hot water',
            ],
            correctIndex: 2,
            explanation:
              'Burning dried coconut leaves is a chemical change — the leaves react with oxygen to produce ash, carbon dioxide, and water vapor. These are entirely new substances with different properties. The other options are physical changes because no new substance is formed.',
          },
          {
            id: 'pcc-q2',
            question:
              'A scientist mixes two colorless liquids and observes bubbles forming. This is a sign of:',
            options: [
              'A physical change, because no color changed',
              'A chemical change, because gas is being produced',
              'A physical change, because both liquids are still present',
              'Neither a physical nor a chemical change',
            ],
            correctIndex: 1,
            explanation:
              'Gas production (bubbles) is one of the key signs of a chemical change. A new substance — a gas — is being produced. The fact that no color changed does not rule out a chemical change.',
          },
          {
            id: 'pcc-q3',
            question:
              'When sugar is dissolved in water, the sugar seems to disappear. Why is this a physical change?',
            options: [
              'Because sugar becomes a gas',
              'Because a new substance, syrup, is permanently formed',
              'Because the sugar can be recovered by evaporating the water',
              'Because the water changes color permanently',
            ],
            correctIndex: 2,
            explanation:
              'Dissolving is a physical change because the sugar has not been chemically altered — it is still sugar. If you evaporate the water, you recover the original sugar crystals. No new substance with different chemical properties was formed.',
          },
        ],
      },
      {
        id: 'mixtures-and-solutions',
        title: 'Mixtures and Solutions',
        order: 3,
        overview:
          'Understand the difference between pure substances and mixtures. Learn how to classify mixtures as homogeneous or heterogeneous, and explore common methods used to separate mixtures.',
        objectives: [
          'Distinguish between pure substances and mixtures',
          'Classify mixtures as homogeneous (solutions) or heterogeneous',
          'Describe at least three methods of separating mixtures and give real-life examples of each',
        ],
        estimatedMinutes: 30,
        generatedBy: 'sourced',
        content: `## Mixtures and Solutions

### Pure Substances vs. Mixtures

A **pure substance** has a fixed composition throughout — every sample has the same properties. Examples: pure water (H₂O), gold, table salt (NaCl), oxygen gas.

A **mixture** is made of two or more substances physically combined. The substances keep their individual properties and can be separated by physical means.

### Types of Mixtures

**Homogeneous mixture (Solution)** — The components are uniformly distributed throughout. You cannot tell the parts apart by looking. Examples:
- Salt water (*tubig-alat*)
- Sugar dissolved in hot tea
- Air (a mixture of nitrogen, oxygen, and other gases)
- Vinegar (acetic acid dissolved in water)

**Heterogeneous mixture** — The components are not uniformly distributed. You can see the different parts. Examples:
- Soil (contains sand, clay, minerals)
- A bowl of *pinakbet* (different vegetables mixed together)
- Sand and water
- A fruit salad

### Components of a Solution

A solution has:
- **Solute** — the substance that dissolves (e.g., sugar)
- **Solvent** — the substance that does the dissolving (e.g., water)
- Water is called the **universal solvent** because it dissolves more substances than any other liquid.

### Separating Mixtures

Different mixtures require different separation methods:

| Method | How it works | Example |
|--------|-------------|---------|
| **Filtration** | Filter traps solids; liquid passes through | Separating sand from muddy water |
| **Evaporation** | Solvent evaporates leaving the solute | Recovering salt from salt water (*asin* making in Pangasinan) |
| **Decantation** | Carefully pour off a liquid from a settled solid | Pouring off water from cooked rice |
| **Magnetic separation** | A magnet attracts iron particles | Separating iron filings from sand |
| **Distillation** | Boiling a liquid and collecting the vapor | Purifying water; making *lambanog* |
| **Chromatography** | Components travel at different speeds through a medium | Separating ink pigments |`,
        examples: [
          'Classify each mixture as homogeneous or heterogeneous: (a) orange juice with pulp, (b) seawater, (c) a mixture of iron filings and sand, (d) vinegar.',
          'Salt farmers in Pangasinan use sunlight to dry seawater in salt beds. What separation method is this? Explain why it works.',
          'You have a mixture of sand, salt, and iron filings. Design a step-by-step procedure using different separation methods to isolate each component.',
        ],
        quiz: [
          {
            id: 'mix-q1',
            question:
              'A student mixes sand and salt in water, then filters the mixture. What passes through the filter and what is trapped?',
            options: [
              'Both sand and salt pass through; nothing is trapped',
              'Salt water passes through; sand is trapped on the filter',
              'Sand passes through; salt is trapped on the filter',
              'Both sand and salt are trapped; only pure water passes through',
            ],
            correctIndex: 1,
            explanation:
              'Salt dissolves in water to form salt water (a solution), so it passes through the filter paper. Sand particles are too large to pass through and are trapped on the filter. To separate the salt from the salt water afterward, you would use evaporation.',
          },
          {
            id: 'mix-q2',
            question: 'Which of the following is a homogeneous mixture?',
            options: [
              'A bowl of *batchoy* with noodles and meat',
              'A mixture of sugar dissolved in hot tea',
              'Sand and gravel mixed together',
              'A salad of different vegetables',
            ],
            correctIndex: 1,
            explanation:
              'Sugar dissolved in hot tea is homogeneous — the sugar is evenly distributed throughout the liquid and you cannot see distinct parts. The other options are heterogeneous because you can see and distinguish the separate components.',
          },
          {
            id: 'mix-q3',
            question:
              'In a salt solution, which is the solute and which is the solvent?',
            options: [
              'Salt is the solvent; water is the solute',
              'Both salt and water are solutes',
              'Salt is the solute; water is the solvent',
              'Neither is a solute or solvent — it is a compound',
            ],
            correctIndex: 2,
            explanation:
              'The solute is the substance that dissolves — salt (NaCl). The solvent is the substance doing the dissolving — water. Water is called the universal solvent because it can dissolve more substances than any other liquid.',
          },
        ],
      },
    ],
  },

  {
    id: 'living-things',
    title: 'Living Things and Life Processes',
    subject: 'science',
    difficulty: 'beginner',
    prerequisites: [],
    estimatedMinutes: 90,
    description:
      'Study the characteristics that define living things, how cells are organized into more complex structures, and how organisms are classified. Understand the basic life processes that all living things carry out.',
    sources: [DEPED_SCIENCE_SOURCE],
    lessons: [
      {
        id: 'cell-structure-function',
        title: 'Cell Structure and Function',
        order: 1,
        overview:
          'Understand that the cell is the basic unit of life. Learn the structures of animal and plant cells, the function of each organelle, and the differences between prokaryotic and eukaryotic cells.',
        objectives: [
          'State the cell theory and explain its significance',
          'Identify major cell organelles and describe their functions',
          'Compare and contrast plant and animal cells',
        ],
        estimatedMinutes: 30,
        generatedBy: 'sourced',
        content: `## Cell Structure and Function

### The Cell Theory

The **cell theory** is one of the foundational principles of biology. It states:
1. All living things are made of one or more cells.
2. The cell is the basic structural and functional unit of life.
3. All cells come from pre-existing cells.

This theory, developed by Schleiden, Schwann, and Virchow in the 19th century, means that every organism — from the tiniest bacterium to a *lapu-lapu* fish or a human — is built from cells.

### Types of Cells

**Prokaryotic cells** — No membrane-bound nucleus. DNA floats freely in the cytoplasm. Simpler and smaller. Example: bacteria.

**Eukaryotic cells** — Have a true nucleus enclosed in a membrane. More complex. Include plant cells, animal cells, and fungal cells.

### Animal Cell Organelles

| Organelle | Function |
|-----------|----------|
| **Cell membrane** | Controls what enters and leaves the cell |
| **Nucleus** | Contains DNA; controls cell activities ("control center") |
| **Cytoplasm** | Jelly-like fluid where organelles are suspended |
| **Mitochondria** | Produces energy (ATP) through cellular respiration ("powerhouse of the cell") |
| **Ribosomes** | Makes proteins |
| **Endoplasmic reticulum (ER)** | Transports materials within the cell |
| **Golgi apparatus** | Packages and ships proteins out of the cell ("post office") |
| **Lysosomes** | Breaks down waste and foreign materials |

### Plant Cell — Additional Structures

| Structure | Function |
|-----------|----------|
| **Cell wall** | Rigid outer layer (made of cellulose) that gives shape and support |
| **Chloroplasts** | Contains chlorophyll; site of photosynthesis (makes food using sunlight) |
| **Large central vacuole** | Stores water, maintains cell shape and pressure (*turgor pressure*) |

### Animal vs. Plant Cell

| Feature | Animal Cell | Plant Cell |
|---------|-------------|------------|
| Cell wall | Absent | Present (cellulose) |
| Chloroplasts | Absent | Present |
| Central vacuole | Small/absent | Large |
| Lysosomes | Common | Rare |`,
        examples: [
          'Why do plant cells need both mitochondria and chloroplasts, while animal cells only need mitochondria?',
          'If a cell\'s mitochondria stopped working, what would happen to the cell? Relate to what happens to a person who cannot eat.',
          'A student looks at two cells under a microscope. One has a cell wall and chloroplasts; the other does not. Which is the plant cell? How can you tell?',
        ],
        quiz: [
          {
            id: 'cell-q1',
            question: 'Which organelle is correctly called the "powerhouse of the cell"?',
            options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Chloroplast'],
            correctIndex: 2,
            explanation:
              'Mitochondria produce ATP (adenosine triphosphate) through cellular respiration — this is the energy currency the cell uses to do all its work. Because it generates the cell\'s energy supply, it is nicknamed the "powerhouse of the cell."',
          },
          {
            id: 'cell-q2',
            question: 'Which of the following structures is found in plant cells but NOT in animal cells?',
            options: ['Nucleus', 'Cell membrane', 'Mitochondria', 'Cell wall'],
            correctIndex: 3,
            explanation:
              'The cell wall is a rigid structure made of cellulose found only in plant cells (and some other organisms like fungi and bacteria). Animal cells have only a flexible cell membrane. The nucleus, cell membrane, and mitochondria are found in both plant and animal cells.',
          },
          {
            id: 'cell-q3',
            question: 'What does the cell theory state about where cells come from?',
            options: [
              'Cells arise spontaneously from non-living matter',
              'Cells come only from the nucleus of existing cells',
              'All cells come from pre-existing cells',
              'Cells are formed by combining molecules in the environment',
            ],
            correctIndex: 2,
            explanation:
              'One of the three parts of the cell theory states that all cells arise from pre-existing cells through cell division. This disproved the older idea of spontaneous generation — that life could arise from non-living material.',
          },
        ],
      },
      {
        id: 'photosynthesis-respiration',
        title: 'Photosynthesis and Respiration',
        order: 2,
        overview:
          'Understand how plants make food through photosynthesis and how both plants and animals release energy through cellular respiration. Learn the inputs, outputs, and importance of each process.',
        objectives: [
          'Write and interpret the word equation and chemical equation for photosynthesis',
          'Explain how photosynthesis and cellular respiration are complementary processes',
          'Identify the role of chlorophyll and the conditions needed for photosynthesis',
        ],
        estimatedMinutes: 30,
        generatedBy: 'sourced',
        content: `## Photosynthesis and Cellular Respiration

### Photosynthesis

**Photosynthesis** is the process by which plants, algae, and some bacteria convert light energy into chemical energy stored in sugar (glucose). It occurs in the **chloroplasts**, using the green pigment **chlorophyll** to absorb sunlight.

**Word equation:**
> Carbon dioxide + Water → Glucose + Oxygen
> (using light energy and chlorophyll)

**Chemical equation:**
$$6CO_2 + 6H_2O \\xrightarrow{\\text{light + chlorophyll}} C_6H_{12}O_6 + 6O_2$$

**What is needed for photosynthesis:**
- Light (from the sun)
- Carbon dioxide (CO₂) — absorbed through tiny pores called **stomata** on leaves
- Water (H₂O) — absorbed through roots
- Chlorophyll (green pigment in chloroplasts)

**Products:**
- Glucose (C₆H₁₂O₆) — stored as food/energy for the plant
- Oxygen (O₂) — released into the air (this is the oxygen we breathe!)

### Why Photosynthesis Matters

Plants are **producers** — they make their own food and form the base of almost every food chain. The oxygen released by plants and algae is what makes Earth's atmosphere breathable.

In the Philippines, rice plants (*palay*), coconut trees, and *kangkong* all photosynthesize to make the food we eat.

### Cellular Respiration

**Cellular respiration** is the process by which cells break down glucose to release energy (ATP) for the cell's activities. It occurs in the **mitochondria**.

**Word equation:**
> Glucose + Oxygen → Carbon dioxide + Water + Energy (ATP)

**Chemical equation:**
$$C_6H_{12}O_6 + 6O_2 \\rightarrow 6CO_2 + 6H_2O + \\text{ATP}$$

Cellular respiration happens in **all living cells** — plants, animals, fungi, bacteria. It is why we breathe: we inhale O₂ (for respiration) and exhale CO₂ (a waste product of respiration).

### Photosynthesis vs. Respiration — Complementary Opposites

| Feature | Photosynthesis | Cellular Respiration |
|---------|---------------|---------------------|
| Occurs in | Plants, algae | All living cells |
| Location in cell | Chloroplasts | Mitochondria |
| Requires | CO₂, H₂O, light | Glucose, O₂ |
| Produces | Glucose, O₂ | CO₂, H₂O, ATP |
| Energy change | Stores energy | Releases energy |

Notice: the products of photosynthesis are the reactants of respiration, and vice versa. These two processes cycle matter and energy through living systems.`,
        examples: [
          'A *malunggay* plant is placed in a dark room for three days. Explain what happens to its ability to make food and why.',
          'Why do we say that almost all energy in a food chain originally comes from the sun?',
          'Compare what a plant does during the day versus at night in terms of photosynthesis and respiration.',
        ],
        quiz: [
          {
            id: 'photo-q1',
            question: 'Which gas is produced by photosynthesis and used by cellular respiration?',
            options: ['Carbon dioxide (CO₂)', 'Nitrogen (N₂)', 'Oxygen (O₂)', 'Hydrogen (H₂)'],
            correctIndex: 2,
            explanation:
              'Photosynthesis produces oxygen (O₂) as a byproduct when plants split water molecules. This oxygen is then used by all living cells during cellular respiration to break down glucose and release energy. The two processes are complementary opposites.',
          },
          {
            id: 'photo-q2',
            question: 'Where in the plant cell does photosynthesis take place?',
            options: ['Mitochondria', 'Nucleus', 'Ribosomes', 'Chloroplasts'],
            correctIndex: 3,
            explanation:
              'Photosynthesis occurs in the chloroplasts, which contain chlorophyll — the green pigment that absorbs sunlight. Chloroplasts are found only in plant cells and algae. Mitochondria are the site of cellular respiration, not photosynthesis.',
          },
          {
            id: 'photo-q3',
            question:
              'A plant is given plenty of light and water but kept in a room with no CO₂. What will happen to photosynthesis?',
            options: [
              'It will proceed normally since light and water are present',
              'It will stop because CO₂ is a required raw material',
              'It will speed up because there is less CO₂ to interfere',
              'It will switch to respiration only',
            ],
            correctIndex: 1,
            explanation:
              'Carbon dioxide is one of the essential raw materials (reactants) of photosynthesis. Without CO₂, the plant cannot produce glucose regardless of how much light or water is available. All three — CO₂, water, and light — are required.',
          },
        ],
      },
      {
        id: 'biological-classification',
        title: 'Biological Classification',
        order: 3,
        overview:
          'Learn how scientists organize the diversity of living things into a classification system. Understand the major groups of organisms and how taxonomy uses shared characteristics to group related species.',
        objectives: [
          'Explain why scientists classify living things and identify the levels of classification',
          'Describe the characteristics that define each kingdom in the five-kingdom or domain system',
          'Use a simple dichotomous key to identify organisms',
        ],
        estimatedMinutes: 30,
        generatedBy: 'sourced',
        content: `## Biological Classification (Taxonomy)

### Why Classify Living Things?

There are estimated to be 8–10 million species on Earth. Without a system of classification, studying, naming, and communicating about them would be impossible. **Taxonomy** is the science of naming and classifying organisms based on shared characteristics.

The modern classification system was developed by Carl Linnaeus in the 18th century. It uses Latin names to give each organism a unique **scientific name** (binomial nomenclature).

### Levels of Classification (Taxonomic Hierarchy)

From broadest to most specific:

**Domain → Kingdom → Phylum → Class → Order → Family → Genus → Species**

Memory aid: **D**ear **K**ing **P**hilip **C**ame **O**ver **F**or **G**ood **S**oup

Example — the Philippine Eagle (*Pithecophaga jefferyi*):
- Domain: Eukaryota
- Kingdom: Animalia
- Phylum: Chordata
- Class: Aves (birds)
- Order: Accipitriformes
- Family: Accipitridae
- Genus: *Pithecophaga*
- Species: *jefferyi*

The scientific name uses **genus + species**: *Pithecophaga jefferyi* (always italicized; genus capitalized, species lowercase).

### The Five Kingdoms

| Kingdom | Key Features | Examples |
|---------|-------------|---------|
| **Monera** | Prokaryotes (no true nucleus) | Bacteria, cyanobacteria |
| **Protista** | Mostly unicellular eukaryotes | Amoeba, *Euglena*, algae |
| **Fungi** | Absorb nutrients; cell walls of chitin | Mushrooms, mold, yeast |
| **Plantae** | Multicellular; photosynthetic; cell walls of cellulose | Mosses, ferns, flowering plants |
| **Animalia** | Multicellular; no cell walls; heterotrophs | Insects, fish, mammals |

### Dichotomous Keys

A **dichotomous key** is a tool for identifying organisms using a series of paired (two-choice) statements. At each step, you choose the description that matches the organism, leading you to its identity.

Example:
1a. The organism has wings → go to 2
1b. The organism has no wings → go to 3
2a. Wings are covered with scales → **Butterfly**
2b. Wings are transparent → **Dragonfly**

The Philippines is one of the world's biodiversity hotspots. The **Philippine Eagle**, **tarsier**, and **tamaraw** are endemic species found nowhere else on Earth.`,
        examples: [
          'A *bangus* (milkfish) and a frog share the same class but different orders. What does this tell you about how closely related they are?',
          'Why do scientists use Latin scientific names instead of common names for species?',
          'Use a simple dichotomous key to distinguish between a mushroom and a fern based on their characteristics.',
        ],
        quiz: [
          {
            id: 'tax-q1',
            question:
              'Which level of classification is MOST specific — meaning only one kind of organism fits?',
            options: ['Kingdom', 'Phylum', 'Genus', 'Species'],
            correctIndex: 3,
            explanation:
              'The species level is the most specific level in the taxonomic hierarchy. Organisms of the same species can interbreed and produce fertile offspring. Kingdom is the broadest level (most general), while species is the narrowest (most specific).',
          },
          {
            id: 'tax-q2',
            question: 'Which kingdom contains organisms that have no true nucleus (prokaryotes)?',
            options: ['Protista', 'Monera', 'Fungi', 'Plantae'],
            correctIndex: 1,
            explanation:
              'Kingdom Monera contains all prokaryotes — organisms whose cells lack a membrane-bound nucleus. This includes bacteria and cyanobacteria (blue-green algae). All other kingdoms contain eukaryotes (cells with a true nucleus).',
          },
          {
            id: 'tax-q3',
            question: 'The scientific name of the coconut palm is *Cocos nucifera*. Which part is the genus?',
            options: ['Cocos', 'nucifera', 'Cocos nucifera', 'Palm'],
            correctIndex: 0,
            explanation:
              'In binomial nomenclature, the scientific name has two parts: genus (first word, capitalized) and species (second word, lowercase). In *Cocos nucifera*, "Cocos" is the genus and "nucifera" is the species. The full italicized name is the species name.',
          },
        ],
      },
    ],
  },

  {
    id: 'force-energy',
    title: 'Force, Motion, and Energy',
    subject: 'science',
    difficulty: 'intermediate',
    prerequisites: ['matter-properties'],
    estimatedMinutes: 90,
    description:
      'Investigate how forces cause objects to move, speed up, slow down, or change direction. Explore the different forms of energy, how energy is transferred, and the Law of Conservation of Energy.',
    sources: [DEPED_SCIENCE_SOURCE],
    lessons: [
      {
        id: 'forces-and-motion',
        title: 'Forces and Motion',
        order: 1,
        overview:
          'Understand what a force is and how forces affect the motion of objects. Apply Newton\'s First and Second Laws of Motion to real-world situations found in everyday Filipino life.',
        objectives: [
          'Define force as a push or pull and describe its effects on motion',
          'State Newton\'s First Law (inertia) and give examples',
          'Apply Newton\'s Second Law (F = ma) to calculate force, mass, or acceleration',
        ],
        estimatedMinutes: 30,
        generatedBy: 'sourced',
        content: `## Forces and Motion

### What is a Force?

A **force** is a push or pull that can change the motion of an object. Forces can:
- Start a stationary object moving
- Stop a moving object
- Speed up or slow down a moving object
- Change the direction of a moving object
- Change the shape of an object

Forces are measured in **Newtons (N)**, named after Sir Isaac Newton.

**Types of forces:**
- **Contact forces**: applied force, friction, tension, normal force
- **Non-contact forces**: gravity, magnetic force, electrostatic force

### Newton's First Law — The Law of Inertia

> **An object at rest stays at rest, and an object in motion stays in motion at the same speed and direction, unless acted upon by a net external force.**

**Inertia** is the tendency of an object to resist changes in its state of motion. More massive objects have more inertia.

**Filipino examples of inertia:**
- When a *jeepney* suddenly brakes, passengers lurch forward — their bodies were in motion and tend to keep moving.
- A *kariton* (wooden cart) is hard to start pushing but, once moving, continues rolling on its own.
- A book resting on a table stays there unless someone pushes it.

### Newton's Second Law — F = ma

> **The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.**

$$F = ma$$

Where:
- **F** = net force (Newtons, N)
- **m** = mass (kilograms, kg)
- **a** = acceleration (meters per second squared, m/s²)

This means:
- A larger force → greater acceleration (push harder → speeds up more)
- A larger mass → smaller acceleration (heavier object → harder to accelerate)

**Example:** A *kariton* of mass 50 kg is pushed with a net force of 100 N. What is its acceleration?
$$a = \\frac{F}{m} = \\frac{100\\,N}{50\\,kg} = 2\\,m/s^2$$

### Balanced vs. Unbalanced Forces

**Balanced forces** — equal forces acting in opposite directions; the object does not accelerate (stays still or moves at constant speed).

**Unbalanced forces** — forces that are not equal; the object accelerates in the direction of the larger force.`,
        examples: [
          'A passenger on a bus is thrown forward when the bus suddenly stops. Explain this using Newton\'s First Law.',
          'A *habal-habal* (motorcycle taxi) with a passenger (total mass 200 kg) accelerates at 3 m/s². What is the net force driving it forward?',
          'Two teams in a *agawan base* game pull on a rope. Team A pulls with 400 N and Team B pulls with 350 N. What is the net force and in which direction will the rope move?',
        ],
        quiz: [
          {
            id: 'force-q1',
            question:
              'A ball is rolling on a flat floor and gradually slows down. Which force is responsible for slowing it?',
            options: ['Gravity', 'Normal force', 'Friction', 'Applied force'],
            correctIndex: 2,
            explanation:
              'Friction is the force that opposes the motion between surfaces in contact. As the ball rolls on the floor, friction between the ball and the floor surface gradually slows it down. Without friction, Newton\'s First Law predicts the ball would roll forever.',
          },
          {
            id: 'force-q2',
            question:
              'A net force of 60 N acts on a box with a mass of 15 kg. What is the acceleration of the box?',
            options: ['900 m/s²', '75 m/s²', '4 m/s²', '0.25 m/s²'],
            correctIndex: 2,
            explanation:
              'Using Newton\'s Second Law: a = F ÷ m = 60 N ÷ 15 kg = 4 m/s². The box accelerates at 4 meters per second squared in the direction of the net force.',
          },
          {
            id: 'force-q3',
            question: 'Which situation is an example of Newton\'s First Law (Law of Inertia)?',
            options: [
              'A heavier ball needs more force to accelerate than a lighter one',
              'A jeepney passenger lurches forward when the jeepney brakes suddenly',
              'For every push forward, there is an equal push backward',
              'A ball falls faster the longer it falls',
            ],
            correctIndex: 1,
            explanation:
              'Newton\'s First Law states that a moving object continues moving unless a force acts on it. The passenger\'s body was moving with the jeepney and, when the jeepney stopped, the passenger\'s body resisted the change in motion (inertia) and continued moving forward. This is inertia in action.',
          },
        ],
      },
      {
        id: 'forms-of-energy',
        title: 'Forms of Energy',
        order: 2,
        overview:
          'Identify the major forms of energy and understand that energy can be transformed from one form to another. Apply the concept of energy transformation to devices and natural phenomena.',
        objectives: [
          'Name and describe at least six forms of energy with examples',
          'Explain energy transformation using energy chain diagrams',
          'Give examples of energy transformations relevant to everyday Filipino life',
        ],
        estimatedMinutes: 30,
        generatedBy: 'sourced',
        content: `## Forms of Energy

### What is Energy?

**Energy** is the ability to do work — to cause a change in an object. Energy cannot be seen directly, but we can observe its effects: heat, light, sound, and movement.

Energy is measured in **Joules (J)**.

### Major Forms of Energy

**Kinetic Energy (KE)** — Energy of motion. Anything that is moving has kinetic energy.
$$KE = \\frac{1}{2}mv^2$$
Examples: a speeding *tricycle*, a flying *tikbalang* kite, a flowing river.

**Potential Energy (PE)** — Stored energy due to position or condition.

- **Gravitational PE** — stored because of height above the ground.
$$GPE = mgh$$
Examples: water stored in a dam, a coconut on a tall tree, a roller coaster at the top of a hill.

- **Elastic PE** — stored in stretched or compressed objects.
Examples: a stretched *tirador* (slingshot) rubber band, a compressed spring.

**Chemical Energy** — Energy stored in chemical bonds. Released during chemical reactions.
Examples: food we eat, LPG gas, a battery, gasoline, wood.

**Thermal (Heat) Energy** — Energy related to the temperature of matter — the kinetic energy of particles.
Examples: a burning *uling* (charcoal) fire, the sun's warmth, hot *tinola* soup.

**Light (Radiant) Energy** — Energy carried by electromagnetic waves.
Examples: sunlight, light from a fluorescent bulb, laser beams.

**Sound Energy** — Energy carried by vibrations through a medium.
Examples: a *kulintang* being played, the sound of rain, voices.

**Electrical Energy** — Energy carried by moving electric charges.
Examples: electricity from a socket, lightning, power from a solar panel.

**Nuclear Energy** — Energy stored in the nucleus of atoms, released through fission or fusion.
Examples: the sun (nuclear fusion), nuclear power plants.

### Energy Transformations

Energy is constantly being **converted** from one form to another. Examples:

- **Electric fan**: Electrical → Kinetic (rotating blades) + Sound + Thermal (motor heat)
- **Solar panel**: Light → Electrical
- **A person eating *adobo* and then running**: Chemical (food) → Kinetic + Thermal
- **A hydroelectric dam in the Cordillera**: Gravitational PE (water at height) → Kinetic (falling water) → Electrical
- **A burning candle**: Chemical → Thermal + Light

Energy chains show the sequence of transformations:
> Chemical (battery) → Electrical → Light + Thermal (light bulb)`,
        examples: [
          'Trace the energy transformations from the sun to a person running in a *barangay* sports festival.',
          'When a *tirador* (slingshot) is used to launch a stone, list the energy transformations in order.',
          'A Philippine dam generates hydroelectric power. Describe three energy transformations that occur from the water in the reservoir to electricity in a home.',
        ],
        quiz: [
          {
            id: 'energy-q1',
            question:
              'A coconut falls from a tall tree. As it falls, which energy transformation occurs?',
            options: [
              'Kinetic energy → Gravitational potential energy',
              'Gravitational potential energy → Kinetic energy',
              'Chemical energy → Thermal energy',
              'Thermal energy → Kinetic energy',
            ],
            correctIndex: 1,
            explanation:
              'As the coconut falls, it loses height (gravitational potential energy decreases) and gains speed (kinetic energy increases). This is a transformation of gravitational potential energy into kinetic energy. When the coconut hits the ground, the kinetic energy converts to sound and thermal energy.',
          },
          {
            id: 'energy-q2',
            question: 'Which form of energy is stored in a fully charged mobile phone battery?',
            options: ['Thermal energy', 'Nuclear energy', 'Chemical energy', 'Kinetic energy'],
            correctIndex: 2,
            explanation:
              'A battery stores energy in the form of chemical energy — in the chemical bonds of its materials. When the battery is used, the chemical energy is converted to electrical energy, which then powers the phone\'s screen (light), speaker (sound), and processor (thermal energy).',
          },
          {
            id: 'energy-q3',
            question: 'What energy transformation takes place in a solar-powered calculator?',
            options: [
              'Electrical energy → Light energy',
              'Chemical energy → Electrical energy',
              'Light energy → Electrical energy',
              'Thermal energy → Electrical energy',
            ],
            correctIndex: 2,
            explanation:
              'A solar-powered calculator has photovoltaic (solar) cells that convert light energy (from the sun or room lighting) into electrical energy, which powers the calculator\'s display and circuits. This is the same principle used in large solar panels for homes and buildings.',
          },
        ],
      },
      {
        id: 'heat-transfer',
        title: 'Heat Transfer',
        order: 3,
        overview:
          'Understand the three methods of heat transfer — conduction, convection, and radiation — and explain how each operates in natural phenomena and everyday technology.',
        objectives: [
          'Define heat and distinguish it from temperature',
          'Describe and compare conduction, convection, and radiation with examples',
          'Apply knowledge of heat transfer to explain natural events and the design of everyday objects',
        ],
        estimatedMinutes: 30,
        generatedBy: 'sourced',
        content: `## Heat Transfer

### Heat vs. Temperature

**Temperature** measures the average kinetic energy of particles in a substance — how hot or cold something is. Measured in degrees Celsius (°C) or Kelvin (K).

**Heat** is the transfer of thermal energy from a warmer object to a cooler object. Heat always flows from high temperature to low temperature until **thermal equilibrium** (equal temperature) is reached.

You feel hot stepping on beach sand in Boracay not because the sand has more heat (total energy), but because it has a higher temperature than your feet.

### Method 1: Conduction

**Conduction** is heat transfer through direct contact between particles. It occurs primarily in **solids**, where particles are tightly packed and can vibrate energy from one particle to the next.

- **Good conductors** (metals): copper, iron, aluminum — heat passes through quickly
- **Poor conductors (insulators)**: wood, plastic, air, cloth — heat passes through slowly

Filipino examples:
- A metal *kaldero* (cooking pot) heats up quickly on the stove
- A wooden spoon used for stirring does not burn your hand
- Holding a hot bibingka wrapped in banana leaf — the leaf insulates your hand

### Method 2: Convection

**Convection** is heat transfer through the movement of fluids (liquids or gases). Warmer fluid becomes less dense, rises, and cooler fluid sinks to take its place, creating **convection currents**.

Filipino examples:
- Boiling *sinigang* — hot liquid rises, cooler liquid sinks, creating circulation
- Land and sea breezes along the Philippine coast (air over land heats faster → rises → sea air flows in)
- Thunderstorm development: warm, moist air rises rapidly forming cumulonimbus clouds
- A room fan spreads cool air by forcing convection currents

### Method 3: Radiation

**Radiation** is heat transfer through electromagnetic waves. It does **not** need a medium — it can travel through the vacuum of space.

Filipino examples:
- Warmth from the sun reaching Earth through space
- Sitting near a bonfire at a *pahiyas* festival and feeling the warmth without touching the fire
- A fire's warmth felt from a distance
- Infrared rays from a heat lamp

### Comparison Summary

| Method | Medium needed? | How it works | Example |
|--------|---------------|-------------|---------|
| Conduction | Yes (solid) | Particle-to-particle contact | Hot pan heating food |
| Convection | Yes (fluid) | Fluid circulation currents | Boiling water |
| Radiation | No | Electromagnetic waves | Sunlight, fire warmth |`,
        examples: [
          'Explain why wearing a white *barong Tagalog* on a sunny day keeps you cooler than wearing black. Which method of heat transfer is involved?',
          'During a *Pista ng Bayan*, people roast a whole pig (*lechon*) over coals. Identify which parts of the cooking involve conduction, convection, and radiation.',
          'Why does a thermos flask keep your coffee hot for hours? Identify how it prevents each method of heat transfer.',
        ],
        quiz: [
          {
            id: 'heat-q1',
            question:
              'A metal spoon left in a hot bowl of *arroz caldo* becomes hot at the handle. Which method of heat transfer is responsible?',
            options: ['Radiation', 'Convection', 'Conduction', 'Evaporation'],
            correctIndex: 2,
            explanation:
              'Heat travels through the metal spoon from the hot liquid end to the cooler handle through conduction — direct particle-to-particle transfer. Metals are good conductors, so heat moves quickly through the spoon. This is why metal spoons get hot while wooden spoons do not.',
          },
          {
            id: 'heat-q2',
            question:
              'How does the warmth of the sun reach Earth if space is nearly a vacuum (empty of matter)?',
            options: [
              'Conduction through space particles',
              'Convection through solar wind',
              'Radiation — electromagnetic waves do not need matter',
              'The sun\'s gravity pulls heat toward Earth',
            ],
            correctIndex: 2,
            explanation:
              'Radiation can travel through a vacuum because it involves electromagnetic waves, not particle collisions. Sunlight and heat from the sun travel about 150 million km through the near-vacuum of space to reach Earth. Conduction and convection require matter, so they cannot transfer heat through space.',
          },
          {
            id: 'heat-q3',
            question:
              'Which of the following is the BEST example of convection?',
            options: [
              'A metal barbecue grill heating the meat placed on it',
              'Feeling the warmth of a charcoal fire from one meter away',
              'Hot air rising from a cooking pot while cooler air sinks around it',
              'A wooden table feeling cooler than a metal table at the same room temperature',
            ],
            correctIndex: 2,
            explanation:
              'Convection involves the movement of fluids (liquids or gases) — warmer, less dense fluid rises while cooler, denser fluid sinks. Hot air rising from a pot while cooler air sinks is a classic convection current. The metal grill example is conduction; feeling fire warmth from a distance is radiation; the table example is about conductivity.',
          },
        ],
      },
    ],
  },

  {
    id: 'earth-space',
    title: 'Earth and Space',
    subject: 'science',
    difficulty: 'intermediate',
    prerequisites: [],
    estimatedMinutes: 90,
    description:
      'Examine the structure of Earth, the dynamic processes that shape its surface, and our place in the solar system and beyond. Understand how Earth\'s systems interact and how space science connects to Philippine geography and weather.',
    sources: [DEPED_SCIENCE_SOURCE],
    lessons: [
      {
        id: 'structure-of-the-earth',
        title: 'Structure of the Earth',
        order: 1,
        overview:
          'Describe the layers of Earth from its inner core to the crust. Understand the theory of plate tectonics and how it explains earthquakes, volcanoes, and mountain building — processes especially relevant to the Philippines.',
        objectives: [
          'Identify the four layers of Earth and describe their characteristics',
          'Explain the theory of plate tectonics and describe the three types of plate boundaries',
          'Connect plate tectonics to the geology and natural hazards of the Philippines',
        ],
        estimatedMinutes: 30,
        generatedBy: 'sourced',
        content: `## Structure of the Earth

### Earth's Four Layers

Earth is composed of four main layers, like the inside of a *singkamas* (turnip):

**1. Inner Core**
- Solid ball of iron and nickel
- Temperature: ~5,000–6,000°C (as hot as the sun's surface!)
- Remains solid despite extreme heat due to enormous pressure
- Radius: ~1,220 km

**2. Outer Core**
- Liquid iron and nickel
- Temperature: ~4,000–5,000°C
- Movement of liquid iron here generates Earth's magnetic field (the magnetosphere that protects us from solar radiation)
- Thickness: ~2,300 km

**3. Mantle**
- Semi-solid (behaves like very thick, slow-moving plastic over millions of years)
- Composed mostly of silicate rock (oxygen, silicon, magnesium, iron)
- Contains convection currents that drive plate movement
- Thickness: ~2,900 km (largest layer)

**4. Crust**
- Thin, rigid outermost layer
- **Continental crust**: 30–70 km thick; less dense; mostly granite
- **Oceanic crust**: 5–10 km thick; denser; mostly basalt
- Where all life exists and all human activity takes place

### Theory of Plate Tectonics

Earth's crust and upper mantle are broken into about 15–20 large pieces called **tectonic plates**. These plates float on the semi-solid mantle and move very slowly (a few centimeters per year — roughly the rate your fingernails grow).

Convection currents in the mantle drive plate movement.

### Types of Plate Boundaries

**Convergent boundary (plates move toward each other)**
- Oceanic + continental: oceanic plate sinks (subducts) → trenches, volcanoes, earthquakes
- Example: The Philippine Sea Plate subducts under the Eurasian Plate → volcanoes like Mt. Pinatubo and Mt. Mayon

**Divergent boundary (plates move apart)**
- Magma rises to fill the gap → mid-ocean ridges, new oceanic crust forms
- Example: Mid-Atlantic Ridge

**Transform boundary (plates slide past each other)**
- Earthquakes along fault lines
- Example: The San Andreas Fault (California); the Valley Fault System in Metro Manila

### The Philippines and Plate Tectonics

The Philippines sits on the **Pacific Ring of Fire** — a zone of intense volcanic and seismic activity circling the Pacific Ocean where many tectonic plates meet. This explains why the Philippines has:
- Over 300 volcanoes (22 active), including Mt. Mayon, Mt. Pinatubo, Taal Volcano
- Frequent earthquakes
- Some of the world's deepest ocean trenches (Philippine Trench: ~10,540 m deep)`,
        examples: [
          'Why does the Philippines experience more earthquakes and volcanic eruptions than many other countries? Use plate tectonics to explain.',
          'If the Earth\'s mantle is solid rock, how can tectonic plates move? Explain using the concept of convection.',
          'The 1991 eruption of Mt. Pinatubo was one of the 20th century\'s largest volcanic eruptions. Which type of plate boundary caused it?',
        ],
        quiz: [
          {
            id: 'earth-q1',
            question: 'Which layer of Earth is responsible for generating its magnetic field?',
            options: ['Inner core', 'Outer core', 'Mantle', 'Crust'],
            correctIndex: 1,
            explanation:
              'Earth\'s magnetic field is generated by the movement of liquid iron and nickel in the outer core. The convection and rotation of this conductive liquid creates electric currents, which produce the magnetosphere that shields Earth from harmful solar radiation.',
          },
          {
            id: 'earth-q2',
            question:
              'The Philippine Sea Plate moves toward and sinks beneath the Eurasian Plate. What type of plate boundary is this?',
            options: ['Divergent boundary', 'Transform boundary', 'Convergent boundary', 'Subduction is not a boundary type'],
            correctIndex: 2,
            explanation:
              'When two plates move toward each other, it is a convergent boundary. When an oceanic plate (denser) meets a continental plate, the oceanic plate is pushed down (subducts) into the mantle. This process creates deep ocean trenches, volcanic mountain chains, and frequent earthquakes — all characteristics of the Philippines.',
          },
          {
            id: 'earth-q3',
            question: 'Which is the THICKEST layer of Earth?',
            options: ['Crust', 'Inner core', 'Outer core', 'Mantle'],
            correctIndex: 3,
            explanation:
              'The mantle is Earth\'s thickest layer at about 2,900 km. The crust is only 5–70 km thick (the thinnest layer). The outer core is about 2,300 km and the inner core radius is about 1,220 km. The mantle makes up about 84% of Earth\'s total volume.',
          },
        ],
      },
      {
        id: 'solar-system',
        title: 'The Solar System',
        order: 2,
        overview:
          'Explore the components of the solar system — the sun, eight planets, moons, asteroids, and comets. Understand the motions of Earth that cause day, night, and the seasons.',
        objectives: [
          'Name and describe the eight planets in order from the sun',
          'Explain how Earth\'s rotation causes day and night and its revolution causes seasons',
          'Describe the characteristics of other solar system bodies: moons, asteroids, comets',
        ],
        estimatedMinutes: 30,
        generatedBy: 'sourced',
        content: `## The Solar System

### What is the Solar System?

The **solar system** consists of the Sun and all objects gravitationally bound to it: 8 planets, over 200 moons, dwarf planets (like Pluto), asteroids, comets, and dust. The Sun contains 99.86% of all the mass in the solar system.

### The Eight Planets (in order from the Sun)

Memory device: **M**y **V**ery **E**xcited **M**other **J**ust **S**erved **U**s **N**achos

| Planet | Key Characteristics |
|--------|-------------------|
| **Mercury** | Smallest; closest to sun; extreme temperatures (-180°C to 430°C); no atmosphere |
| **Venus** | Hottest (462°C); thick CO₂ atmosphere; rotates backward; "Evening/Morning Star" |
| **Earth** | Only known planet with life; liquid water; one large moon |
| **Mars** | "Red Planet" (iron oxide); thin atmosphere; largest volcano (Olympus Mons); 2 moons |
| **Jupiter** | Largest planet; gas giant; Great Red Spot (giant storm); 95 moons |
| **Saturn** | Famous rings (ice and rock); least dense; 146 moons including Titan |
| **Uranus** | Ice giant; rotates on its side (98° tilt); faint rings |
| **Neptune** | Farthest; strongest winds; ice giant; 16 moons |

### Inner vs. Outer Planets

**Terrestrial planets** (Mercury, Venus, Earth, Mars): rocky, dense, smaller, fewer moons

**Gas/Ice giants** (Jupiter, Saturn, Uranus, Neptune): mostly gas or ice, larger, many moons, rings

The **asteroid belt** lies between Mars and Jupiter — a region of rocky debris left over from the solar system's formation.

### Earth's Rotation and Revolution

**Rotation** — Earth spins on its axis (an imaginary line through the North and South Poles). One rotation = **24 hours** (one day). The side facing the Sun has day; the opposite side has night.

**Revolution** — Earth orbits around the Sun. One revolution = **365.25 days** (one year). Every 4 years, we add the extra 0.25 day as a **leap year** (February 29).

### Seasons

Earth's axis is tilted at **23.5°** relative to its orbit. This tilt, combined with revolution, causes seasons:

- When the **Northern Hemisphere tilts toward the Sun** → it is summer there (more direct sunlight, longer days)
- When it **tilts away** → winter (less direct sunlight, shorter days)

The Philippines is near the **equator**, so it experiences **wet and dry seasons** rather than four dramatic seasons. However, we still receive more direct sunlight near December solstice (Southern Hemisphere tilts toward sun).

### Other Solar System Bodies

**Moon** — Earth's natural satellite; causes tides through gravitational pull; takes 27.3 days to orbit Earth

**Comets** — Icy bodies that develop bright tails (of gas and dust) when close to the Sun. Halley's Comet visits every ~76 years.

**Asteroids** — Rocky, irregular bodies mostly in the asteroid belt

**Meteoroids → Meteors → Meteorites** — Space rocks that enter Earth's atmosphere (meteors/shooting stars) and survive to hit the ground (meteorites)`,
        examples: [
          'If Earth did not have a tilted axis, would we still experience seasons? Explain.',
          'Why is Venus hotter than Mercury, even though Mercury is closer to the Sun?',
          'A Filipino farmer notices that *ampalaya* grows best during a certain month when the sun is highest in the sky at noon. What does this have to do with Earth\'s position in its orbit?',
        ],
        quiz: [
          {
            id: 'solar-q1',
            question: 'What causes day and night on Earth?',
            options: [
              'Earth\'s revolution around the Sun',
              'The Moon blocking sunlight from parts of Earth',
              'Earth\'s rotation on its own axis',
              'The Sun rotating around Earth',
            ],
            correctIndex: 2,
            explanation:
              'Day and night are caused by Earth\'s rotation — its spinning on its own axis every 24 hours. The side of Earth facing the Sun experiences day while the opposite side is in darkness (night). Revolution (orbiting the Sun once per year) causes the seasons, not day and night.',
          },
          {
            id: 'solar-q2',
            question: 'Which planet is known for its prominent ring system?',
            options: ['Jupiter', 'Uranus', 'Saturn', 'Neptune'],
            correctIndex: 2,
            explanation:
              'Saturn is famous for its extensive and clearly visible ring system, made of ice particles, dust, and rocky debris. While Jupiter, Uranus, and Neptune also have rings, Saturn\'s are by far the most prominent and visible.',
          },
          {
            id: 'solar-q3',
            question:
              'The Philippines experiences a hot dry season from March to May. Which of the following is the BEST explanation?',
            options: [
              'Earth is closest to the Sun in March',
              'The Philippines is tilting toward the Sun, receiving more direct solar energy',
              'The Sun is hotter during those months',
              'The Moon\'s gravity reduces cloud cover in those months',
            ],
            correctIndex: 1,
            explanation:
              'The Philippines\' dry season (March–May) is caused by its position relative to the Sun and the movement of the Intertropical Convergence Zone (ITCZ), not by Earth\'s actual distance from the Sun (Earth is actually closest to the Sun in January). During this period, the Philippine area receives more intense, direct sunlight.',
          },
        ],
      },
      {
        id: 'weather-and-climate',
        title: 'Weather, Climate, and the Water Cycle',
        order: 3,
        overview:
          'Distinguish between weather and climate. Understand the water cycle and how it drives weather patterns. Examine the types of weather systems that affect the Philippines, including typhoons.',
        objectives: [
          'Distinguish between weather and climate with local examples',
          'Describe the stages of the water cycle and explain how each stage works',
          'Identify the types of weather systems that affect the Philippines, particularly typhoons',
        ],
        estimatedMinutes: 30,
        generatedBy: 'sourced',
        content: `## Weather, Climate, and the Water Cycle

### Weather vs. Climate

**Weather** is the state of the atmosphere at a specific place and time — it can change hour by hour. Described by: temperature, humidity, precipitation, wind speed, cloud cover.

**Climate** is the average weather pattern of a region over a long period (usually 30+ years). It describes what weather is *typical* for an area.

Memory trick: "Climate is what you expect; weather is what you get."

Examples in the Philippine context:
- "It is raining in Manila today" = **weather**
- "The Philippines has a tropical climate with wet and dry seasons" = **climate**

### The Water Cycle

The **water cycle** (hydrological cycle) describes the continuous movement of water through Earth's systems. It is driven by solar energy and gravity.

**Stages of the Water Cycle:**

1. **Evaporation** — Heat from the Sun causes water from oceans, lakes, and rivers to become water vapor (gas) and rise into the atmosphere. The Philippines' extensive coastline and warm ocean temperatures make this very significant.

2. **Transpiration** — Plants release water vapor through their leaves. Together with evaporation, this is called **evapotranspiration**.

3. **Condensation** — As water vapor rises, it cools. When it cools enough (the **dew point**), it condenses into tiny water droplets around dust particles, forming **clouds** and **fog**.

4. **Precipitation** — When water droplets in clouds combine and become heavy enough, they fall as **rain, drizzle, snow, or hail**. The Philippines receives primarily rain.

5. **Collection** — Precipitation flows into rivers, lakes, and the ocean (surface runoff), or seeps into the ground (infiltration/groundwater).

6. **The cycle repeats.**

### Philippine Climate

The Philippines has a **tropical climate** influenced by:
- **Two monsoons**: *habagat* (southwest monsoon, June–September: wet) and *amihan* (northeast monsoon, October–February: cooler and drier in many areas)
- **Location near the equator**: consistently warm temperatures year-round
- **Surrounding oceans**: Philippines is archipelago of 7,641 islands — ocean greatly moderates temperature

### Typhoons

**Typhoons** (called *bagyo* in Filipino) are intense tropical cyclones that form over warm ocean water. They bring:
- Strong winds (at least 118 km/h for a typhoon)
- Heavy rain and flooding
- Storm surges

The Philippines experiences an average of **20 typhoons per year**, making it one of the world's most typhoon-affected countries. They typically come from the Pacific Ocean and move westward or northwestward. The **Philippine Atmospheric, Geophysical and Astronomical Services Administration (PAGASA)** monitors and names Philippine typhoons.

Notable typhoons: Super Typhoon Yolanda/Haiyan (2013) — one of the strongest landfalling cyclones ever recorded.

### PAGASA's Wind Signal System

| Signal | Wind Speed | Condition |
|--------|-----------|-----------|
| Signal No. 1 | 30–60 km/h | Tropical depression/storm, classes may be suspended |
| Signal No. 2 | 61–120 km/h | Typhoon, greater disruption |
| Signal No. 3 | 121–185 km/h | Intense typhoon, major disruption |
| Signal No. 4 | 186–220 km/h | Super typhoon, extreme danger |
| Signal No. 5 | >220 km/h | Catastrophic super typhoon |`,
        examples: [
          'Using the water cycle, explain where the water in a *buwis-buhay* (flash flood) during a typhoon originally came from.',
          'Why does the *habagat* bring heavy rains to the western Philippines while the *amihan* brings rain to the east?',
          'Your friend says "Climate is just long-term weather." Is this a good definition? What would you add or correct?',
        ],
        quiz: [
          {
            id: 'weather-q1',
            question: 'Which stage of the water cycle involves liquid water becoming water vapor?',
            options: ['Condensation', 'Precipitation', 'Collection', 'Evaporation'],
            correctIndex: 3,
            explanation:
              'Evaporation is the process by which liquid water is converted to water vapor (gas) through the addition of heat energy from the Sun. This is how water from oceans, rivers, and lakes enters the atmosphere. Condensation is the opposite — water vapor becoming liquid water droplets.',
          },
          {
            id: 'weather-q2',
            question:
              '"Manila is hot and humid today with afternoon thundershowers." This statement describes:',
            options: [
              'The climate of Manila',
              'The weather in Manila',
              'The typhoon season in Manila',
              'The monsoon patterns of Manila',
            ],
            correctIndex: 1,
            explanation:
              'Weather describes current atmospheric conditions at a specific time and place. "Today" tells us this is current, immediate information about conditions right now — that is weather. Climate would be a long-term pattern like "Manila is typically hot and humid from April to June."',
          },
          {
            id: 'weather-q3',
            question: 'What atmospheric condition must exist for a typhoon to form?',
            options: [
              'Cold ocean water below 10°C',
              'Warm ocean water above 26°C and low atmospheric pressure',
              'Strong upper-level winds pushing air downward',
              'A cold front meeting a warm front',
            ],
            correctIndex: 1,
            explanation:
              'Typhoons (tropical cyclones) form over warm ocean water — typically above 26°C — which provides the energy through evaporation. Warm, moist air rises rapidly, creating low pressure at the surface. As the warm air rises and cools, it condenses, releasing latent heat that fuels the storm\'s intensity.',
          },
        ],
      },
    ],
  },
];
