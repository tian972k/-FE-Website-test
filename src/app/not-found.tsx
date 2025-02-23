"use client";

import Document from "@app/components/Document";
import Error from "next/error";

export default function NotFound() {
  return (
    <Document locale="en">
      <Error statusCode={404} />
    </Document>
  );
}
