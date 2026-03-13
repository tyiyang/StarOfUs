# StarOfUs

"我的世界 因你璀璨" — 一个浪漫的情侣纪念网站，以璀璨星空为主题，记录属于两个人的美好时光。

## 预览

- 粒子动画标题，文字由星尘汇聚而成
- 星空背景，流星划过、鼠标轨迹生成星光
- 点击屏幕释放爱心烟花
- 照片轮播，记录珍贵瞬间
- 恋爱时间线，标记每一个重要里程碑
- 浮动爱心与背景音乐，营造沉浸式氛围

## 技术栈

- **框架**: Next.js 16 + React 19 + TypeScript
- **样式**: Tailwind CSS 4 + 自定义 OKLCH 主题色
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **动画**: HTML5 Canvas 粒子系统 + CSS 动画
- **图标**: Lucide React
- **字体**: Geist (西文) + Noto Serif SC (中文衬线)
- **部署**: Vercel

## 功能模块

| 模块 | 说明 |
|------|------|
| StarryBackground | Canvas 星空背景：繁星闪烁、流星划过、鼠标星光轨迹、点击爱心爆炸 |
| ParticleTitle | 粒子文字动画，星尘从随机位置汇聚成标题文字 |
| PhotoCarousel | 照片轮播，支持自动播放、手动切换，毛玻璃风格卡片 |
| LoveTimeline | 恋爱里程碑时间线，左右交替布局，玻璃态卡片 |
| MusicPlayer | 浮动音乐播放器，音量控制、音频可视化动画 |
| FloatingHearts | 随机漂浮的爱心装饰动画 |

## 快速开始

### 环境要求

- Node.js 18+
- npm

### 安装与运行

```bash
# 克隆仓库
git clone https://github.com/tyiyang/StarOfUs.git
cd StarOfUs

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

浏览器访问 [http://localhost:3000](http://localhost:3000) 查看效果。

### 构建部署

```bash
# 生产构建
npm run build

# 启动生产服务器
npm run start
```

## 项目结构

```
StarOfUs/
├── app/
│   ├── layout.tsx          # 全局布局、字体、元数据
│   ├── page.tsx            # 首页（英雄区 + 时间线 + 页脚）
│   └── globals.css         # 全局样式、OKLCH 主题变量
├── components/
│   ├── starry-background.tsx
│   ├── particle-title.tsx
│   ├── photo-carousel.tsx
│   ├── love-timeline.tsx
│   ├── music-player.tsx
│   ├── floating-hearts.tsx
│   ├── theme-provider.tsx
│   └── ui/                 # shadcn/ui 组件库
├── hooks/                  # 自定义 Hooks
├── lib/                    # 工具函数
├── public/                 # 静态资源
├── styles/                 # 额外样式
└── next.config.mjs         # Next.js 配置
```

## 自定义

- **照片**: 编辑 `components/photo-carousel.tsx` 中的图片数组，替换为你自己的照片
- **时间线**: 编辑 `components/love-timeline.tsx` 中的里程碑数据
- **音乐**: 替换 `MusicPlayer` 组件中的音频源
- **主题色**: 修改 `app/globals.css` 中的 OKLCH 颜色变量

## License

MIT
