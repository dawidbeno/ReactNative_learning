# React Native Styling

## Key Concepts Recap

- **Style Prop**
  - Apply inline styles directly to components.

- **StyleSheet API**
  - Organize and reuse styles with `StyleSheet.create()`.

- **Merging Styles**
  - Pass an array to the `style` prop to merge multiple styles.
  - The rightmost style takes precedence when properties overlap.

- **Dynamic Styles**
  - Use conditional arrays and ternary operators for responsive components.

- **Density-Independent Pixels (DPI)**
  - React Native uses DPI by default for consistent layouts across devices.

- **Responsive Layouts**
  - Build layouts using flex properties:
    - `flexDirection`
    - `justifyContent`
    - `alignItems`
  - Control arrangement and alignment of UI elements.

---

> 💡 **Tip:** Use the StyleSheet API for better performance and maintainability.

## Test
1. The flexDirection property in Flexbox dictates the axis along which items are distributed inside a container.
2. Flexbox offers in React Native the advantage of flexible layouts that work consistently across multiple platforms.
3. The alignItems property in Flexbox aligns items vertically when the main axis is horizontal and vice versa.
4. StyleSheet API create reusable objects that can be applied to multiple components. We can reuse these components instead of copying the same inline styles over and over.
5. justifyContent affects the alignment of items within the container’s main axis.
6. Multiple styles can be layered using array syntax. Passing an array of inline styles, StyleSheet objects or a combination of the two.

### 🛠️ Low-Fidelity Prototyping

> **Source:** [Figma Resource Library - Low-Fidelity Prototyping](https://www.figma.com/resource-library/low-fidelity-prototyping/)

#### 📖 Definition
Low-fidelity (lo-fi) prototyping is the creation of simple, rough visual representations of a product's interface. Unlike high-fidelity designs, these prototypes prioritize **function and flow** over aesthetics. They typically use basic shapes (rectangles, lines) and placeholders instead of detailed graphics, colors, or typography.

#### 🎯 Key Objectives
- **Validate Concepts:** Test core functionality and user flows early in the design process.
- **Focus on Structure:** Direct attention to information architecture and layout logic rather than visual details.
- **Rapid Iteration:** Enable quick changes and experiments without significant time or resource investment.

#### ✅ Benefits
- **Speed & Efficiency:** Fast to produce and modify, allowing for rapid brainstorming and "failing fast."
- **Honest Feedback:** Stakeholders focus on how the product *works* rather than how it *looks*.
- **Accessibility:** Collaborative and easy for non-designers to contribute to (e.g., via whiteboarding or simple digital tools).

#### ⏱️ When to Use
Ideal for the **initial stages** of a project (ideation, sketching, wireframing) to map out user journeys before committing to pixel-perfect designs.