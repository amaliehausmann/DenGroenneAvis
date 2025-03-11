import { useContext, useState } from "react";
import { Button } from "../Button/Button";
import { useAPI } from "../../hooks/useAPI";
import style from "./CommentSection.module.scss";
import { formatDate } from "../../helpers/FormatDate";
import { UserContext } from "../../context/userContext";

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
      await postComment(
        `http://localhost:4242/comment/${productId}`,
        {
          method: "POST",
          body: body,
          headers: { Authorization: `Bearer ${userData?.access_token}` },
        },
        "Besked sendt",
        "Noget gik galt, prøv igen senere"
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
          headers: { Authorization: `Bearer ${userData?.access_token}` },
        },
        "Kommentar slettet",
        "Noget gik galt, prøv igen senere"
      );

      // Trigger en refetch af product data
      refetchData();
    } catch (err) {
      console.error("Fejl i sletning af kommentar", err);
    }
  }

  return (
    <section>
      {userData && (
        <>
          <h2>
            Kontakt {productUserId === userData.user.id ? "sælger" : "køber"}
          </h2>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={`Skriv en besked til ${
              productUserId === userData.user.id ? "sælger" : "køber"
            }`}
          ></textarea>
          <Button
            title="send"
            color="bluegreen"
            action={() => createComment(productId)}
          />
        </>
      )}
      <section>
        {commentData?.map((item) => (
          <div
            className={
              productUserId === item.user_id ? style.left : style.right
            }
            key={item.id}
          >
            <h6>
              {productUserId === item.user_id
                ? item.user.firstname + "(Sælger)"
                : item.user.firstname}{" "}
              {formatDate(item.createdAt)}
            </h6>
            <span>{item.comment}</span>
            {item.user.id == userData?.user?.id && (
              <Button
                title="Slet"
                size="large"
                color="blue"
                action={() => deleteAComment(item.id)}
              />
            )}
          </div>
        ))}
      </section>
    </section>
  );
};
