# 포트폴리오 작업

- 현재 폴더는 별도 Git 저장소. 원격 `https://github.com/psm000125-crypto/my-portfolio.git`, 브랜치 `main`, 사이트 `https://psm000125-crypto.github.io/my-portfolio/`.
- 포트폴리오 수정은 관련 파일만 검증·커밋·push해 배포한다. 사용자가 로컬 작업만 요청하면 배포하지 않는다. 먼저 `git status`를 확인하고 사용자 변경을 보존한다.
- 자소서 지침은 적용하지 않는다. 상위 경험 자료·자소서·임시 파일을 커밋하지 않는다. 완료된 계획/목업은 상위 `취업/docs/archive/portfolio/`에 보관했으며 기본적으로 읽지 않는다.
- 홈: `showcase.js`, `showcase.css`, `lab.css`. 스크롤: `lab-motion.js`. 3D: `artifacts/parts-3d/viewer.js`. 미리보기: `node preview.mjs` → `http://127.0.0.1:8766/` (실행 중이면 재사용).
- 검증: 변경 JS의 `node --check`, `node tests/hero-scroll-check.cjs`, `powershell -NoProfile -ExecutionPolicy Bypass -File tests/homepage-content-check.ps1`, `git diff --check`, 관련 브라우저 동작 확인.
- 변경 CSS/JS의 `index.html` 버전 쿼리를 갱신한다. push 후 GitHub Pages Actions 성공 및 공개 화면 반영을 확인해야 배포 완료로 보고한다. 지침만 바꿨으면 화면 변경이 없음을 밝힌다.
- 인증/네트워크 문제는 환경 승인 절차를 사용한다. 소유권 오류는 명령 단위 `git -c safe.directory="현재 저장소 절대 경로" ...`로 처리한다. 전역 설정 변경·자격 증명 저장은 하지 않는다.
- 프로필은 홈 맨 위, 이메일은 링크·화살표 없는 일반 텍스트로 유지한다. 삭제한 보조 설명을 다시 넣지 않는다.
- 홈에서는 공정 단계·날짜·데모 여부처럼 이해에 직접 필요 없는 보조 텍스트를 기본적으로 노출하지 않는다.
- 화면 문구를 추가하거나 수정할 때, 사용자에게 가치가 낮은 안내성 표현은 넣지 않는다.
