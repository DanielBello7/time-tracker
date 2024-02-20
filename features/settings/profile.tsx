import FormSelect from "@/components/form/form-select";
import countryList from "react-select-country-list";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppSelector } from "@/store/hooks";

export default function Profile() {
  const { user } = useAppSelector((state) => state.user);

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

  return (
    <form className="w-full grid lg:grid-cols-2 gap-4" id="profile-form">
      <div className="w-full">
        <Label>Name</Label>
        <Input
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
    </form>
  )
}

