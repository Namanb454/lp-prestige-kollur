"use client";

import dynamic from "next/dynamic";

const SmartModal = dynamic(() => import("@/app/components/SmartModal"), { ssr: false });

export default function SmartModalWrapper() {
  return <SmartModal />;
}
