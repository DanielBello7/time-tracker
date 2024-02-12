import { NEW_USER } from "@/types/user.types";
import UsersService from "@/services/users.service";
import router from "@/lib/router";
import handleError from "@/lib/handle-error";

router.post(async (req, res, _) => {
  const body = req.body;
  const required: NEW_USER = {
    country: body.country,
    email: body.email,
    name: body.name,
    password: body.password,
    phone: body.phone,
    position: body.role
  }
  await UsersService.createNewUser(required);
  res.json({ msg: "success" });
});

export default router.handler({ onError: handleError });

