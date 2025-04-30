"use client";

import React from "react";
import { 
  FormControl, 
  FormField as UIFormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface CustomFormFieldProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}

export const CustomFormField = ({
  form,
  name,
  label,
  placeholder = `Enter your ${label.toLowerCase()}`,
  type = "text",
  required = false,
}: CustomFormFieldProps) => {
  return (
    <UIFormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">
            {label}{required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                type={type}
                placeholder={placeholder}
                className="form-input"
                {...field}
              />
            </FormControl>
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
};