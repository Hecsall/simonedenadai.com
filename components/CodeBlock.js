import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark as codeTheme } from 'react-syntax-highlighter/dist/esm/styles/prism';

import styles from '/styles/BlogPost.module.scss'


export default function CodeBlock({ code, filename, highlightedLines, language }) {
    if (code) {
        return <>
            <div className={styles["codeblock"]}>
                {filename && <small>{filename}</small>}
                <SyntaxHighlighter
                    language={language}
                    style={codeTheme}
                    customStyle={{fontSize: '15px'}}
                    showLineNumbers
                    wrapLines={true}
                    lineProps={(lineNumber) => {
                        const style = { display: "block" }; // width: "fit-content"
                        if (highlightedLines?.includes(lineNumber)) {
                          style.backgroundColor = "rgba(255,255,255,0.1)";
                        }
                        return { style };
                      }}
                >
                    {code}
                </SyntaxHighlighter>
                
            </div>
        </>
    }

    return null
}
