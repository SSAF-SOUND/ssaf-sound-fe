export const reconfirmArticleFormUnload = () => {
  return window.confirm(
    '작성중인 게시글 내용이 사라집니다. 페이지를 이동할까요?'
  );
};
