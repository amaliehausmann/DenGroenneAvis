import { useContext } from "react";
import { useAPI } from "../../hooks/useAPI";
import { updateUserForm, updateUserForm2 } from "../../utils/UpdateUserForm";
import { InputField } from "../InputField/InputField";
import { useForm } from "react-hook-form";
import { UserContext } from "../../context/userContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import style from "./UpdateUser.module.scss";

export const UpdateUser = ({ listingData }) => {
  //Henter de nødvendige states og functions fra react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: listingData,
  });

  //Henter userData
  const { userData, setUserData } = useContext(UserContext);

  //Henter function fra useAPI()
  const { apiRequest: updateUser } = useAPI();

  function updateUserInfo(data) {
    const body = new URLSearchParams();
    body.append("email", data.email);
    body.append("firstname", data.firstname);
    body.append("lastname", data.lastname);
    body.append("address", data.address);
    body.append("zipcode", data.zipcode);
    body.append("city", data.city);
    body.append("hasNewsletter", data.hasNewsletter);
    body.append("hasNotification", data.hasNotification);

    updateUser(
      "http://localhost:4242/users",
      {
        method: "PATCH",
        body: body,
        headers: { Authorization: `Bearer ${userData?.access_token}` },
      },
      "Profil opdateret",
      "Der skete en fejl, prøv igen senere"
    );
  }

  const { apiRequest: deleteUser } = useAPI();

  const navigate = useNavigate();

  async function deleteCurrentUser() {
    try {
      await deleteUser(
        "http://localhost:4242/users",
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${userData?.access_token}` },
        },
        "Bruger er nu slettet",
        "Der skete en fejl, prøv igen senere"
      );
      setUserData("");
      sessionStorage.removeItem("userData");
      navigate("/");
      toast.info("Profil slettet");
    } catch (error) {
      console.error("Fejl i sletning af bruger", error);
    }
  }


  return (
    <section className={style.updateUser}>
      {listingData && (
        <form
          onSubmit={handleSubmit(updateUserInfo)}
        >
          <div>
            {updateUserForm?.map((item) => (
              <InputField
                key={item.name}
                name={item.name}
                label={item.label}
                type={item.type}
                placeholder={item.placeholder}
                register={register}
                validation={item.validation}
                error={errors[item.name]}
                defaultValue={listingData?.[item.name]}
              />
            ))}
          </div>
          <div>
            {updateUserForm2?.map((item) => (
              <InputField
                key={item.name}
                name={item.name}
                label={item.label}
                type={item.type}
                placeholder={item.placeholder}
                register={register}
                validation={item.validation}
                error={errors[item.name]}
              />
            ))}
            <span className={style.bottomButtons}>
            <button onClick={deleteCurrentUser} type="button">
              slet profil
            </button>
            <input type="submit" value="gem ændringer" />
            </span>
          </div>
        </form>
      )}
    </section>
  );
};
