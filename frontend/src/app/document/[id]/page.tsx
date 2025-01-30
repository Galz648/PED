"use client"
import React from "react";
// TODO: fix this - next navigation doesn't show types but works properly
import { useParams } from "next/navigation.js";

export default function DocumentPage() {
    const { id } = useParams();
    return <div>Document {id}</div>;
}
