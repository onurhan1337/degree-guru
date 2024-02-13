"use client";

import { useState } from 'react';
import { useChat } from 'ai/react';
import Message from './components/Message';
import {Tabs, Tab} from "@nextui-org/react";

export default function Home() {
  const [selectedOption, setSelectedOption] = useState<"MIT" | "Stanford" | "Harvard">("MIT");
  const { messages, input, handleInputChange, handleSubmit, setMessages } = useChat({
    api: "/api/guru"
  });

  return (
    <div className="p:2 flex min-h-screen flex-col items-center justify-between bg-[#F0F0F0]">
      <div className="w-full bg-[#FFFFFF] pr-40 border-b flex flex-row justify-between">
        <div className="p-4">
          <h1 className="text-xl font-semibold">DegreeGuru</h1>
        </div>
        <div className="flex flex-wrap pt-1">
          <Tabs
            classNames={{
              tabList: "gap-4 w-full relative rounded-none border-divider",
              cursor: "w-full bg-[#22d3ee]",
              tab: "max-w-fit h-12",
              tabContent: "group-data-[selected=true]:text-[#06b6d4]"
            }}
            selectedKey={selectedOption}
            onSelectionChange={(key) => {
              setMessages([])
              setSelectedOption(key as "MIT" | "Stanford" | "Harvard")
            }}
          >
            <Tab key="Stanford" title="Stanford"/>
            <Tab key="MIT" title="MIT"/>
            <Tab key="Harvard" title="Harvard"/>
          </Tabs>
        </div>
        <div>

        </div>
      </div>
      <div className="w-1/2 flex flex-col justify-between items-center flex-grow border-x">
        <div
          id="messages" 
          className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex flex-col overflow-y-auto w-full"
        >
          {
            messages.map(m => (<Message message={m} key={m.id}/>))
          }
        </div>
        <div className="border-t border-gray-200 w-full relative">
            {/* <OptionPicker selectedOption={selectedOption} handleChange={setSelectedOption}/> */}
            <form
              onSubmit={e => {
                handleSubmit(e, {
                  data: {
                    vectorStore: selectedOption
                  },
                });
              }}
              className="m-auto flex w-full max-w-screen-lg items-center justify-center space-x-4 p-4"
            >
              <input
                id="message"
                type="text"
                value={input}
                onChange={handleInputChange}
                x-model="newMessage"
                placeholder="Your message..."
                className="flex-1 rounded-md border border-gray-300 p-2"  
              />
              <button className="rounded-md bg-gray-800 px-4 py-2 text-white">
                Send
              </button>
            </form>
        </div>
      </div>
    </div>
    
  );
}
