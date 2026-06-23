import { useEffect, useState } from "react";
import Input from "../../ui/Input";
import type { ContextType } from "../../types/ContextType";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import type { FormValues } from "../../types/ValidationType";
import { useValidationHook } from "../../hooks/useValidationHook";

const MainForm = () => {
  const [data, setData] = useState<ContextType | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  const formattedCardNumber = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, "");
    const formattedValue = onlyNumbers.replace(/(.{4})/g, "$1 ");
    return formattedValue.slice(0, 19);
  };

  const getData = async () => {
    try {
      const response = await fetch("/context/context.json");
      const res_data = await response.json();
      setData(res_data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const { setFormData, setIsFormValid, setWatchData } = useValidationHook();

  const onSubmit = (data: FormValues) => {
    setFormData((prev: FormValues | null) => ({
      ...prev,
      ...data,
      CardNumber: data.CardNumber.replace(/\s/g, ""),
    }));
    setIsFormValid((prev) => !prev);
    console.log("Activeted");
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      CardHolderName: "",
      CardNumber: "",
      CVC: "",
      ExpMonth: "",
      ExpYear: "",
    },
  });

  const CardHolderName = watch("CardHolderName");
  const CardNumber = watch("CardNumber");
  const ExpMonth = watch("ExpMonth");
  const ExpYear = watch("ExpYear");
  const CVC = watch("CVC");

  useEffect(() => {
    setWatchData((prev: FormValues | null) => ({
      ...prev,
      CardHolderName: CardHolderName,
      CardNumber: CardNumber,
      ExpMonth: ExpMonth,
      ExpYear: ExpYear,
      CVC: CVC,
    }));
  }, [CardHolderName, CardNumber, ExpMonth, ExpYear, CVC]);

  return (
    <div className="w-full min-h-full flex flex-col items-center justify-center gap-5 ">
      <div className="w-full flex flex-col gap-5 max-w-md">
        <Input
          label={!isLoading ? data?.inputs[0].inputName : "Loading..."}
          placeholder={
            !isLoading ? data?.inputs[0].inputPlaceholder : "Loading..."
          }
          {...register("CardHolderName", {
            required: "Can't be blank",
            pattern: {
              value: /^[a-zA-ZğüşöçıİĞÜŞÖÇ ]+$/,
              message: "Wrong format, letters only",
            },
          })}
          error={errors.CardHolderName?.message}
        />
        <Input
          label={!isLoading ? data?.inputs[1].inputName : "Loading..."}
          placeholder={
            !isLoading ? data?.inputs[1].inputPlaceholder : "Loading..."
          }
          {...register("CardNumber", {
            required: "Can't be blank",
            minLength: {
              value: 16,
              message: "Card number must be 16 digits",
            },
            validate: {
              value: (value) => {
                return (
                  value.replace(/\s/g, "").length === 16 ||
                  "Card number must be 16 digits"
                );
              },
            },
          })}
          onChange={(e) => {
            const formattedValue = formattedCardNumber(e.target.value);
            e.target.value = formattedValue;
            setValue("CardNumber", formattedValue);
          }}
          error={errors.CardNumber?.message}
        />
      </div>
      <div className="grid grid-cols-2 gap-3 max-w-md ">
        <div className="flex flex-col gap-3">
          <label className="mt-auto">
            {!isLoading ? data?.Expectation?.Name : "Loading..."}
          </label>
          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder={
                !isLoading
                  ? data?.Expectation?.input[0].inputPlaceholder
                  : "Loading..."
              }
              {...register("ExpMonth", {
                required: "Can't be blank",
                validate: {
                  value: (value) => {
                    return value.length === 2 || "Invalid month";
                  },
                },
              })}
              error={errors.ExpMonth?.message}
            />
            <Input
              placeholder={
                !isLoading
                  ? data?.Expectation?.input[1].inputPlaceholder
                  : "Loading..."
              }
              {...register("ExpYear", {
                required: "Can't be blank",
                validate: {
                  value: (value) => {
                    return value.length === 2 || "Invalid year";
                  },
                },
              })}
              error={errors.ExpYear?.message}
            />
          </div>
          <div className="w-full text-[10px] md:text-base text-red-400">
            {errors.ExpMonth?.message ||
              (errors.ExpYear?.message && (
                <p>{errors.ExpMonth?.message || errors.ExpYear?.message}</p>
              ))}
          </div>
        </div>
        <Input
          label={!isLoading ? data?.inputs[2].inputName : "Loading..."}
          placeholder={
            !isLoading ? data?.inputs[2].inputPlaceholder : "Loading..."
          }
          className="mt-2"
          {...register("CVC", {
            required: "Can't be blank",
            validate: {
              value: (value) => {
                return value.length === 3 || "Invalid CVC";
              },
            },
          })}
          error={errors.CVC?.message}
        />
      </div>
      <Button
        text={!isLoading ? data?.button.text : "Loading..."}
        className="mt-5 md:max-w-md"
        onClick={handleSubmit(onSubmit)}
      />
    </div>
  );
};

export default MainForm;
