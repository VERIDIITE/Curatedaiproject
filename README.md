# CurateAI - Next-Gen NFT Discovery Platform

A modern, AI-powered NFT discovery and curation platform built with Next.js, React, and TypeScript.

## ✨ Features

- **AI-Powered Discovery**: Intelligent NFT curation and recommendations
- **Modern UI/UX**: Spotify-inspired design with smooth animations
- **Playlist Management**: Create and manage custom NFT playlists
- **Advanced Filtering**: Filter by price, rarity, collection, and more
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Real-time Updates**: Live data and dynamic content loading

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Notifications**: Sonner

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/curateai.git
   cd curateai
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Key Components

### Loading Screen
- Modern NFT marketplace-style loading animation
- Unicorn Studio background effects
- Synchronized progress tracking
- Smooth transitions

### Discovery Hub
- Spotify-inspired playlist interface
- AI-generated playlist themes
- Interactive NFT cards with hover effects
- Advanced filtering system

### Playlist Management
- Create, edit, and delete playlists
- Drag-and-drop NFT organization
- AI-powered playlist summaries
- Public/private playlist options

## 🎯 Features in Detail

### AI-Generated Playlists
- Randomized themes (Gaming, Nature, Trading, Popular, etc.)
- Dynamic content generation
- Smart categorization
- Personalized recommendations

### Modern UI Elements
- Orange glow effects on hover
- Smooth animations and transitions
- Responsive design
- Dark theme with gradient accents

### Interactive Elements
- Mouse-following background effects
- Animated loading states
- Real-time progress indicators
- Dynamic content updates

## 🛠️ Development

### Project Structure
```
src/
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── ui/             # Shadcn/ui components
│   ├── DiscoveryHub.tsx
│   ├── LoadingScreen.tsx
│   └── ...
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── visual-edits/       # Visual editing tools
```

### Key Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Design System

### Colors
- **Primary**: Orange (#f97316)
- **Secondary**: Red (#ef4444)
- **Background**: Black (#000000)
- **Text**: White (#ffffff)

### Typography
- **Headings**: Bold, wide tracking
- **Body**: Regular weight
- **Monospace**: For technical elements

### Animations
- **Duration**: 2.5s for main animations
- **Easing**: easeInOut for smooth transitions
- **Effects**: Scale, opacity, rotation

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (320px - 768px)

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=your_api_url_here
```

### Customization
- Modify colors in `tailwind.config.js`
- Update animations in component files
- Customize themes in the DiscoveryHub component

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Deploy automatically on push to main branch
3. Configure environment variables in Vercel dashboard

### Other Platforms
- **Netlify**: Build command: `npm run build`
- **Railway**: Automatic deployment from GitHub
- **AWS Amplify**: Connect repository and deploy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Shadcn/ui** for the component library
- **Framer Motion** for animations
- **Lucide React** for icons
- **Tailwind CSS** for styling

## 📞 Support

For support, email support@curateai.com or join our Discord community.

---

**Built with ❤️ by the CurateAI Team**
