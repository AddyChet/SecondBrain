interface FormContentProps {
    register?: any;
    name ?: string;
    placeholder: string;
    type?: string
}


export function InputCustom({ register, placeholder, type = "text", name}: FormContentProps) {
    return (
        <div>
            <input className="px-2 py-1 rounded-lg border" type={type} placeholder={placeholder} {...(register && name ? register(name) : {})} />
        </div>
    );
}