<div align="center">
  <h1 align="center">JSColab - JavaScript Collaborative Notebook Environment</h1>
  <h3 align="center">Zero-configuration React Notebooks with Live Previews</h3>
  
  [![Live Demo](https://img.shields.io/badge/Demo-Live%20Preview-green?style=for-the-badge&logo=netlify)](https://jscolab.netlify.app/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

  <img src="Frontend/public/jscolab.png" alt="JSColab Interface Preview" width="800">
</div>
<div align="center">
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logo=typescript&logoColor=white&color=3178C6" alt="TypeScript" />
    <img src="https://img.shields.io/badge/-React-343434?style=for-the-badge&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logo=tailwindcss&logoColor=white&color=06B6D4" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white&color=6DA55F" alt="Node.js" />
    <img src="https://img.shields.io/badge/Express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express" />
    <img src="https://img.shields.io/badge/-Prisma-black?style=for-the-badge&logo=prisma&logoColor=white&color=2D3748" alt="Prisma" />
    <img src="https://img.shields.io/badge/-AWS-black?style=for-the-badge&logo=amazon-web-services&logoColor=white&color=FF9900" alt="AWS" />
    <img src="https://img.shields.io/badge/-netlify-black?style=for-the-badge&logo=netlify&logoColor=white&color=014847" alt="netlify" />
  </div>

## 🚀 Features

- **Zero-setup React Environment** - Start coding immediately with built-in React support
- **Live Component Previews** - Instant visual feedback using `show()` function
- **Dynamic NPM Imports** - Import any npm package directly in your notebook
- **Markdown Documentation** - Combine code with rich documentation
- **Cumulative Execution** - Persistent runtime state between cells
- **Cloud Sync** - Optional AWS-powered notebook persistence
  


## 📖 Usage

### Code Cells

1. Create interactive React components:
```jsx
// cell-1.jsx
import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>;
}

show(<Counter />);
```

2. Import npm packages dynamically:
```js
// cell-2.js
import * as lodash from 'lodash';

const shuffled = lodash.shuffle([1, 2, 3, 4]);
show(shuffled);
```

### `show()` function supports:

- Primitive values: `show(42)`
- React elements: `show(<MyComponent />)`
- Complex objects: `show({ data: [...] })`

### Markdown Cells
```markdown
# Supported Markdown Editor Features

- Live Preview – Displays the rendered Markdown while editing.
- Toolbar with Formatting Options – Includes buttons for bold, italic, headings, links, images, lists, code blocks, and more.
- Support for Tables and Task Lists – Allows creating structured content easily.
- Code Syntax Highlighting – Uses Prism.js for syntax highlighting in code blocks.
- Emoji Support – Allows inserting emojis in Markdown.
- Keyboard Shortcuts – Common Markdown shortcuts for efficient editing.
```

## 🔧 Tech Stack

**Frontend**  
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css)

**Backend**  
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma)

**Infrastructure**  
![AWS](https://img.shields.io/badge/AWS-FF9900?style=flat&logo=amazon-aws)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=flat&logo=netlify)

## 🌟 Featured Examples

```jsx
// Interactive Data Visualization
import { Chart } from 'react-chartjs-2';

const SalesData = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [{
      data: [65, 59, 80],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
  };
  
  return <Chart type='pie' data={data} />;
}

show(<SalesData />);
```

## 🤝 Contributing
We welcome contributions! Please submit an issue or PR for review.

---

<div align="center">
  Made with ❤️ by <b>Assaad El Halabi</b> | Inspired by Google Colab
</div>