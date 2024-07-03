import { Input } from "@/components/ui/input";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import FieldEdit from "./FieldEdit";

const FormUi = ({ jsonForm,onFieldUpdate,deleteField }) => {

  if (!jsonForm || !jsonForm.formFields) {
    // Return null or handle the case where jsonForm or formFields is undefined
    return null;
  }

  return (
    <div className="border p-5 md:w-[600px] rounded-lg">
      <h2 className="font-bold text-center text-2xl">{jsonForm.formTitle}</h2>
      <h2 className="text-sm text-gray-500 text-center">
        {jsonForm?.formSubheading}
      </h2>
      {jsonForm?.formFields?.map((field, index) => (
        <div key={index} className="flex items-center gap-2">
          {field.fieldType === "select" ? (
            <div className="my-3 w-full">
              <label className="text-sm text-gray-500" htmlFor="">
                {field.label}
              </label>

              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent className="text-black bg-gray-100">
                  {field.options.map((item, index) => (
                    <SelectItem key={index} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : field.fieldType === "radio" ? (
            <div className="my-3 w-full">
              <label className="text-sm text-gray-500" htmlFor="">
                {field.label}
              </label>
              <RadioGroup>
                {field.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value}>{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : field.fieldType === "checkbox" ? (
            <div className="my-3 w-full">
              <label className="text-sm text-gray-500" htmlFor="">
                {field.label}
              </label>
              {field.options ? (
                field.options.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Checkbox />
                    <h2>{item.label}</h2>
                  </div>
                ))
              ) : (
                <div className="flex gap-2">
                  <Checkbox />
                  <h2>{field.label}</h2>
                </div>
              )}
            </div>
          ) : (
            <div className="my-3 w-full">
              <label className="text-sm text-gray-500" htmlFor="">
                {field.label}
              </label>
              <Input className="text-gray-500" type={field.type} placeholder={field.placeholder} />
            </div>
          )}
          <div><FieldEdit defaultValue = {field} onUpdate={(value)=>onFieldUpdate(value,index)} deleteField={()=>deleteField(index)}/></div>
        </div>
      ))}
    </div>
  );
};

export default FormUi;
