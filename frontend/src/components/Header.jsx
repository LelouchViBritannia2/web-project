import AuthButton from "./AuthButton"
function Header() {
    return (
        <header>
            <section>
                <a href="/"><img src="/img/bonefireLogo.png" alt="BoneFire" height="100" /></a>
            </section>
            <section>
                <nav className="top-bar-conteiner">
                    <a href="/">Главная</a>
                    <AuthButton />
                </nav>
            </section>
        </header>
    )
}
export default Header
/// Допилить валидацию без перезагрузки + посмотреть как делает проектирование баз данных и сделать это + приклеить футер к низу страницы