import FormSelect from "@/components/form/form-select";
import countryList from "react-select-country-list";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toast } from "sonner";
import { updateUser } from "@/store/user-slice";
import sanitize from "@/lib/sanitize";
import ensureError from "@/lib/ensure-error";
import updateAccount from "@/apis/update-account";
import { Button } from "@/components/ui/button";

export default function Profile() {
  const [isLoading, setIsLoading] = React.useState(false);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const options = React.useMemo(() => {
    const response = countryList().getData().map((item: any) => ({
      id: item.label.toLowerCase(),
      title: item.label
    }));
    return response
  }, []);

  const [formData, setFormData] = React.useState({
    phone: user.phone ?? "",
    name: user.name ?? "",
    country: user.country ?? ""
  });

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!sanitize(formData)) {
      return toast("Error occured", { description: "Incomplete field values" });
    }
    setIsLoading(true);
    try {
      await updateAccount(user._id, {
        country: formData.country,
        name: formData.name,
        phone: formData.phone
      });
      dispatch(updateUser({ ...formData }));
      toast("User Account Updated");
    } catch (error) {
      const err = ensureError(error);
      toast("Error occured", { description: err.message });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form className="w-full grid lg:grid-cols-2 gap-4" id="profile-form"
      onSubmit={submit}>
      <div className="w-full">
        <Label>Name</Label>
        <Input
          disabled={isLoading && true}
          type="text"
          onChange={(e) => setFormData({
            ...formData,
            name: e.currentTarget.value
          })}
          value={formData.name}
        />
        <p className="text-gray-400 text-xs mt-1">
          Type in your full name here
        </p>
      </div>

      <div className="w-full">
        <Label>Phone number</Label>
        <Input
          disabled={isLoading && true}
          type="text"
          onChange={(e) => setFormData({
            ...formData,
            phone: e.currentTarget.value
          })}
          value={formData.phone}
        />
        <p className="text-gray-400 text-xs mt-1">
          Type in your phone number using the international format
        </p>
      </div>

      <div className="w-full">
        <Label>Country</Label>
        <FormSelect
          isLoading={isLoading}
          value={formData.country}
          label="Country"
          onchange={(e) => setFormData({
            ...formData,
            country: e
          })}
          options={options}
        />
        <p className="text-gray-400 text-xs mt-1">
          Select your country from the list
        </p>
      </div>

      <div className="w-full col-span-2 mt-3">
        <Button className="w-3/12" variant={"secondary"}>
          Submit
        </Button>
      </div>
    </form>
  )
}

