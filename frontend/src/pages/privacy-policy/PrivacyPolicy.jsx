import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main>
        <div className="main-container" style={{ maxWidth: '800px', lineHeight: '1.6' }}>
          <h1>Политика конфиденциальности</h1>
          <p className="last-updated">Последнее обновление: {new Date().toLocaleDateString('ru-RU')}</p>

          <section className="policy-section">
            <h2>1. Сбор информации</h2>
            <p>Мы собираем информацию, которую вы предоставляете нам при регистрации на сайте, использовании услуг или общении с нами.</p>
          </section>

          <section className="policy-section">
            <h2>2. Использование информации</h2>
            <p>Мы используем собранную информацию для:</p>
            <ul>
              <li>Предоставления и улучшения наших услуг</li>
              <li>Связи с вами по вопросам использования сервиса</li>
              <li>Персонализации вашего опыта</li>
              <li>Обеспечения безопасности аккаунта</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>3. Защита информации</h2>
            <p>Мы принимаем разумные меры для защиты вашей личной информации от потери, кражи и несанкционированного доступа.</p>
          </section>

          <section className="policy-section">
            <h2>4. Файлы cookie</h2>
            <p>Мы используем файлы cookie для анализа трафика и персонализации контента. Вы можете отключить cookies в настройках браузера.</p>
          </section>

          <section className="policy-section">
            <h2>5. Изменения в политике</h2>
            <p>Мы оставляем за собой право вносить изменения в настоящую политику конфиденциальности. Об изменениях мы уведомим, разместив новую версию на сайте.</p>
          </section>

          <section className="policy-section">
            <h2>6. Контакты</h2>
            <p>Если у вас есть вопросы по поводу нашей политики конфиденциальности, пожалуйста, свяжитесь с нами через раздел контактов на сайте.</p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
export default PrivacyPolicy