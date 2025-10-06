# Pragmatic Drag and Drop Task Board

A simple and elegant drag-and-drop task management application built with React and @atlaskit/pragmatic-drag-and-drop.

## Features

- ✨ **Single Column Drag & Drop**: Reorder tasks within a column
- 🎯 **Visual Drop Indicators**: Clear visual feedback showing where items will be dropped
- 📱 **Responsive Design**: Works seamlessly across different screen sizes
- ⚡ **Smooth Animations**: Elegant transitions and hover effects
- 🚀 **Fast Performance**: Built with Vite for optimal development experience

## Demo

Try the live demo on [CodeSandbox](https://codesandbox.io)

## Technologies Used

- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **@atlaskit/pragmatic-drag-and-drop** - Robust drag and drop library
- **CSS3** - Custom styling with animations

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pragmatic-dnd-taskboard.git
   cd pragmatic-dnd-taskboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── components/
│   ├── TaskBoard.css     # Styles for all components
│   ├── TaskBoard.tsx     # Multi-column task board (optional)
│   ├── Column.tsx        # Column component
│   └── TaskCard.tsx      # Individual task card
├── SingleColumn.tsx      # Main single-column component
├── App.tsx              # Root application component
└── main.tsx             # Application entry point
```

## Usage

The application provides a simple interface for managing tasks:

1. **Drag Tasks**: Click and hold any task to start dragging
2. **Visual Feedback**: Blue indicators show where the task will be dropped
3. **Drop Tasks**: Release to reorder the task in the new position
4. **Smooth Animations**: Enjoy the smooth transitions and feedback

## Customization

You can easily customize the appearance by modifying the CSS variables in `TaskBoard.css`:

```css
/* Modify colors */
.task-card {
  background: #ffffff;
  border: 1px solid #e8ecef;
  border-radius: 8px;
}

/* Customize drop indicators */
.drop-indicator {
  height: 60px;
  background: linear-gradient(135deg, rgba(74, 144, 226, 0.2), rgba(74, 144, 226, 0.3));
  border: 2px dashed rgba(74, 144, 226, 0.5);
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Atlassian Pragmatic Drag and Drop](https://github.com/atlassian/pragmatic-drag-and-drop) - For the excellent drag and drop library
- [Vite](https://vitejs.dev/) - For the amazing build tool
- [React](https://reactjs.org/) - For the robust UI framework