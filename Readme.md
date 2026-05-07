# Kekstagram

A client-side image sharing web application built with vanilla JavaScript. Users can upload and edit photos, apply filters, add hashtags and comments, and browse a gallery of images from other users.

## Features

- **Photo upload** — select and preview an image before publishing
- **Image editing** — scale photos (25–100%) and apply visual effects (Chrome, Sepia, Marvin, Phobos, Heat) with real-time intensity control
- **AI hashtag generation** — get instant hashtag suggestions powered by DeepSeek AI based on your photo description
- **Form validation** — hashtag and comment fields validated in real time (max 5 unique hashtags, max 140 characters per comment)
- **Gallery** — browse photos loaded from a remote server with three sorting modes: Default, Random, and Most Discussed
- **Paginated comments** — view 5 comments at a time with a load more button
- **Full-size preview** — click any photo to open a detailed view with likes and comments

## Tech Stack

- JavaScript ES6+ (modules, async/await, Fetch API)
- HTML5 / CSS3
- [noUiSlider](https://refreshless.com/nouislider/) — effect intensity slider
- [Pristine](https://pristine.js.org/) — form validation
- [DeepSeek API](https://platform.deepseek.com/) — AI hashtag generation
- Gulp — build automation

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/your-username/kekstagram.git
cd kekstagram
npm install
```

### Configuration

1. Copy the example config file:

```bash
cp js/config.example.js js/config.js
```

2. Open `js/config.js` and add your DeepSeek API key:

```js
export const DEEPSEEK_API_KEY = 'your_deepseek_api_key_here';
```

Get a free API key at [platform.deepseek.com](https://platform.deepseek.com/).

### Run

```bash
npm start
```

## Project Structure

```
kekstagram/
├── css/
│   ├── normalize.css
│   └── style.css
├── js/
│   ├── ai-hashtags.js     # AI hashtag generation (DeepSeek API)
│   ├── api.js             # Server communication (GET/POST)
│   ├── big-picture.js     # Full-size photo modal
│   ├── config.example.js  # API key template (commit this)
│   ├── config.js          # API key (do NOT commit — in .gitignore)
│   ├── filters.js         # Gallery filtering with debounce
│   ├── main.js            # Entry point
│   ├── thumbnail.js       # Gallery thumbnail rendering
│   ├── upload-form.js     # Upload form, scaling, effects
│   ├── util.js            # Shared utilities
│   └── validation.js      # Hashtag and comment validation
├── vendor/
│   ├── nouislider/
│   └── pristine/
├── img/
├── fonts/
├── index.html
└── package.json
```

## How It Works

### Upload and Edit
1. Click the upload button to select an image
2. Scale the photo using – and + buttons
3. Choose a visual effect and adjust intensity with the slider
4. Optionally type a description and click **✨ AI хэштеги** to generate hashtags automatically
5. Add or edit hashtags manually and write a comment
6. Click **Publish** to submit to the server

### Browse Gallery
- **Default** — photos in original server order
- **Random** — 10 randomly selected photos
- **Most Discussed** — sorted by number of comments

### AI Hashtag Generation
The AI button reads your photo description and sends it to the DeepSeek API, which returns 5 relevant hashtags. If no description is provided, it generates popular general-purpose hashtags. Generated hashtags are automatically validated against the project rules.

## API

Photos are fetched from and submitted to:

```
GET  https://31.javascript.htmlacademy.pro/kekstagram/data
POST https://31.javascript.htmlacademy.pro/kekstagram/
```

## Security

- The DeepSeek API key is stored in `js/config.js` which is excluded from version control via `.gitignore`
- User-generated content is inserted using `textContent` (not `innerHTML`) to prevent XSS attacks

## License

Educational project. Built as part of the HTML Academy JavaScript course.
