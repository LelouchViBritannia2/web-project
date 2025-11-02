function Footer() {
    return (
        <footer>
            <div className="row">
                <div className="col-lg-6 col-sm-12">
                    <p>BoneFire это сайт для нахождения людей для игры в Dangeons&Dragons и хорошего времяпровождения!</p>
                </div>
                <div className="col-lg-2 col-sm-12">
                    <h4>Социальные сети</h4>
                    <ul>
                        <li>Discord</li>
                        <li>Telegram</li>
                    </ul>
                </div>
            </div>
            <div className="row">
                <div className="left col-lg-6 col-sm-12">
                    <a href="/privacy-policy.html">Политика конфиденциальности</a>
                </div>
                <div className="right col-lg-6 col-sm-12">
                    <p>Copyright &copy; {new Date().getFullYear()} BoneFier,  все права защищены. Все названия продуктов и компаний являются торговыми марками™ или зарегистрированными® торговыми марками соответствующих владельцев.</p>
                </div>
            </div>
        </footer>
    )
}
export default Footer