"use client"
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Themes from "@/app/(data)/Themes";
import GradientBg from "@/app/(data)/GradientBg";
import { Button } from "@/components/ui/button";

const Controller = ({selectedTheme,selectedBackground}) => {
  const [showMore,setShowMore] = useState(6);
  return (
    <div>
      <h2 className="my-1">Select Theme</h2>
      <Select onValueChange={(e)=>selectedTheme(e)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {Themes.map((theme, index) => (
            <SelectItem key={index} value={theme.theme}>
              <div className="flex gap-3">
                <div className="flex">
                  <div
                    className="h-5 w-5"
                    style={{ backgroundColor: theme.primary }}
                  >
                  </div>
                  <div
                    className="h-5 w-5"
                    style={{ backgroundColor: theme.secondary }}
                  >
                  </div>
                  <div
                    className="h-5 w-5"
                    style={{ backgroundColor: theme.accent }}
                  >
                  </div>
                  <div
                    className="h-5 w-5"
                    style={{ backgroundColor: theme.neutral }}
                  >
                  </div>
                </div>
                    {theme.theme}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <h2 className="mt-8 my-1">Background Color</h2>
          <div className="grid grid-cols-3 gap-5">
          {GradientBg.map((bg, index) => (index<showMore) && (
            <div key={index} onClick={()=>selectedBackground(bg.gradient)} className="w-full h-[50-px] rounded-lg cursor-pointer hover:border-2 hover:border-black flex items-center justify-center"
            style={{ background: bg.gradient }}>{index==0&&"None"}
            </div>
          ))}
          </div>
          <Button varient="ghost" size="sm" className="
          w-full my-1" onClick={()=>setShowMore(showMore>6?6:11)}>{showMore>6?'Show Less':'Show More'}</Button>

    </div>
  );
};

export default Controller;
