function Footer() {
  return (
    <footer
      className="footer footer-horizontal footer-center
    bg-[linear-gradient(90deg,rgba(118,179,254,1)_0%,rgba(105,147,254,1)_17%,rgba(89,181,251,1)_75%)]
   p-5"
    >
      <aside>
        <p className="font-bold flex gap-2 text-yellow-300">
          <span>Made by</span>
          <a href="https://github.com/Oaelan">Oaelan</a> /
          <a href="https://github.com/Dongzzang99">Dongzzang99</a>
        </p>
        <p className="text-white">
          문의나 또는 버그 발견시 아래 메일로 연락주세요
        </p>
        <p className="flex gap-2 text-violet-900">
          <a href="mailto:oaelan@gmail.com">oaelan@gmail.com</a> /
          <a href="mailto:kaka2172@naver.com">kaka2172@naver.com</a>
        </p>
      </aside>
    </footer>
  );
}

export default Footer;
