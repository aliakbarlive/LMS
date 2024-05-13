import { forwardRef,useState,useEffect } from 'react'
// import ReactQuill, { ReactQuillProps } from 'react-quill'
// import 'react-quill/dist/quill.snow.css'
import SunEditor from 'suneditor-react';
import SunEditorCore from "suneditor/src/lib/core";

import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

// type RichTextEditorProps = ReactQuillProps

// export type RichTextEditorRef = ReactQuill

const RichTextEditor = forwardRef<SunEditorCore, any>(
    (props, ref) => {
      const [articleContent,setArticleContent] = useState('')
      useEffect(()=>{
        setArticleContent(props.defaultValue)
        console.log(`Content : ${articleContent}`)
      },[])
        return (
            <div className="rich-text-editor">
                {/* <ReactQuill ref={ref} {...props} /> */}
                <SunEditor ref={ref} {...props}
                height="500px"
                setOptions={{
                  buttonList: [
                    [
                      "undo",
                      "redo",
                      "font",
                      "fontSize",
                      "formatBlock",
                      "paragraphStyle",
                      "blockquote",
                      "bold",
                      "underline",
                      "italic",
                      "strike",
                      "subscript",
                      "superscript",
                      "fontColor",
                      "hiliteColor",
                      "textStyle",
                      "removeFormat",
                      "outdent",
                      "indent",
                      "align",
                      "horizontalRule",
                      "list",
                      "lineHeight",
                      "table",
                      "link",
                      "image",
                      "video",
                      "audio" /** 'math', */, // You must add the 'katex' library at options to use the 'math' plugin.
                      // 'imageGallery',  // You must add the "imageGalleryUrl".
                      "fullScreen",
                      "showBlocks",
                      "codeView",
                      "preview",
                      "print",
                      "save",
                      /** 'dir', 'dir_ltr', 'dir_rtl' */ // "dir": Toggle text direction, "dir_ltr": Right to Left, "dir_rtl": Left to Right
                    ],
                  ],
                }}                
                />

            </div>
        )
    }
)

RichTextEditor.displayName = 'RichTextEditor'

export default RichTextEditor
