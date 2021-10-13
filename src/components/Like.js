import React, { useState } from "react";
import { ChevronDoubleUpIcon } from "@heroicons/react/solid";

function Like() {
    return (
        <button
            onClick={list.likes = list.likes + 1}
            className="hover:text-blue-400 font-normal py-1 px-1 rounded justify-center"
            >
            <ChevronDoubleUpIcon className="h-4 text-gray-900 hover:text-green-400" />
        </button>
    )
}

export default Like