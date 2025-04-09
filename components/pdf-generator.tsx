"use client"

import { useState, useEffect } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { pdf } from "@react-pdf/renderer"
import OrderBillPDF from "./order-bill-pdf"

export default function PDFGenerator({ orderData, orderNumber }: { orderData: any; orderNumber: string }) {
  const [isClient, setIsClient] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const generatePDF = async () => {
    if (!isClient) return

    try {
      setIsGenerating(true)
      setError(null)

      // Create the PDF blob
      const blob = await pdf(<OrderBillPDF order={orderData} />).toBlob()

      // Create a URL for the blob
      const url = URL.createObjectURL(blob)

      // Create a link element
      const link = document.createElement("a")
      link.href = url
      link.download = `order-${orderNumber || "receipt"}.pdf`

      // Append to the document, click it, and remove it
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Clean up the URL
      URL.revokeObjectURL(url)

      setIsGenerating(false)
    } catch (err) {
      console.error("Error generating PDF:", err)
      setError("Failed to generate PDF")
      setIsGenerating(false)
    }
  }

  if (!isClient) {
    return (
      <Button variant="outline" className="w-full" disabled>
        <Download className="mr-2 h-4 w-4" />
        Preparing...
      </Button>
    )
  }

  return (
    <Button variant="outline" className="w-full" onClick={generatePDF} disabled={isGenerating}>
      <Download className="mr-2 h-4 w-4" />
      {isGenerating ? "Generating..." : error ? error : "Download Receipt"}
    </Button>
  )
}
