const videoContainer = document.getElementById("videoContainer");

const form = document.getElementById("commentForm");

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const { id } = videoContainer.dataset;

  /**
 * 무엇인가 1개만 보낼 때는 body(req.body의 body를 의미):text 이렇게 보내서 server의 express.text()로 text를 req.body속으로 넣을 수 있다.
   fetch(`/api/videos/${id}/comment`, { method: "POST", body: text });
 *  2개 이상을 보낼 때는 댓글 + 평점 -> body를 object형식으로 사용해야하는데 fetch를 통해서frontEnd ->value-> backEnd로 보낼때 object는 인식하지 못하고 string만 인식하므로 json.stringify로 object를 string으로 변환
   fetch(`/api/videos/${id}/comment`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json", // express.json을 사용하기 전에 express에게 지금 보내는 것은 json을 string으로 바꾼 것이라고 미리 알려줘야함
     }, // req info
     body: JSON.stringify({ text: "wooweee", rating: "5" }), // req.body
   });
 */
  if (text === "") {
    return;
  }
  await fetch(`/api/videos/${id}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // express.json을 사용하기 전에 express에게 지금 보내는 것은 json을 string으로 바꾼 것이라고 미리 알려줘야함
    }, // req info
    body: JSON.stringify({ text }), // req.body
  });
  textarea.value = "";
  window.location.reload();
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
