import { useContext, useState } from "react";
import { Button } from "../Button/Button";
import { useAPI } from "../../hooks/useAPI";
import style from "./CommentSection.module.scss";
import { formatDate } from "../../helpers/FormatDate";
import { UserContext } from "../../context/userContext";
import { toast } from "react-toastify";

export const CommentSection = ({
  commentData,
  productUserId,
  productId,
  refetchData,
}) => {
  //State til at holde styr på et comment
  const [comment, setComment] = useState("");

  //henter function fra useAPI
  const { apiRequest: postComment } = useAPI();
  const { apiRequest: deleteComment } = useAPI();

  //Henter userData fra context
  const { userData } = useContext(UserContext);

  //Async function til at poste kommentar
  async function createComment(productId) {
    const body = new URLSearchParams();
    body.append("comment", comment);

    try {
      //Fejl håndtering af tomt input
      if (comment === "") {
        toast.error("Felt må ikke være tomt");
        throw new Error("Feltet må ikke være tomt");
      }

      //Poster comment
      await postComment(
        `http://localhost:4242/comment/${productId}`,
        {
          method: "POST",
          body: body,
          headers: { Authorization: `Bearer ${userData?.access_token}` }, //Token
        },
        "Besked sendt", //Success message
        "Noget gik galt, prøv igen senere" //Error message
      );

      // Trigger en refetch af product data
      refetchData();

      //Clearer textarea
      setComment("");
    } catch (err) {
      console.error("Fejl i posting af kommentar:", err);
    }
  }

  //Async function til at slette kommentar
  async function deleteAComment(id) {
    try {
      await deleteComment(
        `http://localhost:4242/comment/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${userData?.access_token}` }, //Token
        },
        "Kommentar slettet", //Success message
        "Noget gik galt, prøv igen senere" //Error message
      );

      // Trigger en refetch af product data
      refetchData();
    } catch (err) {
      console.error("Fejl i sletning af kommentar", err);
    }
  }

  return (
    <section className={style.commentSection}>
      {userData ? (
        <>
          <h2>
            Kontakt {productUserId == userData?.user.id ? "køber" : "sælger"}
          </h2>

          <div className={style.textArea}>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={`Skriv en besked til ${
                productUserId == userData?.user.id ? "køber" : "sælger"
              }...`}
            ></textarea>
            <Button title="send" action={() => createComment(productId)} />
          </div>
        </>
      ) : (
        <>
          <h3>Du skal være logget ind for at kommentere</h3>
          <h2>Kommentarer</h2>
        </>
      )}
      <section>
        {commentData?.map((item) => (
          <div key={item.id} className={style.displayComments}>
            <div
              className={
                productUserId === item.user_id ? style.left : style.right
              }
              key={item.id}
            >
              <h6>
                {productUserId === item.user_id
                  ? item.user.firstname + " (Sælger)"
                  : item.user.firstname}
                : {formatDate(item.createdAt)}
              </h6>
              <span>
                <p>{item.comment}</p>
              </span>
              {item.user.id == userData?.user?.id && (
                <button
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteAComment(item.id)}
                >
                  slet kommentar
                </button>
              )}
            </div>
          </div>
        ))}
      </section>
    </section>
  );
};
