import marked from 'marked'

function showPreview(text: string) {
    const html = marked(text)
    const previewElem = document.getElementById('preview')
    if (previewElem) previewElem.innerHTML = html
}

;(document.getElementById('editor') as HTMLTextAreaElement).addEventListener('input', (event: any) =>
    showPreview(event.currentTarget.value),
)
window.addEventListener('load', () => {
    const editor = document.getElementById('editor') as HTMLTextAreaElement
    const text = editor.value
    showPreview(text)
})
