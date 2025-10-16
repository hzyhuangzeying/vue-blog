<template>
  <div class="write-page">
    <div class="write-container">
      <div class="write-header">
        <h1 class="page-title">写文章</h1>
        <div class="header-actions">
          <el-button @click="handleSaveDraft">保存草稿</el-button>
          <el-button type="primary" @click="handlePublish">发布文章</el-button>
        </div>
      </div>

      <div class="write-content">
        <div class="editor-section">
          <!-- 文章基本信息 -->
          <div class="article-info">
            <el-form :model="articleForm" label-width="80px">
              <el-form-item label="文章标题" required>
                <el-input
                  v-model="articleForm.title"
                  placeholder="请输入文章标题"
                  size="large"
                  class="title-input"
                />
              </el-form-item>
              
              <el-form-item label="文章摘要">
                <el-input
                  v-model="articleForm.summary"
                  type="textarea"
                  :rows="3"
                  placeholder="请输入文章摘要（可选）"
                />
              </el-form-item>
              
              <el-form-item label="文章分类" required>
                <el-select v-model="articleForm.category" placeholder="请选择分类">
                  <el-option
                    v-for="category in categories"
                    :key="category.id"
                    :label="category.name"
                    :value="category.name"
                  />
                </el-select>
              </el-form-item>
              
              <el-form-item label="文章标签">
                <el-select
                  v-model="articleForm.tags"
                  multiple
                  filterable
                  allow-create
                  placeholder="请选择或输入标签"
                >
                  <el-option
                    v-for="tag in commonTags"
                    :key="tag"
                    :label="tag"
                    :value="tag"
                  />
                </el-select>
              </el-form-item>
              
              <el-form-item label="封面图片">
                <el-upload
                  class="cover-uploader"
                  action="#"
                  :show-file-list="false"
                  :before-upload="handleCoverUpload"
                >
                  <img v-if="articleForm.cover" :src="articleForm.cover" class="cover-image" />
                  <el-icon v-else class="cover-uploader-icon"><Plus /></el-icon>
                </el-upload>
              </el-form-item>
            </el-form>
          </div>

          <!-- 文章编辑器 -->
          <div class="editor-container">
            <div class="editor-toolbar">
              <el-button-group>
                <el-button size="small" @click="insertMarkdown('**', '**')">
                  <strong>B</strong>
                </el-button>
                <el-button size="small" @click="insertMarkdown('*', '*')">
                  <em>I</em>
                </el-button>
                <el-button size="small" @click="insertMarkdown('`', '`')">
                  Code
                </el-button>
                <el-button size="small" @click="insertMarkdown('```\n', '\n```')">
                  Code Block
                </el-button>
              </el-button-group>
              
              <el-button-group>
                <el-button size="small" @click="insertMarkdown('# ', '')">
                  H1
                </el-button>
                <el-button size="small" @click="insertMarkdown('## ', '')">
                  H2
                </el-button>
                <el-button size="small" @click="insertMarkdown('### ', '')">
                  H3
                </el-button>
              </el-button-group>
              
              <el-button-group>
                <el-button size="small" @click="insertMarkdown('- ', '')">
                  列表
                </el-button>
                <el-button size="small" @click="insertMarkdown('> ', '')">
                  引用
                </el-button>
                <el-button size="small" @click="insertMarkdown('[链接文字](', ')')">
                  链接
                </el-button>
              </el-button-group>
            </div>
            
            <div class="editor-content">
              <el-input
                v-model="articleForm.content"
                type="textarea"
                :rows="20"
                placeholder="开始写作..."
                class="markdown-editor"
              />
            </div>
          </div>
        </div>

        <!-- 预览区域 -->
        <div class="preview-section">
          <div class="preview-header">
            <h3>预览</h3>
            <el-switch
              v-model="showPreview"
              active-text="预览模式"
              inactive-text="编辑模式"
            />
          </div>
          
          <div v-if="showPreview" class="preview-content">
            <div class="preview-article">
              <h1 class="preview-title">{{ articleForm.title || '文章标题' }}</h1>
              <div class="preview-meta">
                <span class="preview-category">{{ articleForm.category || '分类' }}</span>
                <span class="preview-tags">
                  <el-tag
                    v-for="tag in articleForm.tags"
                    :key="tag"
                    size="small"
                    class="preview-tag"
                  >
                    {{ tag }}
                  </el-tag>
                </span>
              </div>
              <div class="preview-body" v-html="renderedContent"></div>
            </div>
          </div>
          
          <div v-else class="editor-content">
            <el-input
              v-model="articleForm.content"
              type="textarea"
              :rows="20"
              placeholder="开始写作..."
              class="markdown-editor"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useArticlesStore } from '@/stores/articles'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()
