import { Suspense } from "react";
import { ShipmentsPageContent } from "@/components/shipments/ShipmentsPageContent";

export default function ShipmentsPage() {
  return (
    <Suspense fallback={null}>
      <ShipmentsPageContent />
    </Suspense>
  );
}