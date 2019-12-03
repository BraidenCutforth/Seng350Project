import marked from 'marked'

function showPreview(text: string) {
    const html = marked(text)
    const previewElem = document.getElementById('preview')
    if (previewElem) previewElem.innerHTML = html
}

;(document.getElementById('content') as HTMLTextAreaElement).addEventListener('input', (event: any) =>
    showPreview(event.currentTarget.value),
)
window.addEventListener('load', () => {
    const content = document.getElementById('content') as HTMLTextAreaElement
    const text = content.value
    showPreview(text)
})
