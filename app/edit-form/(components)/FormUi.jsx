"use client"
import { Input } from "@/components/ui/input";
import React, { useRef, useState } from "react";
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
import { db } from "@/configs";
import { userResponse } from "@/configs/schema";
import moment from "moment";
import { toast } from "sonner";

const FormUi = ({ editable=true,jsonForm,selectedTheme,onFieldUpdate,deleteField,formId=0 }) => {


  const [formData,setFormData] = useState();
  let formRef = useRef();

  const handleInputChange = (e)=>{
    const {name,value} = e.target;
    setFormData({
      ...formData,
      [name]:value
    })
  } 

  const handleSelectChange = (name,value)=>{
    setFormData({
      ...formData,
      [name]:value
    })
  }

  const onFormSubmit=async(e)=>{
    e.preventDefault();
    console.log(formData)
    const result = await db.insert(userResponse).values({
      jsonResponse:formData,
      createdAt:moment().format('DD/MM/yyyy'),
      formRef:formId
    })
    if(result){
      formRef.reset();
      toast('Response Submitted')
    }
    else{
      toast("Error While Saving Form")
    }
  }

  const handleCheckboxChange=(fieldName,itemName,value)=>{
    const list = formData?.[fieldName]?formData?.[fieldName]:[];
    if(value){
      list.push({
        label:itemName,
        value:value
      })
      setFormData({
        ...formData,
        [fieldName]:list
      })
    }
    else{
      const result = list.filter((item)=>item.label==itemName);
      setFormData({
        ...formData,
        [fieldName]:result
      })
    }
  }



  if (!jsonForm || !jsonForm.formFields) {
    // Return null or handle the case where jsonForm or formFields is undefined
    return null;
  }

  return (
    <form ref={(e)=>formRef=e} onSubmit={onFormSubmit} className="border p-5 md:w-[600px] rounded-lg" data-theme={selectedTheme}>
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

              <Select required={field?.required} onValueChange={(e)=>handleSelectChange(field.fieldName,e)}>
                <SelectTrigger className="w-full bg-transparent">
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
              <RadioGroup required={field?.required}>
                {field.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem onClick={(e)=>handleSelectChange(field.fieldName,option.label)} value={option.value} id={option.value} />
                    <Label htmlFor={option.value}>{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : field.fieldType === "checkbox" ? (
            <div className="my-3 w-full">
              <label className="text-sm text-gray-500" htmlFor="">
                {field?.label}
              </label>
              {field.options ? (
                field.options.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Checkbox onCheckedChange={(e)=>handleCheckboxChange(field?.label,item.label,e)} required={field?.required} />
                    <h2>{item.label}</h2>
                  </div>
                ))
              ) : (
                <div className="flex gap-2 items-center">
                  <Checkbox required={field?.required}/>
                  <h2>{field.label}</h2>
                </div>
              )}
            </div>
          ) : (
            <div className="my-3 w-full">
              <label className="text-sm text-gray-500" htmlFor="">
                {field.label}
              </label>
              <Input required={field?.required} onChange={(e)=>handleInputChange(e)} className="text-gray-500" type={field.type} placeholder={field.placeholder} />
            </div>
          )}
          {
            editable && <div><FieldEdit defaultValue = {field} onUpdate={(value)=>onFieldUpdate(value,index)} deleteField={()=>deleteField(index)}/></div>
          }
        </div>
      ))}
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default FormUi;
