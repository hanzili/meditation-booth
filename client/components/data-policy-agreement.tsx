"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDictionary } from "@/components/wrappers/dictionary-wrapper";

interface DataPolicyAgreementProps {
  onAgreementChange: (agreed: boolean) => void;
}

export function DataPolicyAgreement({
  onAgreementChange,
}: DataPolicyAgreementProps) {
  const dict: any = useDictionary();
  const [agreed, setAgreed] = useState(false);

  const handleAgreementChange = (checked: boolean) => {
    setAgreed(checked);
    onAgreementChange(checked);
  };

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="data-policy"
        checked={agreed}
        onCheckedChange={handleAgreementChange}
      />
      <Label htmlFor="data-policy" className="text-sm">
        {dict.DataPolicyAgreement.CheckboxLabel}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="link" className="p-0 h-auto text-sm">
              {dict.DataPolicyAgreement.DataPolicy}
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-lg w-[90vw] max-w-2xl mx-auto px-6">
            <DialogHeader>
              <DialogTitle>{dict.DataPolicyAgreement.DialogTitle}</DialogTitle>
            </DialogHeader>
            <div className="max-h-[60vh] overflow-y-auto">
              <p className="text-sm">
                {dict.DataPolicyAgreement.EffectiveDate}
              </p>
              <p className="mt-4 whitespace-pre-line">
                {dict.DataPolicyAgreement.Content}
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </Label>
    </div>
  );
}
