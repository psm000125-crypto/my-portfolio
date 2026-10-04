# 포트폴리오 작업 및 배포

- Git 저장소: 현재 디렉터리. 상위 `취업` 폴더와 별도의 저장소이다.
- 원격: https://github.com/psm000125-crypto/my-portfolio.git
- 배포 브랜치: `main`
- 공개 사이트: https://psm000125-crypto.github.io/my-portfolio/
- 사용자는 이 포트폴리오 수정 시 검증 후 관련 변경을 커밋하고 GitHub에 push하여 배포하는 것을 요청했다. 새 채팅에서도 이 작업 방식을 유지한다. 사용자가 로컬 수정만 요청하거나 배포하지 말라고 하면 그 요청을 우선한다.
- 수정 전에 `git status`를 확인하고 사용자 변경을 보존한다. 관련 파일만 명시적으로 stage한다. `.superpowers/`, 임시 파일, 상위 경험 자료는 배포 커밋에 포함하지 않는다.
- 최소 검증: 변경 JS의 `node --check`, `node tests/hero-scroll-check.cjs`, `powershell -NoProfile -ExecutionPolicy Bypass -File tests/homepage-content-check.ps1`, `git diff --check`. 관련 동작은 브라우저에서도 확인한다.
- `index.html`에서 변경된 CSS/JS의 버전 쿼리를 갱신해 캐시가 이전 파일을 사용하지 않도록 한다.
- `git push origin main` 후 `.github/workflows/deploy-pages.yml`의 GitHub Pages 배포 성공과 공개 사이트 반영을 확인한 뒤 완료를 보고한다. 단순 push 성공을 배포 완료로 표현하지 않는다.
- 인증/네트워크 제한이 있으면 환경의 승인 절차를 사용하고 실패 원인을 보고한다. 자격 증명을 파일에 저장하지 않는다. 소유권 오류는 필요한 경우 명령 단위 `git -c safe.directory="현재 저장소의 절대 경로" ...`로 처리하고 전역 설정을 변경하지 않는다.
- 로컬 미리보기: `node preview.mjs`, http://127.0.0.1:8766/ . 이미 서버가 실행 중이면 재사용한다.
- 홈 화면: `showcase.js`, `showcase.css`, `lab.css`, 스크롤 동작: `lab-motion.js`, 3D 뷰어: `artifacts/parts-3d/viewer.js`.
- 프로필을 홈 화면 맨 위에 유지한다. 이메일은 링크·화살표 없이 일반 텍스트로 표시한다. 사용자가 삭제한 설명 문구를 다시 추가하지 않는다.