const articlesStore = useArticlesStore()

const showPreview = ref(false)
const categories = ref([])
const commonTags = ref(['Vue3', 'React', 'Node.js', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 'Webpack', '前端', '后端'])

const articleForm = reactive({
  title: '',
  summary: '',
  category: '',
  tags: [],
  cover: '',
  content: ''
})

const renderedContent = computed(() => {
  if (!articleForm.content) return ''
  
  // 简单的 markdown 渲染
  return articleForm.content
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/`(.*)`/gim, '<code>$1</code>')
    .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
    .replace(/\n/gim, '<br>')
})

onMounted(async () => {
  const result = await articlesStore.fetchCategories()
  if (result.success) {
    categories.value = result.data
  }
})

const insertMarkdown = (before, after) => {
  const textarea = document.querySelector('.markdown-editor textarea')
  if (textarea) {
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = articleForm.content.substring(start, end)
    const newText = before + selectedText + after
    
    articleForm.content = 
      articleForm.content.substring(0, start) + 
      newText + 
      articleForm.content.substring(end)
    
    // 设置光标位置
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
    }, 0)
  }
}

const handleCoverUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  const isLt5M = file.size / 1024 / 1024 < 5

  if (!isImage) {
    ElMessage.error('只能上传图片文件!')
    return false
  }
  if (!isLt5M) {
    ElMessage.error('图片大小不能超过 5MB!')
    return false
  }

  // 创建预览URL
  articleForm.cover = URL.createObjectURL(file)
  return false // 阻止自动上传
}

const validateForm = () => {
  if (!articleForm.title.trim()) {
    ElMessage.warning('请输入文章标题')
    return false
  }
  
  if (!articleForm.category) {
    ElMessage.warning('请选择文章分类')
    return false
  }
  
  if (!articleForm.content.trim()) {
    ElMessage.warning('请输入文章内容')
    return false
  }
  
  return true
}

const handleSaveDraft = () => {
  if (!articleForm.title.trim() && !articleForm.content.trim()) {
    ElMessage.warning('请至少输入标题或内容')
    return
  }
  
  // 模拟保存草稿
  localStorage.setItem('articleDraft', JSON.stringify(articleForm))
  ElMessage.success('草稿保存成功')
}

const handlePublish = async () => {
  if (!validateForm()) return
  
  try {
    await ElMessageBox.confirm('确定要发布这篇文章吗？', '确认发布', {
      type: 'info'
    })
    
    const result = await articlesStore.createArticle(articleForm)
    if (result.success) {
      ElMessage.success('文章发布成功！')
      // 清除草稿
      localStorage.removeItem('articleDraft')
      router.push({
        name: 'ArticleDetail',
        params: { id: result.data.id }
      })
    } else {
      ElMessage.error(result.message || '发布失败')
    }
  } catch {
    // 用户取消发布
  }
}

// 加载草稿
onMounted(() => {
  const draft = localStorage.getItem('articleDraft')
  if (draft) {
    try {
      const draftData = JSON.parse(draft)
      Object.assign(articleForm, draftData)
    } catch (error) {
      console.error('Failed to load draft:', error)
    }
  }
})
</script>

<style lang="scss" scoped>
.write-page {
  max-width: 100%;
  min-height: calc(100vh - var(--header-height));
}

