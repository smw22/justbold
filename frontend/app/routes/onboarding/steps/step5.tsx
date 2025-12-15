import { useState } from "react";
import Logo from "~/assets/icons/artwork/Logo";
import Button from "~/components/Button";
import PricingOption from "~/components/PricingOption";
import Icon from "~/components/icon";
import type { FormData } from "../steps";

interface Step5Props {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  onSkip: () => void;
}

export default function Step5({ formData, updateFormData, onSkip }: Step5Props) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(formData.subscription || null);

  const features = ["Unlimited collabs", "Unlimited connections", "Advanced insights", "See detailed reviews"];

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
    updateFormData({ subscription: plan });
  };

  return (
    <div className="m-auto flex flex-col items-center justify-center min-h-full gap-9 w-[273px] pt-14">
      <div className="flex items-center gap-1.5">
        <Logo variant="purple" className="h-8 w-auto" />
        <span className="text-3xl font-bold text-primary-yellow">PRO</span>
      </div>

      <div className="flex flex-col gap-3.5 self-start">
        <h3 className="font-semibold self-start">Get full access to LineUp</h3>
        <div className="flex flex-col gap-2 w-full">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-5">
              <Icon name="Check" size={20} className="text-primary-yellow" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-7 w-full">
        <PricingOption
          title="Monthly"
          price="58 kr."
          period="58 kr. / month"
          isSelected={selectedPlan === "monthly"}
          onClick={() => handlePlanSelect("monthly")}
        />
        <PricingOption
          title="Yearly"
          price="348 kr."
          period="29 kr. / month"
          badge="HIT"
          savingsLabel="save 50%"
          isSelected={selectedPlan === "yearly"}
          onClick={() => handlePlanSelect("yearly")}
        />
        <div className="flex flex-col gap-4">
          <Button text="Start my free 7-day trial" variant="primary" type="submit" className="w-fit self-center" />{" "}
          <p className="text-sm text-center">Terms of use and Privacy Policy</p>
        </div>
      </div>

      <button type="button" onClick={onSkip} className="cursor-pointer underline">
        Skip for now
      </button>
    </div>
  );
}
