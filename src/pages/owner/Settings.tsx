import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import AppLayout from "../../layouts/AppLayout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import {
  getRestaurant,
  updateRestaurant,
  type Restaurant,
} from "../../api/restaurant";

export default function Settings() {
  const [restaurant, setRestaurant] =
    useState<Restaurant | null>(null);

  // Restaurant profile
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  // Owner profile
  const [ownerName, setOwnerName] = useState("Restaurant Owner");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  const [loading, setLoading] = useState(true);
  const [savingRestaurant, setSavingRestaurant] =
    useState(false);
  const [savingProfile, setSavingProfile] =
    useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadRestaurant() {
    try {
      setLoading(true);
      setError("");

      const data = await getRestaurant();

      setRestaurant(data);

      setName(data.name || "");
      setPhone(data.phone || "");
      setCity(data.city || "");
      setAddress(data.address || "");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load settings.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRestaurant();

    const savedOwnerName =
      localStorage.getItem("owner_name");

    const savedOwnerEmail =
      localStorage.getItem("owner_email");

    const savedOwnerPhone =
      localStorage.getItem("owner_phone");

    const savedProfilePhoto =
      localStorage.getItem("owner_profile_photo");

    if (savedOwnerName) {
      setOwnerName(savedOwnerName);
    }

    if (savedOwnerEmail) {
      setOwnerEmail(savedOwnerEmail);
    }

    if (savedOwnerPhone) {
      setOwnerPhone(savedOwnerPhone);
    }

    if (savedProfilePhoto) {
      setProfilePhoto(savedProfilePhoto);
    }
  }, []);

  async function handleRestaurantSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    try {
      setSavingRestaurant(true);
      setError("");
      setSuccess("");

      const updated = await updateRestaurant({
        name: name.trim(),
        phone: phone.trim() || null,
        city: city.trim() || null,
        address: address.trim() || null,
      });

      setRestaurant(updated);

      setName(updated.name || "");
      setPhone(updated.phone || "");
      setCity(updated.city || "");
      setAddress(updated.address || "");

      setSuccess(
        "Restaurant settings saved successfully.",
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update restaurant.",
      );
    } finally {
      setSavingRestaurant(false);
    }
  }

  function handleProfilePhoto(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError(
        "Profile photo must be smaller than 5MB.",
      );
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      if (typeof result === "string") {
        setProfilePhoto(result);
        localStorage.setItem(
          "owner_profile_photo",
          result,
        );

        setSuccess(
          "Profile photo updated locally. Cloud storage will be connected later.",
        );
      }
    };

    reader.readAsDataURL(file);
  }

  function handleProfileSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setSavingProfile(true);
    setError("");
    setSuccess("");

    localStorage.setItem(
      "owner_name",
      ownerName.trim(),
    );

    localStorage.setItem(
      "owner_email",
      ownerEmail.trim(),
    );

    localStorage.setItem(
      "owner_phone",
      ownerPhone.trim(),
    );

    setTimeout(() => {
      setSavingProfile(false);
      setSuccess(
        "Owner profile saved successfully.",
      );
    }, 500);
  }

  if (loading) {
    return (
      <AppLayout>
        <div className="flex min-h-[70vh] items-center justify-center">
          <p className="text-sm text-gray-500">
            Loading settings...
          </p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-8 p-6 lg:p-8">
        {/* Page header */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-[#E4572E]">
            Account & restaurant
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#17211D]">
            Settings
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-gray-600">
            Manage your owner profile and restaurant
            information.
          </p>
        </div>

        {/* Global messages */}
        {error && (
          <Card className="border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-700">
              {error}
            </p>
          </Card>
        )}

        {success && (
          <Card className="border-green-200 bg-green-50 p-4">
            <p className="text-sm font-medium text-[#176B4D]">
              {success}
            </p>
          </Card>
        )}

        {/* =========================================
            OWNER PROFILE
        ========================================= */}

        <Card className="max-w-4xl overflow-hidden">
          <div className="border-b border-[#E5E1D8] p-6">
            <h2 className="text-xl font-bold text-[#17211D]">
              Owner Profile
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your personal RestaurantOS account information.
            </p>
          </div>

          <div className="p-6">
            <form
              onSubmit={handleProfileSubmit}
              className="space-y-7"
            >
              {/* Profile photo */}
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#17211D] text-2xl font-bold text-white">
                  {profilePhoto ? (
                    <img
                      src={profilePhoto}
                      alt="Owner profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    ownerName
                      .split(" ")
                      .map((part) => part.charAt(0))
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()
                  )}
                </div>

                <div>
                  <p className="font-semibold text-[#17211D]">
                    Profile photo
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    JPG, PNG or WebP. Maximum 5MB.
                  </p>

                  <label className="mt-3 inline-flex cursor-pointer rounded-lg border border-[#E5E1D8] bg-white px-4 py-2.5 text-sm font-semibold text-[#17211D] transition hover:bg-[#F7F5F0]">
                    Change photo

                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="hidden"
                      onChange={handleProfilePhoto}
                    />
                  </label>
                </div>
              </div>

              {/* Owner information */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="owner-name"
                    className="text-sm font-semibold text-[#17211D]"
                  >
                    Full name
                  </label>

                  <input
                    id="owner-name"
                    value={ownerName}
                    onChange={(event) =>
                      setOwnerName(event.target.value)
                    }
                    required
                    className="mt-2 w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm outline-none focus:border-[#E4572E]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="owner-email"
                    className="text-sm font-semibold text-[#17211D]"
                  >
                    Email
                  </label>

                  <input
                    id="owner-email"
                    type="email"
                    value={ownerEmail}
                    onChange={(event) =>
                      setOwnerEmail(event.target.value)
                    }
                    placeholder="owner@example.com"
                    className="mt-2 w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm outline-none focus:border-[#E4572E]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="owner-phone"
                    className="text-sm font-semibold text-[#17211D]"
                  >
                    Phone
                  </label>

                  <input
                    id="owner-phone"
                    type="tel"
                    value={ownerPhone}
                    onChange={(event) =>
                      setOwnerPhone(event.target.value)
                    }
                    placeholder="+977 98XXXXXXXX"
                    className="mt-2 w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm outline-none focus:border-[#E4572E]"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-[#17211D]">
                    Account role
                  </label>

                  <div className="mt-2 rounded-lg border border-[#E5E1D8] bg-[#F7F5F0] px-4 py-3 text-sm font-semibold text-[#17211D]">
                    Owner
                  </div>
                </div>
              </div>

              <div className="flex justify-end border-t border-[#E5E1D8] pt-5">
                <Button
                  type="submit"
                  disabled={savingProfile}
                >
                  {savingProfile
                    ? "Saving..."
                    : "Save Profile"}
                </Button>
              </div>
            </form>
          </div>
        </Card>

        {/* =========================================
            SECURITY
        ========================================= */}

        <Card className="max-w-4xl overflow-hidden">
          <div className="border-b border-[#E5E1D8] p-6">
            <h2 className="text-xl font-bold text-[#17211D]">
              Password & Security
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage account security settings.
            </p>
          </div>

          <div className="divide-y divide-[#E5E1D8]">
            <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-[#17211D]">
                  Password
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Change your RestaurantOS account password.
                </p>
              </div>

              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  (window.location.href =
                    "/forgot-password")
                }
              >
                Change Password
              </Button>
            </div>

            <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-[#17211D]">
                  Two-factor authentication
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Add another layer of protection to your
                  account.
                </p>
              </div>

              <span className="rounded-full bg-[#F7F5F0] px-3 py-1.5 text-xs font-semibold text-gray-500">
                Coming soon
              </span>
            </div>
          </div>
        </Card>

        {/* =========================================
            RESTAURANT INFORMATION
        ========================================= */}

        <Card className="max-w-4xl overflow-hidden">
          <div className="border-b border-[#E5E1D8] p-6">
            <h2 className="text-xl font-bold text-[#17211D]">
              Restaurant Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              These details are stored in your RestaurantOS
              restaurant account.
            </p>
          </div>

          <form
            onSubmit={handleRestaurantSubmit}
            className="space-y-5 p-6"
          >
            <div>
              <label
                htmlFor="restaurant-name"
                className="text-sm font-semibold text-[#17211D]"
              >
                Restaurant name
              </label>

              <input
                id="restaurant-name"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                required
                className="mt-2 w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm outline-none focus:border-[#E4572E]"
              />
            </div>

            <div>
              <label
                htmlFor="restaurant-phone"
                className="text-sm font-semibold text-[#17211D]"
              >
                Restaurant phone
              </label>

              <input
                id="restaurant-phone"
                value={phone}
                onChange={(event) =>
                  setPhone(event.target.value)
                }
                className="mt-2 w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm outline-none focus:border-[#E4572E]"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="restaurant-city"
                  className="text-sm font-semibold text-[#17211D]"
                >
                  City
                </label>

                <input
                  id="restaurant-city"
                  value={city}
                  onChange={(event) =>
                    setCity(event.target.value)
                  }
                  placeholder="Kathmandu"
                  className="mt-2 w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm outline-none focus:border-[#E4572E]"
                />
              </div>

              <div>
                <label
                  htmlFor="restaurant-address"
                  className="text-sm font-semibold text-[#17211D]"
                >
                  Address
                </label>

                <input
                  id="restaurant-address"
                  value={address}
                  onChange={(event) =>
                    setAddress(event.target.value)
                  }
                  placeholder="New Road, Kathmandu"
                  className="mt-2 w-full rounded-lg border border-[#E5E1D8] bg-white px-4 py-3 text-sm outline-none focus:border-[#E4572E]"
                />
              </div>
            </div>

            <div className="flex justify-end border-t border-[#E5E1D8] pt-5">
              <Button
                type="submit"
                disabled={savingRestaurant}
              >
                {savingRestaurant
                  ? "Saving..."
                  : "Save Restaurant"}
              </Button>
            </div>
          </form>
        </Card>

        {/* =========================================
            RESTAURANT STATUS
        ========================================= */}

        {restaurant && (
          <Card className="max-w-4xl p-6">
            <h2 className="text-lg font-bold text-[#17211D]">
              Restaurant Status
            </h2>

            <div className="mt-4 flex items-center gap-3">
              <span
                className={`h-3 w-3 rounded-full ${
                  restaurant.is_active
                    ? "bg-[#176B4D]"
                    : "bg-gray-400"
                }`}
              />

              <span className="text-sm font-medium text-gray-700">
                {restaurant.is_active
                  ? "Restaurant active"
                  : "Restaurant inactive"}
              </span>
            </div>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}