.write-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--spacing-lg);
}

.write-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-lg);
  background: var(--bg-color-light);
  border-radius: var(--border-radius-large);
  box-shadow: var(--box-shadow-light);
}

.page-title {
  font-size: var(--font-size-xxl);
  font-weight: 600;
  color: var(--text-color);
}

.header-actions {
  display: flex;
  gap: var(--spacing-md);
}

.write-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  min-height: 600px;
}

.editor-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.article-info {
  background: var(--bg-color-light);
  border-radius: var(--border-radius-large);
  padding: var(--spacing-lg);
  box-shadow: var(--box-shadow-light);
}

.title-input {
  :deep(.el-input__inner) {
    font-size: var(--font-size-lg);
    font-weight: 500;
  }
}

.editor-container {
  background: var(--bg-color-light);
  border-radius: var(--border-radius-large);
  overflow: hidden;
  box-shadow: var(--box-shadow-light);
}

.editor-toolbar {
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--border-color-light);
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.editor-content {
  padding: var(--spacing-lg);
}

.markdown-editor {
  :deep(.el-textarea__inner) {
    border: none;
    resize: none;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    line-height: 1.6;
  }
}

.preview-section {
  background: var(--bg-color-light);
  border-radius: var(--border-radius-large);
  overflow: hidden;
  box-shadow: var(--box-shadow-light);
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color-light);
}

.preview-header h3 {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-color);
}

.preview-content {
  padding: var(--spacing-lg);
  height: calc(100% - 60px);
  overflow-y: auto;
}

.preview-article {
  max-width: 100%;
}

.preview-title {
  font-size: var(--font-size-xxl);
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: var(--spacing-md);
  line-height: 1.4;
}

.preview-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--border-color-light);
}

.preview-category {
  background: var(--primary-color);
  color: white;
  padding: 4px 8px;
  border-radius: var(--border-radius-small);
  font-size: var(--font-size-sm);
}

.preview-tags {
  display: flex;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
}

.preview-tag {
  font-size: var(--font-size-xs);
}

.preview-body {
  line-height: 1.8;
  color: var(--text-color);
  
  :deep(h1), :deep(h2), :deep(h3) {
    margin: var(--spacing-lg) 0 var(--spacing-md);
    color: var(--text-color);
  }
  
  :deep(p) {
    margin-bottom: var(--spacing-md);
  }
  
  :deep(strong) {
    font-weight: 600;
  }
  
  :deep(em) {
    font-style: italic;
  }
  
  :deep(code) {
    background: var(--bg-color);
    padding: 2px 4px;
    border-radius: 3px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  }
  
  :deep(pre) {
    background: var(--bg-color);
    padding: var(--spacing-md);
    border-radius: var(--border-radius);
    overflow-x: auto;
    margin: var(--spacing-md) 0;
  }
  
  :deep(blockquote) {
    border-left: 4px solid var(--primary-color);
    padding-left: var(--spacing-md);
    margin: var(--spacing-md) 0;
    color: var(--text-color-secondary);
  }
  
  :deep(li) {
    margin: var(--spacing-xs) 0;
  }
  
  :deep(a) {
    color: var(--primary-color);
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

.cover-uploader {
  :deep(.el-upload) {
    border: 1px dashed var(--border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    
    &:hover {
      border-color: var(--primary-color);
    }
  }
}

.cover-image {
  width: 200px;
  height: 120px;
  display: block;
  object-fit: cover;
}

.cover-uploader-icon {
  font-size: 28px;
  color: var(--text-color-secondary);
  width: 200px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}

@media (max-width: 1024px) {
  .write-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .write-container {
    padding: var(--spacing-sm);
  }
  
  .write-header {
    flex-direction: column;
    gap: var(--spacing-md);
    align-items: stretch;
  }
  
  .header-actions {
    justify-content: center;
  }
  
  .editor-toolbar {
    flex-direction: column;
    align-items: stretch;
  }
  
  .preview-meta {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
