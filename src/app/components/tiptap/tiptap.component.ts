import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image';
import CharacterCount from '@tiptap/extension-character-count';

@Component({
  selector: 'app-tiptap',
  templateUrl: './tiptap.component.html',
  styleUrls: ['./tiptap.component.scss', '../../app.component.scss']
})
export class TiptapComponent implements OnInit {
  editor = new Editor({
    extensions: [
      StarterKit.configure({
      heading: {
          levels: [1,2]
      }
      }),
      Link.configure({
        autolink: true
      }),
      Image,
      CharacterCount.configure({
        limit: 4000
      })
    ],
    editorProps: {
      attributes: {
        class: 'prose'
    }}
  })
  value: string = '<p>Hello, Tiptap!</p>'
  html: string = ''
  @Output() emitHtml = new EventEmitter<string>()
  isPreviewOn: boolean = false
  
  selectedText: string = this.editor.view.state.doc.textBetween(this.editor.view.state.selection.$from.pos, this.editor.view.state.selection.$to.pos, ' ')

  constructor() { }

  ngOnInit(): void {
  }

  toggleLink() {
    
    const previousUrl = this.editor.getAttributes('link')['href']
    const url = window.prompt('URL', previousUrl)

    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      this.editor.chain().focus().extendMarkRange('link').unsetLink()
        .run()

      return
    }
    if(url) {
      this.editor.chain().focus().extendMarkRange('link').setLink({ href: url })
      .run()
    }    
  }

  addImage() {
    const url = window.prompt('URL')

    if (url) {
      this.editor.chain().focus().setImage({ src: url }).run()
    }
  }
  
  getHtml() {
    this.html = this.editor.getHTML()
    this.isPreviewOn = true
  }

  emitTiptapHtml() {
    this.emitHtml.emit(this.editor.getHTML())
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

}
