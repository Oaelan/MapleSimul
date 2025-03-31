function Footer() {
  return (
    <footer className="footer footer-horizontal footer-center bg-primary text-primary-content p-5">
      <aside>
        <p className="font-bold flex gap-2">
          <span>Made by</span>
          <a href="https://github.com/Oaelan">Oaelan</a> /
          <a href="https://github.com/Dongzzang99">Dongzzang99</a>
        </p>
        <p>문의나 또는 버그 발견시 아래 메일로 연락주세요</p>
        <p className="flex gap-2">
          <a href="mailto:oaelan@gmail.com">oaelan@gmail.com</a> /
          <a href="mailto:kaka2172@naver.com">kaka2172@naver.com</a>
        </p>
      </aside>
    </footer>
  );
}

export default Footer;
