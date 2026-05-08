<template>
  <div class="markdown-body" v-html="renderedContent"></div>
</template>

<script setup>
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

const props = defineProps({
  content: {
    type: String,
    default: ''
  }
})

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value
      } catch (_) {
        // fallback
      }
    }
    try {
      return hljs.highlightAuto(str).value
    } catch (_) {
      // fallback
    }
    return ''
  }
})

const renderedContent = computed(() => {
  return md.render(props.content)
})
</script>

<style scoped>
.markdown-body {
  color: #333;
  line-height: 1.8;
  word-wrap: break-word;
}

.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3),
.markdown-body :deep(h4),
.markdown-body :deep(h5),
.markdown-body :deep(h6) {
  margin-top: 1.5em;
  margin-bottom: 0.8em;
  font-weight: 600;
  color: #222;
  line-height: 1.4;
}

.markdown-body :deep(h1) { font-size: 1.75rem; }
.markdown-body :deep(h2) { font-size: 1.45rem; border-bottom: 1px solid #eee; padding-bottom: 0.3em; }
.markdown-body :deep(h3) { font-size: 1.2rem; }
.markdown-body :deep(h4) { font-size: 1.05rem; }

.markdown-body :deep(p) {
  margin: 0.8em 0;
}

.markdown-body :deep(a) {
  color: #667eea;
  text-decoration: none;
}

.markdown-body :deep(a:hover) {
  text-decoration: underline;
}

.markdown-body :deep(strong) {
  font-weight: 600;
  color: #222;
}

.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  padding-left: 1.8em;
  margin: 0.8em 0;
}

.markdown-body :deep(li) {
  margin: 0.3em 0;
}

.markdown-body :deep(blockquote) {
  margin: 1em 0;
  padding: 0.6em 1.2em;
  border-left: 4px solid #667eea;
  background: rgba(102, 126, 234, 0.05);
  color: #555;
  border-radius: 0 8px 8px 0;
}

.markdown-body :deep(blockquote p) {
  margin: 0.3em 0;
}

.markdown-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1em 0;
  font-size: 0.92rem;
}

.markdown-body :deep(th),
.markdown-body :deep(td) {
  padding: 0.6rem 1rem;
  border: 1px solid #e2e2e2;
  text-align: left;
}

.markdown-body :deep(th) {
  background: #f7f7f7;
  font-weight: 600;
}

.markdown-body :deep(tr:nth-child(even)) {
  background: #fafafa;
}

.markdown-body :deep(code) {
  background: rgba(102, 126, 234, 0.08);
  color: #764ba2;
  padding: 0.15em 0.4em;
  border-radius: 4px;
  font-size: 0.88em;
  font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
}

.markdown-body :deep(pre) {
  margin: 1em 0;
  border-radius: 10px;
  overflow-x: auto;
}

.markdown-body :deep(pre code) {
  display: block;
  padding: 1.2em 1.5em;
  background: #0d1117;
  color: #c9d1d9;
  border-radius: 10px;
  font-size: 0.85rem;
  line-height: 1.6;
  white-space: pre;
  overflow-x: auto;
}

.markdown-body :deep(hr) {
  border: none;
  border-top: 1px solid #eee;
  margin: 2em 0;
}

.markdown-body :deep(img) {
  max-width: 100%;
  border-radius: 8px;
  margin: 1em 0;
}

@media (max-width: 768px) {
  .markdown-body :deep(h1) { font-size: 1.5rem; }
  .markdown-body :deep(h2) { font-size: 1.3rem; }
  .markdown-body :deep(h3) { font-size: 1.1rem; }

  .markdown-body :deep(pre code) {
    font-size: 0.78rem;
    padding: 1em;
  }
}
</style>
