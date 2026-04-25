import type { Ref } from "react";

type InputProps = {
    ref: Ref<HTMLInputElement> | undefined
    type: string;
    content_type: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
function Input ({ ref, type, content_type, onChange }: InputProps){
    return <input 
        ref={ref}
        type={type} 
        accept={content_type} 
        onChange={onChange}
        style={{ display: "none" }}
    />
}
export default Input