import { Subtopic, CurriculumSource } from '@/types/tutor';

const DEPED_SOURCE: CurriculumSource = {
  name: 'DepEd MELC',
  url: 'https://www.deped.gov.ph/wp-content/uploads/2020/07/Mathematics.pdf',
  type: 'deped',
  verified: true,
};

export const MATHEMATICS_SUBTOPICS: Subtopic[] = [
  {
    id: 'number-systems',
    title: 'Number Systems',
    subject: 'mathematics',
    difficulty: 'beginner',
    prerequisites: [],
    estimatedMinutes: 90,
    description:
      'Understand the different types of numbers — integers, fractions, decimals, and the distinction between rational and irrational numbers. This is the foundation for all arithmetic and algebra.',
    sources: [DEPED_SOURCE],
    lessons: [
      {
        id: 'integers-number-line',
        title: 'Integers and the Number Line',
        order: 1,
        overview:
          'Learn what integers are, how to represent them on a number line, and how to compare and order positive and negative numbers.',
        objectives: [
          'Define integers and identify them in real-life contexts',
          'Represent integers on a number line',
          'Compare and order integers using inequality symbols',
          'Solve simple problems involving integers in real-world situations',
        ],
        estimatedMinutes: 30,
        generatedBy: 'sourced',
        content: `## Integers and the Number Line

**Integers** are the set of whole numbers and their negatives: {..., -3, -2, -1, 0, 1, 2, 3, ...}. They do not include fractions or decimals. In the Philippines, you encounter integers every day — temperature in Baguio can drop to 9°C (positive integer), while a debt of ₱500 can be represented as -500 (negative integer).

### The Number Line

A **number line** is a straight line where every point corresponds to a number. Zero sits in the middle. Positive integers extend to the right, and negative integers extend to the left. The further a number is from zero, the greater its **absolute value** — that is, its distance from zero without regard to sign.

For example, both +5 and -5 are 5 units away from zero, so |5| = |-5| = 5.

### Comparing and Ordering Integers

On a number line, a number is **greater** than any number to its left. So -1 > -5, even though 5 might seem "bigger" when you ignore the sign. Think of it like a thermometer: -1°C is warmer (greater) than -5°C.

To compare integers, ask: which one is farther to the right on the number line? Use the symbols:
- **>** (greater than): 3 > -7
- **<** (less than): -4 < 2
- **=** (equal to): -(-3) = 3

### Real-Life Integers

Integers model many real situations:
- **Elevation:** Sea level = 0, Mount Apo summit ≈ +2,954 m, ocean floor depths are negative
- **Finances:** Profit is positive, loss or debt is negative
- **Scores:** Exam scores above passing are positive, deductions below zero are negative in some scoring systems`,
        examples: [
          'Plot -3, 0, 2, -1, 5 on a number line and arrange them from least to greatest.',
          'A student earned ₱200 doing chores but owes ₱350 to a friend. Represent both amounts as integers.',
          'The temperature in Baguio was -2°C in the morning and 8°C at noon. Which is greater? By how many degrees did it rise?',
        ],
        quiz: [
          {
            id: 'int-q1',
            question: 'Which of the following correctly arranges the integers from least to greatest?',
            options: ['-5, -2, 0, 3, 7', '7, 3, 0, -2, -5', '-2, -5, 0, 3, 7', '0, -2, -5, 3, 7'],
            correctIndex: 0,
            explanation:
              'On a number line, numbers increase from left to right. -5 is the farthest left, then -2, then 0, then 3, then 7. So the correct order from least to greatest is -5, -2, 0, 3, 7.',
          },
          {
            id: 'int-q2',
            question: 'What is the absolute value of -9?',
            options: ['-9', '0', '9', '81'],
            correctIndex: 2,
            explanation:
              'Absolute value is the distance from zero on a number line, always non-negative. |-9| = 9 because -9 is 9 units away from zero.',
          },
          {
            id: 'int-q3',
            question:
              'A diver is at -15 meters (below sea level) and rises 8 meters. Which integer represents the new position?',
            options: ['-23', '-7', '7', '23'],
            correctIndex: 1,
            explanation:
              'Starting at -15 and rising 8 meters means adding 8: -15 + 8 = -7. The diver is now at -7 meters (still below sea level).',
          },
        ],
      },
      {
        id: 'fractions-and-decimals',
        title: 'Fractions and Decimals',
        order: 2,
        overview:
          'Understand the relationship between fractions and decimals, convert between them, and perform basic operations.',
        objectives: [
          'Define fractions and identify numerator and denominator',
          'Convert fractions to decimals and vice versa',
          'Compare and order fractions and decimals',
          'Add and subtract simple fractions with like and unlike denominators',
        ],
        estimatedMinutes: 30,
        generatedBy: 'sourced',
        content: `## Fractions and Decimals

A **fraction** represents a part of a whole. It is written as \\(\\frac{a}{b}\\), where:
- **a** is the **numerator** (how many parts you have)
- **b** is the **denominator** (how many equal parts the whole is divided into)

For example, if you cut a *pandesal* into 4 equal pieces and eat 1, you ate \\(\\frac{1}{4}\\) of the bread.

### Converting Fractions to Decimals

To convert a fraction to a decimal, **divide the numerator by the denominator**:

$$\\frac{3}{4} = 3 \\div 4 = 0.75$$

Some fractions produce **terminating decimals** (they end): \\(\\frac{1}{2} = 0.5\\)

Others produce **repeating decimals** (they go on forever with a pattern): \\(\\frac{1}{3} = 0.\\overline{3}\\) = 0.3333...

### Converting Decimals to Fractions

Read the decimal place value and write it as a fraction, then simplify:

$$0.6 = \\frac{6}{10} = \\frac{3}{5}$$
$$0.25 = \\frac{25}{100} = \\frac{1}{4}$$

### Comparing Fractions and Decimals

To compare fractions with different denominators, convert them to a **common denominator** or to decimals:

$$\\frac{2}{3} \\text{ vs } \\frac{3}{5}: \\quad \\frac{2}{3} = 0.667, \\quad \\frac{3}{5} = 0.6 \\implies \\frac{2}{3} > \\frac{3}{5}$$

### Adding and Subtracting Fractions

**Like denominators:** Add or subtract numerators only.
$$\\frac{3}{8} + \\frac{2}{8} = \\frac{5}{8}$$

**Unlike denominators:** Find the Least Common Denominator (LCD), convert, then add.
$$\\frac{1}{3} + \\frac{1}{4} = \\frac{4}{12} + \\frac{3}{12} = \\frac{7}{12}$$`,
        examples: [
          'A recipe calls for 3/4 cup of sugar. You only have a 1/4 cup measure. How many times do you need to fill it?',
          'Convert 0.375 to a fraction in simplest form.',
          'Arrange these from least to greatest: 0.5, 1/3, 3/4, 0.25',
        ],
        quiz: [
          {
            id: 'frac-q1',
            question: 'What is 3/5 converted to a decimal?',
            options: ['0.35', '0.53', '0.6', '0.65'],
            correctIndex: 2,
            explanation: '3 ÷ 5 = 0.6. You can verify: 0.6 × 5 = 3.0. So 3/5 = 0.6.',
          },
          {
            id: 'frac-q2',
            question: 'What is the sum of 1/4 + 2/3?',
            options: ['3/7', '3/12', '11/12', '7/12'],
            correctIndex: 2,
            explanation:
              'The LCD of 4 and 3 is 12. Convert: 1/4 = 3/12 and 2/3 = 8/12. Add: 3/12 + 8/12 = 11/12.',
          },
          {
            id: 'frac-q3',
            question: 'Which fraction is equivalent to 0.75?',
            options: ['7/5', '3/5', '7/10', '3/4'],
            correctIndex: 3,
            explanation:
              '0.75 = 75/100. Simplify by dividing both by 25: 75 ÷ 25 = 3, 100 ÷ 25 = 4. So 0.75 = 3/4.',
          },
        ],
      },
      {
        id: 'rational-vs-irrational',
        title: 'Rational vs Irrational Numbers',
        order: 3,
        overview:
          'Distinguish between rational and irrational numbers, understand their properties, and identify them in real-world and mathematical contexts.',
        objectives: [
          'Define rational numbers as numbers expressible as p/q where q ≠ 0',
          'Identify irrational numbers and give examples',
          'Classify numbers as rational or irrational',
          'Understand that the set of real numbers includes both rational and irrational numbers',
        ],
        estimatedMinutes: 30,
        generatedBy: 'sourced',
        content: `## Rational vs Irrational Numbers

### Rational Numbers

A **rational number** is any number that can be written as a fraction \\(\\frac{p}{q}\\), where both *p* and *q* are integers and *q* ≠ 0. This includes:
- All integers (e.g., 5 = 5/1, -3 = -3/1)
- All fractions (e.g., 2/3, -7/4)
- All terminating decimals (e.g., 0.5 = 1/2, 0.125 = 1/8)
- All repeating decimals (e.g., 0.333... = 1/3, 0.181818... = 2/11)

The key test: **Can you write it as p/q with integer p and q, q ≠ 0?** If yes, it's rational.

### Irrational Numbers

An **irrational number** cannot be expressed as a fraction of two integers. Its decimal expansion goes on forever without repeating. Famous examples include:

- **√2 ≈ 1.41421356...** — the length of the diagonal of a 1×1 square
- **π ≈ 3.14159265...** — the ratio of a circle's circumference to its diameter
- **√3, √5, √7** — square roots of non-perfect squares are always irrational
- **e ≈ 2.71828...** — Euler's number, base of natural logarithm

### The Real Number System

The **real numbers** (ℝ) include all rational and irrational numbers together. Every point on the number line corresponds to exactly one real number.

$$\\mathbb{R} = \\text{Rational Numbers} \\cup \\text{Irrational Numbers}$$

To classify a number:
1. If it can be written as p/q → **rational**
2. If its decimal never ends and never repeats → **irrational**
3. √n is irrational unless n is a perfect square (1, 4, 9, 16, 25, ...)`,
        examples: [
          'Classify each: √9, √10, -7/3, 0.121212..., π',
          'A circle has radius 3 cm. Is the exact circumference (2πr) rational or irrational?',
          'Is 0.101001000100001... rational or irrational? Why?',
        ],
        quiz: [
          {
            id: 'rat-q1',
            question: 'Which of the following is an irrational number?',
            options: ['0.5', '√16', '√7', '-4/3'],
            correctIndex: 2,
            explanation:
              '√16 = 4 (rational), 0.5 = 1/2 (rational), -4/3 is already a fraction (rational). √7 ≈ 2.6457... is non-terminating and non-repeating, so it is irrational.',
          },
          {
            id: 'rat-q2',
            question: 'The decimal 0.363636... (repeating) is best classified as:',
            options: [
              'Irrational, because it goes on forever',
              'Rational, because it repeats',
              'Neither rational nor irrational',
              'A whole number',
            ],
            correctIndex: 1,
            explanation:
              'Any repeating decimal can be written as a fraction. 0.363636... = 4/11. Because it can be expressed as p/q, it is rational.',
          },
          {
            id: 'rat-q3',
            question: 'Which set correctly contains ONLY rational numbers?',
            options: ['{ π, 1/2, √3 }', '{ √2, √4, √6 }', '{ -3, 0.5, 7/2, 0.7̄ }', '{ π, e, √5 }'],
            correctIndex: 2,
            explanation:
              '-3 = -3/1 (rational), 0.5 = 1/2 (rational), 7/2 (rational), 0.7̄ = 7/9 (rational). All four are rational. The other sets contain irrationals like π, √2, √3, √6, and e.',
          },
        ],
      },
    ],
  },

  {
    id: 'basic-algebra',
    title: 'Basic Algebra',
    subject: 'mathematics',
    difficulty: 'beginner',
    prerequisites: ['number-systems'],
    estimatedMinutes: 90,
    description:
      'Introduction to algebraic thinking — using letters to represent unknown quantities, forming expressions, and solving simple equations. This subtopic builds the bridge from arithmetic to algebra.',
    sources: [DEPED_SOURCE],
    lessons: [
      {
        id: 'variables-and-expressions',
        title: 'Variables and Expressions',
        order: 1,
        overview:
          'Understand what variables are, how to write algebraic expressions, and how to evaluate expressions by substituting values.',
        objectives: [
          'Define a variable and explain its role in algebra',
          'Translate verbal phrases into algebraic expressions',
          'Evaluate expressions by substituting given values for variables',
          'Identify terms, coefficients, and constants in an expression',
        ],
        estimatedMinutes: 30,
        generatedBy: 'sourced',
        content: `## Variables and Algebraic Expressions

### What is a Variable?

A **variable** is a letter (or symbol) that represents an unknown or changing quantity. In the sentence "I bought *n* notebooks at ₱25 each," the letter *n* is a variable — it can be any number depending on how many notebooks you bought.

Variables allow us to write **general rules** that work for many situations, not just one specific case.

### Algebraic Expressions

An **algebraic expression** combines variables, numbers, and operations (like +, -, ×, ÷). It does **not** have an equals sign.

Examples:
- **3x** — three times some number x (the 3 is the **coefficient**, x is the **variable**)
- **2n + 5** — two times n, then add 5
- **a² - 4b** — a squared, minus four times b

### Parts of an Expression

| Part | Meaning | Example in 5x² - 3x + 7 |
|------|---------|--------------------------|
| **Term** | Each part separated by + or - | 5x², -3x, 7 |
| **Coefficient** | Number multiplying the variable | 5 (in 5x²), -3 (in -3x) |
| **Constant** | Term with no variable | 7 |
| **Degree** | Highest exponent | 2 |

### Translating Words into Expressions

| English phrase | Algebraic expression |
|----------------|---------------------|
| A number increased by 8 | x + 8 |
| Five less than a number | n - 5 |
| The product of 4 and a number | 4y |
| A number divided by 3 | m/3 or m ÷ 3 |
| Twice a number, plus 1 | 2k + 1 |

### Evaluating Expressions

To **evaluate** an expression, substitute the given value and simplify:

Evaluate **3x - 2** when x = 4:
$$3(4) - 2 = 12 - 2 = 10$$

Evaluate **a² + 2b** when a = 3 and b = -1:
$$(3)^2 + 2(-1) = 9 + (-2) = 7$$`,
        examples: [
          'A jeepney driver earns ₱12 per passenger. Write an expression for earnings with p passengers. How much if p = 15?',
          'Translate to an expression: "Seven more than twice a number."',
          'Evaluate 4m - n² when m = 2 and n = 3.',
        ],
        quiz: [
          {
            id: 'var-q1',
            question: 'Which expression means "five less than three times a number n"?',
            options: ['5 - 3n', '3n - 5', '3(n - 5)', '5n - 3'],
            correctIndex: 1,
            explanation:
              '"Three times a number n" is 3n. "Five less than" means we subtract 5 from it: 3n - 5. Be careful — "five less than" means subtract 5 FROM the expression, not subtract the expression from 5.',
          },
          {
            id: 'var-q2',
            question: 'In the expression 6x² - 4x + 9, what is the coefficient of x?',
            options: ['6', '-4', '4', '9'],
            correctIndex: 1,
            explanation:
              'The coefficient is the number multiplying the variable. The term containing just x (not x²) is -4x, so its coefficient is -4. The negative sign is part of the coefficient.',
          },
          {
            id: 'var-q3',
            question: 'Evaluate 2a + b² when a = 3 and b = -2.',
            options: ['2', '10', '14', '-2'],
            correctIndex: 1,
            explanation:
              '2(3) + (-2)² = 6 + 4 = 10. Note that (-2)² = +4 because a negative number squared is positive.',
          },
        ],
      },
      {
        id: 'solving-one-step-equations',
        title: 'Solving One-Step Equations',
        order: 2,
        overview:
          'Learn the concept of equations, the balance property, and how to solve equations requiring a single operation — addition, subtraction, multiplication, or division.',
        objectives: [
          'Understand an equation as a balanced statement',
          'Apply the addition/subtraction property of equality',
          'Apply the multiplication/division property of equality',
          'Verify solutions by substituting back into the equation',
        ],
        estimatedMinutes: 30,
        generatedBy: 'sourced',
        content: `## Solving One-Step Equations

### What is an Equation?

An **equation** is a mathematical statement that says two expressions are equal. It always contains an equals sign (=). The goal of solving an equation is to find the value of the variable that makes it true.

Think of an equation as a **balance scale**: whatever you do to one side, you must do to the other to keep it balanced.

$$x + 5 = 12 \\quad \\text{(balanced)}$$

### The Key Principle: Properties of Equality

**Addition/Subtraction Property:**
> If a = b, then a + c = b + c and a - c = b - c

**Multiplication/Division Property:**
> If a = b, then a × c = b × c and a ÷ c = b ÷ c (where c ≠ 0)

The strategy: **apply the inverse (opposite) operation** to isolate the variable.

### Solving by Addition or Subtraction

**Example:** Solve x - 7 = 3

The operation applied to x is subtraction (-7). Undo it by adding 7 to both sides:
$$x - 7 + 7 = 3 + 7$$
$$x = 10$$

**Check:** 10 - 7 = 3 ✓

**Example:** Solve n + 9 = 4

Subtract 9 from both sides:
$$n + 9 - 9 = 4 - 9$$
$$n = -5$$

**Check:** -5 + 9 = 4 ✓

### Solving by Multiplication or Division

**Example:** Solve 3x = 15

Divide both sides by 3:
$$\\frac{3x}{3} = \\frac{15}{3}$$
$$x = 5$$

**Check:** 3(5) = 15 ✓

**Example:** Solve x/4 = -2

Multiply both sides by 4:
$$4 \\cdot \\frac{x}{4} = 4 \\cdot (-2)$$
$$x = -8$$

**Check:** -8/4 = -2 ✓

### Always Check Your Answer

After solving, substitute your answer back into the original equation. If both sides are equal, your solution is correct.`,
        examples: [
          'A vendor sold some mangoes and has 18 left. If she started with 45, write and solve an equation to find how many she sold.',
          'Solve: -3x = 21. What operation do you use and why?',
          'Solve: y + 14 = 6. Is the solution positive or negative? Explain before solving.',
        ],
        quiz: [
          {
            id: 'eq1-q1',
            question: 'What is the solution to x + 13 = 7?',
            options: ['20', '-6', '6', '-20'],
            correctIndex: 1,
            explanation: 'Subtract 13 from both sides: x = 7 - 13 = -6. Check: -6 + 13 = 7 ✓',
          },
          {
            id: 'eq1-q2',
            question: 'Solve: -4x = 32',
            options: ['x = 128', 'x = 8', 'x = -8', 'x = -128'],
            correctIndex: 2,
            explanation:
              'Divide both sides by -4: x = 32 ÷ (-4) = -8. Check: -4(-8) = 32 ✓. Remember: dividing a positive by a negative gives a negative.',
          },
          {
            id: 'eq1-q3',
            question: 'Which equation is solved correctly?',
            options: [
              'n - 5 = 3 → n = -2',
              'n/3 = 9 → n = 3',
              'n + 7 = 2 → n = -5',
              '5n = 15 → n = 75',
            ],
            correctIndex: 2,
            explanation:
              'n + 7 = 2 → subtract 7: n = 2 - 7 = -5. Check: -5 + 7 = 2 ✓. The others: n - 5 = 3 gives n = 8; n/3 = 9 gives n = 27; 5n = 15 gives n = 3.',
          },
        ],
      },
      {
        id: 'solving-two-step-equations',
        title: 'Solving Two-Step Equations',
        order: 3,
        overview:
          'Extend one-step equation solving to equations requiring two operations. Learn the order of inverse operations and build confidence with more complex algebraic manipulation.',
        objectives: [
          'Identify the order of operations applied to a variable',
          'Reverse operations in the correct order to isolate the variable',
          'Solve two-step equations involving all four operations',
          'Translate word problems into two-step equations and solve them',
        ],
        estimatedMinutes: 30,
        generatedBy: 'sourced',
        content: `## Solving Two-Step Equations

### What Makes It "Two-Step"?

A **two-step equation** requires exactly two operations to isolate the variable. For example:

$$2x + 3 = 11$$

Here, x has been multiplied by 2, then 3 has been added. To undo this, we reverse the operations **in reverse order** (like un-wrapping a gift: remove the ribbon last, which was put on first).

### The Strategy: Work Backwards

1. **First, undo addition or subtraction** (the outermost operation)
2. **Then, undo multiplication or division** (the innermost operation touching the variable)

### Worked Examples

**Example 1:** Solve 2x + 3 = 11

Step 1: Subtract 3 from both sides
$$2x + 3 - 3 = 11 - 3 \implies 2x = 8$$

Step 2: Divide both sides by 2
$$\\frac{2x}{2} = \\frac{8}{2} \implies x = 4$$

**Check:** 2(4) + 3 = 8 + 3 = 11 ✓

**Example 2:** Solve 5 - 3n = 17

Step 1: Subtract 5 from both sides
$$5 - 3n - 5 = 17 - 5 \implies -3n = 12$$

Step 2: Divide both sides by -3
$$n = 12 ÷ (-3) = -4$$

**Check:** 5 - 3(-4) = 5 + 12 = 17 ✓

**Example 3:** Solve x/4 - 1 = 5

Step 1: Add 1 to both sides
$$\\frac{x}{4} = 6$$

Step 2: Multiply both sides by 4
$$x = 24$$

**Check:** 24/4 - 1 = 6 - 1 = 5 ✓

### From Words to Equations

"I think of a number. I multiply it by 3, then subtract 7. The result is 14. What is the number?"

Let n = the number:
$$3n - 7 = 14 \implies 3n = 21 \implies n = 7$$`,
        examples: [
          'A taxi fare is ₱40 flag-down plus ₱15 per kilometer. If the total fare is ₱145, how many kilometers was the trip?',
          'Solve: -2y + 6 = -10. Identify each step clearly.',
          'Solve: (n + 3)/5 = 4. Which operation do you undo first?',
        ],
        quiz: [
          {
            id: 'eq2-q1',
            question: 'Solve: 3x - 4 = 11',
            options: ['x = 7/3', 'x = 5', 'x = 7', 'x = 15'],
            correctIndex: 1,
            explanation:
              'Add 4 to both sides: 3x = 15. Divide by 3: x = 5. Check: 3(5) - 4 = 15 - 4 = 11 ✓',
          },
          {
            id: 'eq2-q2',
            question: 'Solve: n/2 + 8 = 3',
            options: ['n = 22', 'n = -10', 'n = -5', 'n = 11'],
            correctIndex: 1,
            explanation:
              'Subtract 8: n/2 = -5. Multiply by 2: n = -10. Check: -10/2 + 8 = -5 + 8 = 3 ✓',
          },
          {
            id: 'eq2-q3',
            question:
              'A store sells bags at a fixed price. After buying 4 bags and paying a ₱50 delivery fee, the total was ₱850. What is the price per bag?',
            options: ['₱175', '₱200', '₱225', '₱250'],
            correctIndex: 1,
            explanation:
              'Let p = price per bag. Equation: 4p + 50 = 850. Subtract 50: 4p = 800. Divide by 4: p = ₱200. Check: 4(200) + 50 = 800 + 50 = 850 ✓',
          },
        ],
      },
    ],
  },

  {
    id: 'linear-equations',
    title: 'Linear Equations',
    subject: 'mathematics',
    difficulty: 'intermediate',
    prerequisites: ['basic-algebra'],
    estimatedMinutes: 90,
    description:
      'Explore linear equations in two variables, understand the coordinate plane, and learn to graph lines using slope and the slope-intercept form. This topic connects algebra to geometry.',
    sources: [DEPED_SOURCE],
    lessons: [
      {
        id: 'slope-and-coordinate-plane',
        title: 'Slope and the Coordinate Plane',
        order: 1,
        overview:
          'Understand the Cartesian coordinate plane, plot points using ordered pairs, and calculate the slope of a line from two points.',
        objectives: [
          'Identify and label the four quadrants of the coordinate plane',
          'Plot points given as ordered pairs (x, y)',
          'Calculate slope using the formula m = (y₂ - y₁)/(x₂ - x₁)',
          'Interpret slope as a rate of change in real-world contexts',
        ],
        estimatedMinutes: 30,
        generatedBy: 'sourced',
        content: `## Slope and the Coordinate Plane

### The Coordinate Plane

The **Cartesian coordinate plane** (named after René Descartes) is formed by two perpendicular number lines:
- The **x-axis** runs horizontally (left-right)
- The **y-axis** runs vertically (up-down)
- They intersect at the **origin** (0, 0)

The plane is divided into **four quadrants**:
| Quadrant | x value | y value |
|----------|---------|---------|
| I (upper right) | positive | positive |
| II (upper left) | negative | positive |
| III (lower left) | negative | negative |
| IV (lower right) | positive | negative |

Each point is written as an **ordered pair (x, y)**, where x is the horizontal position and y is the vertical position. Order matters: (3, 5) and (5, 3) are different points.

### What is Slope?

**Slope** measures the steepness and direction of a line. It tells us: for every unit we move right (along x), how many units do we move up or down (along y)?

$$m = \\frac{\\text{rise}}{\\text{run}} = \\frac{y_2 - y_1}{x_2 - x_1}$$

Where (x₁, y₁) and (x₂, y₂) are any two points on the line.

### Types of Slope

| Slope | Meaning | Graph Direction |
|-------|---------|-----------------|
| m > 0 | Positive | Line goes up left-to-right |
| m < 0 | Negative | Line goes down left-to-right |
| m = 0 | Zero | Horizontal line |
| Undefined | Vertical | Vertical line |

### Real-Life Slope

A road that rises 3 meters for every 100 meters of horizontal distance has a slope of 3/100 = 0.03 (or 3% grade). A steeper road has a larger slope. A ramp that drops has a negative slope.

### Calculating Slope

**Example:** Find the slope through (2, 1) and (5, 7):
$$m = \\frac{7 - 1}{5 - 2} = \\frac{6}{3} = 2$$

For every 1 unit right, the line rises 2 units.`,
        examples: [
          'Plot the points (3, -2), (-1, 4), and (0, 0) on a coordinate plane and identify the quadrant of each.',
          'A bicycle ramp rises from point (0, 0) to point (8, 3). What is the slope? What does it mean?',
          'Find the slope through (-2, 5) and (4, -1). Is the line rising or falling?',
        ],
        quiz: [
          {
            id: 'slope-q1',
            question: 'What is the slope of the line through (1, 3) and (4, 9)?',
            options: ['2', '3', '6', '1/2'],
            correctIndex: 0,
            explanation: 'm = (9-3)/(4-1) = 6/3 = 2. For every 1 unit right, the line rises 2 units.',
          },
          {
            id: 'slope-q2',
            question: 'A line passes through (0, 5) and (5, 5). What is its slope?',
            options: ['1', '5', 'Undefined', '0'],
            correctIndex: 3,
            explanation:
              'm = (5-5)/(5-0) = 0/5 = 0. The y-values are the same, meaning it is a horizontal line with slope 0.',
          },
          {
            id: 'slope-q3',
            question: 'In which quadrant is the point (-3, 4)?',
            options: ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV'],
            correctIndex: 1,
            explanation:
              'Quadrant II has negative x and positive y. Since x = -3 (negative) and y = 4 (positive), the point (-3, 4) is in Quadrant II.',
          },
        ],
      },
      {
        id: 'slope-intercept-form',
        title: 'Slope-Intercept Form',
        order: 2,
        overview:
          'Learn the slope-intercept form y = mx + b, identify slope and y-intercept from an equation, and write equations of lines given slope and a point.',
        objectives: [
          'Identify m (slope) and b (y-intercept) from y = mx + b',
          'Write the equation of a line given slope and y-intercept',
          'Find the equation of a line given two points',
          'Interpret the meaning of m and b in real-world contexts',
        ],
        estimatedMinutes: 30,
        generatedBy: 'sourced',
        content: `## Slope-Intercept Form

### The Equation y = mx + b

The most useful way to write a linear equation is **slope-intercept form**:

$$y = mx + b$$

Where:
- **m** is the **slope** (steepness and direction)
- **b** is the **y-intercept** (where the line crosses the y-axis, i.e., the value of y when x = 0)

**Reading an equation:**
- y = 3x + 2 → slope = 3, y-intercept = 2
- y = -x + 5 → slope = -1, y-intercept = 5
- y = (1/2)x - 4 → slope = 1/2, y-intercept = -4

### Writing an Equation from Slope and Intercept

Given: slope = 4, y-intercept = -3
$$y = 4x - 3$$

That's it! Just substitute m and b directly.

### Writing an Equation from a Slope and One Point

Given slope m = 2 and point (3, 7):

Substitute into y = mx + b:
$$7 = 2(3) + b \implies 7 = 6 + b \implies b = 1$$

Equation: y = 2x + 1

### Writing an Equation from Two Points

Step 1: Calculate slope using m = (y₂ - y₁)/(x₂ - x₁)
Step 2: Substitute m and one point into y = mx + b to find b
Step 3: Write the full equation

**Example:** Points (1, 4) and (3, 10)
$$m = \\frac{10-4}{3-1} = \\frac{6}{2} = 3$$
Use point (1, 4): 4 = 3(1) + b → b = 1
Equation: **y = 3x + 1**

### Real-Life Meaning

If a cellphone plan costs ₱299/month base fee plus ₱8 per text message, then:
- b = 299 (fixed starting cost)
- m = 8 (cost per additional text)
- y = 8x + 299, where x = number of texts and y = total cost`,
        examples: [
          'A sari-sari store owner buys goods for ₱50 each and sells them for ₱65. Write a linear equation for profit based on number of items sold.',
          'Identify slope and y-intercept: y = -2x + 7. What does the y-intercept mean on a graph?',
          'Write the equation of a line through (0, -3) with slope 5.',
        ],
        quiz: [
          {
            id: 'si-q1',
            question: 'In the equation y = -3x + 8, what is the slope?',
            options: ['8', '3', '-3', '-8'],
            correctIndex: 2,
            explanation:
              'In y = mx + b form, m is the slope. Here m = -3. The negative sign tells us the line falls as x increases.',
          },
          {
            id: 'si-q2',
            question: 'A line has slope 2 and passes through (0, -5). What is its equation?',
            options: ['y = -5x + 2', 'y = 2x + 5', 'y = 2x - 5', 'y = -2x - 5'],
            correctIndex: 2,
            explanation:
              'The point (0, -5) is the y-intercept, so b = -5. With m = 2: y = 2x + (-5) = 2x - 5.',
          },
          {
            id: 'si-q3',
            question: 'Which equation passes through (2, 5) and (4, 11)?',
            options: ['y = 2x + 1', 'y = 3x - 1', 'y = 3x + 1', 'y = 2x + 3'],
            correctIndex: 1,
            explanation:
              'm = (11-5)/(4-2) = 6/2 = 3. Use point (2, 5): 5 = 3(2) + b → b = -1. Equation: y = 3x - 1. Check with (4, 11): 3(4) - 1 = 11 ✓',
          },
        ],
      },
      {
        id: 'graphing-linear-equations',
        title: 'Graphing Linear Equations',
        order: 3,
        overview:
          'Learn to graph linear equations using the slope-intercept method and the table of values method. Understand how changing m and b shifts or tilts the graph.',
        objectives: [
          'Graph a line using the y-intercept and slope (rise over run)',
          'Create a table of values to graph a linear equation',
          'Identify the x-intercept of a line by setting y = 0',
          'Describe how changing m or b affects the graph',
        ],
        estimatedMinutes: 30,
        generatedBy: 'sourced',
        content: `## Graphing Linear Equations

### Method 1: Slope-Intercept Method

To graph y = mx + b using slope and intercept:

1. **Plot the y-intercept (0, b)** — this is where the line crosses the y-axis
2. **Use the slope to find more points** — from the y-intercept, move right by the "run" and up (or down) by the "rise"
3. **Draw a straight line** through the points and extend it with arrows

**Example:** Graph y = (2/3)x - 1

- Plot y-intercept: (0, -1)
- Slope = 2/3: from (0, -1), move right 3, up 2 → plot (3, 1)
- Move right 3 more, up 2 → plot (6, 3)
- Connect with a line

### Method 2: Table of Values

Choose several x-values, substitute into the equation to find y, then plot the (x, y) pairs.

**Example:** y = 2x + 1

| x | y = 2x + 1 | Point |
|---|-----------|-------|
| -2 | 2(-2)+1 = -3 | (-2, -3) |
| 0 | 2(0)+1 = 1 | (0, 1) |
| 2 | 2(2)+1 = 5 | (2, 5) |

### Finding the x-intercept

The **x-intercept** is where the line crosses the x-axis (y = 0). Set y = 0 and solve for x.

For y = 2x - 6: 0 = 2x - 6 → 2x = 6 → x = 3. X-intercept is (3, 0).

### How m and b Affect the Graph

- **Larger |m|** → steeper line
- **Smaller |m|** → flatter (more horizontal) line
- **m > 0** → line goes up left to right
- **m < 0** → line goes down left to right
- **Larger b** → line shifts up
- **Smaller b** → line shifts down
- **Two lines with the same m but different b** → **parallel lines** (never intersect)`,
        examples: [
          'Graph y = x - 2 using the slope-intercept method. Plot at least 3 points.',
          'Create a table of values for y = -x + 4 using x = -1, 0, 1, 2, 3 and graph it.',
          'Find the x and y intercepts of y = (3/2)x - 6 without graphing.',
        ],
        quiz: [
          {
            id: 'graph-q1',
            question: 'Where does the graph of y = 4x - 3 cross the y-axis?',
            options: ['(3, 0)', '(0, 4)', '(0, -3)', '(-3, 0)'],
            correctIndex: 2,
            explanation:
              'The y-intercept is b = -3, so the line crosses the y-axis at the point (0, -3). When x = 0: y = 4(0) - 3 = -3.',
          },
          {
            id: 'graph-q2',
            question: 'What is the x-intercept of y = 3x + 9?',
            options: ['(0, 9)', '(-3, 0)', '(9, 0)', '(3, 0)'],
            correctIndex: 1,
            explanation:
              'Set y = 0: 0 = 3x + 9 → 3x = -9 → x = -3. The x-intercept is (-3, 0).',
          },
          {
            id: 'graph-q3',
            question:
              'Line A has equation y = 2x + 1 and Line B has equation y = 2x - 4. Which statement is true?',
            options: [
              'They are the same line',
              'They are perpendicular',
              'They are parallel',
              'They intersect at (0, 1)',
            ],
            correctIndex: 2,
            explanation:
              'Both lines have slope m = 2 but different y-intercepts (1 and -4). Lines with equal slopes and different intercepts are parallel — they never intersect.',
          },
        ],
      },
    ],
  },

  {
    id: 'geometry-basics',
    title: 'Geometry Basics',
    subject: 'mathematics',
    difficulty: 'beginner',
    prerequisites: ['number-systems'],
    estimatedMinutes: 90,
    description:
      'Introduction to the fundamental building blocks of geometry — points, lines, angles, triangles, and area and perimeter. Build the visual and spatial reasoning skills used throughout secondary mathematics.',
    sources: [DEPED_SOURCE],
    lessons: [
      {
        id: 'points-lines-angles',
        title: 'Points, Lines, and Angles',
        order: 1,
        overview:
          'Define and distinguish points, lines, rays, line segments, and angles. Classify angles by measure and understand angle relationships.',
        objectives: [
          'Define point, line, ray, and line segment with correct notation',
          'Classify angles as acute, right, obtuse, or straight',
          'Identify complementary and supplementary angles',
          'Apply the Angle Addition Postulate',
        ],
        estimatedMinutes: 30,
        generatedBy: 'sourced',
        content: `## Points, Lines, and Angles

### The Building Blocks of Geometry

**Point** — A location in space with no size or dimension. Named with a capital letter: Point A. Represented by a dot.

**Line** — An infinite, straight path extending in both directions. Named by two points on it (line AB, written $\\overleftrightarrow{AB}$) or a lowercase letter.

**Ray** — Starts at a point (the endpoint) and extends infinitely in one direction. Written $\\overrightarrow{AB}$ (starts at A, goes through B and beyond).

**Line Segment** — A portion of a line with two endpoints. Written $\\overline{AB}$. Has a measurable length.

### Angles

An **angle** is formed when two rays share a common endpoint called the **vertex**. Angles are measured in **degrees (°)** from 0° to 360°.

The angle formed by rays BA and BC is written ∠ABC or ∠B (vertex in the middle).

### Classifying Angles by Measure

| Type | Measure | Memory trick |
|------|---------|--------------|
| **Acute** | 0° < θ < 90° | "Cute and small" |
| **Right** | θ = 90° | Square corner symbol |
| **Obtuse** | 90° < θ < 180° | "Obese/big" |
| **Straight** | θ = 180° | A straight line |
| **Reflex** | 180° < θ < 360° | Bends "back" |

### Angle Relationships

**Complementary angles** — Two angles whose measures add up to 90°. Example: 35° and 55° are complementary.

**Supplementary angles** — Two angles whose measures add up to 180°. Example: 110° and 70° are supplementary.

**Adjacent angles** — Share a common vertex and side, but no interior points.

**Vertical angles** — Formed by two intersecting lines. They are always equal in measure (congruent). If two lines cross and form a 40° angle, the angle directly across is also 40°.

### The Angle Addition Postulate

If point D is in the interior of ∠ABC, then:
$$m\\angle ABD + m\\angle DBC = m\\angle ABC$$

This lets us find unknown angle measures when a larger angle is divided into two parts.`,
        examples: [
          'Two angles are supplementary. One angle measures 73°. Find the other.',
          'Angle XYZ = 120°. Ray YW divides it so that angle XYW = 45°. Find angle WYZ.',
          'A clock shows 3:00. What type of angle do the hands form?',
        ],
        quiz: [
          {
            id: 'ang-q1',
            question: 'An angle measures 127°. What type of angle is it?',
            options: ['Acute', 'Right', 'Obtuse', 'Straight'],
            correctIndex: 2,
            explanation:
              '127° is between 90° and 180°, so it is an obtuse angle. Right = exactly 90°, Acute < 90°, Straight = 180°.',
          },
          {
            id: 'ang-q2',
            question: 'Two angles are complementary. If one measures 38°, what is the other?',
            options: ['142°', '52°', '62°', '142°'],
            correctIndex: 1,
            explanation:
              'Complementary angles sum to 90°. So the other angle = 90° - 38° = 52°.',
          },
          {
            id: 'ang-q3',
            question: 'Two lines intersect forming vertical angles. One angle measures 65°. What is the measure of the angle directly opposite (the vertical angle)?',
            options: ['25°', '115°', '65°', '130°'],
            correctIndex: 2,
            explanation:
              'Vertical angles are always equal. If one angle is 65°, the vertical angle is also 65°.',
          },
        ],
      },
      {
        id: 'triangles-and-properties',
        title: 'Triangles and Their Properties',
        order: 2,
        overview:
          'Classify triangles by sides and angles, apply the Triangle Angle Sum theorem, and understand congruence and the Pythagorean theorem.',
        objectives: [
          'Classify triangles by angle measure (acute, right, obtuse) and by side length (scalene, isosceles, equilateral)',
          'Apply the Triangle Angle Sum Theorem (sum = 180°) to find missing angles',
          'Understand when the Pythagorean Theorem applies',
          'Calculate the hypotenuse or a leg of a right triangle',
        ],
        estimatedMinutes: 30,
        generatedBy: 'sourced',
        content: `## Triangles and Their Properties

### What is a Triangle?

A **triangle** is a polygon with 3 sides, 3 vertices (corners), and 3 angles. It is the simplest closed polygon.

### Classifying Triangles by Angles

| Type | Condition |
|------|-----------|
| **Acute triangle** | All three angles are acute (< 90°) |
| **Right triangle** | One angle is exactly 90° |
| **Obtuse triangle** | One angle is obtuse (> 90°) |

### Classifying Triangles by Sides

| Type | Condition |
|------|-----------|
| **Scalene** | No sides are equal |
| **Isosceles** | Two sides are equal (the angles opposite those sides are also equal) |
| **Equilateral** | All three sides are equal (all angles are 60°) |

### Triangle Angle Sum Theorem

**The sum of all three interior angles in any triangle is always 180°.**

$$\\angle A + \\angle B + \\angle C = 180°$$

This is one of the most powerful tools in geometry. Use it to find a missing angle:

If ∠A = 50° and ∠B = 70°, find ∠C:
$$\\angle C = 180° - 50° - 70° = 60°$$

### The Pythagorean Theorem

In a **right triangle**, the side opposite the right angle is called the **hypotenuse** (c). The other two sides are **legs** (a and b).

$$a^2 + b^2 = c^2$$

This only works for right triangles.

**Example:** A right triangle has legs 3 and 4. Find the hypotenuse.
$$c^2 = 3^2 + 4^2 = 9 + 16 = 25 \implies c = 5$$

This is the famous **3-4-5 Pythagorean triple**. Other common ones: 5-12-13 and 8-15-17.

### Filipino Context

Carpenters building a bahay kubo use the 3-4-5 rule to check if a corner is a perfect right angle — measure 3 units on one wall and 4 on the other; if the diagonal is 5, the corner is square!`,
        examples: [
          'A triangle has angles 45° and 85°. Find the third angle and classify the triangle.',
          'A ladder 10 m long leans against a wall. The base is 6 m from the wall. How high up the wall does it reach?',
          'An isosceles triangle has two equal angles of 55° each. What is the third angle?',
        ],
        quiz: [
          {
            id: 'tri-q1',
            question: 'A triangle has angles 60°, 60°, and 60°. What type of triangle is it?',
            options: [
              'Scalene and acute',
              'Isosceles and right',
              'Equilateral and acute',
              'Obtuse and isosceles',
            ],
            correctIndex: 2,
            explanation:
              'All three angles are equal (60°) so it is equilateral. All angles are less than 90°, so it is also acute. Equilateral triangles are always also equiangular and acute.',
          },
          {
            id: 'tri-q2',
            question: 'Two angles of a triangle are 35° and 95°. What is the third angle?',
            options: ['40°', '50°', '60°', '80°'],
            correctIndex: 1,
            explanation:
              'Triangle Angle Sum: third angle = 180° - 35° - 95° = 50°.',
          },
          {
            id: 'tri-q3',
            question:
              'A right triangle has legs of length 5 and 12. What is the length of the hypotenuse?',
            options: ['13', '17', '11', '√119'],
            correctIndex: 0,
            explanation:
              'Using the Pythagorean theorem: c² = 5² + 12² = 25 + 144 = 169. c = √169 = 13. This is the 5-12-13 Pythagorean triple.',
          },
        ],
      },
      {
        id: 'area-and-perimeter',
        title: 'Area and Perimeter',
        order: 3,
        overview:
          'Calculate perimeter (total boundary length) and area (space enclosed) for rectangles, triangles, and circles. Apply these in practical Filipino contexts.',
        objectives: [
          'Define perimeter and area and explain the difference',
          'Calculate perimeter and area of rectangles and squares',
          'Calculate the area and perimeter of a triangle',
          'Calculate the circumference and area of a circle using π',
        ],
        estimatedMinutes: 30,
        generatedBy: 'sourced',
        content: `## Area and Perimeter

### Two Different Measurements

**Perimeter** — The total length of the boundary of a shape. Measured in linear units (cm, m, km). Think of it as the length of fence you'd need to surround a field.

**Area** — The amount of surface enclosed within a boundary. Measured in square units (cm², m², km²). Think of it as the number of square tiles needed to cover a floor.

### Rectangle and Square

A **rectangle** has 4 right angles and 2 pairs of equal sides (length *l* and width *w*).

$$\\text{Perimeter} = 2l + 2w = 2(l + w)$$
$$\\text{Area} = l \\times w$$

A **square** is a rectangle where l = w = s (side length):
$$\\text{Perimeter} = 4s$$
$$\\text{Area} = s^2$$

**Example:** A basketball court is 28 m × 15 m.
- Perimeter = 2(28 + 15) = 2(43) = 86 m
- Area = 28 × 15 = 420 m²

### Triangle

$$\\text{Area of triangle} = \\frac{1}{2} \\times \\text{base} \\times \\text{height}$$

The **height** is the perpendicular distance from the base to the opposite vertex (not a side, unless it's a right triangle).

**Example:** Triangle with base 10 cm and height 6 cm:
$$A = \\frac{1}{2} \\times 10 \\times 6 = 30 \\text{ cm}^2$$

Perimeter of a triangle = sum of all three sides.

### Circle

For a circle with radius r:

$$\\text{Circumference} = 2\\pi r$$
$$\\text{Area} = \\pi r^2$$

Where π ≈ 3.14159...

**Example:** A circular garden has radius 7 m:
- Circumference = 2π(7) ≈ 43.98 m (fencing needed)
- Area = π(7²) = 49π ≈ 153.94 m² (space to plant)

### Practical Application

Understanding area and perimeter is essential for:
- Buying flooring tiles (area)
- Fencing a lot (perimeter)
- Painting walls (area)
- Laying out a garden (both)`,
        examples: [
          'A bahay kubo floor is 5 m by 4 m. How much bamboo flooring (in m²) is needed? What length of baseboard around the edge?',
          'A triangular sail has base 6 m and height 8 m. Find its area.',
          'A circular water tank has diameter 10 m. Find the area of its base and the length of its rim.',
        ],
        quiz: [
          {
            id: 'area-q1',
            question: 'A rectangle has length 12 cm and width 5 cm. What is its area?',
            options: ['34 cm²', '34 cm', '60 cm²', '60 cm'],
            correctIndex: 2,
            explanation:
              'Area = length × width = 12 × 5 = 60 cm². Note that area is measured in square units (cm²), not linear units.',
          },
          {
            id: 'area-q2',
            question: 'A triangle has base 8 m and height 7 m. What is its area?',
            options: ['56 m²', '28 m²', '15 m²', '30 m²'],
            correctIndex: 1,
            explanation:
              'Area of triangle = (1/2) × base × height = (1/2) × 8 × 7 = (1/2) × 56 = 28 m².',
          },
          {
            id: 'area-q3',
            question: 'A circle has radius 5 cm. Using π ≈ 3.14, what is its area?',
            options: ['15.7 cm²', '31.4 cm²', '78.5 cm²', '157 cm²'],
            correctIndex: 2,
            explanation:
              'Area = πr² = 3.14 × 5² = 3.14 × 25 = 78.5 cm². Do not confuse with circumference: 2πr = 2 × 3.14 × 5 = 31.4 cm.',
          },
        ],
      },
    ],
  },
];
