import styles from './containerLoginAndRegister.module.css'

interface ContainerLoginAndRegisterProps {
    children: React.ReactNode
}

const ContainerLoginAndRegister = ({children}: ContainerLoginAndRegisterProps ) => {
    return (
        <div className={styles.divcontainer}>
            {children}
        </div>
    )
}

export default ContainerLoginAndRegister