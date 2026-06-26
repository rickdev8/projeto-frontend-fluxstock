"use client"

interface ButtonLoginProps {
    style: string,
    title: string
}

const ButtonLogin = ({ style, title }: ButtonLoginProps) => {
    return (
        <button className={ style }>{ title }</button>
    )
}

export default ButtonLogin