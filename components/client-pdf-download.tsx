"use client"

import { useState, useEffect } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"

// Dynamically import PDF components with SSR disabled
const PDFDownloadLink = dynamic(() => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink), { ssr: false })

const OrderBillPDF = dynamic(() => import("@/components/order-bill-pdf"), { ssr: false })

export default function ClientPDFDownload({ orderData, orderNumber }: { orderData: any; orderNumber: string }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <Button variant="outline" className="w-full" disabled>
        <Download className="mr-2 h-4 w-4" />
        Preparing Receipt...
      </Button>
    )
  }

  // Only render the PDFDownloadLink on the client
  return (
    <>
      {isClient && (
        <PDFDownloadLink
          document={<OrderBillPDF order={orderData} />}
          fileName={`order-${orderNumber || "receipt"}.pdf`}
          className="w-full"
        >
          {({ loading, error }) => (
            <Button variant="outline" className="w-full" disabled={loading || !!error}>
              <Download className="mr-2 h-4 w-4" />
              {loading ? "Generating..." : error ? "Error" : "Download Receipt"}
            </Button>
          )}
        </PDFDownloadLink>
      )}
    </>
  )
}
