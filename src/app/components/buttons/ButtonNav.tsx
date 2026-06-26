interface ButtonProps {
    name: string,
    style: string
}

export const ButtonNav = ({ name, style }: ButtonProps) => {
    return (
         <button className={ style }>{ name }</button>
    )
}